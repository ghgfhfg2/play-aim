import { roomFirst, roomSecond, enWord, enWord2 } from "@component/db";

export const randomName = () => {
  const random = Math.floor(Math.random() * roomFirst.length);
  const random2 = Math.floor(Math.random() * roomSecond.length);
  const first = roomFirst[random];
  const last = roomSecond[random2];
  const roomName = first + last;
  return roomName;
};

export const getRanWord = (idx,idx2,type) => {
  let first;
  let last;
  if(type === '1'){
    first = roomFirst[idx];
    last = roomSecond[idx2];
  }
  if(type === '2'){
    first = enWord[idx];
    last = enWord2[idx2];
  }
  const roomName = `${first} ${last}`;
  return roomName;
};
