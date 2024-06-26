import "../../App.css";
import React, {useState, useRef, useEffect} from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import {Dropdown} from '../Dropdown';
import { data } from "../coordinates";


const MapWrapper = () => {
    const center =[34.727, -86.639]

    const types = ["lounge", "scenic", "tables", "lawn", "benches", "slab"];

    const mapRef = useRef();
    const [state, setState] = useState({
        longitude: 0,
        latitude: 0,
    });
    
    // user location
    useEffect(() => {
    navigator.geolocation.getCurrentPosition(
        function (position) {
        console.log(position);
        setState({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
        });
        },
        function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        },
        {
        enableHighAccuracy: true,
        });
    }, []);


    const popupContent = {
        height: "250px",
        textAlign: "center",
    };
    const popupHead = {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "25px",
    };
    
    const popupText = {
        fontSize: "15px",
        textAlign: "center",
        marginBottom: "20px",
    };

    return(
        <MapContainer ref={mapRef} center={center} zoom={15} scrollWheelZoom={true} >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {data.map(({id, points, type, image, description}, index) => (
                <Polygon color={type==="lounge" ? "black" : type==="scenic" ? "blue" : type==="tables" ? "red" : type==="lawn" ? "green" : type==="benches" ? "purple" : type==="slab" ? "yellow" : "brown"} positions={points}>
                    <Popup className="request-popup">
                        <div style={popupContent}>
                            <div className="m-2" style={popupHead}>
                                {id}
                            </div>
                            <img
                            src={image}
                            width="150"
                            height="150"
                            />
                            <div>
                                <p>
                                </p>
                            </div>
                            <span style={popupText}>
                                {description}
                            </span>
                        </div>
                    </Popup>
                </Polygon>
            ))}

            <Marker position={[state.latitude, state.longitude]}>
                <Popup>{"You"}</Popup>
            </Marker>
            
        </MapContainer>
    )
}

export const Map = () => {
    
    return(
        <div>
            <div className="container">
            Greenspaces on UAH Campus
            </div>
            <div className="places">
            <p>Lounge</p>
            <p>Scenic</p>
            <p>Tables</p>
            <p>Lawn</p>
            <p>Benches</p>
            <p>Slab</p>
            <div className="legend">
            <p>LEGEND</p>
            </div>
            <div className="lounge"></div>
            <div className="scenic"></div>
            <div className="tables"></div>
            <div className="lawn"></div>
            <div className="benches"></div>
            <div className="slab"></div>
            </div>     
            <MapWrapper />
            
        </div>
    )
};

