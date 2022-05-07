import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import { ITour } from "common";
import LandmarkBox from "./LandmarkBox";

type Props = {};

export default function LandmarkContainer({}: Props) {
  const tour: ITour = {
    id: "asdf",
    description: "asdf",
    rating: 2,
    ratingCount: 2,
    time: 30,
    name: "TourName",
    landmarks: [],
  };
  return (
    <Box>
      <VStack
        gap={1}
        padding={2}
        maxH="100%"
        w="100%"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "blue",
            borderRadius: "24px",
          },
        }}
      >
        {tour.landmarks.map((landmark, index) => {
          return <LandmarkBox landmark={landmark} key={index} />;
        })}
      </VStack>
    </Box>
  );
}
