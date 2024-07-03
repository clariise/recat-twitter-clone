import {
  FormControl,
  FormLabel,
  Input,
  Link as ChakraLink,
  Heading, 
  Container, 
  Button, 
  Box, 
  Card, 
  CardBody,   
  Text,
 
} from '@chakra-ui/react'
import {Link, useNavigate} from 'react-router-dom';
import firebaseApp from '../firebaseConfig';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { useState, useEffect} from "react";
import Swal from 'sweetalert2';

  


function Login() {

  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');

  let navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, (user) => {
        if(user) {
          navigate('/')
        }
    
    });
        }, [])

  const handleLogin = () => {

    if(
     email !== '' &&
     password !=='') {
      const auth = getAuth(firebaseApp);
      signInWithEmailAndPassword (auth, email, password )
      .then (() => {
       navigate('/');
      }).catch((error) => {
       Swal.fire({
         text: "There are invalid email or password!.",
         icon: "error",
         confirmButtonColor:  "#3085d6",
       });
      });
     
      }else{
          Swal.fire({
            text: " There are invalid parameter. Please try again later.!",
            icon: "error",
            confirmButtonColor:  "#3085d6"
          });

     }
        }
   

    return (

        <Container maxW='1024px' p="40" mb={50}>

        <Heading mb={5} size="3xl">Welcome to Twitter</Heading>
        <Text fontSize='3xl'  mb={5}>Login your account here.</Text>

   {/* RgisterForm */}
   <Card>
            <CardBody>
        <FormControl>
                <FormLabel>Email Address</FormLabel>
                <Input 
                  type="email" 
                  onChange={(e) => {
                  setEmail(e.target.value)
                  }} 
                  value={email}
                />
              </FormControl>
  
          {/* For a password */}
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input 
                  type="password"
                  onChange={(e) => {
                  setPassword(e.target.value)
                  }} 
                  value={password} />     
              </FormControl>

         {/* Button -Login */}
         <Button colorScheme='twitter' mt= {5} onClick={handleLogin} >Login</Button>
              <Box>
              <Link to="/register" >
                <ChakraLink>Don't have an account? Register here.</ChakraLink>
              </Link>
              </Box>
             
  
            </CardBody>
          </Card>
        </Container>
      )
  }

export default Login;