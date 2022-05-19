import React, { Component, useMemo } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './../components/table.css'


export default class GuideEdit extends Component {
    constructor(props) {
        const guideId =  props.location.state;
        console.log(guideId)
        super(props);
        this.state = {
            guide: "",
            DataisLoaded: true,
            Language: "",
            HourWage: "",
            Name: "",
            Lastname: "",
            Email: "",
            Phone: "",
            schedules: [],
            ScheduleId: "",
            StartDate: "",
            EndDate: "",
            StartHour: "",
            EndHour: "",
            guideId: props.location.state
        }

    }
    async componentDidMount() {
        this._isMounted = true;

        if (this.state.DataisLoaded) {

            try {
                
                const response = await axios.get("https://localhost:7226/api/Guides/"+ this.state.guideId)
                const data = await response.data
                this.setState({
                    guide: data,
                    schedules: data.schedules,
                    Language: data.language,
                    HourWage: data.hourWage,
                    Name: data.name,
                    Lastname: data.lastname,
                    Email: data.email,
                    Phone: data.phone,
                    ScheduleId: data.schedules[0].id,
                    StartDate: data.schedules[0].startDate.split('T')[0],
                    EndDate: data.schedules[0].endDate.split('T')[0],
                    StartHour: data.schedules[0].startHour,
                    EndHour: data.schedules[0].endHour,
                })
            } catch (err) {
                console.log(err)
            }
        }

    }
    createClick() {
        var a = JSON.stringify({
            Language: this.state.Language,
            HourWage: this.state.HourWage,
            Name: this.state.Name,
            Lastname: this.state.Lastname,
            Email: this.state.Email,
            Phone: this.state.Phone,
            schedules: [{
                Id: this.state.schedules[0].id,
                StartDate: this.state.StartDate,
                EndDate: this.state.EndDate + ":00.000Z",
                StartHour: this.state.StartHour,
                EndHour: this.state.EndHour,
                GuideId: this.state.guideId,
        }],
        })
        console.log(a);
        fetch('https://localhost:7226/api/Guides/'+ this.state.guideId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Language: this.state.Language,
                HourWage: this.state.HourWage,
                Name: this.state.Name,
                Lastname: this.state.Lastname,
                Email: this.state.Email,
                Phone: this.state.Phone,
                schedules: [{
                    Id: this.state.schedules[0].id,
                    StartDate: this.state.StartDate,
                    EndDate: this.state.EndDate,
                    StartHour: this.state.StartHour,
                    EndHour: this.state.EndHour,
                    GuideId: this.state.guideId,
            }],
            })
        })
            .then(res => res.json())
            .then((result) => {
                if(result.errors != null)
                {
                    alert(result.title)
                }
                this._isMounted = false;
            }, (error) => {
                
            })
    }

    changeLanguage = (e) => {
        this.setState({ Language: e.target.value });
    }
    changeHourWage = (e) => {
        this.setState({ HourWage: e.target.value });
    }
    changeName = (e) => {
        this.setState({ Name: e.target.value });
    }
    changeLastname = (e) => {
        this.setState({ Lastname: e.target.value });
    }
    changeEmail = (e) => {
        this.setState({ Email: e.target.value });
    }
    changePhone = (e) => {
        this.setState({ Phone: e.target.value });
    }
    changeStartDate = (e) => {
        this.setState({ StartDate: e.target.value });
    }
    changeEndDate = (e) => {
        this.setState({ EndDate: e.target.value });
    }
    changeStartHour = (e) => {
        this.setState({ StartHour: e.target.value });
    }
    changeEndHour = (e) => {
        this.setState({ EndHour: e.target.value });
    }
    render() {

        const {
            guide,
            Language,
            HourWage,
            Name,
            Lastname,
            Email,
            Phone,
            schedules,
            ScheduleId,
            StartDate,
            EndDate,
            StartHour,
            EndHour,
            guideId
        } = this.state;

        return (
            <div>

                <div>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Redaguoti profilį</h5>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Kalba" aria-label="Language"
                                        value={Language}
                                        onChange={this.changeLanguage} />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Valandinis Mokestis" aria-label="HourWage"
                                        value={HourWage}
                                        onChange={this.changeHourWage} />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Vardas" aria-label="Name"
                                        value={Name}
                                        onChange={this.changeName} />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Pavardė" aria-label="Lastname"
                                        value={Lastname}
                                        onChange={this.changeLastname} />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="El. paštas" aria-label="Email"
                                        value={Email}
                                        onChange={this.changeEmail} />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Telefonas" aria-label="Phone"
                                        value={Phone}
                                        onChange={this.changePhone} />
                                </div>
                                <div className="modal-header">
                                    <h7 className="modal-title">Grafikai:</h7>
                                </div>
                                {
                                    schedules.map(schedule => <div key={schedule.id}>
                                        <div className="input-group mb-3">
                                    <input type="date" className="form-control" placeholder="Data nuo" aria-label="StartDate"
                                        value={StartDate}
                                        onChange={this.changeStartDate} />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="date" className="form-control" placeholder="Data iki" aria-label="EndDate"
                                        value={EndDate}
                                        onChange={this.changeEndDate} />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Prad=ios valanda" aria-label="StartHour"
                                        value={StartHour}
                                        onChange={this.changeStartHour} />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Pabaigos valanda" aria-label="EndHour"
                                        value={EndHour}
                                        onChange={this.changeEndHour} />
                                </div>
                                    </div>)
                                }
                                <Link to="/guideProfile" onClick={() => this.createClick()}>
                                   Redaguoti
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        )

    }
}
