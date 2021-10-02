import React from 'react'
import cbLogo from '../images/logo2.png'
import hamburger from '../images/hamburger.png'

import { NavLink } from 'react-router-dom'

const links = [
    {title: "Home", to:"/"},
    {title: "Payments", to:"/payments"},
    {title: "Merchants", to:"/merchants"},
    {title: "Buyers", to:"/buyers"},
    {title: "Sign In", to:"/signin"}
]

function NavBar(props) {
    return (
        <ul class="flex flex-col mx-2">
            {links.map(link => 
                <NavLink to={link.to}>
                    <li class="p-2 text-sm">{link.title}</li>
                </NavLink>
            )}
        </ul>
    );
}

class Header extends React.Component {

    constructor (props) {
        super(props)
        this.toggleNavBar = this.toggleNavBar.bind(this)
        this.state = {
            navBarVisible: false
        }
    }

    toggleNavBar() {
        this.setState((state) => ({
            navBarVisible: !state.navBarVisible
        }))
    }

    render () {
        return (
            <div>
                <div class="flex flex-row justify-between items-center m-4">
                    <div class="flex flex-row items-center"> 
                        <img class="w-12 mr-2" src={cbLogo} alt="CryptoBank Logo"/>
                        <h1 class="text-xl font-semibold">CryptoBank Payments</h1>
                    </div>
                    <img class="w-6" src={hamburger} alt="Menu" onClick={this.toggleNavBar}/>
                </div>
                {this.state.navBarVisible &&  <NavBar/>}
            </div>
        );
    }
}

export default Header