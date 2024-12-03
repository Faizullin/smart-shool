import { INotification } from "@/core/models/INotification";
import { openModal } from "@/core/redux/store/reducers/modalSlice";
import {
  fetchNotificationList,
  fetchNotificationMarkAsRead,
} from "@/core/redux/store/reducers/notificationSlice";
import DashboardInfoSidebar from "@/shared/components/sidebar/DashboardInfoSidebar";
import { mdiDotsCircle } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import { Dropdown } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../core/hooks/redux";
import "./index.scss";

const notification_level_colors = {
  warning: "bg-warning",
  error: "bg-danger",
  success: "bg-success",
  info: "bg-info",
};

const NotificationItemActionButton: React.FC<{
  verb: string;
}> = ({ verb }) => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { studentData } = useAppSelector((state) => state.user);
  const processData = () => {
    if (verb === "no_face_id") {
      navigate(`/face_id/train`);
    } else if (verb === "no_subject_group") {
      navigate(`/dashboard/exams`);
    }
  };
  const labels = {
    no_face_id: intl.formatMessage({
      id: "dashboard.notifications_add_face_id",
      defaultMessage: "Add face id",
    }),
    no_subject_group: intl.formatMessage({
      id: "dashboard.notifications_attempt_exam",
      defaultMessage: "Attempt exam",
    }),
  };
  const GetComponent = () => {
    if (verb) {
      if (verb === "no_face_id") {
        if ((studentData as any).hasFaceId) {
          return <></>;
        }
      } else if (verb === "no_subject_group") {
        if (studentData.current_group) {
          return <></>;
        }
      }
      return (
        <Dropdown.Item onClick={processData}>{labels[verb]}</Dropdown.Item>
      );
    }
    return <></>;
  };
  return <GetComponent />;
};

const NotificationItem: React.FC<{
  notification_item: INotification;
}> = ({ notification_item }) => {
  const dispatch = useAppDispatch();
  const [verbs, setVerbs] = React.useState<string[]>([]);
  const markAsRead = () => {
    dispatch(fetchNotificationMarkAsRead(notification_item.id)).then(
      (response) => {
        if (
          response.type === fetchNotificationMarkAsRead.fulfilled.toString()
        ) {
          dispatch(fetchNotificationList());
        } else if (
          response.type === fetchNotificationMarkAsRead.rejected.toString()
        ) {
          if (response.payload.detail || response.payload.message) {
            dispatch(
              openModal({
                type: "error",
                data: {
                  message: response.payload.detail || response.payload.message,
                },
              })
            );
          }
        }
      }
    );
  };
  React.useEffect(() => {
    if (notification_item.verb) {
      const verbs = notification_item.verb.split("|");
      setVerbs([...verbs, "mark_as_read"]);
    }
  }, []);
  return (
    <div className="p-3 d-flex align-items-center border-bottom osahan-post-header">
      <div
        className={`${
          notification_level_colors[notification_item.level]
        } dropdown-list-image mr-3 d-flex align-items-center justify-content-center rounded-circle text-white text-uppercase`}
      >
        {notification_item.level.length > 0 ? notification_item.level[0] : "-"}
      </div>
      <div
        className={`${
          notification_item.unread ? "font-weight-bold" : ""
        } mx-3 flex-grow-1`}
      >
        <div className="text-truncate"></div>
        <div className="small ">{notification_item.description}</div>
      </div>
      <div>
        {verbs.length > 0 && (
          <Dropdown className="ms-2">
            <Dropdown.Toggle className="font-size-16 text-muted bg-transparent border-0 p-0">
              <Icon path={mdiDotsCircle} size={1} />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              {verbs.map((verb_item, index) => (
                <NotificationItemActionButton key={index} verb={verb_item} />
              ))}
              {notification_item.unread && (
                <Dropdown.Item onClick={() => markAsRead()}>
                  <FormattedMessage
                    id="dashboard.notifXsc"
                    defaultMessage="Mark as Read"
                  />
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

const DashboardIndex = () => {
  const dispatch = useAppDispatch();
  const { notifications_list } = useAppSelector((state) => state.notification);
  React.useEffect(() => {
    dispatch(fetchNotificationList());
  }, [dispatch]);
  return (
    <div className="row dashboard-index">
      <DashboardInfoSidebar />
      <div className="col-lg-8">
        <div className="card mb-4">
          <div className="box shadow-sm rounded bg-white">
            <div className="box-title border-bottom p-3">
              <h6 className="m-0">
                <FormattedMessage
                  id="notifications"
                  defaultMessage="Notifications"
                />
              </h6>
            </div>
            <div className="box-body p-0">
              {notifications_list.map((item: INotification) => (
                <NotificationItem key={item.id} notification_item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardIndex;
