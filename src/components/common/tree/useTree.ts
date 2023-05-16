import { useMemo } from "react";
import { useAtom } from "jotai";
import { uniq } from "ramda";
import {
  expandedKeysAtom,
  extendedNodes,
  findDescendantKeys,
  getExpandedKeys,
  nodesToSelectionKeys,
  selectionKeysAtom,
  TreeNode,
} from "./utils";
import { Dict } from "@chakra-ui/utils";

export const useTree = () => {
  const [selectionKeys, setSelectionKeys] = useAtom(selectionKeysAtom);
  const [expandedKeys, setExpandedKeys] = useAtom(expandedKeysAtom);

  const parents = useMemo<string[]>(
    () =>
      uniq(
        Object.keys(selectionKeys)
          .filter((key) => selectionKeys[key]?.checked)
          .map((key) => key.split(".")[0] ?? "")
      ),
    [selectionKeys]
  );

  const descendants = useMemo<Dict<boolean>>(
    () =>
      parents.reduce((acc: Dict<boolean>, key: string) => {
        const node = selectionKeys[key];
        if (!node) return acc;
        findDescendantKeys(node).forEach((k: string) => {
          acc[k] = selectionKeys[k]?.checked ?? false;
        });
        return acc;
      }, {}),
    [parents, selectionKeys]
  );

  const intermediates = useMemo<Dict<boolean>>((): Dict<boolean> => {
    const desc = parents.reduce(
      (acc: { [key: string]: number }, key: string) => {
        acc[key] = Object.keys(descendants).filter((k: string) =>
          k.startsWith(key)
        ).length;
        return acc;
      },
      {}
    );

    const check = parents.reduce(
      (acc: { [key: string]: number }, key: string) => {
        acc[key] = Object.keys(descendants).filter(
          (k: string) => k.startsWith(key) && !!selectionKeys[k]?.checked
        ).length;
        return acc;
      },
      {}
    );

    return parents.reduce((acc: Dict<boolean>, key: string) => {
      const d = desc[key] ?? 0;
      const c = check[key] ?? 0;
      acc[key] = c !== 0 && d > c && d !== c;
      return acc;
    }, {});
  }, [parents, descendants, selectionKeys]);

  const isNodeLeaf = (node: TreeNode): boolean => {
    return node.leaf === false
      ? false
      : !(node.descendants && node.descendants.length);
  };

  return {
    selectionKeys,
    setSelectionKeys,
    expandedKeys,
    setExpandedKeys,
    extendedNodes,
    nodesToSelectionKeys,
    findDescendantKeys,
    getExpandedKeys,
    intermediates,
    isNodeLeaf,
  };
};
