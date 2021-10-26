import React, { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { useQuery, useQueryClient } from 'react-query';
import withAxios from 'src/services/api/utilities/provider';

const Paginator = ({method, url, queryKey, setData}) => {
    const availableSize = [5, 8, 15, 30];
    const authHeader = useAuthHeader()();
    const queryClient = useQueryClient();
    const [size, setSize] = useState(5);
    const [page, setPage] = useState(2);

    const fetch = () => async() =>{
        const { data } =  await withAxios(method, `${url}/paginar?PageNumber=${page}&PageSize=${size}`, authHeader)();
        return data
    }
  
    const {data, isLoading, isError} = useQuery([queryKey, {page, size}], fetch(), {
        keepPreviousData: true,
        staleTime: 50000
    });
  
    // Preobtener la pagina siguiente!
    React.useEffect(() => {
      if (data?.totalPages < page) {
        queryClient.prefetchQuery([queryKey, {page, size}], fetch())
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, page, size, queryClient])

    //Boton de la paginacion
    const PageButton = ({length, add = 1}) => Array.from({ length }, (_, k) => (
        <div className={`dx-page ${(k + add === page) && "dx-selection"}`} 
            key={`${length} ${_} ${k} ${add}`}    
            onClick={() => setPage(k + add)}
            aria-label={`Page ${k + add}`}
            role="button" 
            tabIndex="0"
        >
            {k+add}
        </div>
    ))

    //Validar que la pagina no se salga de los limites
    const onClickPage = (valor) => {
        let ckValor = valor;
        if(valor < 1) ckValor = 1;
        if(valor > data?.totalPages) ckValor = data?.totalPages;

        setPage(ckValor)
    }

    if(isLoading){
        return <p>Cargando...</p>
    }

    if(isError){
        return <p>Hubo un error</p>
    }

    return (  
        <div className="dx-widget dx-datagrid-pager dx-pager">
            {/*Tamaños de pagina*/}
            <div className="dx-page-sizes">
                {availableSize.map( valor =>
                    <div className={`dx-page-size ${(valor === size) && "dx-selection"}`}
                        aria-label={`Muestra ${valor} items en la pagina`}
                        onClick = { () => setSize(valor)}
                        key = {valor}
                        role="button"
                        tabIndex="0"
                    >
                        {valor}
                    </div>
                )}
            </div>

            {/*Indice de pagina*/}
            <div className="dx-pages">
                <div className="dx-page-indexes">
                    <div className={`dx-navigate-button dx-prev-button ${(page === 1) && "dx-button-disable"}`} 
                        onClick={() => onClickPage(page - 1)}
                        aria-label="Pagina anterior"
                        role="button" 
                        tabIndex="0"
                    />
                    
                    {/*Logica para mostrar las paginas*/}
                    {
                        //Si la paginacion es pequenia
                        data?.totalPages < 11 ?
                            <PageButton
                                length = {data?.totalPages}
                            />
                            
                        :page < 5 ?
                            <>
                                <PageButton
                                    length = {5}
                                />
                                <div className="dx-separator">. . .</div>
                                <PageButton
                                    length = {1}
                                    add = {data?.totalPages}
                                />
                            </>
                        :page > data?.totalPages-3 ?
                            <>
                                <PageButton
                                    length = {1}
                                />
                                <div className="dx-separator">. . .</div>
                                <PageButton
                                    length = {5}
                                    add = {data?.totalPages-4}
                                />
                            </>
                        :
                            <>
                                <PageButton
                                    length = {1}
                                />
                                <div className="dx-separator">. . .</div>
                                <PageButton
                                    length = {4}
                                    add = {page-2}
                                />
                                <div className="dx-separator">. . .</div>
                                <PageButton
                                    length = {1}
                                    add = {data?.totalPages}
                                />
                            </>
                    }
                   
                    <div className={`dx-navigate-button dx-next-button ${(page === data?.totalPages && "dx-button-disable")}`}
                        onClick={() => onClickPage(page + 1)}
                        aria-label="Pagina siguiente"
                        role="button"
                        tabIndex="0"  />
                </div>
            </div>
        </div>
    );
}

export default Paginator;