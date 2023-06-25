import React from 'react';
import Room from '../images/room.png';
import {Image} from "react-bootstrap";

const Home = () => {
    return (
        <div className="home">
            {/*<Image className="home__image" src={Room}/>*/}
            {/*<img className="home__image" src="" alt=""/>*/}
            <div className="home__image"></div>
        </div>
    );
};

export default Home;