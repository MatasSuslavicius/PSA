import React, { Component, useMemo } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './../components/table.css'
import "./../App.css";


export default class AdminComments extends Component {
    constructor(props) {
        const placeId = props.location.state;
        const placeName = props.location.name;
        super(props);
        this.state = {
            DataisLoaded: true,
            placeId: props.location.state,
            placeName: props.location.name,//cia
            userId: 2,//yay hardcode
            comments: [],
            Text: ""
        }
    }

    async componentDidMount() {
        this._isMounted = true;

        if (this.state.DataisLoaded) {

            try {

                const response = await axios.get("https://localhost:7226/api/Comments?placeId=" + this.state.placeId)
                const data = await response.data
                this.setState({
                    comments: data
                })
            } catch (err) {
                console.log(err)
            }
        }

    }
    deleteClick(commentId) {
        fetch('https://localhost:7226/api/Comments/' + commentId, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then((result) => {

            }, (error) => {

            });
        console.log("deleted")
    }
    render() {
        const {
            placeId,
            Text,
            comments,
            placeName
        } = this.state;

        return (


            <div className='commentsWrapper'>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <div className='comments'>
                    <div className='commentTitleWrapper'>
                        <h1 className='commentTitle'>{"Objekto " + this.state.placeName + " komentarai:"}</h1>

                    </div>
                    <table className='check'>
                        <tbody>
                            {comments.map(comment => <tr key={comment.id}>

                                <td>
                                    <div className='commentValueWrapper'>

                                        <p className='commentValue'>{comment.text}</p>
                                    </div>
                                </td>



                                <td><Link to={{
                                    pathname: '/commentEdit',
                                    state: comment,
                                    placeId: this.state.placeId,
                                    placeName: this.state.placeName
                                }} className=''>
                                    <i className="icon fa fa-pencil-square-o"></i>
                                </Link></td>
                                <td> <button className="link" onClick={() => this.deleteClick(comment.id)}>Pašalinti</button></td>

                            </tr>)}
                        </tbody>
                    </table>
                    <Link to={{
                        pathname: '/commentAdd',
                        state: this.state.placeId,
                        userId: this.state.userId,
                        name: this.state.placeName
                    }} className='commentsButton'>Pridėti komentarą</Link>
                </div>
            </div>


        )
    }
}
