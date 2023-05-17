"use client";
import React, { PropsWithChildren, ReactNode, useState } from "react";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { Box, Flex, FlexProps, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { Link, LinkProps } from "@chakra-ui/next-js";
import AddNewWord from "@/src/components/admin/AddNewWord";
import { AdminContext } from "@/app/admin/context";

interface NavItemProps extends FlexProps {
  href: LinkProps["href"];
  icon?: IconType;
  children: ReactNode;
}

const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  return (
    <Link
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "gray.100",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default function HomeLayout({
  children,
  modal,
}: PropsWithChildren<any>) {
  const { user } = useAuthContext();
  const router = useRouter();
  const [tags, setTags] = useState<String[]>([]);

  React.useEffect(() => {
    if (user == null) router.push("/");
  }, [router, user]);

  return (
    <AdminContext.Provider value={{ tags, setTags }}>
      <Box
        w="200px"
        h={"full"}
        pos={"fixed"}
        pt={2}
        borderRight={"1px solid #ccc"}
      >
        <NavItem href={"/admin"}>Trang chủ</NavItem>
        <NavItem href={"/admin/tags"}>Tags</NavItem>
      </Box>
      <Box flex={1} ml={"210px"}>
        {children}
      </Box>
      <AddNewWord />
      {modal}
    </AdminContext.Provider>
  );
}
