import React, { Component, useMemo } from 'react'

export default class Comments extends Component {
    constructor(props) {
        const placeId =  props.location.state;
        super(props);
        this.state = {
            placeId:  props.location.state
        }
    }

    render() {
        const {
            placeId
        } = this.state;
        console.log(placeId);
        return (

            <div>
                <h1>Comments</h1>
                <p>Comments page</p>
            </div>
        )
    }
}