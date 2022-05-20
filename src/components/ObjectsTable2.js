import React, { useEffect, useState } from 'react'
import {MapContainer, Map, TileLayer, Marker, Popup} from 'react-leaflet'
import axios from 'axios'
import { Link } from 'react-router-dom'

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef
  
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])
  
      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      )
    }
  )


function ObjectTable2() {
    const [repo, setRepo] = useState([]);

    const getRepo = () => {
        axios.get('https://localhost:7226/api/Places')
        .then((response) => {
            console.log(response);
            const myRepo = response.data;
            setRepo(myRepo);
        }).catch(function(error) {
            console.log(error);
          });
    }
    useEffect(() => getRepo(), []);
  
    return (
      <div>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <div className="card">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Pavadinimas
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {repo.map(place => <tr key={place.id}>
                                <td>{place.name}</td>
                                <td><IndeterminateCheckbox {...row.getToggleRowSelectedProps()} /></td>
                            </tr>)}
                        </tbody>
                    </table>
                    
                    <p>
                        <Link to='/guideEdit' className='link'>Sukurti maršrutą</Link>
                    </p>

                </div>
            </div>
    )
  }
  
  export default ObjectTable2