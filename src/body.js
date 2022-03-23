import axios from "axios";
import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import styled from "styled-components";

import {useDrop} from 'react-dnd';

axios.defaults.withCredentials = true;
const headers = {withCredentials:true};

const MainDiv = styled.div`
    height: 92vh;
    display: flex;
    flex-direction: row;
    justify-content: flexEnd;
    overflow: hidden;
    `;
const MainImg = styled.img`
    width:250px;
    height:250px;
    position:relative;
    top:50%;
    margin-top:-125px;
    margin-left:-125px;
`
const StatBoard = styled.div`
    margin: 1rem;
    padding: 0.4rem;
    border: 1px solid;
    height: 210px;
`
const StarDiv = styled.div`
    width: 250px;
    height: 80px; 
    position: relative;
    display:inline-block;
    top: 50% ;
    margin-left: -125px;
`

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
    const [add, setAdd] = useState({
        hp:0,
        ap:0,
        def:0,
        mr:0,
        cost:0
    });
    const [tahmStar, setStar] = useState({
        star:1
    });
    const [starSrc, setSrc] = useState({
        src:["./img/ystar.png", "./img/star.png", "./img/star.png"]
    });

    useEffect(() => {
        axios.get('http://localhost:8080/test', {headers})
            .then(res => console.log(res))
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (tahmStar.star === 1) {
            setSrc({
                src:["./img/ystar.png", "./img/star.png", "./img/star.png"]
            });
        } else if (tahmStar.star === 2) {
            setSrc({
                src:["./img/ystar.png", "./img/ystar.png", "./img/star.png"]
            });
        } else{
            setSrc({
                src:["./img/ystar.png", "./img/ystar.png", "./img/ystar.png"]
            });
        };
    }, [tahmStar]);

    const changeStar = (i) =>{
        setStar({
            star:i,
        });
    };

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept:"glutton",
        drop: (item, monitor) => { 
            if (tahmStar.star === 3){
                item.addingVal = (item.addingVal * 20) - 10
            }

            setAdd( (preAdd) => {
                if (item.abillity === 'ap'){
                    return {
                        ...preAdd,
                        ap:preAdd.ap + item.addingVal,
                        cost:preAdd.cost + item.cost
                    }
                }
                else if (item.abillity === 'df'){
                    return {
                        ...preAdd,
                        def:preAdd.def + item.addingVal,
                        cost:preAdd.cost + item.cost
                    }
                }else if (item.abillity ==='mr'){
                    return {
                        ...preAdd,
                        mr:preAdd.mr + item.addingVal,
                        cost:preAdd.cost + item.cost
                    }
                } else {
                    return {
                        ...preAdd,
                        hp:preAdd.hp + item.addingVal,
                        cost:preAdd.cost + item.cost
                    }
                }

            });
            
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }), [tahmStar]);    


    return(
        <MainDiv>
            <StatBoard>
                <div>
                    Here's Tahm Kench's stats!
                </div>
                <div>
                    HP : {state.hp[tahmStar.star-1] + add.hp}
                </div>
                <div>
                    MP : {state.mp}
                </div>
                <div>
                    DEF : {state.def + add.def}
                </div>
                <div>
                    MR : {state.mr + add.mr}
                </div>
                <div>
                    AD : {state.ad[tahmStar.star-1]}
                </div>
                <div>
                    AP : {state.ap + add.ap - 100}
                </div>
                <div>
                    Skil Damage : {state.skil[tahmStar.star-1] * (state.ap+add.ap)/100}
                </div>
            </StatBoard>

            <div style={{textAlign:"center", order:1, flexGrow:1}}>
                <MainImg ref={drop} src="./img/main.png"/>
                <div>YOU invested {add.cost} cost</div>
                <StarDiv>
                    <img onClick={() => {changeStar(1)}} src={starSrc.src[0]} style={{height:"100%", marginTop:"-0.5rem"}}/>
                    <img onClick={() => {changeStar(2)}} src={starSrc.src[1]} style={{height:"100%", marginTop:"-0.5rem"}}/>
                    <img onClick={() => {changeStar(3)}} src={starSrc.src[2]} style={{height:"100%", marginTop:"-0.5rem"}}/>
                </StarDiv>
            </div>
            <div style={{order:2, zIndex:100}}>
                <Sidebar height="92vh"></Sidebar>
            </div>
        </MainDiv>

    );
};

export default Body;