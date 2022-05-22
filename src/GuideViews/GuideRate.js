import React, { Component, useMemo } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './../components/table.css'
import "./../App.css";


export default class GuideRate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GuideRate: "",
            DataisLoaded: true,
            GuideId: 3
        }

    }
    async componentDidMount() {
        this._isMounted = true;

        if (this.state.DataisLoaded) {

            try {
                const response = await axios.get('https://localhost:7226/api/Guides/' + this.state.GuideId + '/Score')
                const data = await response.data
                this.setState({

                    GuideRate: parseFloat(data).toFixed(2)

                })
            } catch (err) {
                console.log(err)
            }
        }

    }

    render() {

        const {
            GuideRate,
            GuideId
        } = this.state;
        console.log(GuideRate);

        return (
            <div className='commentsWrapperWrap'>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <div className="comments">
                    <h1>Jūsų įvertinimas</h1>
                    <br />
                    <h3>{GuideRate}</h3>
                </div>
            </div>
        )

    }
}
