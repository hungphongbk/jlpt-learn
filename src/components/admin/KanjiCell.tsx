import React, { ReactNode, useEffect, useRef, useState } from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import {
  Button,
  FocusLock,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import TextField from "@/src/components/common/TextField";
import { Field, Formik } from "formik";

const GET_ONE_KANJI = gql`
  query AdminGetOneKanji($id: String!) {
    kanji(id: $id) {
      id
      hv
    }
  }
`;

const UPSERT_ONE_KANJI = gql`
  mutation AdminUpsertOneKanji($id: String!, $kanji: KanjiUpsertInput!) {
    upsertKanji(id: $id, kanji: $kanji) {
      id
      hv
    }
  }
`;

const UpsertKanji = ({
  kanji,
  mutate,
  loading,
  children,
}: {
  kanji: string;
  mutate: any;
  loading: any;
  children: (onToggle: () => void) => ReactNode;
}) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const ref = useRef<any>();

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={ref}
      closeOnBlur={false}
    >
      <PopoverTrigger>{children(onToggle)}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <Formik
          initialValues={{ hv: "" }}
          onSubmit={async (values) => {
            await mutate({
              variables: {
                id: kanji,
                kanji: values,
              },
            });
            onClose();
          }}
        >
          {(formikProps) => (
            <>
              <PopoverBody>
                <div className="flex gap-4">
                  <div
                    className={
                      "w-20 aspect-square border border-sky-500 flex items-center justify-center"
                    }
                  >
                    <div className={"text-4xl font-jp"}>{kanji}</div>
                  </div>
                  <FocusLock persistentFocus={false}>
                    <Field
                      ref={ref}
                      as={TextField}
                      name={"hv"}
                      className={"flex-1"}
                      label="Hán Việt"
                      id="first-name"
                    />
                  </FocusLock>
                </div>

                <Button onClick={formikProps.submitForm} mt={4}>
                  Cập nhật
                </Button>
              </PopoverBody>
            </>
          )}
        </Formik>
      </PopoverContent>
    </Popover>
  );
};

const KanjiCell = ({ value }: { value: any }) => {
  const toast = useToast();
  const [mutate, { loading }] = useMutation(UPSERT_ONE_KANJI, {
    refetchQueries: ["AdminGetOneKanji", "AdminSearchFromJDict"],
  });

  const [computed, setComputed] = useState(() => {
    if (typeof value === "string") return { id: value, hv: null };
    return value;
  });

  const [getKanji, { called, data }] = useLazyQuery(GET_ONE_KANJI, {
    variables: { id: typeof value === "string" ? value : value.id },
  });

  useEffect(() => {
    if (
      (!computed.hv && !called) ||
      (typeof value === "string" && computed.id !== value)
    ) {
      // noinspection JSIgnoredPromiseFromCall
      getKanji();
    }
  }, [called, computed.hv, computed.id, getKanji, value]);
  useEffect(() => {
    if (data?.kanji) {
      setComputed(data.kanji);
    }
  }, [data]);
  useEffect(() => {
    if (typeof value === "object" && value.isExist === false) {
      mutate({
        variables: {
          id: value.id,
          kanji: { hv: value.hv },
        },
      }).then(() => {
        toast({
          description: `${
            value.id
          } (${value.hv.toUpperCase()}) đã được thêm vào CSDL`,
          status: "success",
          duration: 2000,
        });
      });
    }
  }, [mutate, toast, value]);

  return (
    <div className={"flex flex-col items-center gap-2"}>
      <div
        className={
          "w-20 aspect-square border border-sky-500 flex items-center justify-center"
        }
      >
        <div className={"text-4xl font-jp"}>{computed.id}</div>
      </div>
      <UpsertKanji kanji={computed.id} mutate={mutate} loading={loading}>
        {(onToggle) =>
          computed.hv ? (
            <span
              className="text-sky-700 uppercase font-semibold cursor-pointer"
              aria-label=""
              onClick={onToggle}
            >
              {computed.hv}
            </span>
          ) : (
            <IconButton
              aria-label={""}
              colorScheme="teal"
              size="xs"
              icon={<AddIcon />}
              className={"rounded-full"}
              onClick={onToggle}
            />
          )
        }
      </UpsertKanji>
    </div>
  );
};

export default KanjiCell;
