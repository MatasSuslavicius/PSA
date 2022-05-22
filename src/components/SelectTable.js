import React, { useEffect, useState } from 'react'
import {MapContainer, Map, TileLayer, Marker, Popup} from 'react-leaflet'
import axios from 'axios'
import { Link } from 'react-router-dom'


class SelectTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [],
      SelectedList: [],
      DataisLoaded: true,
      userId:  2,
    };
  }

  async componentDidMount() {
    this._isMounted = true;

    if (this.state.DataisLoaded) {

        try {
            const response = await axios.get('https://localhost:7226/api/Places')
            const data = await response.data
            this.setState({
                
                List: data,
                
            })
            console.log(this.state.List)
        } catch (err) {
            console.log(err)
        }
    }

}


  // Update List Item's state and Master Checkbox State
  onItemCheck(e, item) {
    let tempList = this.state.List;
    tempList.map((place) => {
      if (place.id === item.id) {
        place.selected = e.target.checked;
      }
      return place;
    });

    // Update State
    this.setState({
      List: tempList,
      SelectedList: this.state.List.filter((e) => e.selected),
    });
  }

  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      SelectedList: this.state.List.filter((e) => e.selected),
    });
  }

  render() {
    return (
      <div className="">
                      
        <div className='objectTitleBorder'>
          <h1 className='navbarTitle'>Pasirinkite objektus:</h1>
        </div>
                        
                  
        <div className="">
          <div className="tableScroll">
            <table className="table">
              <tbody>
                {this.state.List.map((place) => (
                  <tr key={place.id}>
                    <th scope="row">
                      <input
                        type="checkbox"
                        defaultChecked={false}
                        className="form-check-input"
                        id="rowcheck{place.id}"
                        onChange={(e) => this.onItemCheck(e, place)}
                      />
                    </th>
                    <td>{place.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {this.state.SelectedList.length > 0 ? (
                        <Link to={{
                            pathname: '/guideSelection',
                            state: this.state.SelectedList,
                            clientId: this.state.userId,
                        }}
                            className="createButton">
                             Sukurti maršrutą ({this.state.SelectedList.length})
                        </Link>
                    ) : (
                      null
                        
                    )}
      </div>
    );
  }
}

export default SelectTable;