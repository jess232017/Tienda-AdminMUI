import React, { useState } from 'react';

import Stack from '@mui/material/Stack';

const PanelCredit = ({ set, total }) => {
    const [cash, setCash] = useState()
    const [change, setChange] = useState();

    const handleCash = ({ target: { value } }) => {
        setCash(value);
        setChange(value - total)
    }

    return (
        <Stack spacing={2} p={4} sx={{ margin: '0 auto', maxWidth: '320px' }}>
            <div className='input-style'>
                <label htmlFor="cash" >Codigo de factura</label>
                <input
                    name="cash"
                    type="number"
                    value={cash}
                    onChange={handleCash}
                    placeholder="Ingrese aqui el codigo "
                />
            </div>
            <div className='input-style' style={{ display: 'none' }}>
                <label htmlFor="change">Su cambio</label>
                <input type="number" placeholder="Su cambio" value={change} />
            </div>
        </Stack>

    );
}

export default PanelCredit;