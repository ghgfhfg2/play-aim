import { Flex, Image } from "@chakra-ui/react";
import { off, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "src/firebase";
import styled from "styled-components";
const FooterBox = styled.div`
  border-top: 1px solid #ddd;
  .content_box {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    .logo {
      width: 100px;
      margin-right: 80px;
    }
    .footer_con {
      color: #999;
    }
  }
`;

export default function Footer() {
  return (
    <FooterBox>
      <div className="content_box">
        <Flex justifyContent="center">
          <div className="footer_con">
            © Copyright 2022 All rights reserved by sy_dev
          </div>
        </Flex>
      </div>
    </FooterBox>
  );
}
