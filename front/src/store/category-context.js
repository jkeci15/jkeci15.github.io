import React, {useState} from 'react'

const CategoryContext = React.createContext({
    hasChanged: false,
    setHasChanged: () => null
})

export const CategoryContextProvider = (props)=>{
    const [hasChanged, setHasChanged] = useState(false)
    const contextValue = {
        hasChanged: hasChanged,
        setHasChanged: setHasChanged,
    }
    return (<CategoryContext.Provider value={contextValue}>
    {props.children}
    </CategoryContext.Provider>
    )
}

export default CategoryContext