import React, { useEffect, useState } from 'react'
import "./Feed.css"
import CreateIcon from "@material-ui/icons/Create"
import InputOption from './InputOption'
import ImageIcon from "@material-ui/icons/Image"
import SubscriptionsIcon from "@material-ui/icons/Subscriptions"
import EventNoteIcon from "@material-ui/icons/EventNote"
import CalendaViewDayIcon from "@material-ui/icons/CalendarViewDay"
import Post from './Post'
import { firebaseApp, db } from './firebase'
import firebase from "firebase"
import { useSelector } from 'react-redux'
import { selectuser } from './features/userSlice'
import {Animated} from "react-animated-css";
import Popup from "./Popup";

function Feed() {
    const [posts, setPosts] = useState ([]);
    const [input, setInput] = useState ("");
    const user = useSelector(selectuser);
    const [photoUrl, setPhotoUrl] = useState (null);
    const [isOpen, setIsOpen] = useState(false)

    const togglePopup = () => {
        setIsOpen(!isOpen)
    }

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const storageRef = firebaseApp.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        setPhotoUrl (await fileRef.getDownloadURL())
        togglePopup();
    }

    const onFileSubmit = (e) => {
        e.preventDefault ()
    }

    useEffect(() => {
        db.collection("posts").orderBy("timestamp", "desc")
        .onSnapshot(snapshot => (
        setPosts(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        ))
        
    }, [])

    const sendPost = (e) => {
        e.preventDefault ();

        db.collection("posts").add({
            name: user.displayName,
            description: user.email,
            message: input,
            photoUrl: photoUrl,
            avatar: user.avatar,
            timestamp: firebase.firestore.FieldValue.serverTimestamp (),
        });
        setInput ("");
        setIsOpen (false);
    };

    return (
        <div>
           <div className = "feed__inputContainer">
               <div className="feed__input">
                   <CreateIcon />
                   <form>
                        <input value = {input} onChange={e => setInput (e.target.value)}  type="text" />
                        <button onClick={sendPost} type = "submit">send</button>
                        <img src="/images/logo.png" alt="" />
                        
                   </form>
               </div>

               {isOpen && (
                    <div className = "feed__popup">
                        
                        <Popup
                        content={
                            <div>
                                <h1>{photoUrl?.name}</h1>
                                <img className = "feed__popupImage" src= {photoUrl} alt =""/>
                                <button className = "feed__popupButton" onClick ={sendPost}>Done</button>
                            </div>
                        }
                        handleClose={togglePopup}
                        finishUpload={sendPost} 
                        /> 
                                          
                    </div>
                )}

               <div className = "feed__inputOptions">
               
                
                    <form onSubmit= {onFileSubmit}>
                        
                        <label for="actual-btn"> <InputOption Icon = {ImageIcon} title ="Photo" color="#990000"/></label>
                        
                        <input type="file" onChange = {onFileChange} id="actual-btn" hidden />
                    </form>
                
                <InputOption Icon = {SubscriptionsIcon} title ="Video" color="#990000"  />
                <InputOption Icon = {EventNoteIcon} title ="Event" color="#990000"  />
                <InputOption Icon = {CalendaViewDayIcon} title ="Write Article" color="#990000"  />              
               </div>
           </div>     

           <Animated animationIn="bounceIn" animationOut="bounceOut" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                {posts.map(({id, data:{name, description, message, photoUrl, avatar} }) => (
                    
                    <Post
                            key= {id}
                            name={name}
                            description={description}
                            message={message}
                            photoUrl={photoUrl}
                            avatar={avatar}
                    />
                ))}
           </Animated>
           
          
           <Post name= "Beany Baby" description= "Founder at your moma's place" message= 
           "your mom is still angry with me for rubbing pepper on her butt plug" 
           photoUrl="/images/bean.jpeg" avatar="/images/beany.jpg"/>
        </div>
    )
}

export default Feed
