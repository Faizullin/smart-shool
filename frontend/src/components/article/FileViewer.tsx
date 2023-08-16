// Assuming you've already installed 'react-pdf' using npm or yarn
import { Document, Page, pdfjs  } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function FileViewer({ src }: {src: string}) {
  const isVideo = src.endsWith('.mp4');
  const isPDF = src.endsWith('.pdf');

  if (isVideo) {
    return (
      <video width="100%" controls>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  } else if (isPDF) {
    return (
      <Document file={src}>
        <Page pageNumber={1} />
      </Document>
    );
  } else {
    return <div>Unsupported file format</div>;
  }
}

export default FileViewer;