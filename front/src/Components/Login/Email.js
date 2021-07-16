import React from 'react';

const Email = () =>{
    return(
        <div>
            <label>Email</label>
            <input
                type="email"
                placeholder="john.doe@example.com"
                name="email-input">
            </input>
        </div>
    );
}

export default Email;