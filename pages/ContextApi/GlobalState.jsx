import { createContext, useState } from 'react'

const TodosContext = createContext()


const TodosProvider = ({ children }) => {

    const [contractAddresss, setContractAddresss] = useState("");


    return (
       <TodosContext.Provider value={{contractAddresss, setContractAddresss}}>
           {children}
       </TodosContext.Provider>
    )
}

export {TodosProvider, TodosContext}