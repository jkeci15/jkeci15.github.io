import { useContext } from 'react'
import AuthContext from '../store/auth-context'
import BookContext from '../store/book-context'
import './Book.css'
import Card from './Card'
const Book = (props) => {

    const authCtx = useContext(AuthContext)
    const isLoggedin = authCtx.isLoggedIn
    const bookCtx = useContext(BookContext)
    const onDeleteSubmitHandler = async (book_id) => {
        try {
            const shouldDelete = window.confirm("Are you sure you want to delete this book?")
            if (!shouldDelete) return
            
            const response = await fetch(`/books/${book_id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            if (response.status <= 300) {
                bookCtx.setHasChanged(true)
            }
            else {
                throw new Error('Could not delete item')
            }
        } catch (error) {
            console.log(error.message);
        }

    }
    return (
        <Card className="wrapper">
            <div className="book-item" >
                <div className="image-div book-item">
                    <img className="image-tab" src={`data:image/png;base64,${props.bookCover}`} alt={props.title} />
                </div>
                <div className="text-block">
                    <h2>{props.title}</h2>
                    <h3>By: {props.author}</h3>
                    <p><em> {props.description}</em></p>
                    <p>{props.image}</p>
                </div>
                <div className="actions">
                    {isLoggedin ? <button className="editButton" type="button">Edit</button> : ''}
                    {isLoggedin ? <button className="deleteButton" type="button" onClick={() => onDeleteSubmitHandler(props.id.valueOf())}>Delete</button> : ''}
                </div>

            </div>
        </Card>

    )
}

export default Book