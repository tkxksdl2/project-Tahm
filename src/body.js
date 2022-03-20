import axios from "axios";
import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";

import {useDrop} from 'react-dnd';

axios.defaults.withCredentials = true;
const headers = {withCredentials:true};

const Body = () => {
    const [state, setState] = useState({
        hp:[1000, 1800, 3240],
        mp: 30,
        ad:[80, 144, 259.2],
        ap:100,
        def:60,
        mr:60,
        skil: [900, 1350, 30000]
    });
    const [tahmStar, setStar] = useState({
        star:0
    });
    
    useEffect(() => {
        axios.get('http://localhost:8080/test', {headers})
            .then(res => console.log(res))
            .catch(err => {
                console.log(err);
            });
    }, []);



    const bodyStyle = {
        height:"92vh",
        display:"flex",
        flexDirection:"row",
        justifycontent:"flexEnd",
        overflow:"hidden"
        
    };
    const mainImg = {
        width:"250px",
        height:"250px",
        position:"relative",
        top:"50%",
        marginTop:"-125px",
        marginLeft:"-125px",
        
    };

    const statBoard = {
        margin:"1rem",
        padding:"0.4rem",
        border:"1px solid",
        height:"210px"
    };

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept:"glutton",
        drop: () => ({ name: 'tahmkench'}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));    


    return(
        <div style={bodyStyle}>
            <div style ={statBoard}>
                <div>
                    Here's Tahm Kench's stats!
                </div>
                <div>
                    HP : {state.hp[tahmStar.star]}
                </div>
                <div>
                    MP : {state.mp}
                </div>
                <div>
                    DEF : {state.def}
                </div>
                <div>
                    MR : {state.mr}
                </div>
                <div>
                    AD : {state.ad[tahmStar.star]}
                </div>
                <div>
                    AP : {state.ap - 100}
                </div>
                <div>
                    Skil Damage : {state.skil[tahmStar.star] * state.ap/100}
                </div>

            </div>
            <div style={{textAlign:"center", order:1, flexGrow:1}}>
                <img ref={drop} src="./img/main.png" style={mainImg} />
            </div>
            <div style={{order:2, zIndex:100}}>
                <Sidebar height={bodyStyle.height}></Sidebar>
            </div>
        </div>

    );
};

export default Body;