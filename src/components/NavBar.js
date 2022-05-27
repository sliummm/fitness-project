import React from 'react'

import { Menuitems } from '../utilities/Menuitem';
import { Link } from 'react-router-dom';
import { Dropdown as SubMenu, Menu } from 'semantic-ui-react';


const NavBar = () =>{

    const onHoverOver = (e)=>{
        e.target.style.background='Gainsboro';
    }

    const onHoverOut = (e)=>{
        e.target.style.background= null;
    }

    return (
        <div>
            <Menu secondary vertical size='mini'>
                {
                    Menuitems.map((menuitem,index)=>{
                        if (!menuitem.subMenu) {
                            return(
                                <Menu.Item
                                    key={index}>
                                    <Link
                                        key={index}
                                        className="item" 
                                        onMouseOver={onHoverOver} 
                                        onMouseOut={onHoverOut}
                                        to={menuitem.url}
                                    >
                                        {menuitem.title}
                                    </Link>
                                </Menu.Item>)
                        } else {
                            return(
                                <SubMenu 
                                    item 
                                    text={menuitem.title}
                                    onMouseOver={onHoverOver} 
                                    onMouseOut={onHoverOut}
                                >
                                {/* TO-DO:fix the style of submenu */}
                                    <SubMenu.Menu>
                                        {menuitem.subMenu.map((sub,index)=>{
                                            return(
                                                    <SubMenu.Item>
                                                        <Link
                                                            key={index}
                                                            className="item" 
                                                            to={sub.url}
                                                        >
                                                            {sub.title}
                                                        </Link>
                                                    </SubMenu.Item>
                                                )
                                        })}
                                    </SubMenu.Menu>
    
                              </SubMenu>
                            )
                        }
                        
                    })
                }
            </Menu>
        </div>

    )
}


export default NavBar