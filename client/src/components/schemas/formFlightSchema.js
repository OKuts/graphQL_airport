import * as yup from "yup";

export const formFlightSchema = yup.object().shape({
    company: yup.string().min(2,'min 2 symbols').required('No input'),
    direct: yup.string().min(2,'min 2 symbols').required('No input'),
    date: yup.string().required('No input'),
    time: yup.string().required('No input'),
});