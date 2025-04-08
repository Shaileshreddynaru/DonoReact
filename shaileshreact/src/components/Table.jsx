import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Donorservice from '../service/Donorservice';

const Table = () => {
  const [Donors, setDonors] = useState([]);

  React.useEffect(() => {
    Donorservice.getDonorin().then((response) =>{
      setDonors(response.data)
      console.log(response.data);
    }).catch(error =>{
      console.log(error);
    });
  }, [])
  
  return (
    <>
      <table className="table">

        <thead>
          <tr className="table-header">
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Amount</th>
          </tr>

        </thead>
        <tbody>
          {
          Donors.map(
            Donors => 
            <tr key={Donors.id} className="table-row">

              <td>{Donors.don_id}</td>
              <td>{Donors.don_name}</td>
              <td>{Donors.don_email}</td>
              <td>{Donors.don_amount}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;
