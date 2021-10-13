import React, { useState, useLayoutEffect, useCallback } from "react";
import { Text } from "@chakra-ui/layout";

import LoadingIndicator from "../../components/LoadingIndicator";
import Wrapper from "../../components/Wrapper";
import { useMeteors } from "../../service/hooks";
import { IMeteor } from "../../types/interfaces";
import FilterBar from "./FilterBar";
import MeteorList from "./MeteorList";

const Home: React.FC = () => {
  const { data, isLoading, isError } = useMeteors();
  const [sortedByYear, setSortedByYear] = useState<IMeteor[]>([]);
  const [filteredData, setFilteredData] = useState<IMeteor[]>([]);

  useLayoutEffect(() => {
    if (Array.isArray(data)) {
      // sort by year
      const sortedByYear_ = data.sort((itemA, itemB) => {
        const yearA = new Date(itemA.year).getFullYear();
        const yearB = new Date(itemB.year).getFullYear();
        if (yearA > yearB) return 1;
        if (yearA < yearB) return -1;
        return 0;
      });
      setSortedByYear(sortedByYear_);
      setFilteredData(sortedByYear_);
    }
  }, [data]);

  const handleFilterUpdate = useCallback((results: IMeteor[]) => {
    setFilteredData(results);
  }, []);

  if (isLoading) return <LoadingIndicator fullScreen />;
  if (isError)
    return <Text color="red">There was an error fetching meteors</Text>;

  return (
    <Wrapper>
      <FilterBar sortedByYear={sortedByYear} onUpdate={handleFilterUpdate} />
      <Text>Total Found: {filteredData.length}</Text>
      <MeteorList data={filteredData} />
    </Wrapper>
  );
};

export default Home;
