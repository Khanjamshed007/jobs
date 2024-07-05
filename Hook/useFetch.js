import React, { useEffect, useState } from 'react'
import axios from 'axios';


const useFetch = (endpoints, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)


    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '5b3871cf16mshf854cc0a6bbb79dp12a6edjsn6acdc1af16c1',
            'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        },
        url: `https://jsearch.p.rapidapi.com/${endpoints}`,
        params: { ...query },
    };

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await axios.request(options)
            setData(response.data.data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setError(error)
            alert("This is an error")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const refetch = () => {
        setIsLoading(true)
        fetchData()
    }

    return { data, isLoading, error, refetch }
}

export default useFetch;