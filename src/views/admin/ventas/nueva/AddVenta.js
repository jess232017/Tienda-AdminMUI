import React, { useEffect, useState } from 'react';

import { DataView } from 'primereact/dataview';
import { Skeleton } from 'primereact/skeleton';

import TileView from 'devextreme-react/tile-view';
import { Avatar } from 'primereact/avatar';
import { Button } from 'devextreme-react';
import Tabs from 'devextreme-react/tabs';

import apiCategoria from 'src/services/api/tasks/ApiCategoria';
import useSide from 'src/services/context/sidebarShow';
import useCarrito from 'src/services/context/carrito';
import NanoItem from '../../../../components/widgets/NanoItem';
import Selecionado from '../../Selecionado';
import Paginator from 'src/common/Paginator';

const TomarVenta = () => {
    const {data, isLoading, isSuccess,  isError} = apiCategoria.obtener();
    const [fetched, setFetched] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [categorias, setCategorias] = useState([]);
    const carritoStore = useCarrito();
    const {setShow} = useSide();

    useEffect(() => {
        if(isSuccess && !fetched){
            setCategorias( data.data.map( ({nombre: text, productos: content}) => ({text,label: text , content}) ) );
            setFetched(true);
            setShow(false);
        }
    }, [data, isSuccess, fetched, setShow]);

    const itemTemplate = (product) => {
        if (!product) {
            return;
        }

        return NanoItem(product, carritoStore)
    }

    const onTabsSelectionChanged = (args) =>{
        if(args.name === 'selectedIndex'){
            setSelectedIndex(args.value);
        }
    }


    return ( 
        <section className="section-content padding-y-sm bg-default ">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8">
                        {/*Carrito*/}
                        <div className="card">
                            <div className="card-header">
                                {isLoading ?
                                    <Skeleton width="100%" height="2.5rem"></Skeleton>
                                :isError ?
                                    <p>Error</p>
                                :
                                    <Tabs
                                        width= "100%"
                                        showNavButtons
                                        dataSource={categorias}
                                        onOptionChanged={e => onTabsSelectionChanged(e)}
                                    />
                                }
                            </div>
                            <div className="card-body pt-0">
                                {isLoading?
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <Skeleton width="100%" className="mt-2" height="25rem"></Skeleton>
                                        <Skeleton width="24rem" className="mt-2" height="2.5rem"></Skeleton>
                                    </div>
                                :isError ?
                                    <p>Error</p>
                                :
                                    <>
                                    <DataView 
                                        style = {{display: "none"}}
                                        paginator
                                        rows={12}
                                        paginatorClassName="card-footer"
                                        layout="list" 
                                        itemTemplate={itemTemplate}
                                        value={ (categorias[selectedIndex] != null) ?
                                            categorias[selectedIndex].content
                                            :
                                            []    
                                        } 
                                    />

                                    <TileView
                                        baseItemWidth = "230"
                                        showScrollbar = "true"
                                        items={ (categorias[selectedIndex] != null) ?
                                            categorias[selectedIndex].content
                                            :
                                            []    
                                        } 
                                        itemRender={itemTemplate}
                                    />

                                    </>
                                }

                                
                                <Paginator
                                    method = "get"
                                    url = "/Factura"
                                    queryKey = "testeo"
                                />
                            </div>
                        </div>

                        <div className="card d-flex flex-row">
                            {/*Selecionar usuario*/}
                            <div style={{width: '33rem'}}>
                                <div className="card-header">
                                    El cliente es: 
                                </div>
                                <div className="card-body d-flex">
                                    <Avatar
                                        size="xlarge"
                                        shape="square"
                                        image="https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png"
                                    />
                                    <div className="ml-2 mr-5">
                                        <p className="m-0 mb-1">Usuario Selecionado</p>
                                        <Button
                                            width="100%"
                                            type="danger"
                                            text="Desvincular"
                                            stylingMode="outlined"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{width: "1px", backgroundColor: "#d8dbe0"}}/>

                            <div className="w-100" >
                                <div className="card-header">
                                    Seleccione un descuento disponible para aplicar: 
                                    <span className="text-muted text-sm ml-2">(1 por orden)</span>
                                </div>
                                <div className="card-body">
                                        <div>
                                        <Button
                                            type="success"
                                            text="5% de descuento"
                                            stylingMode="outlined"
                                        />
                                        <Button
                                            type="success"
                                            text="Entrega Gratis"
                                            stylingMode="outlined"
                                        />
                                        <Button
                                            height="100%"
                                            type="success"
                                            text="20% de descuent"
                                            stylingMode="outlined"
                                        />
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <Selecionado/>
                </div>
                
            </div>
        </section>
    );
}
 
export default TomarVenta;