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
    top:250px;
    right:20px;
    
`;
const SideBarDiv = styled.div`
    display: flex;
    flex-direction : column;
    border-left: 2px solid;
    border-radius: 0;
    border-color: gray;
    background-color: rgb(255,255,255);
    right: 0;
`;

const Portrait = (name) => {
    return (<div>name : {name} </div>);
};

const Sidebar = ({ height}) => {
    const [state, setState] = useState({
        width : 0
    });
    const [portraits, setPortraits] = useState({
        portraits: []
    });

    const animated = () => {
        setState((state) => ({width: state.width ===0 ? 400 : 0}));
        
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
                        minHeight: height,
                    }}>
                        <ToggleMenu 
                            onClick={ () => animated() }
                        >
                        </ToggleMenu>
                        <div>
                            content
                            {portraits.portraits}
                        </div>
                    </SideBarDiv>
                }
            </Motion>
        </React.Fragment>
    );
}

export default Sidebar;