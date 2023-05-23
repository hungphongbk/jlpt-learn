"use client";

import {
  IconButton,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import SingleWordFormModalContent from "@/src/components/admin/words/SingleWordFormModalContent";
import { AddIcon } from "@chakra-ui/icons";
import { AdminContext } from "@/app/admin/context";
import SuggestFromJdict from "@/src/components/admin/words/SuggestFromJDict";
import { UPSERT_WORD } from "@/src/components/gql";

export default function AddNewWord() {
  const [show, setShow] = useState(false);
  const { tags } = useContext(AdminContext);
  const onClick = () => setShow(true),
    onClose = () => setShow(false);

  const [mutate] = useMutation(UPSERT_WORD, {
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
                <SuggestFromJdict />
              </div>
            }
            word={{
              id: null,
              word: "",
              pronounce: "",
              explain: [],
              tags,
              kanji: null,
            }}
            onSubmit={async (values: any) => {
              delete values.kanji;
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
