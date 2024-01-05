import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Show, VStack } from '@chakra-ui/react'
import React from 'react'
import {   useState } from "react";

const Login = () => {
  const [show, setShow] = useState(false);
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
   
    
    const handleClick = ()=> setShow(!show)
    
    const submitHandler =()=>{}
  return (
     <VStack spacing={"3px"} color={"black"} > 
        
         <FormControl id='email' isRequired>
            <FormLabel>E-Mail  </FormLabel>
            <Input
                placeholder='Enter your E-Mail'
                onChange={(e)=>setEmail(e.target.value)}
            /> 
        </FormControl>
         <FormControl id='password' isRequired>
            <FormLabel>Password  </FormLabel>
            <InputGroup size={"md"}>
                <Input
                type={show?"text" :'password'}
                placeholder='Enter Password'
                onChange={(e)=>setPassword(e.target.value)}
            />
            <InputRightElement width={"4.5rem"}>
                <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
            </InputGroup>
            
        </FormControl>

        <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        //isLoading={picLoading}
        >
        Log In
      </Button>
      <Button
        variant={"solid"}
        colorScheme="red"
        width="100%"
        
        onClick={()=>{
          setEmail("guest@example.com");
          setPassword("123456");
        }}
        //isLoading={picLoading}
        >
       Guest User Login
      </Button>
        
     </VStack>
  )
}

export default Login