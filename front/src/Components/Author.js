import { useContext } from 'react'
import AuthContext from '../store/auth-context'
import AuthorContext from '../store/author-context'
import Card from './Card'
import './Author.css'
const Author = (props) => {
    const authCtx = useContext(AuthContext)
    const isLoggedin = authCtx.isLoggedIn
    const authorCtx = useContext(AuthorContext)

    const onDeleteSubmitHandler = async (author_id) => {
        try {
            const shouldDelete = window.confirm("Are you sure you want to delete this author?")
            if (!shouldDelete) return
            
            const response = await fetch(`/authors/${author_id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            if (response.status <= 300) {
                authorCtx.setHasChanged(true)
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
            <h2>{props.name}</h2>
            <p><em> {props.bio}</em></p>
            <div className="actions">
                {isLoggedin ? <button className="editButton authorButton" type='button'>Edit</button> : ''}
                {isLoggedin ? <button className="deleteButton authorButton" onClick={() => onDeleteSubmitHandler(props.id.valueOf())}>Delete</button> : ''}
            </div>
        </Card>
    )
}

export default Author