import React, { Component, useMemo } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './../components/table.css'


export default class GuideEdit extends Component {
    constructor(props) {
        const comment =  props.location.state;
        const placeId =  props.location.placeId;
        const placeName =  props.location.placeName;
        console.log(comment)
        super(props);
        this.state = {
            DataisLoaded: true,
            comment: props.location.state,
            Text: comment.text,
            placeId:  props.location.placeId,
            placeName: props.location.placeName,
        }

    }
    
    editClick() {
        fetch('https://localhost:7226/api/Comments?commentId='+ this.state.comment.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: this.state.comment.userId,
                Text: this.state.Text
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

    changeText = (e) => {
        this.setState({ Text: e.target.value });
    }
    render() {

        const {
            comment,
            Text
        } = this.state;

        return (
            <div className='commentsWrapper'>
                    <div className='comments'>
                    <div className='commentTitleWrapper'>
                        <h1 className='commentTitle'>{"Redaguokite objektui " + this.state.placeName + " komentarą:"}</h1>

                    </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Komentaras" aria-label="Text"
                                        value={this.state.Text}
                                        onChange={this.changeText} />
                                </div>
                                <Link to={{
                                    pathname: '/comments',
                                    state: this.state.placeId,
                                    name: this.state.placeName,
                                }} className='commentsButton' onClick={() => this.editClick()}>
                                   Redaguoti
                                </Link>
                            </div>

                        </div>
                    </div>
        )

    }
}
