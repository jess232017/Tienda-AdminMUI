import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider'
import CardContent from '@mui/material/CardContent'

import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';

import { InputText } from 'primereact/inputtext';
import { DataView } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';

import NanoItem from 'src/common/global/NanoItem';
import ListItem from 'src/common/global/ListItem';
import apiCategoria from 'src/services/api/tasks/ApiCategoria';


const ViewItem = ({carritoStore}) => {
    const { data, isLoading, isSuccess } = apiCategoria.obtener();
    const [products, setProducts] = useState([]);
    const [view, setView] = useState("list");

    useEffect(() => {
        if(isSuccess) setProducts(data.data[2]);
    }, [data?.data, isLoading, isSuccess]);

    const itemTemplate = (product) => {
        return (view === "grid") ? NanoItem(product, carritoStore) : ListItem(product, carritoStore);
    }

    const checkSelected = (value) => (value != null) && setProducts(value);

    return ( 

        <div>
            <CardContent>
                <div className="pb-0 d-flex justify-content-between">
                    <div className="form-inline d-inline-flex mr-auto">
                        <label>Categoria
                            <Dropdown 
                                value={products} 
                                className="ml-2"
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

                    <div class="btn-group">
                        <button className={`btn btn-${view === "list" ? "primary" : "light"}`}
                            onClick={() => setView("list")}
                        >
                            <ViewListIcon/>
                        </button>
                        <button className={`btn btn-${view === "grid" ? "primary" : "light"}`}
                            onClick={() => setView("grid")}
                        >
                            <GridViewIcon/>
                        </button>
                    </div>
                </div>
            </CardContent>
            <Divider/>

            <CardContent className="col">
                <div className="pb-0 d-flex mt-3">
                    <DataView className="col"
                        rows={12}
                        paginator 
                        layout={view}
                        value={products.productos} 
                        itemTemplate={itemTemplate}
                        emptyMessage = {isLoading ? "cargando" : "No se encontraron registros"}
                    />
                </div>
            </CardContent>
        </div>
    );
}
 
export default ViewItem;