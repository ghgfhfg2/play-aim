import styled from "styled-components";

const NoneBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
`;

export default function None() {
  return <NoneBox>게시물이 없습니다.</NoneBox>;
}
