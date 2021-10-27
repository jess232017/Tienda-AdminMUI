import React, { useEffect, useState } from 'react';

import { Skeleton } from 'primereact/skeleton';

import TileView from 'devextreme-react/tile-view';
import { Avatar } from 'primereact/avatar';
import { Button } from 'devextreme-react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TablePagination from '@material-ui/core/TablePagination';



import apiCategoria from 'src/services/api/tasks/ApiCategoria';
import useSide from 'src/services/context/sidebarShow';
import useCarrito from 'src/services/context/carrito';
import NanoItem from 'src/components/widgets/NanoItem';
import Selecionado from '../../Selecionado';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        borderRadius: 0,
        border: "1px solid grey",
    },
});

const TomarVenta = () => {
    const {data, isLoading, isSuccess,  isError} = apiCategoria.obtener();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [categorias, setCategorias] = useState([]);
    const [fetched, setFetched] = useState(false)
    const carritoStore = useCarrito();
    const classes = useStyles();
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

    const onTabsSelectionChanged = (event, newValue) =>{
        setSelectedIndex(newValue);
    }

    const handleChange = (event, newValue) => {
        setSelectedIndex(newValue);
    };
    
    
    return ( 
        <section className="section-content padding-y-sm bg-default ">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8">
                        {/*Carrito*/}
                        <Card>
                            <CardHeader
                                title="Productos disponibles"
                            />

                            <Divider/>

                            <CardContent>
                                {isLoading ?
                                    <Skeleton width="100%" height="2.5rem"></Skeleton>
                                :isError ?
                                    <p>Error</p>
                                :
                                    <Paper className={classes.root}>
                                        <Tabs
                                            value={selectedIndex}
                                            onChange={handleChange}
                                            indicatorColor="primary"
                                            textColor="primary"
                                            variant="scrollable"
                                            scrollButtons="auto"
                                            aria-label="scrollable auto tabs example"
                                        >
                                            {categorias?.map(value => (
                                                <Tab label={value.text}  key={value.text}/>
                                            ))}
                                        </Tabs>
                                    </Paper>
                                }

                                {isLoading?
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <Skeleton width="100%" className="mt-2" height="25rem"></Skeleton>
                                        <Skeleton width="24rem" className="mt-2" height="2.5rem"></Skeleton>
                                    </div>
                                :isError ?
                                    <p>Error</p>
                                :
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
                                }
                            </CardContent>

                            <Divider/>

                            <CardActions>
                                <TablePagination
                                    component="div"
                                    count={100}
                                    page={1}
                                    onPageChange={e => console.log}
                                    rowsPerPage={10}
                                    onRowsPerPageChange={e => console.log}
                                />
                            </CardActions>
                        </Card>

                        <Card className="d-flex mt-2">
                            
                            {/*Selecionar usuario*/}
                            <div style={{width: '33rem'}}>
                                <CardHeader
                                    title="El cliente es:"
                                />
                                <CardContent className="d-flex">
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
                                </CardContent>
                            </div>

                            <div style={{width: "1px", backgroundColor: "#d8dbe0"}}/>

                            <div className="w-100" >
                                <CardHeader
                                    title="Seleccione un descuento disponible para aplicar:"
                                    subheader="(1 Por orden)"
                                />
                                <CardContent>
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
                                </CardContent>
                            </div>
                        </Card>
                    </div>


                    <Selecionado/>
                </div>
                
            </div>
        </section>
    );
}
 
export default TomarVenta;