import { IFeedback } from "@/core/models/IFeedback";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ProjectWorkService from "@/core/services/ProjectWorkService";
import InputError from "../form/InputError";
import { IProjectWork } from "@/core/models/IProjectWork";
import { ILoadingState } from "@/core/models/ILoadingState";
import { FormattedMessage } from "react-intl";

export interface IFeedbackDetailModalProps {
  show: boolean;
  setShow: (a: boolean) => void;
  feedback_item?: IFeedback;
  exam_id: number;
}
export default function ProjectWorkSubmitModal(
  props: IFeedbackDetailModalProps
) {
  const { exam_id } = props;
  const [data, setData] = React.useState({
    project_id: -1,
    exam_id: -1,
  });
  const [errors, setErrors] = React.useState<{
    project_id: any;
    exam_id: any;
  }>({
    project_id: null,
    exam_id: null,
  });
  const [projectWorksList, setProjectWorksList] = React.useState<
    IProjectWork[]
  >([]);
  const [loading, setLoading] = React.useState<ILoadingState>({
    post: false,
  });

  const handleProjectSelectChange = (e: any) => {
    setData((data) => ({
      ...data,
      project_id: (e.target as any).value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setErrors({
      exam_id: null,
      project_id: null,
    });
    setLoading((loading) => ({
      ...loading,
      post: true,
    }));
    ProjectWorkService.fetchSubmitProjectWork({ ...data })
      .then(() => {
        handleClose();
        setLoading((loading) => ({
          ...loading,
          post: false,
        }));
        window.location.reload();
      })
      .catch((error) => {
        setLoading((loading) => ({
          ...loading,
          post: false,
        }));
        if (error.response && error.response.status === 400) {
          setErrors(error.response.data);
        } else {
          alert("An error occurred. " + error.response.status);
        }
      });
  };
  const handleClose = () => {
    if (props.setShow !== undefined) {
      props.setShow(false);
    }
  };

  React.useEffect(() => {
    setData((data) => ({
      ...data,
      exam_id: exam_id,
    }));
    ProjectWorkService.fetchProjectWorkList({
      status: "dev",
    }).then((response) => {
      setProjectWorksList(response.data);
    });
  }, [exam_id]);
  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage
            id="dashboard.exams.suuubcas"
            defaultMessage="Submit project for Exam (#{exam_id}) "
            values={{
              exam_id: exam_id,
            }}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              as="select"
              value={data.project_id}
              onChange={handleProjectSelectChange}
            >
              <option value="">----</option>
              {projectWorksList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title} ({item.status})
                </option>
              ))}
            </Form.Control>
            {errors.project_id && <InputError messages={errors.project_id} />}
            {errors.exam_id && <InputError messages={errors.exam_id} />}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <FormattedMessage id="close" defaultMessage="Close" />
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={loading.post}
        >
          <FormattedMessage id="submit" defaultMessage="Submit" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
