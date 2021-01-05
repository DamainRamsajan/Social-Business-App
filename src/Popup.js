import { Button } from "@material-ui/core";
import "./Popup.css"
// import CloseIcon from "@material-ui/icons/Close"
const Popup = (props) => {
    return (
      <div className="popup__container">
        <div className="popup">
          <span className="popup__closeIcon" onClick={props.handleClose}>
          <Button onClick = {props.finishUpload}>Done</Button>
          </span>
          
          {props.content}
        </div>
      </div>
    )
  }
  
  export default Popup
  