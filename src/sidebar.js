import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {Motion, spring} from 'react-motion';

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
    height: 100% !important;
    display: flex;
    flex-direction : column;
    border-left: 2px solid;
    border-radius: 0;
    border-color: gray;
    background-color: rgb(255,255,255);
    right: 0;
`;

const Sidebar = ({ height}) => {
    const [state, setState] = useState({
        width : 0
    });


    const animated = () => {
        setState((state) => ({width: state.width ===0 ? 400 : 0}));
        
    };

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
                        <div>content</div>
                    </SideBarDiv>
                }
            </Motion>
        </React.Fragment>
    );
}

export default Sidebar;