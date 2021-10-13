import React, { lazy, Suspense } from "react";
import { ChakraProvider, Flex, theme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ColorModeSwitcher } from "./ColorModeSwitcher";
import LoadingIndicator from "./components/LoadingIndicator";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
});

const Home = lazy(() => import("./pages/Home"));

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <Flex justify="flex-end" position="absolute" right="20px" top="20px">
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>
      <Suspense fallback={<LoadingIndicator fullScreen />}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </Suspense>
    </ChakraProvider>
  </QueryClientProvider>
);

export { App };
