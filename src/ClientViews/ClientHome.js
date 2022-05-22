import React, { useEffect, useState } from 'react'
import {MapContainer, Map, TileLayer, Marker, Popup} from 'react-leaflet'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SelectTable from '../components/SelectTable'

//function MapView()
const ClientHome = () => {
    const [repo, setRepo] = useState([]);

    useEffect(() => { async function getRepo (){
        await axios.get('https://localhost:7226/api/Places')
        .then((response) => {
            console.log(response);
            const myRepo = response.data;
            setRepo(myRepo);
        }).catch(function(error) {
            console.log(error);
          });
    }getRepo()}, []);

    const deleteClick = (placeId) => {
        fetch('https://localhost:7226/api/Places/'+ placeId, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            }, (error) => {

            });
    }
    return (
        <div className='mapWrapperClient'>
        <MapContainer center={[55.1694, 23.8813]} zoom={7} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {repo.map(place => (
                <Marker key = {place.id} position={[place.coordinates.split(" ")[0], place.coordinates.split(" ")[1]]}>
                    <Popup>
                        <div>
                            <h1 className='objectTitle'>{place.name}</h1>
                            <p>{"Adresas: " + place.address}</p>
                            <p>{"Aprašymas: " + place.description}</p>
                            <p>{"Kaina: " + place.price}</p>
                            <Link to={{
                                    pathname: '/comments',
                                    state: place.id,
                                    name: place.name
                                }} className='commentsButton'>Komentarai</Link>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
        <div>
            <SelectTable/>
        </div>

        </div>
    )
}
export default ClientHome