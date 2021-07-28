import React, {useState} from 'react'

const AuthorContext = React.createContext({
    hasChanged: false,
    setHasChanged: () => null
})

export const AuthorContextProvider = (props)=>{
    const [hasChanged, setHasChanged] = useState(false)
    const contextValue = {
        hasChanged: hasChanged,
        setHasChanged: setHasChanged,
    }
    return (<AuthorContext.Provider value={contextValue}>
    {props.children}
    </AuthorContext.Provider>
    )
}

export default AuthorContext