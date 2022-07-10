import React from 'react';
import './TrafficLight.css'

const TrafficLight = ({text,status}) => {

    const GetLight = () => {
        switch (status) {
            case 0:
                return <div className="led-red"></div>
            case 1:
                return <div className="led-yellow"></div>
            case 2:
                return <div className="led-green"></div>
        }
    }

    return <div className={"lightBox"}>
        <div style={{paddingRight: '10px'}}>{text } </div>
        <GetLight/>
    </div>

    // return <div className="container">
    //
    //     <div className="led-box">
    //
    //     </div>
    //     <div className="led-box">
    //
    //     </div>
    //     <div className="led-box">
    //         <div className="led-blue"></div>
    //     </div>
    // </div>
}

export default TrafficLight;
