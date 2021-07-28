import React, { useState, useEffect, useCallback, useContext } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import AuthorContext from '../../store/author-context';
import Card from "../Card";
import AuthorList from "./AuthorList"
import './AuthorWrapper.css'

const AuthorWrapper = () => {

    const [authors, setAuthors] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState(null)
    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn
    const authorCtx = useContext(AuthorContext)

    const fetchAuthorsHandler = useCallback(async () => {
        setisLoading(true)
        setError(null)
        try {
            const authors = await fetchAuthors()
            setAuthors(authors)
            authorCtx.setHasChanged(false)
        } catch (error) {
            setError(error.message)
        }
        setisLoading(false)
    }, [authorCtx])

    useEffect(() => {
        fetchAuthorsHandler();
    }, [fetchAuthorsHandler, authorCtx.hasChanged])

    const getAuthorContent = useCallback((authors) => {
        if (error) {
            return <p>{error}</p>
        }
        if (isLoading) {
            return <p>Loading....</p>
        }
        if (authors.length > 0) {
            return <AuthorList authors={authors} />
        }
        else {
            return <p>Found no Authors!</p>
        }
    }, [error, isLoading])

    const [authorContent, setAuthorContent] = useState(getAuthorContent(authors));
    useEffect(() => {
        setAuthorContent(getAuthorContent(authors))
    }, [getAuthorContent, authors])

    return (
        <div>
            <section>
            <Card className="authors">
                {isLoggedIn ? <Link to='/newAuthor' className="createButton">Add Author</Link> : ""}
                {authorContent}
            </Card>
            </section>
        </div>

    )
}



const fetchAuthors = async () => {
    const response = await fetch('/authors')
    if (!response.ok) {
        throw new Error('Something went wrong')
    }
    const data = await response.json()
    const dataArray = []
    const transformedData = data.map((author) => (
        {
            id: author._id,
            name: author.name,
            bio: author.bio
        }))
    transformedData.forEach(element => (
        dataArray.push(element)
    ));
    return dataArray
}

export default AuthorWrapper