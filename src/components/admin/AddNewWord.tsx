"use client";

import {
  Button,
  chakra,
  Flex,
  FlexProps,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Popover,
  PopoverContent,
  PopoverContentProps,
} from "@chakra-ui/react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import SingleWordFormModalContent from "@/src/components/admin/SingleWordFormModalContent";
import { useField } from "formik";
import { debounce, flatten } from "lodash";
import { graphql } from "@/src/graphql-client/gql";

const SUGGEST_FROM_JDICT = graphql(`
  query AdminSearchFromJDict($word: String!) {
    jdictSearchWord(word: $word) {
      data {
        id
        word
        kana
        suggest_mean
      }
    }
  }
`);

const SuggestFromJisho = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [fetch, { data }] = useLazyQuery(SUGGEST_FROM_JDICT);
  const [_1, _2, { setValue: setWord }] = useField("word");
  const [_3, _4, { setValue: setPronounce }] = useField("pronounce");
  const [_5, _6, { setValue: setExplain }] = useField("explain");

  const rendered = useMemo(() => {
    return flatten(data?.jdictSearchWord?.data ?? []);
  }, [data]);

  const deboucedFetch = useRef(
    debounce((word) => fetch({ variables: { word } }), 300)
  );

  useEffect(() => {
    if (search.length > 0 && open) deboucedFetch.current(search);
  }, [search, fetch, open]);

  const onClick = useCallback(
    ({ word, kana, suggest_mean }: any) => {
      setWord(word);
      setPronounce(kana);
      setExplain(suggest_mean.split(";").filter(Boolean).join("; "));
      setOpen(false);
      setSearch(word);
    },
    [setExplain, setPronounce, setWord]
  );

  return (
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
            setOpen(true);
            setSearch(e.target.value);
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
              {word}&nbsp;&nbsp;&nbsp;
              <span className="text-slate-400">{kana}</span>
              &nbsp;&#183;&nbsp;
              <span className="text-slate-600">{suggest_mean}</span>
            </Flex>
          ))}
        </PopoverContent>
      </chakra.div>
    </Popover>
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

  const onClick = () => setShow(true),
    onClose = () => setShow(false);

  const [mutate] = useMutation(ADD_NEW_WORD, {
    refetchQueries: ["AdminGetAllWord"],
  });

  return (
    <>
      <Button colorScheme={"blue"} onClick={onClick}>
        Thêm từ vựng
      </Button>
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
            word={{ word: "", pronounce: "", explain: "", tags: [] }}
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
