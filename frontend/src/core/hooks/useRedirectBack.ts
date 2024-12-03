import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function useRedirectBack() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {}, [searchParams]);
  const redirect = (url?: string) => {
    let new_location = url !== undefined ? url : searchParams.get("redirect");
    if (new_location === null) {
      new_location = "/dashboard";
    } else {
      searchParams.delete("redirect");
      setSearchParams(searchParams);
    }
    navigate(new_location);
  };
  return {
    searchParams,
    redirect,
  };
}
