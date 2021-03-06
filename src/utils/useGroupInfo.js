import React from "react";
import { useLocation } from "react-router-dom";

// A custom hook that builds on useLocation to parse
// the query string.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default () => {
  const query = useQuery();
  const groupId = query.get("group");

  return {
    valid: Boolean(groupId),
    group: groupId,
  };
};