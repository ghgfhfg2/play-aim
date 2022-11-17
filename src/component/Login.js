import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "@redux/actions/user_action";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { app, db } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { CommonPopup } from "@component/CommonStyled";

function Login({ closePop }) {
  const toast = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = getAuth();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  function onSubmit(values) {
    return new Promise((resolve) => {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          window.sessionStorage.setItem("isLogin", true);
          // ...
          toast({
            description: `로그인 되었습니다.`,
            status: "success",
            duration: 1000,
            isClosable: false,
          });
          closePop();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/user-not-found") {
            toast({
              description: `없는 이메일주소 입니다.`,
              status: "error",
              duration: 1000,
              isClosable: false,
            });
          }
          if (errorCode === "auth/wrong-password") {
            toast({
              description: `잘못된 비밀번호 입니다.`,
              status: "error",
              duration: 1000,
              isClosable: false,
            });
          }
          if (errorCode === "auth/too-many-requests") {
            toast({
              description: `반복된 요청으로 인한 오류입니다.\n잠시 후 시도해 주세요.`,
              status: "error",
              duration: 1000,
              isClosable: false,
            });
          }
          resolve();
        });
    });
  }
  return (
    <>
      <CommonPopup>
        <div className="con_box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex justifyContent="center">
              <Flex
                width="100%"
                flexDirection="column"
                alignItems="center"
                gap={2}
              >
                <FormControl isInvalid={errors.email}>
                  <Input
                    id="email"
                    placeholder="이메일"
                    {...register("email", {
                      required: "이메일은 필수항목 입니다.",
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email &&
                      errors.email.type === "required" &&
                      errors.email.message}
                    {errors.email && errors.email.type === "pattern" && (
                      <>이메일 형식이 맞지 않습니다.</>
                    )}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password}>
                  <Input
                    id="password"
                    type="password"
                    placeholder="비밀번호"
                    {...register("password", {
                      required: true,
                      minLength: 4,
                      maxLength: 16,
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.type === "required" && (
                      <>비밀번호를 입력해 주세요</>
                    )}
                  </FormErrorMessage>
                </FormControl>

                <Flex
                  mt={4}
                  width="100%"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Button
                    mb={2}
                    width="100%"
                    colorScheme="blue"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    로그인
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </form>
        </div>
        <div className="bg" onClick={closePop}></div>
      </CommonPopup>
    </>
  );
}

export default Login;
