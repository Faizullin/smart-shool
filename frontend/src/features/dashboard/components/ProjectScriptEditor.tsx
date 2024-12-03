import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/core/hooks/redux";
import { IProjectWork } from "@/core/models/IProjectWork";
import { IFile } from "@/core/models/IFile";
import SecondaryButton from "@/shared/components/buttons/secondary-button/SecondaryButton";
import { FormattedMessage } from "react-intl";
import Loader from "@/shared/components/loader/Loader";
import { Editor } from "@monaco-editor/react";
import {
  fetchProjectScriptDetail,
  fetchProjectScriptUpdate,
  setCode,
  setCurrentFilePayload,
} from "@/core/redux/store/reducers/projectScriptSlice";
import {
  fetchProjectFileDelete,
  fetchProjectWorkDetail,
} from "@/core/redux/store/reducers/projectSlice";

interface IProjectScriptEditorProps {
  projectFile: IFile;
}

const ProjectScriptEditor: FC<IProjectScriptEditorProps> = ({
  projectFile,
}) => {
  const dispatch = useAppDispatch();
  const { file_loading, projectData } = useAppSelector((state) => state.project);
  const { code: external_code, loading: script_loading } = useAppSelector(
    (state) => state.projectScript
  );
  const [currentCode, setCurrentCode] = React.useState<string>("");
  const handleEditorChange = (data: string) => {
    setCurrentCode(data);
  };
  const saveCode = async (codeToSave: string) => {
    if (projectFile) {
      await dispatch(
        fetchProjectScriptUpdate({
          project_id: projectData.id,
          file_id: projectFile.id,
          values: codeToSave,
        })
      );
      await dispatch(
        fetchProjectScriptDetail({
          project_id: projectData.id,
          file_id: projectFile.id,
        })
      );
    }
  };
  const handleSubmit = () => {
    saveCode(currentCode);
  };
  const handleDeleteProjectFile = async () => {
    await dispatch(
      fetchProjectFileDelete({
        project_id: projectData.id,
        file_id: projectFile.id,
      })
    );
    dispatch(setCurrentFilePayload(null));
    await dispatch(fetchProjectWorkDetail(projectData.id));
  };


  // useEffect(() => {
  //   if (projectFile && projectFile?.extension === ".cpp") {
  //     ProjectWorkFileService.fetchProjectWorkCode(
  //       projectWork.id,
  //       projectFile.id
  //     ).then((response) => {
  //       const file = response.data;
  //       if (file.code !== undefined) {
  //         setCode(file.code);
  //       }
  //     });
  //   }
  // }, [projectFile]);
  useEffect(() => {
    if (external_code != null) {
      setCurrentCode(external_code);
      dispatch(setCode(null));
    }
  }, [external_code]);

  useEffect(() => {
    const fn = async () => {
      if (projectData && projectFile && projectFile.extension === ".cpp") {
        await dispatch(
          fetchProjectScriptDetail({
            project_id: projectData.id,
            file_id: projectFile.id,
          })
        );
      }
    };
    fn();
  }, [projectFile]);

  return (
    <div className="h-100">
      {projectFile && (
        <div className="d-flex">
          <SecondaryButton
            onClick={handleSubmit}
            disabled={file_loading.post || script_loading.post}
          >
            <FormattedMessage id="save" defaultMessage="Save" />
          </SecondaryButton>
          <SecondaryButton
            onClick={handleDeleteProjectFile}
            disabled={file_loading.post || script_loading.post}
            className="btn-danger bg-danger"
          >
            <FormattedMessage id="delete" />
          </SecondaryButton>
        </div>
      )}
      {script_loading.detail || script_loading.post ? (
        <Loader active={true} />
      ) : projectFile ? (
        <Editor
          height="60vh"
          defaultLanguage="cpp"
          value={currentCode}
          onChange={handleEditorChange}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ProjectScriptEditor;
