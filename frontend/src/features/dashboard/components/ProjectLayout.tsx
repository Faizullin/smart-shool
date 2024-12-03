import { useAppDispatch, useAppSelector } from "@/core/hooks/redux";
import { IFile } from "@/core/models/IFile";
import { setCurrentFilePayload } from "@/core/redux/store/reducers/projectScriptSlice";
import {
  fetchProjectFileDelete,
  fetchProjectWorkDetail,
} from "@/core/redux/store/reducers/projectSlice";
import { mdiFile, mdiTrashCan } from "@mdi/js";
import Icon from "@mdi/react";
import React, { FC, ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import ProjectUploadFileToolbar from "./ProjectUploadFileToolbar";

import { openModal } from "@/core/redux/store/reducers/modalSlice";
import "./project-layout.scss";

interface IProjectLayoutProps {
  children: ReactNode;
}

const ProjectLayout: FC<IProjectLayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { projectData, project_loading, success, errors } = useAppSelector(
    (state) => state.project
  );
  const { current_file_payload } = useAppSelector(
    (state) => state.projectScript
  );
  const { id: item_id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const handleDeleteFile = async (item: IFile) => {
    await dispatch(
      fetchProjectFileDelete({
        project_id: projectData.id,
        file_id: item.id,
      })
    );
    if (item.id === current_file_payload?.id) {
      dispatch(setCurrentFilePayload(null));
    }
    await dispatch(fetchProjectWorkDetail(projectData.id));
  };
  const handleOpenProjectWorkFile = (event: any, item: IFile) => {
    event?.preventDefault();
    const to_url = `/dashboard/projects/${projectData.id}/edit`;
    if (!location.pathname.startsWith(to_url)) {
      navigate(to_url);
    }
    dispatch(setCurrentFilePayload(item));
  };
  React.useEffect(() => {
    const fetchDetail = async () => {
      await dispatch(fetchProjectWorkDetail(Number(item_id)));
    };
    if (item_id && !projectData) {
      fetchDetail();
    }
  }, [item_id]);
  React.useEffect(() => {
    if (!project_loading.detail && !success && errors?.detail) {
      dispatch(
        openModal({
          type: "error",
          data: {
            message: errors.detail,
          },
        })
      );
    }
  }, [success, errors, project_loading]);

  return (
    <div className="row project-layout">
      <div className="col-md-3">
        <div className="file-manager">
          {/* <h5>
              <FormattedMessage id="show" />:
            </h5> */}
          <a href="#" className="file-control">
            <FormattedMessage
              id="dashboard.projects_dkvlkejb"
              defaultMessage="Documents (Pdf)"
            />
          </a>
          <a href="#" className="file-control">
            <FormattedMessage
              id="dashboard.projects_uudvdsvbb"
              defaultMessage="Images"
            />
          </a>
          <a href="#" className="file-control">
            <FormattedMessage
              id="dashboard.projects_videooiwenv"
              defaultMessage="Videoes"
            />
          </a>
          <div className="hr-line-dashed my-2" />
          <ProjectUploadFileToolbar />
          <div className="hr-line-dashed my-2" />
          <h5 className="my-2">
            <FormattedMessage id="files" defaultMessage="Files" />
          </h5>
          <ul className="file-list p-0">
            {projectData?.files.map((item) => (
              <li key={item.id}>
                <a href="#" onClick={(e) => handleOpenProjectWorkFile(e, item)}>
                  <Icon path={mdiFile} size={1} /> {item.name}
                </a>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteFile(item)}
                >
                  <Icon path={mdiTrashCan} size={1} />
                </button>
              </li>
            ))}
          </ul>
          <div className="clearfix" />
        </div>
      </div>
      <div className="col-md-9 animated fadeInRight">
        <div className="row mb-4">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <NavLink
                to={`/dashboard/projects/${item_id}/edit`}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                File
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={`/dashboard/projects/${item_id}/instructions`}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Instructions
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={`/dashboard/projects/${item_id}/broadcast`}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Broadcast
              </NavLink>
            </li>
          </ul>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProjectLayout;
