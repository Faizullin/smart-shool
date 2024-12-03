import { ILoadingState } from "@/core/models/ILoadingState";
import { IProjectWork } from "@/core/models/IProjectWork";
import { IStudent } from "@/core/models/IStudent";
import ProjectWorkService from "@/core/services/ProjectWorkService";
import { AxiosError } from "axios";
import React, { ChangeEvent } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import InputError from "../form/InputError";

export interface IFeedbackDetailModalProps {
  show: boolean;
  setShow: (a: boolean) => void;
  project: IProjectWork | null;
}
export default function ProjectWorkShareModal(
  props: IFeedbackDetailModalProps
) {
  const { project } = props;
  const [data, setData] = React.useState<{
    shared_students: IStudent[];
  }>({
    shared_students: [],
  });
  const [errors, setErrors] = React.useState<{
    shared_students_ids: any;
  }>({
    shared_students_ids: null,
  });
  const [sharedStudentData, setSharedStudentData] = React.useState<
    Array<{
      label: string;
      value: number;
    }>
  >([]);
  const [loading, setLoading] = React.useState<ILoadingState>({
    detail: false,
    post: false,
  });

  const handleProjectSelectChange = (e: any) => {
    setData((data) => ({
      ...data,
      project_id: (e.target as any).value,
    }));
  };

  const handleSubmit = async (event?: ChangeEvent<any>) => {
    event?.preventDefault();
    setErrors({
      shared_students_ids: null,
    });
    setLoading((loading) => ({
      ...loading,
      post: true,
    }));
    try {
      await ProjectWorkService.fetchSaveProjectWorkSharedStudents(
        project.id,
        {
          ...data,
        }
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 400) {
          setErrors(error.response.data);
        } else {
          alert("An error occurred. " + error.response.status);
        }
      }
    }
    setLoading((loading) => ({
      ...loading,
      post: false,
    }));
  };
  const handleOnChange = (e: any) => {
  };
  const handleClose = () => {
    if (props.setShow !== undefined) {
      props.setShow(false);
    }
  };
  React.useEffect(() => {
    if (project !== null) {
      setLoading((loading) => ({
        ...loading,
        detail: true,
      }));
      ProjectWorkService.fetchProjectWorkSharedStudents(project.id)
        .then((response) => {
          const shared_students_data = response.data.shared_students || [];
          setSharedStudentData(
            shared_students_data.map((item) => ({
              label: `${item.user?.username}(${item.user?.email})`,
              value: item.id,
            }))
          );
        })
        .finally(() => {
          setLoading((loading) => ({
            ...loading,
            detail: false,
          }));
        });
    }
  }, [project]);
  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage id="share" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            {/* <Form.Control
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
            </Form.Control> */}
            <DropdownMultiselect
              options={sharedStudentData}
              name="countries"
              handleOnChange={handleOnChange}
            />
            {errors.shared_students_ids && (
              <InputError messages={errors.shared_students_ids} />
            )}
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
