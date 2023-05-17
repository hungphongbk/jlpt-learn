import { createContext } from "react";

export const AdminContext = createContext<{
  tags: String[];
  setTags: (tags: String[]) => void;
}>({
  tags: [],
  setTags: () => {},
});
