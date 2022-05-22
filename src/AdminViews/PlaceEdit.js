import React, { Component, useMemo } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './../components/table.css'


export default class PlaceEdit extends Component {
    constructor(props) {
        const placeId = props.location.state;
        console.log(placeId)
        super(props);
        this.state = {
            DataisLoaded: true,
            PlaceName: "",
            PlaceDescription: "",
            PlacePrice: "",
            PlaceCoordinates: "",
            PlaceAddress: "",
            placeId: props.location.state
        }

    }
    async componentDidMount() {
        this._isMounted = true;

        if (this.state.DataisLoaded) {

            try {

                const response = await axios.get("https://localhost:7226/api/Places/" + this.state.placeId)
                const data = await response.data
                this.setState({
                    PlaceName: data.name,
                    PlaceDescription: data.description,
                    PlacePrice: data.price,
                    PlaceCoordinates: data.coordinates,
                    PlaceAddress: data.address,

                })
            } catch (err) {
                console.log(err)
            }
        }

    }
    createClick() {
        fetch('https://localhost:7226/api/Places/' + this.state.placeId, {
            method: 'PUT',
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
                if (result.errors != null) {
                    alert(result.title)
                }
                this._isMounted = false;
            }, (error) => {

            })

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
            PlaceName,
            PlaceDescription,
            PlacePrice,
            PlaceCoordinates,
            PlaceAddress
        } = this.state;

        return (
            <div className='commentsWrapper'>
                <div className='comments'>
                    <div className='commentTitleWrapper'>
                        <h1 className='commentTitle'>{"Redaguokite objektui " + this.state.placeName + " komentarą:"}</h1>

                    </div>
                    <div className="modal-body">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="PlaceName" aria-label="Name"
                                value={PlaceName}
                                onChange={this.changePlaceName} />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Aprašymas" aria-label="Description"
                                value={PlaceDescription}
                                onChange={this.changePlaceDescription} />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Kaina" aria-label="Price"
                                value={PlacePrice}
                                onChange={this.changePlacePrice} />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Koordinatės" aria-label="Coordinates"
                                value={PlaceCoordinates}
                                onChange={this.changePlaceCoordinates} />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Adresas" aria-label="Address"
                                value={PlaceAddress}
                                onChange={this.changePlaceAddress} />
                        </div>
                        <Link to="/" className='commentsButton' onClick={() => this.createClick()}>
                            Redaguoti
                        </Link>
                    </div>

                </div>
            </div>
        )

    }
}
