import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';

const Navbar = () =>{
    return(
        <>
            <Nav>
                <Bars/>
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
                    <NavBtnLink to='/signin'>Admin Panel</NavBtnLink>

                </NavBtn>
            </Nav>
            </>
    );
};

export default Navbar;