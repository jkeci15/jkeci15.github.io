import React from 'react';

const LoginButton = () => {
    return(
        <input
            type="Submit"
            value="Sign in"
            onClick={() => alert("Ready to be signed in with email: AAAAA password: BBBB")}
                
            />
    );
}
export default LoginButton;