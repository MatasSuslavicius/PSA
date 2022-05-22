import React, { Component, useMemo } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './../components/table.css'
import "./../App.css";


export default class GuideProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guide: "",
            DataisLoaded: true,
            GuideId: 3,
            Language: "",
            HourWage: "",
            Name: "",
            Lastname: "",
            Email: "",
            Phone: "",
            schedules: []
        }

    }
    async componentDidMount() {
        this._isMounted = true;

        if (this.state.DataisLoaded) {

            try {
                const response = await axios.get('https://localhost:7226/api/Guides/' + this.state.GuideId)
                const data = await response.data
                this.setState({

                    guide: data,
                    schedules: data.schedules,

                })
            } catch (err) {
                console.log(err)
            }
        }

    }

    render() {

        const {
            guide,
            GuideId,
            Language,
            HourWage,
            Name,
            Lastname,
            Email,
            Phone,
            schedules
        } = this.state;
        console.log(guide);

        return (
            <div className='commentsWrapperWrap'>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <div className='comments'>
                    <h1>{guide.name}  {guide.lastname}</h1>
                    <p className="title">El. paštas: {guide.email}</p>
                    <p className="title">Telefonas: {guide.phone}</p>
                    <p className="title">Kalba: {guide.language}</p>
                    <p className="title">Valandinis atlygnimas: {guide.hourWage}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Diena nuo
                                </th>
                                <th>
                                    Diena iki
                                </th>
                                <th>
                                    Pradžios valanda
                                </th>
                                <th>
                                    Pabaigos valanda
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedules.map(schedule => <tr key={schedule.id}>
                                <td>{schedule.startDate.split('T')[0]}</td>
                                <td>{schedule.endDate.split('T')[0]}</td>
                                <td>{schedule.startHour}</td>
                                <td>{schedule.endHour}</td>
                            </tr>)}
                        </tbody>
                    </table>

                    <p>
                        <Link to={{
                            pathname: '/guideEdit',
                            state: GuideId
                        }} className='commentsButton2'>Redaguoti profilį</Link>
                    </p>

                </div>
            </div>
        )

    }
}
