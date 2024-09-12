import React from "react";
import Image from 'react-bootstrap/Image';


const Hero: React.FC = () => {
    return (
    <div className={`w-full h-full`} style={{backgroundColor: "#383838"}}>
        <Image src="/assets/imgs/hero.png" fluid></Image>
    </div>
    )
}

export default Hero;