import React, { Component, useMemo } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './../components/table.css'
import "./../components/guide.css";


export default class ClientRoutes extends Component {
    constructor(props) {
        super(props);
        const route = props.location.route
        this.state = {
            route: props.location.route,
            DataisLoaded: true,
            ClientId: 2
        }

    }

    render() {
        let place;
        const {
            route,
        } = this.state;
        console.log(route);

        return (
            <div className='commentsWrapperWrap'>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <div className="comments">
                    <h1>Jūsų maršrutas</h1>
                    <div>
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
                                    <td>{this.state.route.price}</td>
                                    <td>{this.state.route.startDate}</td>
                                    <td>{this.state.route.endDate}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h3 className="title">Objektai maršrute:</h3>
                        <table className='check'>
                            <thead>
                                <tr>
                                    <th>
                                        Pavadinimas
                                    </th>
                                    <th>
                                        Aprašymas
                                    </th>
                                    <th>
                                        Kaina
                                    </th>
                                    <th>
                                        Koordinatės
                                    </th>
                                    <th>
                                        Adresas
                                    </th>
                                </tr>
                            </thead>
                            {this.state.route.triprouteplaces.map(triprouteplace =>
                                <tbody key={triprouteplace.placeId}>
                                    <tr>
                                        <td>{triprouteplace.place.name}</td>
                                        <td>{triprouteplace.place.description}</td>
                                        <td>{triprouteplace.place.price}</td>
                                        <td>{triprouteplace.place.coordinates}</td>
                                        <td>{triprouteplace.place.address}</td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                        {
                            this.state.route.isGuideChosen == true ? (
                                <h3 className="title">Jūsų maršrutui yra priskirtas gidas</h3>
                            ) : (
                                <h3 className="title">Jūsų maršrutui nėra priskirtas gidas</h3>
                            )
                        }
                        {
                            this.state.route.isGuideInformed == true ?
                                <h4 className='check' style={{ color: "green" }}>Gidas Informuotas</h4>
                                : <h4 className='check' style={{ color: "red" }}>Gidas Neinformuotas!</h4>}
                        {this.state.route.isGuideChosen == true &&
                            <div>
                                <h4>Gido informacija:</h4>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                Kalba
                                            </th>
                                            <th>
                                                Įvertinimas
                                            </th>
                                            <th>
                                                Įvertinimų skaičius
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>{this.state.route.guide.language}</td>
                                            <td>{parseFloat(this.state.route.guide.scoreSumCount / this.state.route.guide.scoreCount).toFixed(2)}</td>
                                            <td>{this.state.route.guide.scoreCount}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                    <Link className='commentsButton' to={{
                        pathname: '/rateGuide',
                        state: this.state.route.guideId,
                        route: this.state.route
                    }}>Įvertinti gidą</Link>




                </div>
            </div>
        )

    }
}
