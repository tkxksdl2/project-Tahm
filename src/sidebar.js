import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {Motion, spring} from 'react-motion';
import axios from "axios";

axios.defaults.withCredentials = true;
const headers = {withCredentials : true};

const ToggleMenu = styled.button`
    height: 50px;
    width: 20px;
    background-Color: rgba(64, 194, 133, 0.693);
    border-right: 0;
    border-top-left-radius: 10rem;
    border-bottom-left-radius: 9rem;
    border-color: gray;

    position: relative;
    outline: none;
    z-index:1;
    top:-50rem;
    right:20px;
    
`;
const SideBarDiv = styled.div`
    flex-direction : column;
    border-left: 2px solid;
    border-radius: 0;
    border-color: gray;
    background-color: rgb(255,255,255);
    right: 0;
`;

const SideBarContent = styled.div`
    top:0px;
    height:100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-auto-rows: minMax(100px, auto);

    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.4);
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0,80,55, 0.4);
        border-radius: 6px;
    }

`

const Portrait = (name) => {
    const imgsrc = "./img/champions/" + name + ".png";
    const portraitImg = {
        width:"60px",
        height:"60px",
        position:"relative",
        top:"50%",
        marginTop:"-30px",
        
    }

    return (
        <div style={{textAlign:"center"}}>
            <img src={imgsrc} style={portraitImg} />
        </div>
    );
};

const Sidebar = ({ height}) => {
    const [state, setState] = useState({
        width : 0
    });
    const [portraits, setPortraits] = useState({
        portraits: []
    });

    const animated = () => {
        setState((state) => ({width: state.width ===0 ? 500 : 0}));
        
    };

    useEffect(() => {
        axios.get('http://localhost:8080/champions/getChampList', headers)
            .then(res => {
                console.log(res.data);
                const champlist = res.data.champlist;
                let portrait = champlist.map(item => (Portrait(item.name)));
                console.log(portrait);
                setPortraits({
                    portraits: portrait
                });
            })
            .catch(err => {
                console.log(err);
            });
    } , []);

    return (
        <React.Fragment>
            <Motion style={{ width: spring(state.width)}}>
                { ({width}) =>
                    <SideBarDiv style={{
                        width: width,
                        height: height,
                    }}>
                        
                        <SideBarContent>    
                            {portraits.portraits}
                        </SideBarContent>
                        <ToggleMenu 
                            onClick={ () => animated() }
                        >
                        </ToggleMenu>
                    </SideBarDiv>
                }
            </Motion>
        </React.Fragment>
    );
}

export default Sidebar;