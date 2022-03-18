import React, {useState, useEffect } from "react";

// item = {name, abillity, star1,..2,..3, cost}
const Portrait = ({item}) => {
    const [state, setState] = useState({
        star:1,
        cost:item.cost,
    });
    const [starSrc, setSrc] = useState({
        src:[]
    })
    const imgsrc = "./img/champions/" + item.name + ".png";

    useEffect(() => {
        if (state.star === 1) {
            setSrc({
                src:["./img/ystar.png", "./img/star.png", "./img/star.png"]
            });
        } else if (state.star === 2) {
            setSrc({
                src:["./img/ystar.png", "./img/ystar.png", "./img/star.png"]
            });
        } else{
            setSrc({
                src:["./img/ystar.png", "./img/ystar.png", "./img/ystar.png"]
            });
        };
    }, [state]);

    const changeStar = (i) =>{
        setState({
            ...state,
            star:i
        });
    };


    const portraitImg = {
        width:"60px",
        height:"60px",
        position:"relative",
        top:"50%",
        marginTop:"-20px",
        
    };
    const starDiv ={
        backgroundColor:"rgba(0,0,0,0.2)",
        zIndex:2,
        position:"relative",
        top:"2.1rem",
        left:"1.15rem",
        width:"60px",
        textAlign:"center",
        height:"1rem"
    };


    return (
        <div draggable style={{textAlign:"center"}}>
            <img src={imgsrc} style={portraitImg} />
            <div style={starDiv}>
                <img onClick={() => {changeStar(1)}} src={starSrc.src[0]} style={{height:"100%", marginTop:"-0.5rem"}}/>
                <img onClick={() => {changeStar(2)}} src={starSrc.src[1]} style={{height:"100%", marginTop:"-0.5rem"}}/>
                <img onClick={() => {changeStar(3)}} src={starSrc.src[2]} style={{height:"100%", marginTop:"-0.5rem"}}/>
            </div>
        </div>
    );
};

export default Portrait;