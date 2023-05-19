import { useState, useEffect } from "react";
import axios from "axios";
import {RAPID_API_KEY} from '@env'

const useFetch = ({endPoint, query}) => {
    const [data,setData] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState(null)
    const RapidApikey = RAPID_API_KEY


    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endPoint}`,
        headers: {
            'X-RapidAPI-Key': RapidApikey,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
          },
        params: {...query},
       
      };
      
      const fetchData = async () => {
        setIsLoading(true);
        try {
             const response = await axios.request(options);
             setData(response.data.data)
             setIsLoading(false)
        } catch (error) {
            setError(error)
            alert("There is an error")
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
      }

      useEffect(() => {
        fetchData();
      }, [])

      const refetch = () => {
        setIsLoading(true);
        fetchData();
      }
}