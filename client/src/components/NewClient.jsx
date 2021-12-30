import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {formSchema} from "./schemas/formSchema";
import {useMutation} from "@apollo/client";

import {CREATE_CLIENT} from "../mutations/create_client";

const citizenship = ['CANADA', 'UKRAINE', 'USA', 'FRANCE']

export const NewClient = () => {
    const [cn, setCn] = useState('client-wrapper')
    const [createClient] = useMutation(CREATE_CLIENT);

    useEffect(() => setCn('client-wrapper show'), [])

    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onTouched',
        resolver: yupResolver(formSchema),
    })

    const sendForm = handleSubmit(({name, surname, age, citizenship}) => {

        createClient({
            variables: {
                input: {
                    name,
                    surname,
                    age,
                    citizenship
                }
            }
        }).then(({data}) => {
            console.log(data)
        }).catch(err => console.log(err))
    })

    return (
        <div className={cn}>
            <form onSubmit={sendForm}>
                <div>
                    <label htmlFor="name">Name</label>
                    <div>
                        <input type="text" {...register('name')} placeholder="Name"/>
                        <span>{errors['name']?.message}</span>
                    </div>

                </div>
                <div>
                    <label htmlFor="surname">Surname</label>
                    <div>
                        <input type="text" {...register('surname')} placeholder="Surname"/>
                        <span>{errors['surname']?.message}</span>
                    </div>
                </div>
                <div>
                    <label htmlFor="age">Age</label>
                    <div>
                        <input type="number" min="1" {...register('age')} placeholder="Age"/>
                        <span>{errors['age']?.message}</span>
                    </div>
                </div>
                <div>
                    <label htmlFor="citizenship">Сitizenship</label>
                    <select type="text" {...register('citizenship')}>
                        {citizenship.map(country => <option key={country}>{country}</option>)}
                    </select>
                </div>
                <div className="submit-wrapper">
                    <input type="submit" value="Register"/>
                    <input type="reset" value="Reset"/>
                </div>
            </form>
        </div>
    )
}