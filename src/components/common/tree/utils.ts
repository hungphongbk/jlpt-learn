import { Component, ReactNode } from "react";
import { atom } from "jotai";

export const extendedNodes = (nodes: TreeNode[]): TreeNode[] =>
  nodes.reduce((acc: TreeNode[], childNode) => {
    acc.push({
      ...childNode,
      leaf: !childNode.descendants,
      checked: false,
      intermediate: false,
    });
    if (childNode.descendants) {
      const ns = childNode.descendants.reduce((a: TreeNode[], n: TreeNode) => {
        acc.push({
          ...n,
          leaf: !n.descendants,
          checked: false,
          intermediate: false,
        });
        if (n.descendants) a.push(...extendedNodes(n.descendants));
        return a;
      }, []);
      acc.push(...ns);
    }
    return acc;
  }, []);

/**
 * Most simple atom structure, maybe primities and atom family
 * so we can compute; allChecked, isIntermediate, leaf,
 */
export const selectionKeysAtom = atom<TreeSelectionKeys>({});
export const expandedKeysAtom = atom<TreeExpandedKeys>({});

export const findDescendantKeys = (node: TreeNode): string[] =>
  (node.descendants ?? []).reduce((acc: string[], childNode: TreeNode) => {
    acc.push(childNode.key);
    if (childNode.descendants) acc.push(...findDescendantKeys(childNode));
    return acc;
  }, []);

export const getExpandedKeys = (nodes: TreeNode[]): TreeExpandedKeys =>
  nodes.reduce((acc: TreeExpandedKeys, node: TreeNode) => {
    if (node.descendants) {
      acc[node.key] = true;
      acc = {
        ...acc,
        ...getExpandedKeys(node.descendants),
      };
    }
    return acc;
  }, {});

export const nodesToSelectionKeys = (nodes: TreeNode[]): TreeSelectionKeys =>
  nodes.reduce((acc: TreeSelectionKeys, node: TreeNode) => {
    acc[node.key] = node;
    return acc;
  }, {});

export interface TreeNode {
  key: string;
  label: string;
  leaf?: boolean;
  checked?: boolean;
  intermediate?: boolean;
  descendants?: TreeNode[];
}

export interface TreeSelectionKeys {
  [key: string]: TreeNode;
}

export interface TreeExpandedKeys {
  [key: string]: boolean;
}

export interface TreeProps {
  value: TreeNode[];
  isReadOnly?: boolean;
  isDisabled?: boolean;
  children?: ReactNode;
}

export interface UITreeNodeProps {
  key: string;
  index: number;
  node: TreeNode;
  parent?: TreeNode;
  root: TreeNode[];
  last: boolean;
  path: string;
  isReadOnly: boolean;
  isDisabled: boolean;
  children?: ReactNode;
}

declare class Tree extends Component<TreeProps, any> {
  public getElement(): HTMLDivElement;
}
