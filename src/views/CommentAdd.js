import React, { Component, useMemo } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './../components/table.css'
import "./../App.css";


export default class CommentAdd extends Component {
    constructor(props) {
        super(props);
        const placeId =  props.location.state;
        const userId =  props.location.userId;
        const placeName =  props.location.name;
        this.state = {
            DataisLoaded: true,
            placeId: props.location.state,
            userId: props.location.userId,
            placeName: props.location.name,
            Text: ""
        }

    }

    createClick() {
        fetch('https://localhost:7226/api/Comments?placeId='+ this.state.placeId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserId: this.state.userId,
                Text: this.state.Text
            })
        })
            .then(res => res.json())
            .then((result) => {
                this._isMounted = false;
            }, (error) => {
                
            })
    }

    changeText = (e) => {
        this.setState({ Text: e.target.value });
    }
    render() {

        const {
            Text,
            placeId,
            userId,
            placeName
        } = this.state;

        return (
            <div>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <div className="card">
                    <h1>{this.state.placeName}</h1>
                    <h2>Įveskite komentarą</h2>
                    <br />
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Komentaras" aria-label="Text"
                            onChange={this.changeText} />
                    </div>
                    <Link to={{
                                    pathname: '/comments',
                                    state: this.state.placeId,
                                    name: this.state.placeName,
                                }} onClick={() => this.createClick()}>
                        Pridėti
                    </Link>
                </div>
            </div>
        )

    }
}
