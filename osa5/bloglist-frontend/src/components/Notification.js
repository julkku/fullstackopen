import React from 'react';

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    const style = {
        fontSize: "20px",
        color: "gray",
        borderStyle: "solid",
        borderRadius: "5px",
        borderColor:"blue",
        padding: "10px",
        marginBottom: "10px"
        
    }
  
    return (
      <div style={style} className="error">
        {message}
      </div>
    )
  }

export default Notification