import { useContext } from 'react'
import AuthContext from '../store/auth-context'
import CategoryContext from "../store/category-context";
import Card from './Card'
import './Category.css'

const Category = (props) => {

    const authCtx = useContext(AuthContext)
    const isLoggedin = authCtx.isLoggedIn
    const categoryCtx = useContext(CategoryContext)
    const onDeleteSubmitHandler = async (category_id) => {
        try {
            const shouldDelete = window.confirm("Are you sure you want to delete this category?")
            if (!shouldDelete) return

            const response = await fetch(`/category/${category_id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            if (response.status <= 300) {
                categoryCtx.setHasChanged(true)
            }
            else {
                throw new Error('Could not delete item')
            }
        } catch (error) {
            console.log(error.message);
        }

    }
    return (
        <div className="container">
            <Card className="wrapper">
                <p>{props.title}</p>
            </Card>
            {isLoggedin ? <button className="editButton categoryFormButton" type="button"
                // onClick={() => onEditSubmitHandler(props.id.valueOf())}> Edit </button> : ''}
                > Edit </button> : ''}
            {isLoggedin ? <button className="deleteButton categoryFormButton" type="button"
                onClick={() => onDeleteSubmitHandler(props.id.valueOf())}> Delete </button> : ''}
        </div>
    )
}

export default Category