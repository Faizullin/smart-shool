import { IProjectWork } from "@/core/models/IProjectWork";
import React, { FC } from "react";
import { Dropdown } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { STATUS_LABELS } from "./status_labels";

interface IProjectWorkItemCardProps {
  project_item: IProjectWork;
  onEditClick: (id?: number) => void;
  onDeleteClick: (id?: number) => void;
  onShareClick: (project_work: IProjectWork) => void;
}

const ProjectWorkItemCard: FC<IProjectWorkItemCardProps> = ({
  project_item,
  onEditClick,
  onDeleteClick,
  onShareClick,
}) => {
  return (
    <div className="col-md-6" id="project-items-1">
      <div className="card">
        <div className="card-body">
          <div className="d-flex mb-3">
            <div className="flex-grow-1 align-items-start">
              <div>
                <h6 className="mb-0 text-muted">
                  <i className="mdi mdi-circle-medium text-danger fs-3 align-middle" />
                  <span className="team-date">{project_item.created_at}</span>
                </h6>
              </div>
            </div>
            <Dropdown className="ms-2">
              <Dropdown.Toggle className="font-size-16 text-muted bg-transparent border-0 p-0">
                <i className="mdi mdi-dots-horizontal" />
              </Dropdown.Toggle>

              <Dropdown.Menu align="end">
                <Dropdown.Item onClick={() => onEditClick(project_item.id)}>
                  <FormattedMessage id="edit" defaultMessage="Edit" />
                </Dropdown.Item>
                {/* <Dropdown.Item onClick={() => onShareClick(project_item)}>
                <FormattedMessage id="share" defaultMessage="Share" />
              </Dropdown.Item> */}
                <div className="dropdown-divider" />
                {project_item.status !== "rated" && (
                  <Dropdown.Item onClick={() => onDeleteClick(project_item.id)}>
                    <FormattedMessage id="delete" defaultMessage="Delete" />
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="mb-4">
            <h5 className="mb-1 font-size-17 team-title">
              {project_item.title}
            </h5>
            <p className="text-muted mb-0 team-description">
              <FormattedMessage
                id="dashboard.projects.files_count_svadv"
                defaultMessage="{files_count} files"
                values={{
                  files_count: project_item.files?.length || 0,
                }}
              />
            </p>
          </div>
          <div className="d-flex">
            <div className="avatar-group float-start flex-grow-1 task-assigne">
              {/* <div className="avatar-group-item">
              <a
                className="d-inline-block"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Terrell Soto"
                data-bs-original-title="Terrell Soto"
              >
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  alt=""
                  className="rounded-circle avatar-sm"
                />
              </a>
            </div>
            <div className="avatar-group-item">
              <a
                className="d-inline-block"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Ruhi Shah"
                data-bs-original-title="Ruhi Shah"
              >
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  alt=""
                  className="rounded-circle avatar-sm"
                />
              </a>
            </div>
            <div className="avatar-group-item">
              <a
                className="d-block"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-original-title="Denny Silva"
              >
                <div className="avatar-sm">
                  <div className="avatar-title rounded-circle bg-primary">
                    D
                  </div>
                </div>
              </a>
            </div> */}
            </div>
            {project_item.status && (
              <div className="align-self-end">
                <span
                  className={`badge ${
                    project_item.status === "pending"
                      ? "badge-soft-warning"
                      : project_item.status === "dev"
                      ? "badge-soft-success"
                      : "badge-soft-success"
                  } p-2 team-status`}
                >
                  {STATUS_LABELS[project_item.status]}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectWorkItemCard;
