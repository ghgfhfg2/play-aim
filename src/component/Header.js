import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "@redux/actions/user_action";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import { Image, useToast } from "@chakra-ui/react";
import { BiUser } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";
import Login from "./Login";
import Join from "./Join";

const HeaderTop = styled.div`
  width: 100%;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 0 0 / 15%);
  font-size: 12px;
  padding-right: 1rem;
  height: 60px;
  display: flex;
  position: sticky;
  top: 0;
  z-index: 100;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
  }
  .logo_box {
  }
  .logo {
    cursor: pointer;
    display: flex;
    height: 40px;
    width: auto;
    font-size: 24px;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    img {
      max-height: 30px;
    }
  }
  .menu {
    display: flex;
    align-items: center;
    height: 100%;
  }
  li {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 0.5rem;
    a {
      padding: 0.5rem 1rem;
      font-size: 14px;
      color: var(--m-color);
    }
    &.on {
      color: var(--m-color);
      a {
        font-weight: 600;
        border-radius: 6px;
        background: var(--m-color);
        color: #fff;
      }
    }
  }
  .right {
    display: flex;
    margin-right: 1rem;
    align-items: center;
    height: 100%;
    li a {
      padding: 0.5rem;
    }
  }

  @media screen and (max-width: 768px) {
    .menu {
      display: none;
    }
  }
`;

function Header({ logoImg }) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.currentUser);
  const auth = getAuth();
  const router = useRouter();
  const toast = useToast();
  const onLogout = () => {
    signOut(auth)
      .then((res) => {
        dispatch(clearUser());
        toast({
          description: `로그아웃 되었습니다.`,
          status: "success",
          duration: 1000,
          isClosable: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [isLoginPop, setIsLoginPop] = useState(false);
  const onIsLoginPop = () => {
    setIsLoginPop(true);
  };
  const closeIsLoginPop = () => {
    setIsLoginPop(false);
  };

  const [isJoinPop, setIsJoinPop] = useState(false);
  const onIsJoinPop = () => {
    setIsJoinPop(true);
  };
  const closeIsJoinPop = () => {
    setIsJoinPop(false);
  };

  return (
    <>
      <HeaderTop>
        <div className="left">
          <div className="logo_box">
            <h1 className="logo">
              <Link href="/">Realtime Aim Game</Link>
            </h1>
          </div>
          {/* <ul className="menu">
            <li className={router.route.indexOf("/emoticon") > -1 ? "on" : ""}>
              <Link href="/emoticon">이모티콘</Link>
            </li>
          </ul> */}
        </div>
        <ul className="right">
          {userInfo ? (
            <>
              <li className={router.route.indexOf("/mypage") > -1 ? "on" : ""}>
                <span style={{ marginRight: "10px" }}>
                  {userInfo.nick} 님 환영합니다.
                </span>
                {/* <Link href="/mypage">
                  <a>
                    <BiUser style={{ fontSize: "1.2rem" }} />
                  </a>
                </Link> */}
              </li>
              <li>
                <a href="#" onClick={onLogout}>
                  <TbLogout style={{ fontSize: "1.2rem" }} />
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <button type="button" onClick={onIsLoginPop}>
                  login
                </button>
              </li>
              <li>
                <button type="button" onClick={onIsJoinPop}>
                  join
                </button>
              </li>
            </>
          )}
        </ul>
      </HeaderTop>
      {isLoginPop && <Login closePop={closeIsLoginPop} />}
      {isJoinPop && <Join closePop={closeIsJoinPop} />}
    </>
  );
}

export default Header;
