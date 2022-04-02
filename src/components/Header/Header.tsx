import React, { FC } from "react";
import styled from "styled-components";
import Hero from "../Hero/Hero";

const HeaderComp = styled.div`
  box-shadow: 0px 15px 10px -15px #111;
`;

const Header: FC = () => {
  return (
    <HeaderComp>
      <Hero />
    </HeaderComp>
  );
};

export default Header;
