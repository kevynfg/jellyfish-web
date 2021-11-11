import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Formik, Form } from "formik";
import { NextPage } from "next"
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React, { useState } from 'react'
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";

export const ChangePassword: NextPage<{token: string}> = ({token}) => {
    const router = useRouter();
    const [, changePassword] = useChangePasswordMutation();
    const [tokenError, setTokenError] = useState('');
    return (
        <Wrapper variant="small">
            <Formik initialValues={{ newPassword: '' }} onSubmit={async (values, {setErrors}) => {
            console.log(values)
            const response = await changePassword({
                newPassword: values.newPassword,
                token,
            });
            if (response.data?.changePassword.errors) {
                const errorMap = toErrorMap(response.data.changePassword.errors);
                console.log('errorMap', errorMap);
                if ('token' in errorMap) {
                    setTokenError(errorMap.token);
                }
                setErrors(errorMap);
            } else if (response.data?.changePassword.user) {
                router.push("/");
            }
            }}>
            {({isSubmitting}) => (
           <Form>
                <InputField name='newPassword' placeholder='new password' label='New Password' type="password"/>
                {tokenError ? <Box color="red"> {tokenError} </Box> : null}
                <Button mt={4} type='submit' isLoading={isSubmitting} colorScheme='teal'>change password</Button>
           </Form> 
         )}
         </Formik> 
    </Wrapper>
    );   
}

ChangePassword.getInitialProps = ({query}) => {
    return {
        token: query.token as string
    }
}

export default withUrqlClient(createUrqlClient, {ssr: false})(ChangePassword);
