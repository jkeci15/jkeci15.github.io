import React, { useContext, useRef} from "react"
import { useHistory } from "react-router"
import AuthContext from "../../store/auth-context"

const CreateCategoryForm = () => {
    const history = useHistory()
    const authCtx = useContext(AuthContext)
    if (!authCtx.isLoggedIn) history.replace("/categories")

    const categoryName = useRef()
    const formSubmitHandler = async (event) =>{
        event.preventDefault()
        try {
            const response = await fetch('/category',{
                method: 'POST',
                body: JSON.stringify( {
                    name: categoryName.current.value.trim(),
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                },
            })
            if(response.ok){
                history.replace('/categories')
            }
            else{
                throw new Error('Could not create category')
            }
        } catch (error) {
            console.log(error.message);
        }
        
    }
    return (
        <section className="auth">
            <h2>Add Category</h2>
            <form onSubmit={formSubmitHandler}>
                <div className="control" >
                    <label>Name</label>
                    <input type="text" ref={categoryName} required/>
                </div>
                <div className="actions">
                    <button className="loginFormButton">Add Category</button>
                </div>
            </form>
        </section>
    )
}

export default CreateCategoryForm