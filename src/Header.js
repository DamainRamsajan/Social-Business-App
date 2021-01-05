import React from 'react'
import "./Header.css"
import SearchIcon from "@material-ui/icons/Search"
import HeaderOption from './HeaderOption'
import HomeIcon from "@material-ui/icons/Home"
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount"
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter"
import ChatIcon from "@material-ui/icons/Chat"
import NotificationsIcon from "@material-ui/icons/Notifications"
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectuser} from './features/userSlice'
import { auth } from './firebase'
import { Avatar } from '@material-ui/core'

function Header() {

    const dispatch = useDispatch();

    const user = useSelector(selectuser);

    const logoutOfApp = () => {
        dispatch(logout())
       auth.signOut();
    }

    return (
        <div className = "header">           

            <div className = "header__left">
                <img src = "/images/logo3.png" alt = "" />
                
                <div className = "header__search">
                    <SearchIcon/>
                    <input type = "text" placeholder = "Search" />

                </div>
            </div>

            <div className = "header__right">
                <HeaderOption Icon= {HomeIcon} title = "Home" />
                <HeaderOption Icon= {SupervisorAccountIcon} title = "My Network" />
                <HeaderOption Icon= {BusinessCenterIcon} title = "Jobs" />
                <HeaderOption Icon= {ChatIcon} title = "Messaging" />
                <HeaderOption Icon= {NotificationsIcon} title = "Notifications" />
                      
                <Avatar 
                 src = {user?.avatar}
                 onClick={logoutOfApp} 
                 className = "header__avatar"/>
                     {/* {user?.email[0]?.toUpperCase()} */}
                {/* </Avatar>              */}

            </div>
        </div>
    )
}

export default Header