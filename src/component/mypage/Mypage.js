import { off, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { dbData } from "../db";
import { useToast } from "@chakra-ui/react";
import { EmoticonList } from "@component/CommonStyled";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

export default function Mypage() {
  const toast = useToast();
  const userInfo = useSelector((state) => state.user.currentUser);
  const [myEmoticon, setMyEmoticon] = useState();
  useEffect(() => {
    let arr = [];
    if (userInfo?.favor) {
      arr = dbData.filter((el) => {
        return userInfo.favor.includes(el.uid);
      });
      setMyEmoticon(arr);
    }
  }, [userInfo]);

  return (
    <div className="content_box">
      <EmoticonList>
        {myEmoticon &&
          myEmoticon.map((el) => (
            <li key={el.uid}>
              <button
                type="button"
                className="btn_emo"
                onClick={() => onCopy(el)}
              >
                {el.emo}
              </button>
              <button
                type="button"
                className="btn_favor"
                onClick={() => onFavor(el)}
              >
                <MdFavorite />
              </button>
            </li>
          ))}
      </EmoticonList>
    </div>
  );
}
