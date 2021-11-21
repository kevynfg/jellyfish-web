import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import { useField } from "formik";
import React, { InputHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({label, textarea, size: _, ...props}) => {
    const [field, {error}] = useField(props);
    let InputOrTextarea;
    if (textarea) {
        InputOrTextarea = Textarea as any
    } else {
        InputOrTextarea = Input;
    };
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
                <InputOrTextarea {...field} {...props} id={field.name} placeholder={props.placeholder}/>
               {error ? <FormErrorMessage>{error}</FormErrorMessage> : null }
        </FormControl>
    );
}