import { useState, useEffect, useCallback } from 'react';

import NoData from '_@/pages/error/NoData';

const optionSize = [10, 20, 30];

const usePagination = (api, columns) => {
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState([]);
    const [size, setSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [selected, setSelected] = useState([0]);

    const { data, isLoading: loading, isError } = api.get(page, size);

    useEffect(() => {
        if (data != null) {
            const { data: { totalPages, data: rows } } = data;
            setTotal(totalPages);
            setRows(rows || []);
        }
    }, [data]);

    const onPageChange = useCallback((page) => {
        if (page !== 0) {
            console.log("hereee1 ", page)
            setPage(page)
        }
    }, []);

    const onPageSizeChange = useCallback((newPage) => {
        console.log("hereee2 ", newPage)
        setSize(newPage)
    }, []);

    const onSelectionModelChange = useCallback((data) => {
        if (data.length !== 0) {
            console.log("hereee3 ", data)
            setSelected(data)
        }
    }, []);

    //props for DataGrid
    const control = {
        rows,
        page,
        columns,
        rowCount: total,
        pagination: true,
        pageSize: size,
        paginationMode: "server",
        rowsPerPageOptions: optionSize,
        density: "compact",
        loading,
        components: {
            NoRowsOverlay: NoData,
        },
        selectionModel: selected,
        onSelectionModelChange,
        onPageSizeChange,
        onPageChange,
    }

    return { control, data, selected, isLoading: loading, isError }
}

export default usePagination;
