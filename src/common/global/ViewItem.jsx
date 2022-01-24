import React, { useState, useEffect } from 'react';

import { styled } from '@mui/system';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';

import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';

import { InputText } from 'primereact/inputtext';
import { DataView } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import GridItem from '_@/common/global/GridItem';
import ListItem from '_@/common/global/ListItem';
import useCarrito from '_@/services/context/carrito';
import apiCategoria from '_@/services/api/tasks/ApiCategoria';

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
    '&.MuiToggleButtonGroup-grouped': {
        paddingRight: '10px',
        paddingLeft: '10px',
        '&.Mui-selected': {
            backgroundColor: "#0d6efd",
            color: "#fff"
        },
    }
}));
const CardHeader = styled(CardContent)({
    padding: '16px'
});


const ViewItem = () => {
    const carritoStore = useCarrito();
    const [ selected, setSelected ] = useState({});

    const { data, isLoading, isSuccess } = apiCategoria.obtener();
    const { data: items } = apiCategoria.obtenerProductos("/" + selected?.categoriaId);
    const [ view, setView ] = useState("list");

    useEffect(() => {
        setSelected(data?.data[3])
    }, [data]);

    const itemTemplate = (product) => {
        return (view === "grid") ? GridItem(product, carritoStore) : ListItem(product, carritoStore);
    }

    const handleChange = (_, value) => (value != null) && setView(value);
    
    const checkSelected = (value) => {
        if(value != null) { 
            setSelected(value)
            console.log(value?.categoriaId)
        }
    };

    return ( 
        <div>
            <CardHeader>
                <div className="pb-0 d-flex justify-content-between">
                    <div className="form-inline d-inline-flex mr-auto">
                        <label>Categoria
                            <Dropdown 
                                value={selected} 
                                className="ms-2"
                                optionLabel="categoria" 
                                options={data?.data}
                                onChange={(e) => checkSelected(e.value)} 
                                valueTemplate={(option) => <span>{option?.nombre}</span>} 
                                itemTemplate={(option) => <span>{option?.nombre}</span>}
                                placeholder="Selecciona una categoria"
                            />
                        </label>
                    </div>

                    <form className="pr-3">
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText placeholder="Buscar..." />
                        </span>
                    </form>

                    <ToggleButtonGroup
                        value={view}
                        exclusive
                        size="small"
                        onChange={handleChange}
                        aria-label="text alignment"
                    >
                        <StyledToggleButton value="list" aria-label="list">
                            <ViewListIcon />
                        </StyledToggleButton>
                        <StyledToggleButton value="grid" aria-label="grid">
                            <GridViewIcon />
                        </StyledToggleButton>
                    </ToggleButtonGroup>
                </div>
            </CardHeader>
            <Divider/>

            <CardContent className="col">
                <div className="pb-0 d-flex mt-3">
                    <DataView 
                        rows={12}
                        paginator 
                        layout={view}
                        value={items?.data}
                        itemTemplate={itemTemplate}
                        emptyMessage = {isLoading ? "cargando" : "No se encontraron registros"}
                    />
                </div>
            </CardContent>
        </div>
    );
}
 
export default ViewItem;
