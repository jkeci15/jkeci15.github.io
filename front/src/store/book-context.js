import React, {useState} from 'react'

const BookContext = React.createContext({
    hasChanged: false,
    setHasChanged: () => null
})

export const BookContextProvider = (props)=>{
    const [hasChanged, setHasChanged] = useState(false)
    const contextValue = {
        hasChanged: hasChanged,
        setHasChanged: setHasChanged,
    }
    return (<BookContext.Provider value={contextValue}>
    {props.children}
    </BookContext.Provider>
    )
}

export default BookContext