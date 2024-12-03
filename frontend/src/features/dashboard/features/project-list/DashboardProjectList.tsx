import React, { FC } from "react";
import ProjectWorkShareModal from "@/shared/components/modal/ProjectWorkShareModal";
import ProjectWorkItemCard from "../../components/ProjectWorkItemCard";
import PrimaryButton from "@/shared/components/buttons/primary-button/PrimaryButton";
import { FormattedMessage, useIntl } from "react-intl";
import DashboardInfoSidebar from "@/shared/components/sidebar/DashboardInfoSidebar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/core/hooks/redux";
import { IProjectWork } from "@/core/models/IProjectWork";
import ProjectWorkService from "@/core/services/ProjectWorkService";
import { AxiosError } from "axios";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import { openModal } from "@/core/redux/store/reducers/modalSlice";
interface IDashboardProjectListProps {}

const DashboardProjectList: FC<
  IDashboardProjectListProps
> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const [projectWorks, setProjectWorks] = React.useState<IProjectWork[]>([]);
  const [showPracticalShareForm, setShowPracticalShareForm] =
    React.useState<boolean>(false);
  const [editProjectPayload, setEditProjectPayload] =
    React.useState<IProjectWork | null>(null);

  const fetchProjects = () => {
    ProjectWorkService.fetchProjectWorkList().then((response) => {
      setProjectWorks(response.data);
    });
  };

  const handleOpenEditProjectPopupForm = (id?: number) => {
    if (id === undefined) {
      const project_title = prompt(
        intl.formatMessage({
          id: "dashboard.projects.sadva",
          defaultMessage: "The name of new project",
        })
      );
      if (project_title) {
        ProjectWorkService.fetchCreateProjectWork({
          title: project_title,
        })
          .then((response) => {
            window.open(
              `/dashboard/projects/${response.data.id}/edit`,
              "_blank"
            );
            fetchProjects();
          })
          .catch((error: AxiosError | any) => {
            if (error instanceof AxiosError) {
              if (
                error.response.status === 403 &&
                error.response.data?.detail
              ) {
                dispatch(
                  openModal({
                    type: "error",
                    data: {
                      code: 403,
                      message: error.response.data.detail,
                    },
                  })
                );
              }
            }
          });
      }
    } else {
      navigate(`/dashboard/projects/${id}/edit`);
    }
  };
  const handleDeleteProject = (id: number) => {
    ProjectWorkService.fetchDeleteProjectWork(id).then((response) => {
      fetchProjects();
    });
  };
  const handleShareProject = (project_work: IProjectWork) => {
    setShowPracticalShareForm(true);
    setEditProjectPayload(project_work);
  };
  React.useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <div className="row">
      <DashboardInfoSidebar />
      <div className="col-lg-8">
        <div className="card projects-list">
          <div className="tab-content p-4">
            <div
              className="tab-pane active show"
              id="projects-tab"
              role="tabpanel"
            >
              <div className="d-flex align-items-start">
                <div className="flex-1">
                  <h4 className="card-title mb-4">
                    <FormattedMessage id="projects" defaultMessage="Projects" />
                  </h4>
                </div>
                <div className="flex-1 ms-4">
                  <PrimaryButton
                    className="p-0"
                    onClick={() => handleOpenEditProjectPopupForm()}
                  >
                    <Icon path={mdiPlus} color="#ffffff" size={1} />
                  </PrimaryButton>
                </div>
              </div>
              <div className="row" id="all-projects">
                {projectWorks.map((item) => (
                  <ProjectWorkItemCard
                    key={item.id}
                    project_item={item}
                    onEditClick={handleOpenEditProjectPopupForm}
                    onDeleteClick={handleDeleteProject}
                    onShareClick={handleShareProject}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProjectWorkShareModal
        show={showPracticalShareForm}
        setShow={setShowPracticalShareForm}
        project={editProjectPayload}
      />
    </div>
  );
};

export default DashboardProjectList;
