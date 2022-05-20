import React, { Component, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import './../components/table.css'
import "./../App.css";


export default class guideSelection extends Component {
    constructor(props) {
        super(props);
        const ClientId =  props.location.clientId
        this.state = {
            DataisLoaded: true,
            ClientId: props.location.clientId,
            places: props.location.state,
            StartDate: "",
            GuideNeeded: false,
            Language: "",
            CreatedRoute: JSON.stringify({
                Title: ""
            })
        }

    }
//props.location.state.map((place)=>({
    //places: [...this.places, place.id]
    createClick() {
        const arr = []
        this.state.places.forEach(place => arr.push( place.id))
        let resu = ""
        fetch('https://localhost:7226/api/routes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                TripRoutePlaceIds: arr,
                StartDate: this.state.StartDate,
                GuideNeeded: this.state.GuideNeeded,
                Language: this.state.Language,
                ClientId: this.state.ClientId,
            })
        })
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    CreatedRoute: result
                });
                this._isMounted = false;
            }, (error) => {
                
            })
    }

    onItemCheck() {
        if(this.state.GuideNeeded == true){
            this.setState({
                GuideNeeded: false,
            });
        }else{
            this.setState({
                GuideNeeded: true,
            });
        }
        
        console.log(this.state.GuideNeeded)
      }

    changeStartDate = (e) => {
        this.setState({ StartDate: e.target.value });
    }
    changeLanguage = (e) => {
        this.setState({ Language: e.target.value });
    }

    
    render() {
        const {
            GuideRate,
            StartDate,
            Language,
            EndDate,
            CreatedRoute,
        } = this.state;

        return (
            <div>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <div className="card">
                    <h1>Sukurti maršrutą</h1>
                    <br />
                    <h5>Nudorykite maršruto pradžios datą:</h5>
                    <div className="input-group mb-3">
                        <input type="datetime-local" className="form-control" placeholder="Maršruto pradžia" aria-label="StartDate"
                            value={StartDate}
                            onChange={this.changeStartDate} />
                    </div>
                    <div>
                        <h5>Ar norite turėti gidą?</h5>
                    <input
                        type="checkbox"
                        defaultChecked={false}
                        className="form-check-input"
                        id="rowcheck{place.id}"
                        onChange={() => this.onItemCheck()}
                      />
                      {this.state.GuideNeeded == true &&
                      <div className="input-group mb-3">
                      <input type="text" className="form-control" placeholder="Kalba" aria-label="Language"
                          value={Language}
                          onChange={this.changeLanguage} />
                    </div>

                      }
                      </div>
                    <button onClick={() =>this.createClick()}>Generuoti maršrutą</button>
                    <Link to={{
                                    pathname: '/paymentRoute',
                                    route: this.state.CreatedRoute,
                                    state: this.state.ClientId,
                                }} >
                        Pereiti prie apmokėjimo
                    </Link>
                    
                </div>
            </div>
        )

    }
}
