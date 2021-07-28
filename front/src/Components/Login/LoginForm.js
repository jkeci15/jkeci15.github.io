import React, { useState, useRef, useContext } from 'react'
import {useHistory} from 'react-router-dom'
import AuthContext from '../../store/auth-context';
import './LoginForm.css'
const axios = require('axios')

const LoginForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };
    const emailInputRef = useRef();
    const passwordInputRef = useRef()
    
    const history = useHistory()
    const AuthCtx = useContext(AuthContext)

    const sendRequest = async (operationName, payload) => {
        const url = `http://127.0.0.1:3000/admin/${operationName}`

        try {
            const response = await axios({
                method: 'POST',
                url: url,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                },
                data: payload,
                mode: 'no-cors'
            })
            let responseOK = response && response.status === 200 && response.statusText === 'OK';
            if (responseOK) {
                let data = await response.data;
                AuthCtx.login(data.token)
                history.replace('/books')
            }
        }
        catch (e) {
            alert('Authentication failed')
        }

    }

    const formSubmissionHandler = (event) => {
        event.preventDefault()
        const enteredEmail = emailInputRef.current.value
        const enteredPassword = passwordInputRef.current.value

        const adminPayload = {
            email: enteredEmail,
            password: enteredPassword
        }
        if (isLogin) {
            sendRequest('login', adminPayload)
        }
        else {
            sendRequest('signup', adminPayload)
        }
    }


    return (
        <section className="auth">
            <h2> {isLogin ? 'Sign In' : 'Sign Up'}</h2>
            <form onSubmit={formSubmissionHandler}>
                <div className="control" >
                    <label>Email</label>
                    <input
                        id='email'
                        name='email'
                        ref={emailInputRef}
                        type="email"
                        placeholder="john.doe@example.com"
                        required
                    />

                </div>
                <div className="control" >
                    <label>Password</label>
                    <input
                        id='password'
                        name='password'
                        ref={passwordInputRef}
                        type="password"
                        required
                    />

                </div>
                <div className="actions">
                    <button className="loginFormButton"> {isLogin ? 'Login' : 'Create Account'}</button>
                    <button
                        type="submit"
                        className="toggle loginFormButton"
                        onClick={switchAuthModeHandler}

                    >{isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
}
export default LoginForm;