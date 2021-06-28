import { createContext, useState } from 'react'

const GlobalContext = createContext()


const GlobalProvider = ({ children }) => {

    const [contractAddresss, setContractAddresss] = useState("");


    return (
       <GlobalContext.Provider value={{contractAddresss, setContractAddresss}}>
           {children}
       </GlobalContext.Provider>
    )
}

export {GlobalProvider, GlobalContext}