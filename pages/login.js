import Login from "@component/Login";
import LoginLayout from "@component/LoginLayout";

export default function login() {
  return (
    <>
      <Login />
    </>
  );
}
login.getLayout = function getLayout(page) {
  return <LoginLayout>{page}</LoginLayout>;
};
