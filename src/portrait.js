import React, {useState, useEffect } from "react";
import {useDrag} from "react-dnd";
import {costColor} from "./styles/colorTheme";

// item = {name, abillity, star1,..2,..3, cost}
const Portrait = ({items}) => {
    const [state, setState] = useState({
        ...items,
        star:1,
    });
    
    const [starSrc, setSrc] = useState({
        src:[]
    });

    const imgsrc = "./img/champions/" + items.name + ".png";
    
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
    }, [state.star]);

    const changeStar = (i) =>{
        setState({
            ...state,
            star:i,
        });
    };

    // dependency [state]를 지정하지 않으면
    // 이 함수 내부의 값은 갱신되지 않는다.
    // 따라서 state를 바꾸어도 최초값만 나오므로 의존성을 지정해주자.
    const [{isDragging}, drag] = useDrag(() =>({
        type:"glutton",
        item: ()=> {
            let addingVal = [state.star1, state.star2, state.star3][state.star-1]
            return ({
                ...state,
                addingVal: addingVal,
                cost: state.cost * (3**(state.star-1))
            });
        },
        
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId()
        }),
    }), [state]);

    const inner = {
        width:"60px",
        height:"60px",
        position:"relative",
        top:"50%",
        left:"50%",
        marginTop:"-30px",
        marginLeft:"-30px",
    };

    const portraitImg = {
        width:"60px",
        height:"60px",
        borderRadius: "5px",

        border: `3px solid ${costColor[items.cost]}`,
    };
    const starDiv ={
        backgroundColor:"rgba(0,0,0,0.2)",
        zIndex:2,
        position:"relative",
        width:"60px",
        textAlign:"center",
        top:'-1rem',
        height:"1rem",
        borderRadius:'10px',

    };

    const opacity = isDragging ? 0.4 : 1

    return (
        <div style={{textAlign:"center", opacity}}>
            <div ref={drag} style={inner}>
                <img src={imgsrc} style={portraitImg} />
                <div style={starDiv}>
                    <img onClick={() => {changeStar(1)}} src={starSrc.src[0]} style={{height:"100%", marginTop:"-0.5rem"}}/>
                    <img onClick={() => {changeStar(2)}} src={starSrc.src[1]} style={{height:"100%", marginTop:"-0.5rem"}}/>
                    <img onClick={() => {changeStar(3)}} src={starSrc.src[2]} style={{height:"100%", marginTop:"-0.5rem"}}/>
                </div>
            </div>
        </div>
    );
};

export default Portrait;