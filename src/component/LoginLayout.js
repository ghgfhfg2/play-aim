import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";

export default function LoginLayout({ children }) {
  const userInfo = useSelector((state) => state.user.currentUser);
  const router = useRouter();
  if (userInfo) {
    router.push("/");
  }
  return (
    <>
      <Flex
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Flex>
    </>
  );
}
