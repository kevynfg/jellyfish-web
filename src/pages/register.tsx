import React from 'react'
import {Form, Formik} from 'formik'
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import {useMutation} from '../generated/graphql';
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";

interface registerProps {

}

const Register: React.FC<registerProps> = ({}) => {
      const router = useRouter();
      const [, register] = useMutation();
        return (
           <Wrapper variant="small">
               <Formik initialValues={{username: '', password: ''}} onSubmit={async (values, {setErrors}) => {
                  console.log(values)
                  const response = await register(values);

                  if (response.data?.register.errors) {
                    setErrors(toErrorMap(response.data.register.errors))
                  } else if (response.data.register.user) {
                    router.push("/");
                  }
                }}>
               {({isSubmitting}) => (
                  <Form>
                      <InputField name='username' placeholder='username' label='Username'/>
                      <Box mt={4}>
                        <InputField name='password' placeholder='password' label='Password' type='password'/>
                      </Box>
                    <Button mt={4} type='submit' isLoading={isSubmitting} colorScheme='teal'>Register</Button>
                  </Form> 
                )}
                </Formik> 
           </Wrapper>
        );
};

export default Register