import {useQuery} from "@apollo/client";
import {QUERY_ALL_CLIENTS} from "../query";
import {QUERY_ALL_COMPANIES} from "../query/all_companies";

export const CompanyList = ({refetch}) => {
    const {data: companies, loading: companiesLoading, error: companiesError} = useQuery(QUERY_ALL_COMPANIES)

    console.log()
    return (
        <div>
            <input type="text"/>
        </div>
    )
}