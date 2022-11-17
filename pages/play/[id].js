import React, { useEffect, useState } from "react";
import Play from "@component/Play";
import GameMode2 from "@component/GameMode2";
import GameMode3 from "@component/GameMode3";
import { db } from "../../src/firebase";
import { useRouter } from "next/router";
import {
  ref,
  get,
  set,
  update,
  runTransaction,
  onValue,
  off,
  remove,
  onDisconnect,
} from "firebase/database";

export default function PlayPage() {
  const router = useRouter();
  const [mode, setMode] = useState();

  useEffect(() => {
    const rRef = ref(db, `room/${router?.asPath.split("/")[2]}/mode`);
    onValue(rRef, (data) => {
      setMode(data.val());
    });
    return () => {};
  }, []);

  if (mode && mode == "1") {
    return <Play />;
  }
  if (mode && mode == "2") {
    return <GameMode2 />;
  }
  if (mode && mode == "3") {
    return <GameMode3 />;
  }
  return <></>;
}
