import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { FormLabel } from "@chakra-ui/react";

import { IMeteor } from "../../types/interfaces";

interface Props {
  sortedByYear: IMeteor[];
  onUpdate: (data: IMeteor[]) => void;
}

let prevMass = "";

const FilterBar: React.FC<Props> = ({ sortedByYear, onUpdate }: Props) => {
  const [filter, setFilter] = useState<{ mass: string; year: string }>({
    mass: "",
    year: "",
  });
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // filter based on same year
    const { year, mass } = filter;

    const _filteredBasedOnYear = year
      ? sortedByYear.filter((item) => {
          if (item.year) {
            return new Date(item.year).getFullYear().toString() === year;
          } else return false;
        })
      : sortedByYear;

    // filter based on the mass larger than input mass
    const _filteredBasedOnMass = mass
      ? _filteredBasedOnYear.filter((item) => {
          if (item.mass) {
            return parseInt(item.mass) > parseInt(mass);
          } else return false;
        })
      : _filteredBasedOnYear;

    // there is mass change and there are no meteors found
    if (mass && prevMass !== mass && _filteredBasedOnMass.length === 0) {
      for (const item of sortedByYear) {
        if (mass && parseInt(item.mass) > parseInt(mass)) {
          setFilter({
            ...filter,
            year: new Date(item.year).getFullYear().toString(),
          });
          setMessage(
            "The mass was not found, jumping to first-year where there is a mass that fits the criteria"
          );
          break;
        }
      }
    }

    onUpdate(_filteredBasedOnMass);
    prevMass = mass;
  }, [sortedByYear, onUpdate, filter]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setMessage("");
    setFilter({ ...filter, [name]: value });
  };

  return (
    <Box>
      <FormLabel>
        Year (same): &nbsp;
        <Input
          type="number"
          name="year"
          value={filter.year}
          maxWidth="200px"
          onChange={handleFilterChange}
        />
      </FormLabel>
      <FormLabel>
        Mass (larger than): &nbsp;
        <Input
          type="number"
          name="mass"
          value={filter.mass}
          maxWidth="200px"
          onChange={handleFilterChange}
        />
      </FormLabel>
      <Text>{message}</Text>
    </Box>
  );
};

export default FilterBar;
