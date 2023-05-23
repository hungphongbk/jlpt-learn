"use client";

import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/navigation";
import SingleWordFormModalContent from "@/src/components/admin/words/SingleWordFormModalContent";
import useGetOneWord from "@/src/components/admin/useGetOneWord";
import { removeTypename } from "@/src/graphql-client/utils";

export default function WordModal({ params }: any) {
  const router = useRouter();

  const { initialWord, mutate } = useGetOneWord(params.id);

  const onClose = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} onClose={onClose} size={"3xl"}>
      <ModalOverlay />
      <ModalContent>
        <SingleWordFormModalContent
          modalTitle={`Chỉnh sửa từ vựng ${initialWord.word}`}
          word={initialWord}
          onSubmit={async (values: any) => {
            delete values.kanji;
            await mutate({ variables: { word: removeTypename(values) } });
          }}
          onCancel={onClose}
        />
      </ModalContent>
    </Modal>
  );
}
