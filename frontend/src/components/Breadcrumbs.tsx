import { ReactNode, useMemo } from "react";
import { Params, useMatches } from "react-router-dom";

interface IBreadcrumbsProps {
    children?: ReactNode
}

interface IMatchProps {
    id: string;
    pathname: string;
    params: Params<string>;
    data: unknown;
    handle: IMatchHandleProps;
}

interface IMatchHandleProps {
    crumb: (data: any) => void | unknown
}

export default function Breadcrumbs({children}: IBreadcrumbsProps) {
    const matches = useMatches();

    const crumbs = useMemo(() => {
        const matches_crumbs = matches.filter((match) => {
            const handle = match.handle as IMatchHandleProps
            return Boolean(handle.crumb)
        }) as Array<IMatchProps>
        const crumbs: Array<ReactNode> = matches_crumbs
            .map((match) => {
                const handle = match.handle as IMatchHandleProps
                return handle.crumb(match.data)
            }) as Array<ReactNode>;
        return crumbs
    },[matches])
    
    return (
      <div className="breadcrumbs" aria-label="Breadcrumb">
          <div className={`page-header flex items-center ${ !children ? "hidden" : "" }`} style={{backgroundImage: '',}}>
              <div className="container mx-auto relative">
                  <div className="row flex justify-center">
                      <div className="lg:w-1/2 text-center">
                          { children }
                      </div>
                  </div>
              </div>
          </div>
          <nav>
              <div className="container mx-auto px-4">
                  <ol>
                      { crumbs.map((crumb, index) => (
                          <li key={index}>{ crumb }</li>
                      )) }
                  </ol>
              </div>
          </nav>
      </div>
    );
}