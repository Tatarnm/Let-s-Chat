//cloudinary account :- my college gmail account and preset name :- chat-pp
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Show, VStack } from '@chakra-ui/react'
import React from 'react'
import {   useState } from "react";
import { useToast } from '@chakra-ui/react';
import {Cloudinary} from "@cloudinary/url-gen";
import axios from "axios";
import {useHistory} from "react-router-dom";

const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();
    
    const App = () => {
    const cld = new Cloudinary({cloud: {cloudName: 'nairrit'}});
    };
    const handleClick = ()=> setShow(!show)
    const postDetails = (pics) =>{
      setLoading(true);
      if(pics === undefined){
        toast({
          title: 'Please select an Image!',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'bottom'
        });
        return;
      }
      if(pics.type === "image/jpeg" || pics.type === "image/png"){
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "nairrit");

        fetch("https://api.cloudinary.com/v1_1/nairrit/image/upload",{
          method: "POST",
          body: data,
        }).then((res) => res.json())
          .then((data) => {
            if(data.url)
            {setPic(data.url.toString());
            console.log(data.url.toString());}
            else{console.error("Image upload failed. Response:", data);}

            setLoading(false);
          }).catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }else{
        toast({
          title: 'Please select an Image!',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'bottom'
        });
        setLoading(false);
        return;
      }
    };
    const submitHandler =async()=>{
      setLoading(true);
      if(!name || !email || !password ||!confirmpassword){
        toast({
          title: 'Please fill all the fields!',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'bottom'
        });
        setLoading(false);
        return;
      }
      if( password !== confirmpassword){
        toast({
          title: 'Password is not matching!',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'bottom'
        });
        setLoading(false);
        return;
      }
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const {data} = await axios.post("/api/user",{name,email,password,pic}, config);
        toast({
          title: 'Registration is successfull !',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom'
        });

        localStorage.setItem("userInfo",JSON.stringify(data));
        setLoading(false);
        history.push("/chats");
      
      } catch (error) {
        toast({
          title: 'Error Occured !',
          description: error.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom'
        });
        setLoading(false)
      }
    };
  return (
     <VStack spacing={"3px"} color={"black"} fontSize={"sm"}> 
        <FormControl id='first-name' isRequired>
            <FormLabel>NAME  </FormLabel>
            <Input
                placeholder='Enter your Name'
                onChange={(e)=>setName(e.target.value)}
            /> 
        </FormControl>
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
        <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id='pic' isRequired>
            <FormLabel>Upload Your Picture  </FormLabel>
            <Input
                type={"file"}
                p={1.5}
                accept='image/*'
                onChange={(e)=>postDetails(e.target.files[0])}
            /> 
        </FormControl>
        <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
        //isLoading={picLoading}
        >
        Sign Up
      </Button>
     </VStack>
  )
}

export default Signup