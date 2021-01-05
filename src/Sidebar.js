import { Avatar } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectuser } from './features/userSlice';
import "./Sidebar.css"

function Sidebar() {

    const user = useSelector(selectuser);

    const recentItem = (topic) => (
        <div className = "sidebar__recentItem">
            <span className = "sidebar__hash">#</span>
            <p>{topic}</p>
        </div>
    );

    return (
        <div className = "sidebar">
            <div className = "sidebar__top">
                <img src ="/images/header-background.jpg" alt = ""/>
                <Avatar className = "sidebar__avatar" src = {user?.avatar}/>
                    {/* {user?.email[0]?.toUpperCase()} */}
                {/* </Avatar> */}
                   
                <h2>{user?.displayName}</h2>
                <h4>{user?.email}</h4>
            </div>
            <div className = "sidebar__stats">
                <div className = "sidebar__stat">
                    <p>Who Viewed You</p>
                    <p className = "sidebar__statNumber">2777</p>
                </div>
                <div className = "sidebar__stat">
                    <p>Views on Post</p>
                    <p className = "sidebar__statNumber">3777</p>
                </div>
            </div>

            <div className = "sidebar__top">
                <img src ="/images/calabashBanner5.jpg" alt = ""/>
                <Avatar variant="square" className = "sidebar__bizAvatar" src = "/images/logo2.png" />
                <h2>Intelica Software Solutions</h2>
                {/* <h4>peterdramsajan@gmail.com</h4> */}
            </div>
            <div className = "sidebar__stats">
                <div className = "sidebar__stat">
                    <p>Page Notifications</p>
                    <p className = "sidebar__statNumber">7777</p>
                </div>
                <div className = "sidebar__stat">
                    <p>Page Visitors</p>
                    <p className = "sidebar__statNumber">77777</p>
                </div>
            </div>

            <div className = "sidebar__bottom">
                <p>Recent</p>
                {recentItem("Dinner With Borat")}
                {recentItem("Ride to the Moon with Elon")}
                {recentItem("Klingon War")}
                {recentItem("Finding Mike Pence Fly")}
                {recentItem("Cure for Covid")}
                {recentItem("Next to the cure for blindness")}

            </div>
        </div>
    )
}

export default Sidebar
