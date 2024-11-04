import { useDispatch} from "react-redux"
import { useState, useEffect } from "react"

export const useService = (fun, dependency = []) => {
    const dispatch = useDispatch()
    const [data, setData] = useState(null)
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = () => {
        dispatch(fun())
        .then((res) => {
            setData(res.payload)
        })
        .catch((error) => {
            setError(error);
        })
        .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        fetchData()
    },[...dependency])

    const refetch = () => fetchData()
    return {data, isLoading, refetch}
}
