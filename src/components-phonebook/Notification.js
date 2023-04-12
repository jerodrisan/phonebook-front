
const Notification = (props) =>{    

    const notificationStyleSucceeded ={
        color: 'green',
        fontStyle: 'italic',
        border: '1px solid' ,
        padding:'5px',
        backgroundColor:'yellow'
    }

    const notificationStyleError ={
        color: 'red',
        fontStyle: 'italic',
        border: '1px solid red',
        padding:'5px',
        backgroundColor:'gray'
    }
    const {notificationSuccess, notificationError} = props.message          

    const message = notificationSuccess || notificationError
    const notificationStyle = message ===notificationSuccess ?notificationStyleSucceeded:notificationStyleError
    
    if (message === null)
        return null    
 
    return (
        <div>
            <div style={notificationStyle} >{message}</div>
        </div>
       
    )
}

export default Notification;