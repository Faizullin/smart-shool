import { IFeedback } from "@/core/models/IFeedback";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

export interface IFeedbackDetailModalProps {
  show: boolean;
  setShow: (a: boolean) => void;
  feedback_item?: IFeedback;
}
export default function FeedbackDetailModal(props: IFeedbackDetailModalProps) {
  const handleClose = () => {
    if (props.setShow !== undefined) {
      props.setShow(false);
    }
  };
  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage id="feedback" defaultMessage="Feedback" />
          {props.feedback_item?.updated_at}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.feedback_item?.content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <FormattedMessage id="close" defaultMessage="Close" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
