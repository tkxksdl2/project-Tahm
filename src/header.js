import React from "react";
import theme from './styles/colorTheme';


const Header = () => {
    const divStyle = {
        fontSize:"25px",
        backgroundColor:theme.inner,
        padding:"5px",
        height:"40px",
        color: theme.line
        
    }
    
    return(
        <div style={divStyle}>
            Tahm' Kench Simulator
        </div>
    );
};

export default Header;