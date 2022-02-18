import React, { useState, useEffect } from 'react';

import { Link as RouterLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

const PanelCash = ({ set, total }) => {
    const [peso, setPeso] = useState();
    const [dollar, setDollar] = useState()
    const [change, setChange] = useState();

    useEffect(() => {
        //they can't be null
        const auxPeso = peso || 0;
        const auxDollar = dollar || 0;
        //calculate change
        const aux = (auxDollar * 36) + auxPeso;
        //set change
        setChange((aux - total).toFixed(2));
        set(aux.toFixed(2));
    }, [peso, dollar])


    const handleDollar = ({ target: { value } }) => {
        setDollar(parseFloat(value));
    }

    const handlePeso = ({ target: { value } }) => {
        setPeso(parseFloat(value));
    }

    return (
        <Stack spacing={2} p={4} sx={{ margin: '0 auto', maxWidth: '320px' }}>
            <div className='input-style'>
                <label htmlFor="txtPeso">Pago en córdoba</label>
                <input
                    name="txtPeso"
                    type="number"
                    value={peso}
                    onChange={handlePeso}
                    placeholder="Cantidad en moneda local"
                    min={0}
                />
            </div>
            <div className='input-style'>
                <label htmlFor="txtDollar">Pago con dolares</label>
                <input
                    name="txtDollar"
                    type="number"
                    value={dollar}
                    onChange={handleDollar}
                    placeholder="Cantidad en dolares"
                    min={0}
                />
                <Link component={RouterLink} to="admin/setting" target="_blank" el="noreferrer">
                    Tasa de cambio: 36 C$
                </Link>
            </div>
            <div className='input-style'>
                <label htmlFor="change-local">Cambio en córdoba</label>
                <input type="number" name="change-local" placeholder="Su cambio" value={change} />
            </div>
        </Stack>
    )
}

export default PanelCash;