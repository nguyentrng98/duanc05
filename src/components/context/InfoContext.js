import baseAxios, { METHOD_HTTP } from "../../configs/baseAxios";


const { createContext, useState, useEffect } = require("react");

export const InfoContext = createContext()

export const InfoProvider = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        getInfo()
    },[])
    const getInfo = async() => {
        try{
            let data = await baseAxios(METHOD_HTTP.GET, "users/get-profile ")
            setUser(data)
        } catch(e) {
            setUser(null)
        }
    }
    return(
        <InfoContext.Provider value={{user, setUser}} >
            {children}
        </InfoContext.Provider>
    )
} 