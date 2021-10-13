import React from 'react';
import { Box, Container, ContainerProps } from '@chakra-ui/react';

const Wrapper: React.FC<ContainerProps> = ({
  children,
  ...restProps
}: ContainerProps) => (
  <Box _focus={{ outline: 'none' }} height="100%" {...restProps}>
    <Container maxW="1280px" padding="60px">
      {children}
    </Container>
  </Box>
);

export default Wrapper;
