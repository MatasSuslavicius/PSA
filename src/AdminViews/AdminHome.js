import React, { useEffect, useState } from 'react'
import { MapContainer, Map, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from 'axios'
import { Link } from 'react-router-dom'

//function MapView()
const AdminHome = () => {
    const [repo, setRepo] = useState([]);

    useEffect(() => {
        async function getRepo() {
            await axios.get('https://localhost:7226/api/Places')
                .then((response) => {
                    console.log(response);
                    const myRepo = response.data;
                    setRepo(myRepo);
                }).catch(function (error) {
                    console.log(error);
                });
        } getRepo()
    }, []);

    const deleteClick = (placeId) => {
        fetch('https://localhost:7226/api/Places/' + placeId, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            }, (error) => {

            });
    }
    return (
        <div>
            <Link to='/placeAdd' className='commentsButton'>Pridėti Objektą</Link>
            <div className='mapWrapper'>
                <MapContainer center={[55.1694, 23.8813]} zoom={7} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {repo.map(place => (
                        <Marker key={place.id} position={[place.coordinates.split(" ")[0], place.coordinates.split(" ")[1]]}>
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
                                    }} className='commentsButton2'>Komentarai</Link>
                                    <Link to={{
                                        pathname: '/placeEdit',
                                        state: place.id
                                    }} className='commentsButton2'>Redaguoti</Link>
                                    <Link to='/' onClick={() => deleteClick(place.id)} className='commentsButton2'>Pašalinti</Link>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    )
}
export default AdminHome