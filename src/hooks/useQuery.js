import {useLocation} from "react-router-dom"

/*we want to create a custom hook which can help in get the new location URL and parse it to use */

export const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

// use location makes a new location object , The search property of the location object is extracted, which contains the query string
// we parse the query string using URLSearchParams