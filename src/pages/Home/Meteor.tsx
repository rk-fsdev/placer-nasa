import React from "react";
import { Box, Text } from "@chakra-ui/layout";

import { IMeteor } from "../../types/interfaces";

interface Props {
  data: IMeteor;
}

const Meteor: React.FC<Props> = ({ data }: Props) => {
  return (
    <Box border="1px solid black" borderRadius="10px" p="10px" mb="5px">
      <Text>Name: {data.name}</Text>
      <Text>Year: {new Date(data.year).getFullYear()}</Text>
      <Text>Mass: {data.mass}</Text>
    </Box>
  );
};

export default Meteor;
