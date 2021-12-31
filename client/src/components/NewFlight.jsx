import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {formClientSchema} from "./schemas/formClientSchema";
import {useQuery} from "@apollo/client";
import {QUERY_ALL_COMPANIES} from "../query/all_companies";
import {QUERY_ALL_DIRECTS} from "../query/all_directs";

export const NewFlight = () => {
    const {data: companies, loading: companiesLoading, error: companiesError} = useQuery(QUERY_ALL_COMPANIES)
    const {data: directs, loading: directsLoading, error: directsError} = useQuery(QUERY_ALL_DIRECTS)

    const [cn, setCn] = useState('form-wrapper')

    useEffect(() => setCn('form-wrapper show'), [])

    const {register, watch, handleSubmit, formState: {errors}} = useForm({
        mode: 'onTouched',
        // resolver: yupResolver(formClientSchema),
    })

    const submitFlight = handleSubmit((formData) => {
        console.log(formData)
    })

    console.log(watch().company)

    return (
        <div className="registration">
            <div className="companies">
                {!companiesError
                    && !companiesLoading
                    && companies.companies.map((company, i) =>
                        company.name.includes(watch().company)
                            ? <p key={company.id}>{company.name}</p>
                            : <p key={i} style={{color: 'red'}}>New company</p>)}
            </div>
            <div className={cn}>
                <form onSubmit={submitFlight}>
                    <div>
                        <label htmlFor="name">Company</label>
                        <div>
                            <input type="text" {...register('company')} placeholder="Company"/>
                            <span>{errors['company']?.message}</span>
                        </div>

                    </div>
                    <div>
                        <label htmlFor="direct">Direct</label>
                        <div>
                            <input type="text" {...register('direct')} placeholder="Direct"/>
                            <span>{errors['direct']?.message}</span>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <div>
                            <input type="date" {...register('date')}/>
                            <span>{errors['date']?.message}</span>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="time">Time</label>
                        <div>
                            <input type="time" {...register('time')}/>
                            <span>{errors['time']?.message}</span>
                        </div>
                    </div>
                    <div className="submit-wrapper">
                        <input type="submit" value="Register"/>
                        <input type="reset" value="Reset"/>
                    </div>
                </form>
            </div>
            <div className="directs">
                {!directsLoading
                    && !directsError
                    && directs.directs.map((direct, i) =>
                    direct.direct.includes(watch().direct)
                        ? <p key={direct.id}>{direct.direct}</p>
                        : <p key={i} style={{color: 'red'}}>New direction</p>)
                }
            </div>
        </div>
    )
}