import {createContext, useEffect, useReducer} from 'react'


export const authReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    }
}

export const AuthContext = createContext<any>(null)

export const AuthContextProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        if (!state?.user) {
            dispatch({
                type: 'LOGIN',
                payload: typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('user') as any) : null
            })
        }
    }, [state?.user])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
