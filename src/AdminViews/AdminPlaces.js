import React, { Component, useMemo } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './../components/table.css'


export default class AdminPlaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: [],
            DataisLoaded: true,
            PlaceName: "",
            PlaceDescription: "",
            PlacePrice: "",
            PlaceCoordinates: "",
            PlaceAddress: "",
            reload: false
        }

    }

    async componentDidMount() {
        this._isMounted = true;

        if (this.state.DataisLoaded) {

            try {
                const response = await axios.get('https://localhost:7226/api/Places')
                const data = await response.data
                console.log(data)
                this.setState({

                    places: data,
                })
            } catch (err) {
                console.log(err)
            }
        }

    }


    createClick() {
        var a = JSON.stringify({
            Name: this.state.PlaceName,
            Description: this.state.PlaceDescription,
            Price: this.state.PlacePrice,
            Coordinates: this.state.PlaceCoordinates,
            Address: this.state.PlaceAddress,
        })
        console.log(a.value);
        fetch('https://localhost:7226/api/Places', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: this.state.PlaceName,
                Description: this.state.PlaceDescription,
                Price: this.state.PlacePrice,
                Coordinates: this.state.PlaceCoordinates,
                Address: this.state.PlaceAddress,
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this._isMounted = false;
            }, (error) => {
                alert('New Place Added');
                
                //this.setState({
                //    places: [...this.state.places,a.value]
                //});
            })

    }


    addClick() {
        this.setState({
            PlaceName: "",
            PlaceDescription: "",
            PlacePrice: "",
            PlaceCoordinates: "",
            PlaceAddress: "",
        });
    }

    changePlaceName = (e) => {
        this.setState({ PlaceName: e.target.value });
    }
    changePlaceDescription = (e) => {
        this.setState({ PlaceDescription: e.target.value });
    }
    changePlacePrice = (e) => {
        this.setState({ PlacePrice: e.target.value });
    }
    changePlaceCoordinates = (e) => {
        this.setState({ PlaceCoordinates: e.target.value });
    }
    changePlaceAddress = (e) => {
        this.setState({ PlaceAddress: e.target.value });
    }
    render() {

        const {
            places,
            PlaceName,
            PlaceDescription,
            PlacePrice,
            PlaceCoordinates,
            PlaceAddress
        } = this.state;
        console.log(places);

        return (
            <div>
                <h1 align="center">
                    Places
                </h1>
                <button type="button"
                    className="btn btn-primary m-2 float-end button"
                    data-bs-toggle="modal"
                    data-bs-target="#CreateModal"
                    onClick={() => this.addClick()}>
                    Add Place
                </button>
                <table >
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                                Price
                            </th>
                            <th>
                                Coordinates
                            </th>
                            <th>
                                Address
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            places.map(place => <tr key={place.id}>
                                <td>{place.name}</td>
                                <td>{place.description}</td>
                                <td>{place.price}</td>
                                <td>{place.coordinates}</td>
                                <td>{place.address}</td>
                                <button type="button"

                                    className="btn btn-secondary m-2 float-end button">
                                    Something
                                </button>
                            </tr>)
                        }
                    </tbody>
                </table>



                <div className="modal fade" id="CreateModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">

                                <h5 className="modal-title">Add new Place</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"> </button>

                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Name" aria-label="Name"
                                        value={PlaceName}
                                        onChange={this.changePlaceName} />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Description" aria-label="Description"
                                        value={PlaceDescription}
                                        onChange={this.changePlaceDescription} />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Price" aria-label="Price"
                                        value={PlacePrice}
                                        onChange={this.changePlacePrice} />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Coordinates" aria-label="Coordinates"
                                        value={PlaceCoordinates}
                                        onChange={this.changePlaceCoordinates} />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Address" aria-label="Address"
                                        value={PlaceAddress}
                                        onChange={this.changePlaceAddress} />
                                </div>
                                <Link to="/places" onClick={() => this.createClick()}>
                                    <button type="button" className="button" data-bs-dismiss="modal" aria-label="Close"
                                    onClick={() => {
                                        this.componentDidMount();
                                      }}> Add</button>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        )

    }
}
