import { useAppDispatch, useAppSelector } from "@/core/hooks/redux";
import { setCurrentFilePayload } from "@/core/redux/store/reducers/projectScriptSlice";
import {
  fetchProjectFileUpload,
  fetchProjectWorkDetail,
  setFileLoading,
} from "@/core/redux/store/reducers/projectSlice";
import ProjectWorkFileService from "@/core/services/ProjectWorkFileService";
import DarkButton from "@/shared/components/buttons/dark-button/DarkButton";
import PrimaryButton from "@/shared/components/buttons/primary-button/PrimaryButton";
import SecondaryButton from "@/shared/components/buttons/secondary-button/SecondaryButton";
import React, { FC, useRef } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { DefaultArduinoCode } from "./code-templates/DefaultArduinoCode";

interface IProjectUploadFileToolbarProps {}

const ProjectUploadFileToolbar: FC<IProjectUploadFileToolbarProps> = () => {
  const dispatch = useAppDispatch();
  const { projectData } = useAppSelector((state) => state.project);
  const navigate = useNavigate();
  const { file_loading } = useAppSelector((state) => state.project);
  const fileInputRef = useRef(null);
  const handleFileUploadButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileUploadChange = async (event: any) => {
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append("file", selectedFile);
    const response = await dispatch(
      fetchProjectFileUpload({
        values: formData,
        id: projectData.id,
      })
    );
    dispatch(setCurrentFilePayload(response.payload));
    await dispatch(fetchProjectWorkDetail(projectData.id));
  };
  const handleCreateCodeFile = async () => {
    dispatch(setFileLoading(true));
    try {
      const response = await ProjectWorkFileService.fetchProjectWorkCodeCreate(
        projectData.id,
        {
          code: DefaultArduinoCode,
        }
      );
      await dispatch(fetchProjectWorkDetail(projectData.id));
      dispatch(setCurrentFilePayload(response.data));
      dispatch(setFileLoading(false));
    } catch {
      dispatch(setFileLoading(false));
    }
  };
  const handleJoinConference = () => {
    if (projectData.conference !== undefined) {
      navigate(`/conference/${projectData.conference?.id}`);
    }
  };
  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileUploadChange}
      />
      <div className="d-flex justify-content-around">
        <PrimaryButton
          className="text-capitalize"
          disabled={file_loading.post}
          onClick={handleFileUploadButtonClick}
        >
          <FormattedMessage id="upload" defaultMessage="upload" />
        </PrimaryButton>
        <SecondaryButton
          onClick={handleCreateCodeFile}
          disabled={file_loading.post}
          className="text-capitalize"
        >
          <FormattedMessage
            id="dashboard.projects_createappfile"
            defaultMessage="Create .cpp file"
          />
        </SecondaryButton>
        {projectData?.conference?.status === "ongoing" && (
          <DarkButton
            onClick={handleJoinConference}
            disabled={file_loading.post}
            className="text-capitalize"
          >
            <FormattedMessage id="join" defaultMessage="Join" />
          </DarkButton>
        )}
      </div>
    </>
  );
};

export default ProjectUploadFileToolbar;
