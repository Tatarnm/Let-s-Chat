import React from 'react';
import { Box, Center, Container ,Text , Tab , Tabs , TabList , TabPanel , TabPanels } from '@chakra-ui/react';
import Login from '../components/Authentication/Login'; 
import Signup from '../components/Authentication/Signup'; 

const Homepage = () => {
  return (
    <Container maxW='xl' centerContent>
      <Box d="flex"
      justifyContent="center"
      p={3}
      bg={"beige"}
      w="100%"
      m="100px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px" >
        <Text fontSize="4xl" fontFamily="work sans" color="black" align="center"> Let's Chat </Text>
      </Box>
      <Box bg={"beige"} w="100%" p={4} borderRadius="lg" color={"black"} borderWidth="1px" height={"100%"} fontSize={"small"}>
          <Tabs variant='soft-rounded' colorScheme='green'>
            <TabList mb="1em">
              <Tab width="50%">Log In </Tab>
              <Tab width="50%">Sign Up </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login/>
              </TabPanel>
              <TabPanel>
                <Signup/>
              </TabPanel>
            </TabPanels>
          </Tabs>
                </Box>
              </Container>
  );
}

export default Homepage;