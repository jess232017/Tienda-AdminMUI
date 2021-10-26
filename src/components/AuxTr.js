import React from 'react';

const AuxTr = ({imagen, descripcion, cantidad, precio}) => {
    return ( 
        <>
            <tr>
                <td>
                    <a className="itemside d-flex align-items-center" href="#">
                        <div className="left">
                            <img className="img-xs" width={40} height={40} src={`data:image/jpeg;charset=utf-8;base64,${imagen}`} alt={descripcion}/> 
                        </div>
                        <div className="info ml-2"> {descripcion} </div>
                    </a>
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