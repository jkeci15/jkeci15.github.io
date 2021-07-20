import React from 'react';
import './LoginButton.css'
const LoginButton = () => {
    return (
        <div>
        <button className="login-button"
                type="submit"
                onClick={() => alert("Ready to be signed in with email: AAAAA password: BBBB")}

            >Sign In</button>
        </div>
    );
}
export default LoginButton;