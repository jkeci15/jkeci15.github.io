import React from 'react';
import './LoginForm.css'
const Password = () =>{
    return(
        <div className="new-expense__controls" >
            <label >Password</label>
            <input
                type="password"
                placeholder="************"
                >
            </input>
        </div>
    );
}

export default Password;