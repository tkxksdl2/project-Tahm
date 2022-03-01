import React from "react";
import Sidebar from "./sidebar";

const Body = () => {
    const bodyStyle = {
        height:"100vh",
        display:"flex",
        flexDirection:"row",
        justifycontent:"flexEnd",
        overflow:"hidden"
        
    }
    const mainImg = {
        width:"250px",
        height:"250px",
        position:"relative",
        top:"50%",
        marginTop:"-125px",
        marginLeft:"-125px",
        
    }
    return(
        <div style={bodyStyle}>
            <div>
                <li>
                스탯창
                </li>
                HP:100
            </div>

            <div style={{textAlign:"center", order:1, flexGrow:1}}>
                <img src="./img/main.png" style={mainImg} />
            </div>
            <div style={{order:2, zIndex:100}}>
                <Sidebar height={"100vh"}></Sidebar>
            </div>
        </div>

    );
};

export default Body;