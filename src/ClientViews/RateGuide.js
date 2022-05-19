import React, { Component, useMemo } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './../components/table.css'
import "./../App.css";


export default class GuideRate extends Component {//TODO : PAKEISTI KUR NUVEDA PASPAUDUS "Ivertinti". TURI BUTI I ROUTE DETAILED
    //TODO : PAKEISTI KAD GUIDEID ATEITU IS DETAILED ROUTE GIDO
    constructor(props) {
        super(props);
        //const GuideId =  props.location.state;-----------------------
        this.state = {
            GuideRate: "",
            DataisLoaded: true,
            GuideId: 3
            //GuideId: props.location.state------------------------
        }

    }

    rateClick() {
        fetch('https://localhost:7226/api/Guides/'+ this.state.GuideId + '/Score?score=' + this.state.GuideRate, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then((result) => {
                this._isMounted = false;
            }, (error) => {
                
            })
    }

    changeGuideRate = (e) => {
        this.setState({ GuideRate: e.target.value });
    }
    render() {

        const {
            GuideRate
        } = this.state;

        return (
            <div>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <div className="card">
                    <h1>Įvertinti gidą</h1>
                    <br />
                    <div className="input-group mb-3">
                        <input type="number" className="form-control" placeholder="Įvertinimas" aria-label="GuideRate" min="0" max="10"

                            onChange={this.changeGuideRate} />
                    </div>

                    <Link to="/routeDetailed" onClick={() => this.rateClick()}>
                        Įvertinti
                    </Link>
                </div>
            </div>
        )

    }
}
