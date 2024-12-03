import React, { FC } from "react";
import ProjectLayout from "../../components/ProjectLayout";
import ProjectScriptEditor from "../../components/ProjectScriptEditor";
import { useAppSelector } from "@/core/hooks/redux";
import FileViewer from "@/shared/components/article/FileViewer";

interface IDashboardProjectEditProps {}

const DashboardProjectEdit: FC<IDashboardProjectEditProps> = () => {
  const { projectData, project_loading } = useAppSelector(
    (state) => state.project
  );
  const { current_file_payload } = useAppSelector(
    (state) => state.projectScript
  );

  return (
    <ProjectLayout>
      {!project_loading.detail &&
        current_file_payload &&
        (current_file_payload.extension === ".cpp" ? (
          <ProjectScriptEditor projectFile={current_file_payload} />
        ) : current_file_payload.extension === ".docx" ? (
          <>Unsupported</>
        ) : (
          // <DocxFileCheckerComponent
          //   projectWork={projectData}
          //   projectWorkFile={current_file_payload}
          // />
          <FileViewer file={current_file_payload} />
        ))}
      {/* <ProjectScriptEditor projectWork={projectData} projectFile={undefined} /> */}
    </ProjectLayout>
  );
};

export default DashboardProjectEdit;
