import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Donorservice from '../service/Donorservice';
import jwt_decode from 'jwt-decode';

const ListComponent=()=>{
   
    const [don_name, setName] = useState('');
    const [don_email, setEmail] = useState('');
    const [don_amount, setAge] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            try {
                const decoded = jwt_decode(token);
                const username = decoded.username || decoded.sub;
                if (username) {
                    setName(username);
                }
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);
    const history=useNavigate();
    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!don_email || !emailRegex.test(don_email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!don_amount || isNaN(don_amount) || Number(don_amount) <= 0) {
            newErrors.amount = 'Please enter a valid positive amount';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const readDonor = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        const donor = {don_name, don_email, don_amount};
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
        <div className="registration-wrapper d-flex justify-content-center align-items-start">
        <form className="p-4 bg-white border rounded shadow mt-5" style={{border: '2px solid #007bff', boxShadow: '0 0 10px rgba(0,123,255,0.15)', marginTop: '40px'}}>
            <div className="mb-3">
                <label className="form-label">Name:</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    name="name" 
                    value={don_name} 
                    onChange={(e) => setName(e.target.value)}
                    readOnly
                    style={{ backgroundColor: '#f0f0f0', cursor: 'default' }}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Email:</label>
                <input 
                    type="email" 
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                    id="email" 
                    name="email" 
                    value={don_email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Amount:</label>
                <input 
                    type="number" 
                    className={`form-control ${errors.amount ? 'is-invalid' : ''}`} 
                    id="amount" 
                    name="amount" 
                    value={don_amount} 
                    onChange={(e) => setAge(e.target.value)} 
                    min="1"
                />
                {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
            </div>
            <button type="submit" className="btn btn-primary" onClick={(e) => readDonor(e)}>Pay</button>

          </form>
          </div>
        </>
      )
}

export default ListComponent;