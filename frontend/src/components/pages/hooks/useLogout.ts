import useAuthContext from "@/context/hooks/useAuthContext";

export const useLogout = () =>{
    const {dispatch} = useAuthContext()
    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
    }
    return {
        logout
    }
}