import { createContext } from "react";

export const TagTreeContext = createContext<{
  addChildForTag?: string;
  setAddChildForTag?: (tagId: string | undefined) => void;
}>({});
