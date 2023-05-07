"use client";
// @ts-ignore
import GET_ONE_WORD from "@/app/admin/AdminGetOneWord.graphql";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import React, { useMemo } from "react";
import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import SingleWordFormModalContent from "@/src/components/admin/SingleWordFormModalContent";
import { CardHeader, Heading } from "@chakra-ui/react";

export default function WordPage({ params }: any) {
  const router = useRouter();

  const { data } = useQuery(GET_ONE_WORD, { variables: { id: params.id } });

  const initialWord = useMemo(() => {
    if (!data?.word) {
      return { word: "" };
    }

    return data.word;
  }, [data]);

  return (
    <Card mt={4}>
      <SingleWordFormModalContent
        modalTitle={
          <Heading size={"md"}>Chỉnh sửa từ vựng {initialWord.word}</Heading>
        }
        word={initialWord}
        onSubmit={() => {}}
        onCancel={() => {}}
        Header={CardHeader}
        Body={CardBody}
        Footer={CardFooter}
      />
    </Card>
  );
}
