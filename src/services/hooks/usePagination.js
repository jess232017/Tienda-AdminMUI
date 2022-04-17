import { useState, useEffect, useCallback } from 'react';

import NoData from '@/pages/error/NoData';

const optionSize = [10, 20, 30];

const usePagination = (api, columns) => {
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState([]);
    const [size, setSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [selected, setSelected] = useState({});
    const [selectionModel, setSelectionModel] = useState([]);

    const { data, isLoading: loading, isError } = api.get(page, size);

    useEffect(() => {
        if (data != null) {
            const { totalPages, data: rows } = data;
            setTotal(totalPages);
            setRows(rows || []);
        }
    }, [data]);

    const onPageChange = useCallback((page) => {
        if (page !== 0) {
            console.log('onPageChange ', page);
            setPage(page);
        }
    }, []);

    const onPageSizeChange = useCallback((newPage) => {
        console.log('onPageSizeChange ', newPage);
        setSize(newPage);
    }, []);

    const onSelectionModelChange = useCallback(
        (selection) => {
            const last = selection.slice(-1);
            setSelectionModel(last);
            const data = last.length >= 1 ? rows.find((value) => value.id === last[0]) : {};
            setSelected(data);
        },
        [rows]
    );

    //props for DataGrid
    const control = {
        rows,
        page,
        columns,
        rowCount: total,
        checkboxSelection: true,
        pagination: true,
        pageSize: size,
        paginationMode: 'server',
        rowsPerPageOptions: optionSize,
        density: 'compact',
        loading,
        components: {
            NoRowsOverlay: NoData,
        },
        disableMultipleSelection: true,
        selectionModel: selectionModel,
        onSelectionModelChange,
        onPageSizeChange,
        onPageChange,
    };

    return { control, data, selected, isLoading: loading, isError };
};

export default usePagination;
