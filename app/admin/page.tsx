"use client";
import React from "react";
import {
  Box,
  CardHeader,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import BatchImport from "@/src/components/admin/BatchImport";
import { useQuery } from "@apollo/client";
import { Card } from "@chakra-ui/card";
import { useRouter } from "next/navigation";
import { GET_ALL_WORD } from "@/src/components/gql";

function Page() {
  const { data } = useQuery(GET_ALL_WORD);
  const router = useRouter();
  return (
    <>
      <div className={"h-screen p-3"}>
        <HStack spacing={2} mb={4}>
          <BatchImport />
        </HStack>
        <SimpleGrid columns={{ base: 2, md: 4, lg: 6, xl: 8 }} spacing={2}>
          {data?.words?.data?.map((word: any) => (
            <Card key={word.id} size={"sm"}>
              <CardHeader
                onClick={() => {
                  router.push(`/admin/word/${word.id}`);
                }}
              >
                <Box>
                  <Heading size="md" className={"font-jp"}>
                    {word.word}
                  </Heading>
                  <Text className={"font-jp text-xs text-slate-600"}>
                    {word.pronounce}
                  </Text>
                </Box>
              </CardHeader>
            </Card>
          ))}
        </SimpleGrid>
      </div>
    </>
  );
}

export default Page;
