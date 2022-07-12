import axios from "axios";
import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import styled from "styled-components";

import {useDrop} from 'react-dnd';
import {theme} from './styles/colorTheme';

axios.defaults.withCredentials = true;
const headers = {withCredentials:true};

const MainDiv = styled.div`
    height: 93vh;
    display: flex;
    flex-direction: row;
    justify-content: flexEnd;
    overflow: hidden;
    background-color: ${theme.outer};
    border: 1px solid ${theme.line};
    `;
const MainImg = styled.img`
    width:250px;
    height:250px;
    position:relative;
    margin-top:30px;

`

const StatBoard = styled.div`
    display: inline-block;
    background-color: ${theme.inner};
    margin: 1rem;
    padding: 0.4rem;
    border: 2px solid ${theme.line};
    height: 210px;
    position: absolute;
    text-align: left;
    left:0px;
    color: white;
`
const StarDiv = styled.div`
    width: 250px;
    height: 80px; 
    position: relative;
    display:inline-block;
`

const MainContent = styled.div`
    position: relative;
    top: 50%;
    height: 500px;
    width: 400px;
    display: inline-block;
    margin-top: -250px;
    color: white;
`
const ResetButton = styled.button`
    display: block;
    position: absolute;
    float: left;
    width: 180px;
    height: 30px;
    padding: 0;
    margin: 1rem 2.5rem;
    font-weight: 600;
    text-align: center;
    line-height: 20px;
    color: #FFF;
    border-radius: 5px ;
    transition: all 0.2s;
    top: 260px;
    left: -10px;
    background: ${theme.button};
    border: 2px solid white;
    
    :hover {
        background: ${theme.inner};
    }
`
const defaultAdd = {
    hp:0,
    ap:0,
    def:0,
    mr:0,
    cost:0
}

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
        ...defaultAdd
    });

    const [tahmStar, setStar] = useState({
        star:1
    });

    const [starSrc, setSrc] = useState({
        src:["./img/ystar.png", "./img/star.png", "./img/star.png"]
    });

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

    // 탐켄치 레벨 변경
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

    const resetAdd = () => {
        setAdd({
            ...defaultAdd
        });
    };

    return(
        <MainDiv>
            <div style={{textAlign:"center", order:1, flexGrow:1}}>
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
                <ResetButton onClick={() => {resetAdd()}}>Reset</ResetButton>
                <MainContent>
                    <div> YOU invested total {add.cost} COST!</div>
                    <MainImg ref={drop} src="./img/main1.png"/>
                    <StarDiv>
                        <img onClick={() => {changeStar(1)}} src={starSrc.src[0]} style={{height:"100%", marginTop:"-0.5rem"}}/>
                        <img onClick={() => {changeStar(2)}} src={starSrc.src[1]} style={{height:"100%", marginTop:"-0.5rem"}}/>
                        <img onClick={() => {changeStar(3)}} src={starSrc.src[2]} style={{height:"100%", marginTop:"-0.5rem"}}/>
                    </StarDiv>
                </MainContent>

            </div>
            <div style={{order:2, zIndex:100}}>
                <Sidebar height="93vh"></Sidebar>
            </div>
        </MainDiv>

    );
};

export default Body;