import React, { Component, useMemo } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './../components/table.css'
import "./../components/guide.css";


export default class ClientRoutes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: [],
            DataisLoaded: true,
            ClientId: 2
        }

    }
    async componentDidMount() {
        this._isMounted = true;

        if (this.state.DataisLoaded) {

            try {
                const response = await axios.get('https://localhost:7226/api/client/' + this.state.ClientId + '/routes')
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


    render() {
        let place;
        const {
            routes,
        } = this.state;
        console.log(routes);

        return (
            <div className='commentsWrapperWrap'>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                {routes.map(route =>
                    <div className='comments' key={route.id}>
                        <br />
                        <table className='check'>
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

                        {
                            route.triprouteplaces.length > 0 ? (
                                <div>
                                    <h3 className="title">Objektai maršrute:</h3>
                                    <table className='check'>
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
                                </div>
                            ) : (
                                <h3 className="title">Maršrutui nėra priskirtų objektų</h3>)
                        }


                        {
                            route.isGuideChosen == true ? (
                                <h3 className="title check">Jūsų maršrutui yra priskirtas gidas</h3>
                            ) : (
                                <h3 className="title check">Jūsų maršrutui nėra priskirtas gidas</h3>
                            )
                        }


                        <Link className='commentsButton' to={{
                            pathname: '/routeDetailed',
                            route: route
                        }}>Detalesnė informacija</Link>
                    </div>
                )}
            </div>
        )

    }
}
