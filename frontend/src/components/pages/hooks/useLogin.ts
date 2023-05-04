import {useState} from "react";
import useAuthContext from "@/context/hooks/useAuthContext";

export const useLogin = () =>{
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {dispatch} = useAuthContext()
    const login = async(email: string, password: string) => {
        setError(null)
        setIsLoading(true)
        const response = await fetch('http://localhost:8082/api/user/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });
        const json = await response.json();

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setError(null)
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
        }
        setIsLoading(false)
    }
    return {
        login,
        error,
        isLoading
    }
}