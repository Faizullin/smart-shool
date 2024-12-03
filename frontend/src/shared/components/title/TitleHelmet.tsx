import React from "react";

const useTitle = (title: string) => {
  const documentDefined = typeof document !== "undefined";
  const originalTitle = React.useRef(documentDefined ? document.title : null);

  React.useEffect(() => {
    if (!documentDefined) return;

    if (document.title !== title) document.title = title;

    return () => {
      document.title = originalTitle.current;
    };
  }, [title]);
};

const TitleHelment: React.FC<{
  title: string;
}> = ({ title }) => {
  useTitle(title);
  return <></>;
};

export default TitleHelment;
