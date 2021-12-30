import * as yup from "yup";

export const formSchema = yup.object().shape({
    name: yup.string().min(2,'min 2 symbols').required('No input'),
    surname: yup.string().min(2,'min 2 symbols').required('No input'),
    terms: yup.boolean().oneOf([true], 'you do not agree'),
    age: yup.number().typeError('No input'),
    citizenship: yup.string().required('No input'),
});