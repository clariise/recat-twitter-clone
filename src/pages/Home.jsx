import { Container, Heading, Card, Text, Button, Flex, Box, Spacer, FormLabel, FormControl, Input, Divider } from '@chakra-ui/react'
import Tweet from './Tweet'
import {Link, useNavigate} from 'react-router-dom';
import firebaseApp from './firebaseConfig';
import { getAuth, onAuthStateChanged, signOut} from 'firebase/auth';
import {getFirestore, addDoc, collection, Timestamp, onSnapshot} from 'firebase/firestore';
import { useState, useEffect} from 'react';



function Home() {

  let navigate = useNavigate();
  const auth = getAuth(firebaseApp);  //firebaseconsole for email and password
  const db = getFirestore (firebaseApp);

  const [userProfile, setUserProfile] = useState ('');
  const [tweet, setTweet] = useState ('');
  const [tweets, setTweets]= useState ([]);  //line of array

  const [buttonLoading, setButtonLoading]= useState(false);
    
  
  useEffect(() => {

    //this is for authentication
        onAuthStateChanged(auth, (user) => {
        if(user) {
            
            setUserProfile ({
               email: user.email,
               name: user.displayName
            })

        }else {
            navigate('/login');
        }
    });


    //Retrieve Tweets

    onSnapshot(collection(db,'tweets'), snapshot => {
        setTweets(snapshot.docs.map(t=>t.data()));  //map function is converts collection into an array
        });

        }, [])

        const createTweet = () => {
            setButtonLoading (true);
            if (tweet !== '') {

                const tweetData = {
                    body: tweet,
                    user_email: userProfile.email,  
                    name: userProfile.name,
                    date_posted: Timestamp.now()
                };

                addDoc (collection(db,'tweets'), tweetData).then(()=> {
                    setTweet('');
                    setButtonLoading (false);
                }); //adddoc accept two parameters (1) collection function (2 parameters (db and name ng collection (tweets))) at ano  (2) iadd mo


            }else {
                alert('tweet cannot be empty').then(()=> {
                    setButtonLoading (false);
                });
            }
        }

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
                            <Input disabled={buttonLoading} type="text" onChange= {(e) =>{setTweet(e.target.value)}} value= {tweet} />
                        </FormControl>

                        <Button isLoading ={buttonLoading}  w="100px" colorScheme='twitter' mt={3} size="sm"  onClick={createTweet} >Tweet</Button>

                    </Card>


                    <Divider my={5} ></Divider>

                    {
                        tweets.map((tweetRecord) => (
                            <Tweet
                                key={tweetRecord.id}
                                body={tweetRecord.body}
                                email={tweetRecord.user_email}
                                name={tweetRecord.name}
                                date_posted={tweetRecord.date_posted.toDate().toString()}
                            ></Tweet>
                        ))
                    }
                    
                </Box>
            </Flex>
        </Container>

    );

}

export default Home;