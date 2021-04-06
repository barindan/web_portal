import React from 'react';
import logo from '../static/headerLogo.png'

class PortalHeader extends React.Component{
    render() {
        return(
            <div className={"headerAva"}>
                <img src={logo} alt={"web_portal_logo"}/>
                <div className={"headerNav"}>
                    <nav>
                        <a href={"#text1"}>PHP </a>
                        <a href={"#text2"}>OOP </a>
                        <a href={"#text3"}>Example </a>
                        <a href={"#logout"}>LogOut </a>
                    </nav>
                </div>
            </div>
        );
    }
}

export default PortalHeader;