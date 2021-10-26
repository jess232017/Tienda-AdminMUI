import React from 'react';
import { Link } from 'react-router-dom';

const NoFound = () => {
    return ( 
        <section className="content-main">
            <div className="w-50 mx-auto text-center mt-5 mb-5">
                <img src="https://www.ecommerce-admin.com/demo/images/not-found.png" width={350} alt="Pagina no encontrada" />
                <h3 className="mt-4">Uy! Pagina no encontrada</h3>
                <p>Parece que haz tomado un mal camino, No te preocupes... Le pasa a los mejores. Aqui un pequeño consejo que puede ayudarte a enderezar tu camino.</p>
                <Link className="btn btn-primary mt-4" to="/">
                    Regresar al inicio
                </Link>
            </div>
        </section>
    );
}
 
export default NoFound;