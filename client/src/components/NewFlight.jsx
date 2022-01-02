import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "@apollo/client";
import {CREATE_COMPANY} from "../mutations/create_company";
import {CREATE_DIRECT} from "../mutations/create_direct";
import {formFlightSchema} from "./schemas/formFlightSchema";
import {CREATE_FLIGHT} from "../mutations/create_flight";
import {getValue} from "../helpers/getValue";

export const NewFlight = ({companiesData, directData, refetch}) => {
    const [createCompany] = useMutation(CREATE_COMPANY);
    const [createDirect] = useMutation(CREATE_DIRECT);
    const [createFlight] = useMutation(CREATE_FLIGHT);
    const {data: companies, loading: companiesLoading, error: companiesError, refetch: companiesRefetch} = companiesData
    const {data: directs, loading: directsLoading, error: directsError, refetch: directsRefetch} = directData
    const [result, setResult] = useState([])

    const [cn, setCn] = useState('form-wrapper')

    useEffect(() => setCn('form-wrapper show'), [])

    const {register, watch, handleSubmit, setValue, reset, formState: {errors}} = useForm({
        mode: 'onTouched',
        resolver: yupResolver(formFlightSchema),
    })

    const submitFlight = handleSubmit(async (formData) => {
        reset();
        let findCompanyId = companies.companies.find(company => company.name === formData.company)?.id
        let findDirectId = directs.directs.find(direct => direct.direct === formData.direct)?.id

        if (!findCompanyId) await createCompany({
            variables: {
                input: {
                    name: formData.company
                }
            }
        }).then(({data}) => {
            companiesRefetch()
            findCompanyId = data.createCompany.id
        })

        if (!findDirectId) await createDirect({
            variables: {
                input: {
                    direct: formData.direct
                }
            }
        }).then(({data}) => {
            directsRefetch()
            findDirectId = data.createDirect.id
        })

        createFlight({
            variables: {
                input: {
                    companyId: findCompanyId,
                    directId: findDirectId,
                    date: formData.date,
                    time: formData.time
                }
            }
        }).then(({data}) => {
            const {date, time, companyId, directId} = data.createFlight
            setResult([ ...result, {date, time,
                company: getValue(companies.companies, companyId, 'name') ,
                direct: getValue(directs.directs, directId, 'direct')
            }])
            refetch()
        })
    })

    return (
        <>
            <table className="result">
                <tbody>
                {result.map((item, i) =>
                    <tr key={i}>
                        <td>{item.date}</td>
                        <td>{item.time}</td>
                        <td>{item.company}</td>
                        <td>{item.direct}</td>
                        <td style={{color: 'green'}}>✔</td>
                    </tr>)
                }
                </tbody>
            </table>
            <div className="registration">
                <div className="companies">
                    <h3>Companies</h3>
                    {!companiesError
                    && !companiesLoading
                    && companies.companies.map(company =>
                        company.name.includes(watch().company)
                        && <p
                            onClick={() => setValue('company', company.name)}
                            key={company.id}>{company.name}</p>)
                    }
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
                    <h3>Directs</h3>
                    {!directsLoading
                    && !directsError
                    && directs.directs.map(direct =>
                        direct.direct.includes(watch().direct)
                        && <p
                            onClick={() => setValue('direct', direct.direct)}
                            key={direct.id}>{direct.direct}</p>)
                    }
                </div>
            </div>
        </>
    )
}