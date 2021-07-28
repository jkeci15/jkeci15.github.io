import React, { useState, useEffect, useCallback, useContext } from 'react'
import Card from "../Card";
import BookList from "./BookList"
import './BookWrapper.css'
import AuthContext from '../../store/auth-context';
import BookContext from '../../store/book-context';
import { Link } from 'react-router-dom';

const BookWrapper = () => {

    const [books, setBooks] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState(null)
    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn
    const bookCtx = useContext(BookContext)

    const fetchBooksHandler = useCallback(async () => {
        setisLoading(true)
        setError(null)
        try {
            const response = await fetch('/books')
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            const data = await response.json()
            const transformedBooks = data.map((book) => {
                return {
                    id: book._id,
                    title: book.name,
                    description: book.description,
                    bookCover: Buffer.from(book.bookCover).toString('base64'),
                    author: book.author,
                    categories: book.categories
                }
            })
            setBooks(transformedBooks)
            bookCtx.setHasChanged(false)
        } catch (error) {
            setError(error.message)
        }
        setisLoading(false)
    }, [bookCtx])

    useEffect(() => {
        fetchBooksHandler();
    }, [fetchBooksHandler, bookCtx.hasChanged])

    const getBookContent = useCallback((books) => {
        if (error) {
            return <p>{error}</p>
        }
        if (isLoading) {
            return <p>Loading....</p>
        }
        if (books.length > 0) {
            return <BookList books={books} />
        }
        else {
            return <p>Found no Books!</p>
        }
    }, [error, isLoading])

    const [bookContent, setBookContent] = useState(getBookContent(books));
    useEffect(() => {
        setBookContent(getBookContent(books))
    }, [getBookContent, books])


    return (
        <section>
            <Card className="books">
                {isLoggedIn ? <Link to='/newBook' className="createButton">Add Book</Link> : ""}
                {bookContent}
            </Card>
        </section>
    )
}

export default BookWrapper