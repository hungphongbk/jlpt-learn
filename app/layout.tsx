"use client";
import "@/styles/globals.css";
import { AuthContextProvider } from "@/src/context/AuthContext";
import { PropsWithChildren } from "react";
import { Noto_Sans_Display, Noto_Serif_JP } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ApolloProvider } from "@apollo/client";
import client from "@/src/graphql-client";

const notoSansJp = Noto_Serif_JP({
  weight: ["400"],
  subsets: ["latin"],
});
const notoSans = Noto_Sans_Display({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin", "latin-ext", "vietnamese"],
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head>
        <style jsx global>{`
          :root {
            --jp-font: ${notoSansJp.style.fontFamily};
          }

          .chakra-card {
            box-shadow: none;
            border-width: 2px;
            border-bottom-width: 3px;
            border-color: var(--chakra-colors-gray-200);
            border-radius: 6px;
          }
        `}</style>
      </head>
      <body>
        <ApolloProvider client={client}>
          <CacheProvider>
            <ChakraProvider>
              <AuthContextProvider>
                <main className={`${notoSans.className}`}>{children}</main>
              </AuthContextProvider>
            </ChakraProvider>
          </CacheProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
