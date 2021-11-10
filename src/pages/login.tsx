import React from 'react'
import {Form, Formik} from 'formik'
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import {useLoginMutation} from '../generated/graphql';
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface registerProps {

}

const Login: React.FC<registerProps> = ({}) => {
      const router = useRouter();
      const [, login] = useLoginMutation();
        return (
           <Wrapper variant="small">
               <Formik initialValues={{usernameOrEmail: '', password: ''}} onSubmit={async (values, {setErrors}) => {
                  console.log(values)
                  const response = await login(values);
                  console.log('RESPONSE', response)
                  if (response.data?.login.errors) {
                    setErrors(toErrorMap(response.data.login.errors))
                  } else if (response.data?.login.user) {
                    console.log('ENTREI')
                    router.push("/");
                  }
                }}>
               {({isSubmitting}) => (
                  <Form>
                      <InputField name='usernameorEmail' placeholder='username or email' label='Username or Email' type='text'/>
                      <Box mt={4}>
                        <InputField name='password' placeholder='password' label='Password' type='password'/>
                      </Box>
                    <Button mt={4} type='submit' isLoading={isSubmitting} colorScheme='teal'>Login</Button>
                  </Form> 
                )}
                </Formik> 
           </Wrapper>
        );
};

export default withUrqlClient(createUrqlClient)(Login)