import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function useErrorNotFound(options?: {
  type: "modal" | "redirect";
}) {
  options = {
    type: "redirect",
    ...options,
  };
  const navigate = useNavigate();
  const handleError = () => {
    if (options.type === "redirect") {
      navigate("/404");
    } else if (options.type === "modal") {
      throw new Error("No function for modal not found error");
    }
  };
  return handleError;
}
