import React from "react";
import { Box } from "@chakra-ui/layout";

import { IMeteor } from "../../types/interfaces";
import Meteor from "./Meteor";

interface Props {
  data: IMeteor[];
}

const MeteorList: React.FC<Props> = ({ data }: Props) => {
  return (
    <Box>
      {data.map((item) => (
        <Meteor data={item} key={item.id} />
      ))}
    </Box>
  );
};

export default MeteorList;
