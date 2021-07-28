import React, { useContext, useRef} from "react"
import { useHistory } from "react-router"
import AuthContext from "../../store/auth-context"

const CreateAuthorForm = () => {
    const history = useHistory()
    const authCtx = useContext(AuthContext)
    if (!authCtx.isLoggedIn) history.replace("/authors")

    const authorName = useRef()
    const authorBio = useRef()
    const formSubmitHandler = async (event) =>{
        event.preventDefault()
        try {
            const response = await fetch('/authors',{
                method: 'POST',
                body: JSON.stringify( {
                    name: authorName.current.value.trim(),
                    bio: authorBio.current.value.trim()
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                },
            })
            if(response.ok){
                history.replace('/authors')
            }
            else{
                throw new Error('Could not create author')
            }
        } catch (error) {
            console.log(error.message);
        }
        
    }
    return (
        <section className="auth">
            <h2>Add Author</h2>
            <form onSubmit={formSubmitHandler}>
                <div className="control" >
                    <label>Name</label>
                    <input type="text" ref={authorName} required/>
                </div>
                <div className="control" >
                    <label>Bio</label>
                    <input type="text" ref={authorBio} required/>
                </div>
                <div className="actions">
                    <button className="loginFormButton">Add Author</button>
                </div>
            </form>
        </section>
    )
}

export default CreateAuthorForm