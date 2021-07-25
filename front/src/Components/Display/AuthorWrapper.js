import React, {useState, useEffect, useCallback} from 'react'
import Card from "../Card";
import AuthorList from "./AuthorList"
import './BookWrapper.css'
const AuthorWrapper = () => {

    const [authors, setAuthors] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchAuthorsHandler = useCallback( async() => {
        setisLoading(true)
        setError(null)
        try {
            const response = await fetch('/authors')
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            const data = await response.json()
            const transformedAuthor = data.map((author) => {
                return {
                    id: author._id,
                    name: author.name,
                    bio: author.bio
                }
            })
            setAuthors(transformedAuthor)
        } catch (error) {
            setError(error.message)
        }
        setisLoading(false)
    },[])

    useEffect(()=>{
        fetchAuthorsHandler();
    },[fetchAuthorsHandler])

    let authorContent = <p>Found no Books!</p>
    if (authors.length > 0) {
        authorContent = <Card className="books">
        <AuthorList authors={authors} />
    </Card>
    }
    if (error) {
        authorContent = <p>{error}</p>
    }
    if (isLoading) {
        authorContent = <p>Loading....</p>
    }
    return (
        <div>
            <section>
                {authorContent}
            </section>
        </div>

    )
}

export default AuthorWrapper