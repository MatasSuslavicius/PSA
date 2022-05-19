import React, { Component, useMemo, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
//import Ably from "./Ably"

export default class Comments extends Component {
    constructor(props) {
        const placeId =  props.location.state;
        const placeName =  props.location.name;//cia
        super(props);
        this.state = {
            DataisLoaded: true,
            placeId:  props.location.state,
            placeName: props.location.name,//cia
            userId:  props.user.state,
            comments:"",
            PostComment:""
        }
    }
 
//////////////////////////
async componentDidMount() {
    this._isMounted = true;

    if (this.state.DataisLoaded) {

        try {
            
            const response = await axios.get("https://localhost:7226/api/Comments?placeId="+ this.state.placeId)
            const data = await response.data
            this.setState({
                UsersId: 1,
                PostComment: data
            })
            console.log(this.state.comments)
            console.log(this.state.placeId)
            console.log(this.state.placeName)///i cia
        } catch (err) {
            console.log(err)
        }
    }

}

createClick() {
    fetch('https://localhost:7226/api/Comments', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            UserId: this.state.UsersID,
            Text: this.state.PostComment
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
changePostComment = (e) => {
    this.setState({ PostComment: e.target.value });
}
  
  //this.addComment = this.addComment.bind(this)

////////////////////////////

    render() {
        const {
            placeId,
            PostComment,
            comments
        } = this.state;
        console.log(placeId);
        return (
            <div>
                <h1>{this.state.placeName}</h1>
                <h2>Komentarai:</h2>
                <h1 className="title">Palikite savo atsiliepimus žemiau</h1>
                <form onSubmit={this.addComment}>
                    <div className="field">
                        <div className="control">
                        <textarea
                            className="textarea"
                            name="comment"
                            placeholder="Palikti komentarą"
                            value={PostComment}
                            onChange={this.changePostComment}
                        ></textarea>
                        </div>
                    </div>
                    <Link to="/comments" onClick={() => this.createClick()}>
                                   Komentuotiii
                    </Link>
                </form>
            

            <div className="commentList">
                <h5 className="text-muted mb-4">
                <span className="badge badge-success">{props.comments.length}</span>{" "}
                    Comment{props.comments.length > 0 ? "s" : ""}
                </h5>

                {props.comments.length === 0 && !props.loading ? (
                <div className="alert text-center alert-info">
                       <CommentList
                            loading={this.state.loading}
                            comments={this.state.comments}
                        />
                </div>
            ) : null}

                {props.comments.map((comment, index) => (
                <Comment key={index} comment={comment} />
                ))}
            </div>
        </div>
        )
    }
}
