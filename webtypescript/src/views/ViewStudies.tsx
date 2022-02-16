import React, {useEffect, useState} from 'react';
import NavbarScroller from '../Components/NavbarScroller';
import '../App.css';
 
  
const ViewStudies = () => {
  const [data, setData] = useState<any>([]);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    fetch("/api/studies")
    .then(res => { return res.json()})
    .then(data => {setData(data)})

  }, []);
 

    return (
     <div>
        <NavbarScroller/>
        <h1>View the Studies here!</h1>
        <div>
          <table>
            {data.map((study:any ) => (
              
                <tr key={study.id}>
                    <td align="center">
                      <div>
                        <img className='photo' src={study.imageLink}></img>
                      </div>
                      <div>
                      <h2 >{study.title}</h2>
                      </div> 
                        
                    </td>
                    
                </tr>
                
            ))}
            </table>
        </div>
    </div>
    )
}
 export default ViewStudies;