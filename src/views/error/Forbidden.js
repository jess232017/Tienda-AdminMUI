import React from 'react';
import { Link } from 'react-router-dom';

const NoFound = () => {
    return ( 
        <section className="content-main">
            <div className="w-50 mx-auto text-center mt-5 mb-5">
                <img src="https://conectemos.com/wp-content/uploads/2021/03/Error-403-Prohibido.png" width={350} alt="No tiene permiso para ver este sitio" />
                <h3 className="mt-4">Uy! No tiene permiso para ver este sitio</h3>
                <p>Parece que haz tomado un mal camino, No te preocupes... Le pasa a los mejores. Aqui un pequeño consejo que puede ayudarte a enderezar tu camino.</p>
                <Link className="p-button mt-4" to="/">
                    Regresar al inicio
                </Link>
            </div>
        </section>
    );
}
 
export default NoFound;