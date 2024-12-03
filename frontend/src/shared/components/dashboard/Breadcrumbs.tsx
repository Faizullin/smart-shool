import React from "react";
import { ReactNode, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { Link, Params, To, useMatches } from "react-router-dom";

interface IBreadcrumbsProps {
  children?: ReactNode;
}

interface IMatchProps {
  id: string;
  pathname: string;
  params: Params<string>;
  data: unknown;
  handle: IMatchHandleProps;
}

interface ICrumbItem {
    label: string;
    to: To;
    active?: boolean;
  }

interface IMatchHandleProps {
  crumb?: Array<ICrumbItem>;
}

export default function Breadcrumbs({ children }: IBreadcrumbsProps) {
  const matches = useMatches();

  const crumbs = useMemo(() => {
    const matches_crumbs = matches.filter((match) => {
      const handle = match?.handle as IMatchHandleProps;
      return Boolean(handle?.crumb);
    }) as Array<IMatchProps>;
    const crumbs: Array<any> = matches_crumbs.map((match) => {
      const handle = match.handle as IMatchHandleProps;
      return handle.crumb;
    }) as Array<any>;
    return crumbs.length > 0 ? crumbs[0] : [];
  }, [matches]);

  return (
    <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
      <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item">
          <Link to={"/dashboard"}>
            <FormattedMessage id="main" />
          </Link>
        </li>
        {crumbs.map((crumb: ICrumbItem, index: number) => (
          <li key={index} className={`breadcrumb-item ${crumb.active ? "active" : ""}`}>
            {crumb.to ? (
              <Link to={crumb.to}>
                {crumb.label}
              </Link>
            ) : crumb.label}
          </li>
        ))}

        {/* <li className="breadcrumb-item">
          <a href="#">User</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          User Profile
        </li> */}
      </ol>
    </nav>
  );
}
