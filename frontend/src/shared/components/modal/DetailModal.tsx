import { useAppDispatch, useAppSelector } from "@/core/hooks/redux";
import { closeModal } from "@/core/redux/store/reducers/modalSlice";
import React from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

export interface IDetailModalProps {
  show?: boolean;
  setShow?: (a: boolean) => void;
  payload?: any;
}

const ErrorModalContent = ({
  payload,
}: {
  payload?: {
    code: number;
    message: string;
  };
}) => {
  return <Alert variant="danger">{payload?.message}</Alert>;
};

export default function DetailModal(props: IDetailModalProps) {
  const dispatch = useAppDispatch();
  const { open, data, type } = useAppSelector((state) => state.modal);
  const [title, setTitle] = React.useState<string>("");
  const handleClose = () => {
    if (props.setShow !== undefined) {
      props.setShow(false);
    } else {
      dispatch(closeModal());
    }
  };
  React.useEffect(() => {
    if (type === "error") {
      if (data && data.code) {
        setTitle(`Error ${data.code}`);
      }
    }
  }, [type, data]);

  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {type === "error" ? <ErrorModalContent payload={data} /> : <></>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <FormattedMessage id="close" defaultMessage="Close" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
