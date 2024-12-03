import { IFile } from "@/core/models/IFile";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Document, Page, pdfjs } from "react-pdf";
import "./index.scss";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type TAllowedTypes = ".mp4" | ".pdf" | ".png" | ".jpg" | ".jpeg";
const ALLOWED_TYPES: TAllowedTypes[] = [
  ".mp4",
  ".pdf",
  ".png",
  ".jpg",
  ".jpeg",
];

function FileViewer({ file }: { file?: IFile }) {
  const [fileType, setFileType] = React.useState<
    ".mp4" | ".pdf" | ".png" | ".jpg" | ".jpeg" | ""
  >("");
  React.useEffect(() => {
    if (file && ALLOWED_TYPES.includes(file.extension as TAllowedTypes)) {
      setFileType(file.extension as TAllowedTypes);
    }
  }, [file]);

  return (
    <div className="file-viewer my-4">
      {fileType === ".mp4" ? (
        <>
          <a href={file.url}>
            <FormattedMessage id="watch" defaultMessage="Watch" />
          </a>
          <video width="100%" controls className="mt-3">
            <source src={file.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </>
      ) : fileType === ".pdf" ? (
        <>
          <a href={file.url}>
            <FormattedMessage id="read" defaultMessage="Read" />
          </a>
          <Document className={"PDFPage PDFPageOne mt-3"} file={file.url}>
            <Page
              pageNumber={1}
              className={"PDFPage PDFPageOne"}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              renderForms={false}
            />
          </Document>
        </>
      ) : [".png", ".jpg", ".jpeg"].includes(fileType) ? (
        <>
          <a href={file.url}>
            <img src={file.url} className="img-fluid" />
          </a>
        </>
      ) : (
        <>
          <a href={file.url} download={true}>
            <FormattedMessage id="open" />
          </a>
          <p className="mt-3">
            <FormattedMessage
              id="unsupported_file_format"
              defaultMessage="Unsupported file format"
            />
          </p>
        </>
      )}
    </div>
  );
}

export default FileViewer;
