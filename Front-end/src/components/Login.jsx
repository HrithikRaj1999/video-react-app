import {
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const submitLoginUpForm = async e => {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;
  console.log(email,password);
  const { data, status } = await axios.post('/api/auth', {
    email,
    password,
  });
  console.log({data});
  // check for success status
  if (status === 200 || status === 201)
    alert(data.message); // show success message
    else {
    
    alert(data.message); // show error message
  }
};
const Login = () => {
  return (
    <Container maxW={'container.xl'} h={'100vh'} p={'16'}>
      <form onSubmit={submitLoginUpForm}>
        <VStack
          alignItems={'stretch'}
          spacing={'8'}
          w={['full', '96']}
          m={'auto'}
          my={'16'}
        >
          <Heading>Welcome Back</Heading>

          <Input
            placeholder={'Email'}
            type={'email'}
            required
            focusBorderColor={'purple.500'}
          />
          <Input
            placeholder={'Password'}
            type={'password'}
            required
            focusBorderColor={'purple.500'}
          />

          <Button variant={'link'} alignSelf={'flex-end'}>
            <Link to={'/forgetpassword'}>Forget Password?</Link>
          </Button>

          <Button colorScheme={'purple'} type={'submit'}>
            Log In
          </Button>

          <Text textAlign={'right'}>
            New User?{' '}
            <Button variant={'link'} colorScheme={'purple'}>
              <Link to={'/signup'}>Sign Up</Link>
            </Button>
          </Text>
        </VStack>
      </form>
    </Container>
  );
};

export default Login;
