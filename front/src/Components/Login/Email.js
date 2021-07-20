import React from 'react';
import './LoginForm.css'
const Email = () =>{
    return(
        <div className="new-expense__controls" >
            <label>Email</label>
            <input
                type="email"
                placeholder="john.doe@example.com"
                >
            </input>
        </div>
    );
}

export default Email;