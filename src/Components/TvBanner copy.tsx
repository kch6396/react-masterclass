import { motion } from "framer-motion";
import styled from "styled-components";
import { IGetMoviesResult, IGetTvResult } from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";

const Wrapper = styled.div<{ bgPhoto: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4%;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  aspect-ratio: 9/4;
`;

const Title = styled(motion.h2)`
  font-size: 10vw;
  line-height: 10vw;
  font-weight: 400;
`;

const Overview = styled(motion.p)`
  font-size: 1.2vw;
  width: 50%;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const Button = styled(motion.button)<{ bgColor: string; color: string }>`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  border: none;
  font-weight: 400;
  border-radius: 4px;
  padding: 0.6vw 1.6vw;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1vw;
  font-size: 1.2vw;
  line-height: 1.2vw;
  z-index: 10;
  svg {
    height: 1.8vw;
    width: 1.8vw;
  }
`;

const buttonVariants = {
  hover: {
    backgroundColor: "#6d6d6e90",
  },
};

interface IBannerProps {
  data?: IGetTvResult;
}

const TvBanner = ({ data }: IBannerProps) => {
  return (
    <Wrapper bgPhoto={makeImagePath(data?.results[3].backdrop_path || "")}>
      <Title>{data?.results[3].name}</Title>
      <Overview>{data?.results[3].overview}</Overview>
    </Wrapper>
  );
};

export default TvBanner;
