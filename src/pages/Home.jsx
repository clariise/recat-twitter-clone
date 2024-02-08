import { Container, Heading, Card, Text, Button, Flex, Box, Spacer, FormLabel, FormControl, Input, Divider } from '@chakra-ui/react'
import Tweet from './Tweet'
import {Link, useNavigate} from 'react-router-dom';
import firebaseApp from './firebaseConfig';
import { getAuth, onAuthStateChanged, signOut} from 'firebase/auth';
import { useState, useEffect} from 'react';



function Home() {

  let navigate = useNavigate();
  const auth = getAuth(firebaseApp);

  const [userProfile, setUserProfile] = useState ('');

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if(user) {
            console.log(user);
            setUserProfile ({
               email: user.email,
               name: user.displayName
            })

        }else {
            navigate('/login');
        }
    });
        }, [])

    const logout = ()=> {
        signOut(auth).then(() => {
            navigate("/login");

        });
    }

    return (
        <Container maxW='1024px' pt='100'>

            <Heading fontWeight="black" color="#1DA1F2">Twitter</Heading>
            <Flex>
                <Box>
                    <Card mt={5} p={5}>
                        <Text fontWeight="bold">{userProfile.name} 👋</Text>
                        <Text >{userProfile.email}</Text>
                        <Button size="xs" mt={5} onClick= {logout} >Logout</Button>
                    </Card>
                </Box>
                <Spacer></Spacer>
                <Box w="780px">
                    <Card mt={5} p={5}>
                        <FormControl>
                            <FormLabel>What's on your mind 💬</FormLabel>
                            <Input type="text" />
                        </FormControl>

                        <Button w="100px" colorScheme='twitter' mt={3} size="sm" >Tweet</Button>

                    </Card>

                    <Divider m={5} ></Divider>
                    <Tweet></Tweet>
                    <Tweet></Tweet>
                    <Tweet></Tweet>

                </Box>
            </Flex>
        </Container>

    )

}

export default Home;