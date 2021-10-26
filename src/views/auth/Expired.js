import React from 'react';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useSignOut } from 'react-auth-kit';

const Expired = () => {
    const signOut = useSignOut();
    
    return ( 
        <div className="auth-bg expire vh-100 ">
            <Card className="expire">
                <div style={{paddingRight: "8rem", paddingLeft: "8rem"}}>
                    <div className="d-flex flex-column justify-content-center align-items-center mr-4 ml-4">
                        <img src="https://cdn.dribbble.com/users/1693462/screenshots/3504905/media/e76b879fc2bb9ec2a1f92da0732eb608.gif"
                            className="rounded mx-auto d-block"
                            style = {{width:"25rem"}}
                            alt="..."/>

                        <h1>Su sesión expiró</h1>

                        <p className="text-muted text-center text-sm mb-5 ">Por favor registrese de nuevo. No te preocupes, mantendremos todos <br/> tus filtros y preferencias en el mismo lugar</p>
                        <Button label="Ingresar" className="p-button-raised p-button-rounded pr-4 pl-4" onClick = {() => signOut()} />
                    </div>
                </div>
            </Card>
        </div>
    );
}
 
export default Expired;