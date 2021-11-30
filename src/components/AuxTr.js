import React from 'react';
import Avatar from '@mui/material/Avatar';
import {Link} from 'react-router-dom';

const AuxTr = ({imagen, descripcion, cantidad, precio}) => {
    return ( 
        <>
            <tr>
                <td>
                    <Link className="itemside d-flex align-items-center"
                        to="/admin/producto"
                    >
                        <div className="left">
                            <Avatar src={`data:image/jpeg;charset=utf-8;base64,${imagen}`} alt={descripcion} variant="rounded"/>
                        </div>
                        <div className="info ml-2"> {descripcion} </div>
                    </Link>
                </td>
                <td> C${precio}</td>
                <td> {cantidad}</td>
                <td className="text-end">  C${(precio * cantidad).toFixed(2)}</td>
                </tr>
                <tr>
            </tr>
        </>
    );
}
 
export default AuxTr;