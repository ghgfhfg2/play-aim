import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "@redux/actions/user_action";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import LoginLayout from "@component/LoginLayout";
import { db } from "src/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set, onValue } from "firebase/database";
import { CommonPopup } from "./CommonStyled";
function Join({ closePop }) {
  const dispatch = useDispatch();
  const auth = getAuth();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    onValue(ref(db, `user`), (data) => {
      console.log(data.val());
    });

    return () => {};
  }, []);

  const onSubmit = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        set(ref(db, `user/${user.uid}`), {
          nick: values.nick,
          email: values.email,
        });
        dispatch(setUser(user));
        toast({
          description: "가입 되었습니다 :)",
          status: "success",
          duration: 1000,
          isClosable: false,
        });
        closePop();
        // ...
      })
      .then((res) => router.push("/"))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
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
                <FormControl isInvalid={errors.nick}>
                  <Input
                    id="nick"
                    placeholder="닉네임"
                    {...register("nick", {
                      required: "닉네임은 필수항목 입니다.",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.nick && errors.nick.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password}>
                  <Input
                    id="password"
                    type="password"
                    placeholder="비밀번호"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 16,
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.type === "required" && (
                      <>비밀번호를 입력해 주세요</>
                    )}
                    {errors.password &&
                      errors.password.type === "minLength" && (
                        <>비밀번호는 최소 6글자 이상 이어야 합니다.</>
                      )}
                    {errors.password &&
                      errors.password.type === "maxLength" && (
                        <>비밀번호는 최대 16글자 이하 이어야 합니다.</>
                      )}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password2}>
                  <Input
                    id="password2"
                    type="password"
                    placeholder="비밀번호확인"
                    {...register("password2", {
                      required: true,
                      validate: (value) => value === password.value,
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password2 &&
                      errors.password2.type === "required" && (
                        <>비밀번호 확인을 입력해 주세요</>
                      )}
                    {errors.password2 &&
                      errors.password2.type === "validate" && (
                        <>비밀번호가 일치하지 않습니다.</>
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
                    회원가입
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

export default Join;

Join.getLayout = function getLayout(page) {
  return <LoginLayout>{page}</LoginLayout>;
};
