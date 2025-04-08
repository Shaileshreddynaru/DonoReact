import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Donorservice from '../service/Donorservice';



const ListComponent=()=>{
   
    const [don_name, setName] = useState('');
      const [don_email, setEmail] = useState('');
      const [don_amount, setAge] = useState('');
    const history=useNavigate();
      const readDonor =(e) => {
        e.preventDefault();
         const donor={don_name, don_email,don_amount};
        console.log(donor)
        Donorservice.readDonor(donor).then((response) =>{
          console.log(response.data)
          history('/donor')
         }).catch(error =>{
          console.log(error)
         })
    
      }
      return (
        <>
        <form className="form">
            <div className="mb-3">
                <label className="form-label">Name:</label>
                <input type="text" className="form-control" id="name" name="name" value={don_name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Email:</label>
                <input type="email" className="form-control" id="email" name="email" value={don_email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Amount:</label>
                <input type="number" className="form-control" id="age" name="age" value={don_amount} onChange={(e) => setAge(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={(e) => readDonor(e)}>Submit</button>

          </form>
        </>
      )
}

export default ListComponent;