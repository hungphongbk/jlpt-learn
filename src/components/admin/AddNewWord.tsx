"use client";

import {
  chakra,
  Flex,
  FlexProps,
  IconButton,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Popover,
  PopoverContent,
  PopoverContentProps,
} from "@chakra-ui/react";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import SingleWordFormModalContent from "@/src/components/admin/SingleWordFormModalContent";
import { useField } from "formik";
import { flatten } from "lodash";
import { graphql } from "@/src/graphql-client/gql";
import { AddIcon } from "@chakra-ui/icons";
import { AdminContext } from "@/app/admin/context";
import { SEARCH_WORD } from "@/src/components/gql";
import { uniq } from "ramda";

const SUGGEST_FROM_JDICT = graphql(`
  query AdminSearchFromJDict($word: String!) {
    jdictSearchWord(word: $word) {
      data {
        id
        word
        kana
        suggest_mean
        kanjis {
          id
          kanji
          hanviet
        }
      }
    }
  }
`);

const SuggestFromJisho = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [fetch, { data }] = useLazyQuery(SUGGEST_FROM_JDICT);
  const [searchExist] = useLazyQuery(SEARCH_WORD);
  const [_1, _2, { setValue: setWord }] = useField("word");
  const [_3, _4, { setValue: setPronounce }] = useField("pronounce");
  const [_5, _6, { setValue: setExplain }] = useField("explain");
  const [_7, _8, { setValue: setId }] = useField("id");
  const [{ value: existTags }, _0, { setValue: setTags }] = useField("tags");

  const rendered = useMemo(() => {
    return flatten(data?.jdictSearchWord?.data ?? []);
  }, [data]);

  const doSearch = () => {
    setOpen(true);
    fetch({ variables: { word: search } });
  };

  const onClick = useCallback(
    async ({ word, kana, suggest_mean }: any) => {
      const { data: existWord } = await searchExist({
        variables: { word: word },
      });
      if ((existWord?.words?.length ?? 0) === 0) {
        setWord(word);
        setPronounce(kana);
        setExplain(suggest_mean.split(";").filter(Boolean).join("; "));
      } else {
        const exist = existWord!.words![0];
        setWord(word);
        setPronounce(exist.pronounce);
        setExplain(exist.explain);
        setId(exist.id);
        setTags(uniq([...existTags, ...(exist.tags?.map((t) => t.id!) ?? [])]));
      }
      setOpen(false);
      setSearch(word);
    },
    [existTags, searchExist, setExplain, setId, setPronounce, setTags, setWord]
  );

  return (
    <>
      <Popover
        isLazy
        isOpen={open && search.length > 0}
        autoFocus={false}
        placement="bottom"
        closeOnBlur={true}
      >
        <chakra.div
          sx={{
            ".chakra-popover__popper": {
              position: "unset !important",
            },
          }}
          w="full"
        >
          <Input
            placeholder={"何の漢字"}
            variant="filled"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                doSearch();
              }
            }}
          />
          <PopoverContent {...baseStyles}>
            {rendered.map(({ word, kana, suggest_mean }, c_id) => (
              <Flex
                {...baseItemStyles}
                key={c_id}
                textTransform="capitalize"
                onClick={() => onClick({ word, kana, suggest_mean })}
              >
                <span className={"whitespace-nowrap"}>{word}</span>
                &nbsp;&nbsp;&nbsp;
                <span className="text-slate-400 whitespace-nowrap">{kana}</span>
                &nbsp;&#183;&nbsp;
                <span className="text-slate-600">{suggest_mean}</span>
              </Flex>
            ))}
          </PopoverContent>
        </chakra.div>
      </Popover>
    </>
  );
};

const ADD_NEW_WORD = gql`
  mutation AddNewWord($word: WordInsertInput!) {
    addNewWord(word: $word) {
      id
    }
  }
`;

export default function AddNewWord() {
  const [show, setShow] = useState(false);
  const { tags } = useContext(AdminContext);
  const onClick = () => setShow(true),
    onClose = () => setShow(false);

  const [mutate] = useMutation(ADD_NEW_WORD, {
    refetchQueries: ["AdminGetAllWord"],
  });

  return (
    <>
      <IconButton
        colorScheme={"blue"}
        onClick={onClick}
        aria-label="Call Segun"
        size="lg"
        icon={<AddIcon />}
        className={"fixed bottom-4 right-4 rounded-full"}
      />
      <Modal isOpen={show} onClose={onClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent>
          <SingleWordFormModalContent
            modalTitle={
              <div className={"flex gap-4 items-center"}>
                <h3 className={"flex-none"}>Thêm từ vựng</h3>
                <SuggestFromJisho />
              </div>
            }
            word={{ id: null, word: "", pronounce: "", explain: "", tags }}
            onSubmit={async (values: any) => {
              await mutate({ variables: { word: values } });
            }}
            afterSubmit={onClose}
            onCancel={onClose}
          />
        </ModalContent>
      </Modal>
    </>
  );
}

const baseStyles: PopoverContentProps = {
  mt: "4",
  py: "4",
  opacity: "0",
  bg: "#232934",
  rounded: "md",
  maxH: "350px",
  border: "none",
  shadow: "base",
  pos: "absolute",
  zIndex: "popover",
  overflowY: "auto",
  width: "var(--chakra-sizes-lg)",
  _light: {
    bg: "#ffffff",
  },

  _focus: {
    boxShadow: "none",
  },
};
const baseItemStyles: FlexProps = {
  mx: "2",
  px: "2",
  py: "1",
  rounded: "md",
  cursor: "pointer",
  fontSize: "var(--chakra-fontSizes-sm)",
  fontWeight: "var(--chakra-fontWeights-medium)",
};
