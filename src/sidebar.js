import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {Motion, spring} from 'react-motion';
import axios from "axios";

import Portrait from "./portrait";
import theme from './styles/colorTheme';

axios.defaults.withCredentials = true;
const headers = {withCredentials : true};

const ToggleMenu = styled.button`
    height: 50px;
    width: 20px;
    background-Color:${theme.button};
    border-right: 0;
    border-top-left-radius: 10rem;
    border-bottom-left-radius: 9rem;
    border-color: gray;

    position: relative;
    outline: none;
    z-index:1;
    top:-70%;
    right:20px;
    
`;
const SideBarDiv = styled.div`
    flex-direction : column;
    border-left: 2px solid;
    border-radius: 0;
    border-color: gray;
    background-color: ${theme.head};
    right: 0;
`;

const SideBarContent = styled.div`
    top:0px;
    height:100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-auto-rows: minMax(100px, auto);
    padding: 1rem;

    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.4);
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(50,130,105, 0.4);
        border-radius: 6px;
    }

`





const Sidebar = ({ height}) => {
    const [statewidth, setState] = useState({
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
                const champlist = res.data.champlist;
                setPortraits({
                    portraits: champlist
                });
                // let portrait = champlist.map(item => (Portrait({item})));
                // console.log(portrait);
                // setPortraits({
                //     portraits: portrait
                // });
            })
            .catch(err => {
                console.log(err);
            });
    } , []);

    return (
        <React.Fragment>
            <Motion style={{ width: spring(statewidth.width)}}>
                { ({width}) =>
                    <SideBarDiv style={{
                        width: width,
                        height: height,
                    }}>
                        
                        <SideBarContent>    
                            {/* {portraits.portraits} */}
                            {portraits.portraits.map(item =>(
                                <Portrait items={item} key={item.name} />
                            ))}
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