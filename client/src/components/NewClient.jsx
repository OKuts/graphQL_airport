import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {formClientSchema} from "./schemas/formClientSchema";
import {useMutation} from "@apollo/client";

import {CREATE_CLIENT} from "../mutations/create_client";

const citizenship = ['CANADA', 'UKRAINE', 'USA', 'FRANCE']

export const NewClient = ({refetch}) => {
    const [cn, setCn] = useState('form-wrapper')
    const [createClient] = useMutation(CREATE_CLIENT);
    const [result, setResult] = useState([])

    useEffect(() => setCn('form-wrapper show'), [])

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        mode: 'onTouched',
        resolver: yupResolver(formClientSchema),
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
            refetch()
            reset()
            const {name, surname, age, citizenship} = data.createClient
            setResult([ ...result, {name, surname, age, citizenship}])
        }).catch(err => console.log(err))
    })

    return (
        <>
            <table className="result">
                <tbody>
                {result.map((item, i) =>
                    <tr key={i}>
                        <td>{item.name}</td>
                        <td>{item.surname}</td>
                        <td>{item.age}</td>
                        <td>{item.citizenship}</td>
                        <td style={{color: 'green'}}>✔</td>
                    </tr>)
                }
                </tbody>
            </table>
            <div className={cn}>
                <form className="new-client" onSubmit={sendForm}>
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
        </>
    )
}