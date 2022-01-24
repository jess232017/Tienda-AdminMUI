import React from 'react';

import { Splitter, SplitterPanel } from 'primereact/splitter';
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@mui/material/Card'

import styled from 'styled-components'
import ViewItem from '_@/common/global/ViewItem';
import useCarrito from '_@/services/context/carrito';
import Selecionado from '_@/pages/admin/Venta/Nueva/Selecionado';

const SplitterRound = styled(Splitter)`
    border: none;
    box-shadow: 0 4px 6px -2px rgb(0 0 0 / 12%), 0 2px 2px -1px rgb(0 0 0 / 5%);
    border-radius: 10px
`;

const TomarVenta = () => {
    const matches = useMediaQuery('(min-width:600px)');

    return matches ?
        <SplitterRound style={{ borderRadius: "10px" }} >
            <SplitterPanel
                size={68}
            >
                <ViewItem />
            </SplitterPanel>
            <SplitterPanel
                size={32}
            >
                <Selecionado />
            </SplitterPanel>
        </SplitterRound>
        :
        <div className="row">
            <div className="col-md-8">
                <Card>
                    <ViewItem />
                </Card>
            </div>
            <div className="col-md-4">
                <Card>
                    <Selecionado />
                </Card>
            </div>
        </div>
}

export default TomarVenta;
