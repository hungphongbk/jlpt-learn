import { graphql } from "@/src/graphql-client";
import { AdminSearchFromJDictQuery } from "@/src/graphql-client/graphql";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { useField } from "formik";
import useArrayField from "@/src/components/common/useArrayField";
import { flatten } from "lodash";
import {
  chakra,
  Flex,
  FlexProps,
  Input,
  Popover,
  PopoverContent,
  PopoverContentProps,
  Tag,
} from "@chakra-ui/react";
import clsx from "clsx";

const SUGGEST_FROM_JDICT = graphql(`
  query AdminSearchFromJDict($word: String!) {
    jdictSearchWord(word: $word) {
      data {
        id
        word
        kana
        suggest_mean
        isExist {
          id
          word
          pronounce
          explain
          tags {
            id
          }
        }
        kanjis {
          id
          kanji
          hanviet
          isExist {
            id
            hv
          }
        }
        level
      }
    }
  }
`);

type JDictData = AdminSearchFromJDictQuery["jdictSearchWord"]["data"][number];

const SuggestFromJdict = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [fetch, { data }] = useLazyQuery(SUGGEST_FROM_JDICT);
  const [, , { setValue: setWord }] = useField("word");
  const [, , { setValue: setPronounce }] = useField("pronounce");
  const [, , { setValue: setExplain }] = useField("explain");
  const [, , { setValue: setId }] = useField("id");
  const [{ value: existTags }, , { setArrayValue: setTags }] =
    useArrayField("tags");
  const [, , { setValue: setKanji }] = useField("kanji");

  const rendered = useMemo(() => {
    return flatten(data?.jdictSearchWord?.data ?? []);
  }, [data]);

  const doSearch = () => {
    setOpen(true);
    fetch({ variables: { word: search } });
  };

  const [selected, setSelected] = useState<JDictData | null>(null);

  useEffect(() => {
    if (selected) {
      const { word, kana, suggest_mean, kanjis, isExist } = selected;
      if (!isExist) {
        setWord(word ?? kana);
        setPronounce(kana);
        setExplain(
          suggest_mean
            .split(";")
            .filter(Boolean)
            .map((s) => s.trim())
            .join("; ")
        );
        setKanji(
          kanjis.map((k: any) => ({
            id: k.isExist?.id ?? k.kanji,
            hv: k.isExist?.hv ?? k.hanviet,
            isExist: Boolean(k.isExist),
          }))
        );
      } else {
        const exist = isExist;
        setWord(word);
        setPronounce(exist.pronounce);
        setExplain(exist.explain);
        setId(exist.id);
        setTags({
          add: exist.tags?.map((t: any) => t.id!) ?? [],
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const onClick = useCallback(async (jdictData: JDictData) => {
    setSelected(jdictData);
    setOpen(false);
    setSearch(jdictData.word);
  }, []);

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
          {selected?.level && (
            <div className={"mt-2"}>
              <Tag>
                <strong>JDict&nbsp;</strong>
                {selected.level.name}
              </Tag>
            </div>
          )}
          <PopoverContent {...baseStyles}>
            {rendered.map((item, c_id) => (
              <Flex
                {...baseItemStyles}
                key={c_id}
                textTransform="capitalize"
                onClick={() => onClick(item!)}
                className={clsx(item.isExist && "bg-emerald-100")}
              >
                <span className={"whitespace-nowrap"}>{item.word}</span>
                &nbsp;&nbsp;&nbsp;
                <span className="text-slate-400 whitespace-nowrap">
                  {item.kana}
                </span>
                &nbsp;&#183;&nbsp;
                <span className="text-slate-600">{item.suggest_mean}</span>
              </Flex>
            ))}
          </PopoverContent>
        </chakra.div>
      </Popover>
    </>
  );
};

export default SuggestFromJdict;

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
