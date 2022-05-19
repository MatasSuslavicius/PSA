import React, { Component, useMemo } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './../components/table.css'
import "./../components/guide.css";


export default class GuideRoutes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: [],
            DataisLoaded: true,
            GuideId: 3,
            place: "",
            PlaceisLoaded: true,
        }

    }
    async componentDidMount() {
        this._isMounted = true;

        if (this.state.DataisLoaded) {

            try {
                const response = await axios.get('https://localhost:7226/api/guide/' + this.state.GuideId + '/routes')
                const data = await response.data
                this.setState({
                    
                    routes: data
                    
                })
            } catch (err) {
                console.log(err)
            }
        }
        this.state.DataisLoaded = false;

    }

    async getPlace(id){
        try {
            const response = await axios.get('https://localhost:7226/api/Places/' + id)
            const data = await response.data
            this.setState({

                place: data

            })
            return data.name
            console.log(data)
        } catch (err) {
            console.log(err)
        }
      }
      //<td>{this.getPlace.call(this, triprouteplace.placeId)}</td>
    
    render() {
        let place;
        const {
            routes,
            PlaceisLoaded,
        } = this.state;
        console.log(routes);

        return (
            <div>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <div className="card">
                    <h1>Priskirti maršrutai</h1>
                    {routes.map(route => 
                    <div key={route.id}>
                        <br/>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        Kaina
                                    </th>
                                    <th>
                                        Pradžios data
                                    </th>
                                    <th>
                                        Pabaigos data
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{route.price}</td>
                                    <td>{route.startDate}</td>
                                    <td>{route.endDate}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h3 className="title">Objektai maršrute:</h3>
                         
                           
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        Pavadinimas
                                    </th>
                                    <th>
                                        Kaina
                                    </th>
                                    <th>
                                        Adresas
                                    </th>
                                </tr>
                            </thead>
                            {route.triprouteplaces.map(triprouteplace =>
                            <tbody key={triprouteplace.placeId}>
                                <tr>
                                    <td>{triprouteplace.place.name}</td>
                                    <td>{triprouteplace.place.price}</td>
                                    <td>{triprouteplace.place.address}</td>
                                </tr>
                            </tbody>
                            )}
                        </table>
                    
                        <button className='link'>Atšaukti maršrutą</button>
                        </div>
                    )}
                    
                    
                    

                </div>
            </div>
        )

    }
}
