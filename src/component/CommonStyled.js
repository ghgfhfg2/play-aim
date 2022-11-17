import styled from "styled-components";

export const RoomList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
  h2 {
    font-size: 16px;
    font-weight: 600;
    padding: 0 5px;
    margin-bottom: 5px;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 4px;
    padding: 0.5rem 1rem;
  }
`;

export const CommonPopup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  animation: fadeIn 0.2s forwards;
  opacity: 0;
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.25);
  }
  .con_box {
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    padding: 1rem;
    transform: translateY(30px);
    width: 100%;
    max-width: 400px;
    z-index: 10;
    animation: fadeUp 0.2s forwards;
  }
  h2.title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  @keyframes fadeUp {
    to {
      transform: translateY(0);
    }
  }
`;

export const PlayBox = styled.div`
  background: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  position: relative;
  border-radius: 10px;
  width: calc(100% - 2rem);
  margin: 0 auto;
  .code_name {
    width: 100%;
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: 600;
    padding-left: 1rem;
  }
  .user_list {
    padding: 10px;
    padding-right: 15px;
    border-right: 1px solid #ddd;
    border-radius: 5px;
    li {
      display: flex;
      align-items: center;
      &.header {
        & > span.user {
          justify-content: center;
          width: 100px;
        }
      }
      & > span {
        flex-shrink: 0;
        padding: 0 5px;
        min-width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &.body {
        margin-top: 10px;
        & > span.user {
          overflow: hidden;
          justify-content: flex-start;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
          width: 100px;
        }
      }
    }
  }
  .game_box {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 60vh;
    min-height: 300px;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .time_counter {
      padding: 1rem;
      border: 2px solid #ddd;
      width: 200px;
      display: flex;
      justify-content: center;
      font-weight: bold;
    }
    .effect_bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .effect {
      position: fixed;
      width: 65px;
      height: 65px;
      background: radial-gradient(
        circle,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0) 100%
      );
      transform: translate(-50%, -50%) scale(0);
      border-radius: 50%;
      opacity: 0;
      animation: effect 0.3s forwards;
      @keyframes effect {
        50% {
          opacity: 0.2;
        }
        to {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0;
        }
      }
    }
    .target_hit_effect {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      position: fixed;
      transform: translate(-50%, -70%);
      opacity: 0;
      font-size: 20px;
      color: #f0f029;
      text-shadow: 2px 2px #111;
      animation: hit 0.3s forwards;
      @keyframes hit {
        60% {
          transform: translate(-50%, -160%);
          opacity: 1;
        }
        to {
          transform: translate(-50%, -160%);
          opacity: 0;
        }
      }
    }
  }
  .target_box {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    border-radius: 50%;
    background: #fff;
    width: ${(props) => `${props.size}px`};
    height: ${(props) => `${props.size}px`};
    svg {
      width: 100%;
      height: 100%;
      color: #e02424;
    }
  }
`;
