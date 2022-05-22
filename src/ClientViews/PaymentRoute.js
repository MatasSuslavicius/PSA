import React, { Component, useEffect, useMemo } from 'react'
import {useHistory,  Link } from 'react-router-dom'
import axios from 'axios'
import './../components/table.css'
import "./../components/guide.css";
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp }) {
    const {
      seconds,
      minutes,
      hours,
      days,
      isRunning,
      start,
      pause,
      resume,
      restart,
    } = useTimer({ expiryTimestamp, onExpire: () => loadHome() });
    const history = useHistory();

    function loadHome() {
      history.push("/");
    }
  
    return (
      <div style={{textAlign: 'center'}}>
        <div style={{fontSize: '30px'}}>
          <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
      </div>
    );
  }
export default class PaymentRoute extends Component {
    constructor(props) {
        super(props);
        const route = props.location.route.route;
        const orderId = props.location.route.orderId;
        const clientId = props.location.state;
        this.state = {
            route: props.location.route.route,
            ClientId: props.location.state,
            AccountNumber: "",
            Reason: "",
            OrderId: props.location.route.orderId,
            Sum: props.location.route.route.price,
        }

    }
    createClick() {
        fetch('https://localhost:7226/api/Payments', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                AccountNumber: this.state.AccountNumber,
                Reason: this.state.Reason,
                Sum: this.state.Sum,
                OrderId: this.state.OrderId,
            })
        })
            .then(res => res.json())
            .then((result) => {
                if(result.errors != null)
                {
                    alert(result.title)
                }else{
                    alert("Apmokėjimas sėkmingas")
                }
                this._isMounted = false;
            }, (error) => {
                
            })

    }
    changeAccountNumber = (e) => {
        this.setState({ AccountNumber: e.target.value });
    }
    changeReason = (e) => {
        this.setState({ Reason: e.target.value });
    }
    render() {
        const {
            route,
            AccountNumber,
            Reason,
        } = this.state;
        
          const time = new Date();
          time.setSeconds(time.getSeconds() + 600);
        return (
            <div className='commentsWrapper'>
                
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <div className="comments">
                <MyTimer expiryTimestamp={time} />
                    <h1>Sugeneruotas marštutas:</h1>
                    
                    <div>
                        <br/>
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
                        <h3 className="title">Objektų lankymo tvarka:</h3>
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
                        
                        {
                            this.state.route.isGuideChosen == true ? (
                                <h3 className="title">Jūsų maršrutui yra priskirtas gidas</h3>
                            ) : (
                                <h3 className="title">Jūsų maršrutui nėra priskirtas gidas</h3>
                            )
                        }
                        
                        </div>
                        <h4>Apmokėkite maršrutą:</h4>
                            
                        <div className="input-group mb-3">
                      <input type="text" className="form-control" placeholder="Sąskaitos numeris" aria-label="AccountNumber"
                          value={AccountNumber}
                          onChange={this.changeAccountNumber} />
                    </div>
                    <div className="input-group mb-3">
                      <input type="text" className="form-control" placeholder="Priežastis" aria-label="Reason"
                          value={Reason}
                          onChange={this.changeReason} />
                    </div>

                        <Link  to="/clientRoutes" className='commentsButton' onClick={() =>this.createClick()}>Apmokėti</Link>
                    
                    

                </div>
            </div>
        )

    }
}
