"use client";

import { useQuery } from "@apollo/client";
import {
  Box,
  Flex,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { GET_ALL_WORD, QUERY_ALL_TAGS } from "@/src/components/gql";
import React, { useContext, useEffect, useMemo } from "react";
import {
  TreeExpandedKeys,
  TreeNode,
  TreeSelectionKeys,
} from "@/src/components/common/tree/utils";
import { Tree, useTree } from "@/src/components/common/tree";
import AddNewWord from "@/src/components/admin/AddNewWord";
import { AdminContext } from "@/app/admin/context";

export default function TagsPage() {
  const { data } = useQuery(QUERY_ALL_TAGS);

  const toNodes = useMemo<
    Pick<TreeNode, "key" | "label" | "descendants">[]
  >(() => {
    return (
      data?.tags?.map((tag) => ({
        key: tag.id,
        label: tag.label,
        descendants: tag.children?.map((subTag) => ({
          key: subTag.id,
          label: subTag.label,
        })),
      })) ?? []
    );
  }, [data]);

  const {
    selectionKeys,
    setSelectionKeys,
    setExpandedKeys,
    extendedNodes,
    nodesToSelectionKeys,
    getExpandedKeys,
  } = useTree();

  const initSelectionKeys = useMemo<TreeSelectionKeys>(
    () => nodesToSelectionKeys(extendedNodes(toNodes)),
    [nodesToSelectionKeys, extendedNodes, toNodes]
  );

  const initialExpandedKeys = useMemo<TreeExpandedKeys>(
    () => getExpandedKeys(toNodes),
    [getExpandedKeys, toNodes]
  );
  useEffect(() => {
    setExpandedKeys(initialExpandedKeys);
  }, [initialExpandedKeys, setExpandedKeys]);

  const checkeds = useMemo(
    () =>
      Object.keys(selectionKeys).filter((key) => selectionKeys[key]?.checked),
    [selectionKeys]
  );

  const { data: wordsData } = useQuery(GET_ALL_WORD, {
    variables: {
      where: {
        tags: {
          arrayContainsAny: checkeds,
        },
      },
    },
    skip: checkeds.length === 0,
  });

  const { setTags } = useContext(AdminContext);
  useEffect(() => {
    return () => {
      setTags([]);
    };
  }, [setTags]);
  useEffect(() => {
    setTags(checkeds);
  }, [setTags, checkeds]);

  // const onSave = (): void => {
  //   console.log(
  //     "onSave",
  //     selectionKeys,
  //     Object.keys(selectionKeys).filter((key) => selectionKeys[key]?.checked)
  //   );
  // };

  return (
    <Flex className={"p-3"}>
      <Box w={"200px"} pr={2}>
        <Tree value={toNodes} />
      </Box>
      <Stack mb={2} spacing={5} direction={"column"} flex={1}>
        <AddNewWord />
        <TableContainer>
          <Table variant="simple" size={"sm"}>
            <Thead>
              <Tr>
                <Th>Từ vựng</Th>
                <Th>Kana</Th>
                <Th>Nghĩa</Th>
              </Tr>
            </Thead>
            <Tbody>
              {wordsData?.words?.map((word) => (
                <Tr key={word.id}>
                  <Td>{word.word}</Td>
                  <Td>{word.pronounce}</Td>
                  <Td>{word.explain.map((e) => e.explain).join("; ")}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
    </Flex>
  );
}
