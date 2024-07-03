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
  import firebaseApp from '../firebaseConfig.jsx';
  import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged} from "firebase/auth";
  import { useState, useEffect} from "react";
  import Swal from 'sweetalert2';
  
  function Register() { 

    const [name, setName] = useState ('');
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');
    const [confirmPassword, setConfirmPassword] = useState ('');

    let navigate = useNavigate();

    useEffect(() => {
      const auth = getAuth(firebaseApp);
      onAuthStateChanged(auth, (user) => {
          if(user) {
            navigate('/')
          }
      
      });
          }, [])

    const handleRegistration = () => {
      
      if(
        name !== '' &&
        email !== '' &&
        password !=='' &&
        confirmPassword !== '' &&
        password == confirmPassword   
        ){
          Swal.fire({
            text: "Registration Successfully!",
            icon: "success",
            confirmButtonColor:  "#3085d6"
          });
          
          
          const auth = getAuth (firebaseApp);
          createUserWithEmailAndPassword (auth, email, password).then(
            (userCredential) => {
              const user = userCredential.user;

              updateProfile(auth.currentUser, {
                displayName: name
              });

              navigate("/");

            });
          
        }else {
          Swal.fire({
            text: "There are invalid parameters. Please try again!",
            icon: "error",
            confirmButtonColor:  "#3085d6"
          });
        }
      }
  
      return (
  
          <Container maxW='1024px' p="40" mb={50}>
  
         <Heading mb={5} size="3xl">Welcome to Twitter</Heading>
          <Text fontSize='3xl'  mb={5}>Create an account here</Text>
  
          {/* RgisterForm */}
          <Card>
            <CardBody>

            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input 
                  type="text" 
                  onChange={(e) => {
                  setName(e.target.value)
                  }} 
                  value={name}
                />
              </FormControl>

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

              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input 
                  type="password"
                  onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  }} 
                  value={confirmPassword} />     
              </FormControl>
  
          {/* Button -Login */}
              <Button colorScheme='twitter' mt= {5} onClick={handleRegistration} >Create an account</Button>
              <Box>
              <Link to="/" >
                <ChakraLink>Already have an account? Login here.</ChakraLink>
              </Link>
              </Box>
             
  
            </CardBody>
          </Card>
        </Container>
      )
  }
  
  export default Register;