import React from "react";

const Body = () => {
    const bodyStyle = {
        height:"100vh",
        textAlign:"center",
    }
    const mainImg = {
        width:"250px",
        height:"250px",
        position:"absolute",
        top:"50%",
        marginTop:"-125px",
        marginLeft:"-125px"
        
    }
    return(
        <div style={bodyStyle}>
            <img src="./img/main.png" style={mainImg} />
        </div>
    );
};

export default Body;