import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import {
    Nav,
    NavLink,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn

    return (
        <>
            <Nav>
                <NavMenu >
                    <NavLink to='/books'>
                        Books
                    </NavLink>
                    <NavLink to='/authors'>
                        Authors
                    </NavLink>
                    <NavLink to='/categories'>
                        Categories
                    </NavLink>
                </NavMenu>
                {!isLoggedIn && (<NavBtnLink to='/signin'>Admin Sign In</NavBtnLink>)}
                {isLoggedIn && (<NavBtn onClick={authCtx.logout}>Logout</NavBtn>)}
            </Nav>
        </>
    );
};

export default Navbar;