import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { setUser } from "@redux/actions/user_action";
import { GiSandsOfTime } from "react-icons/gi";
import { db } from "../firebase";
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
import { enWord, enWord2, roomFirst, roomSecond, wordList } from "./db";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Spinner,
  Stack,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";
import { getRanWord } from "./getRandomName";
import { PlayBox } from "@component/CommonStyled";
import { SiTarget } from "react-icons/si";

const TargetBox = styled.div`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  left: ${(props) => `${props.pos[0]}%`};
  top: ${(props) => `${props.pos[1]}%`};
  position: absolute;
  background: #555;
  border-radius: 50%;
`;

export default function Main() {
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.currentUser);

  const targetRef = useRef();
  const gameBoxRef = useRef();

  const {
    handleSubmit,
    setValue,
    getValues,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const [sliderValue, setSliderValue] = useState(2);

  const [timeCounter, setTimeCounter] = useState();
  const [readyCounter, setReadyCounter] = useState();
  const [timeTxt, setTimeTxt] = useState();

  const [roomData, setRoomData] = useState();

  useEffect(() => {
    const rRef = ref(db, `room/${router?.asPath.split("/")[2]}`);
    onValue(rRef, (data) => {
      let obj = {
        ...data.val(),
      };
      let arr = [];
      for (const key in data.val()?.user) {
        arr.push({
          nick: data.val().user[key].nick,
          point: data.val().user[key].point || 0,
          hitRate: data.val().user[key].hitRate || 0,
          score: data.val().user[key].score || 0,
          uid: key,
        });
      }
      arr = arr.sort((a, b) => b.score - a.score);
      obj.user = arr;
      if (!obj.uid) {
        router.push("/");
      }
      setRoomData(obj);
    });
    return () => {
      off(rRef);
    };
  }, []);

  useEffect(() => {
    if (roomData?.play === true) {
      setTimeCounter(roomData.time * 60);
      setReadyCounter(3);
    }
  }, [roomData?.play]);

  const [missCount, setMissCount] = useState(1);
  const onHitCheck = (e) => {
    htiEffect(e);
    if (
      roomData.state === "start" &&
      !e.target.classList?.contains("target_box")
    ) {
      setMissCount((prev) => prev + 1);
    }
  };

  const htiEffect = (e) => {
    const pos = [e.pageX, e.pageY];
    gameBoxRef.current.insertAdjacentHTML(
      "beforeend",
      `<div class='effect' style='left:${pos[0]}px;top:${pos[1]}px'></div>`
    );
    if (gameBoxRef.current.children[0]) {
      setTimeout(() => {
        gameBoxRef.current?.children[0].remove();
      }, 1000);
    }
  };

  const targetHtiEffect = (e) => {
    const pos = [e.pageX, e.pageY];
    gameBoxRef.current.insertAdjacentHTML(
      "beforeend",
      `<div class='target_hit_effect' style='left:${pos[0]}px;top:${pos[1]}px'>Hit!</div>`
    );
    if (gameBoxRef.current.children[0]) {
      setTimeout(() => {
        gameBoxRef.current.children[0].remove();
      }, 500);
    }
  };

  //히트
  const onTargetHit = (e) => {
    targetHtiEffect(e);
    const hitRate = Math.round((1 / missCount) * 100);
    const userPath = `room/${roomData.uid}/user/${userInfo.uid}`;
    setMissCount(0);
    get(ref(db, `${userPath}`)).then((data) => {
      const target = targetReplace();
      const newPoint = data.val().point ? data.val().point + 1 : 1;
      const oldRate = data.val().hitRate || 0;
      let newRate = hitRate;
      if (data.val().point) {
        newRate = Math.floor((oldRate * data.val().point + hitRate) / newPoint);
      }
      const score = Math.round((newPoint * newRate * 1.3) / 100) * 10;
      const updates = {};
      updates[`${userPath}/point`] = newPoint;
      updates[`${userPath}/hitRate`] = newRate;
      updates[`${userPath}/score`] = score;
      updates[`room/${roomData.uid}/ranPos`] = [target.ranPosX, target.ranPosY];
      updates[`room/${roomData.uid}/ranSize`] = target.ranSize;

      update(ref(db), updates);
    });
  };

  //카운터
  useEffect(() => {
    const rRef = ref(db, `room/${router?.asPath.split("/")[2]}`);
    if (readyCounter > 0) {
      setTimeout(() => {
        setReadyCounter((prev) => prev - 1);
        setTimeTxt(`${readyCounter}초후 시작합니다.`);
      }, 1000);
    }
    if (readyCounter === 0 && timeCounter > 0) {
      setTimeout(() => {
        if (roomData.uid) {
          update(rRef, {
            state: "start",
          });
          setTimeCounter((prev) => prev - 1);
          setTimeTxt(timeCounter);
        }
      }, 1000);
    }
    if (timeCounter === 0) {
      setTimeout(() => {
        setTimeTxt("end");
      }, 1000);
      setTimeout(() => {
        gameInit();
      }, 5000);
    }
  }, [timeCounter, readyCounter]);

  const gameInit = () => {
    setTimeTxt("");
    update(ref(db, `room/${roomData.uid}`), {
      state: "",
      play: false,
    });
  };

  const scoreInit = () => {
    let user = {};
    for (const key in roomData.user) {
      user[roomData.user[key].uid] = roomData.user[key];
      user[roomData.user[key].uid].point = 0;
      user[roomData.user[key].uid].hitRate = 0;
      delete user[roomData.user[key].uid].uid;
    }
    const updates = {};
    updates[`room/${roomData.uid}/user`] = user;
    update(ref(db), updates);
  };

  //페이지 이동시 방폭
  const routeChangeStart = () => {
    if (!roomData) {
      router.events.emit("routeChangeError");
      throw "Abort route change. Please ignore this error.";
    }
    if (roomData.writer === userInfo.uid) {
      const routerConfirm = confirm(
        "방장이 방을 나가면 방이 삭제됩니다.\n나가시겠습니까?"
      );
      if (!routerConfirm) {
        router.events.emit("routeChangeError");
        throw "Abort route change. Please ignore this error.";
      } else {
        remove(ref(db, `room/${roomData.uid}`));
        toast({
          position: "top",
          title: `방이 삭제되었습니다.`,
          status: "info",
          duration: 1000,
          isClosable: true,
        });
      }
    } else {
      remove(ref(db, `room/${roomData.uid}/user/${userInfo.uid}`));
    }
  };

  useEffect(() => {
    router.events.on("routeChangeStart", routeChangeStart);
    return () => {
      router.events.off("routeChangeStart", routeChangeStart);
    };
  }, [roomData?.uid, router.events]);

  if (roomData && userInfo) {
    if (roomData.writer !== userInfo.uid) {
      const onRef = onDisconnect(
        ref(db, `room/${roomData.uid}/user/${userInfo.uid}`)
      );
      onRef.remove();
    } else {
      const onRef = onDisconnect(ref(db, `room/${roomData.uid}`));
      onRef.remove();
    }
  }

  const [typeState, setTypeState] = useState("1");
  const onTypeChange = (e) => {
    setTypeState(e);
  };

  const targetReplace = () => {
    let ranPosX = Math.floor(Math.random() * 91) + 5;
    let ranPosY = Math.floor(Math.random() * 81) + 10;
    let ranSize = Math.floor(Math.random() * 20) + 12;
    return {
      ranPosX,
      ranPosY,
      ranSize,
    };
  };

  const onPlayGame = () => {
    const target = targetReplace();
    update(ref(db, `room/${roomData.uid}`), {
      play: true,
      time: sliderValue,
      type: typeState,
      ranPos: [target.ranPosX, target.ranPosY],
      ranSize: target.ranSize,
    });
  };

  return (
    <PlayBox>
      {roomData && (
        <>
          {roomData.roomName && (
            <div className="code_name">방 코드네임 : {roomData.roomName}</div>
          )}
          <Flex>
            <ul className="user_list">
              <li className="header">
                <span className="rank">순위</span>
                <span className="user">유저</span>
                <span className="point">히트수</span>
                <span className="speed">적중률</span>
                <span className="speed">점수</span>
              </li>
              {roomData.user.map((el, idx) => (
                <li className="body" key={el.uid}>
                  <span className="rank">{idx + 1}</span>
                  <span className="user">{el.nick}</span>
                  <span className="point">{el.point}</span>
                  <span className="speed">{el.hitRate}</span>
                  <span className="speed">{el.score}</span>
                </li>
              ))}
            </ul>
            {roomData.play === true ? (
              <div
                className="game_box"
                onClick={onHitCheck}
                style={{ cursor: "crosshair" }}
              >
                <div className="effect_bg" ref={gameBoxRef}></div>
                <div className="time_counter">{timeTxt}</div>
                {roomData.state === "start" && (
                  <TargetBox
                    onClick={onTargetHit}
                    size={roomData.ranSize}
                    pos={roomData.ranPos}
                    className="target_box"
                    ref={targetRef}
                  >
                    <SiTarget />
                  </TargetBox>
                )}
              </div>
            ) : (
              <>
                {roomData.writer === userInfo?.uid ? (
                  <div className="game_box">
                    <Flex
                      maxWidth={400}
                      width="100%"
                      flexDirection="column"
                      alignItems="center"
                      gap={2}
                    >
                      <FormControl isInvalid={errors.time}>
                        <div className="row_box">
                          <FormLabel mb={5} className="label" htmlFor="time">
                            게임시간
                          </FormLabel>
                          <Slider
                            aria-label="slider-ex-4"
                            defaultValue={sliderValue}
                            min={1}
                            mb={10}
                            max={5}
                            colorScheme="teal"
                            onChange={(v) => setSliderValue(v)}
                          >
                            <SliderMark value={1} mt="4" ml="-3" fontSize="sm">
                              1min
                            </SliderMark>
                            <SliderMark value={2} mt="4" ml="-3" fontSize="sm">
                              2min
                            </SliderMark>
                            <SliderMark value={3} mt="4" ml="-3" fontSize="sm">
                              3min
                            </SliderMark>
                            <SliderMark value={4} mt="4" ml="-3" fontSize="sm">
                              4min
                            </SliderMark>
                            <SliderMark value={5} mt="4" ml="-3" fontSize="sm">
                              5min
                            </SliderMark>
                            <SliderTrack bg="blue.100">
                              <SliderFilledTrack bg="blue.600" />
                            </SliderTrack>
                            <SliderThumb boxSize={6}>
                              <Box color="blue.600" as={GiSandsOfTime} />
                            </SliderThumb>
                          </Slider>
                        </div>
                        <FormErrorMessage>
                          {errors.time && errors.time.message}
                        </FormErrorMessage>
                      </FormControl>

                      {/* <FormControl isInvalid={errors.type}>
                        <RadioGroup
                          defaultValue={typeState}
                          mb={5}
                          onChange={onTypeChange}
                          value={typeState}
                        >
                          <Stack spacing="20px" direction="row">
                            <Radio value="1">한글</Radio>
                            <Radio value="2">영어</Radio>
                          </Stack>
                        </RadioGroup>
                        <FormErrorMessage>
                          {errors.type && errors.type.message}
                        </FormErrorMessage>
                      </FormControl> */}
                      <Flex>
                        <Button mr={2} onClick={scoreInit}>
                          기록 초기화
                        </Button>
                        <Button onClick={onPlayGame}>게임시작</Button>
                      </Flex>
                    </Flex>
                  </div>
                ) : (
                  <div className="game_box">대기중</div>
                )}
              </>
            )}
          </Flex>
        </>
      )}
    </PlayBox>
  );
}
