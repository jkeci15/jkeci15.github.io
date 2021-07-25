import React, {useContext} from 'react';
import AuthContext from '../../store/auth-context';
import {
  Nav,
  NavLink,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';

const Navbar = () =>{
    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn

    return(
        <>
            <Nav>
                <NavMenu >
                    <NavLink to='/'>
                        Books
                    </NavLink>
                    <NavLink to='/authors'>
                        Authors
                    </NavLink>
                    <NavLink to='/categories'>
                        Categories
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    {!isLoggedIn && (<NavBtnLink to='/signin'>Admin Sign In</NavBtnLink>)}
                    {isLoggedIn && (<NavBtnLink to='/logout'>Logout</NavBtnLink>)}
                </NavBtn>
            </Nav>
            </>
    );
};

export default Navbar;