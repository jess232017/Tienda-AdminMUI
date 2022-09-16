import { useState, useEffect, useCallback } from 'react'

import NoData from '@/pages/error/NoData'

const optionSize = [10, 20, 30]

const usePagination = (api, columns) => {
    const [page, setPage] = useState(0)
    const [rows, setRows] = useState([])
    const [size, setSize] = useState(10)
    const [rowCount, setRowCount] = useState(0)
    const [selected, setSelected] = useState({})
    const [selectionModel, setSelectionModel] = useState([])

    const { data, isLoading: loading, isError } = api.get(page + 1, size)

    useEffect(() => {
        if (data != null) {
            const { totalRecords, data: records } = data
            setRows(records)
            setRowCount(totalRecords)
        }
    }, [data])

    const onPageChange = useCallback((page) => {
        console.log('pagepagepagepage', page)
        setPage(page)
    }, [])

    const onPageSizeChange = useCallback((newPage) => {
        setSize(newPage)
    }, [])

    const onSelectionModelChange = useCallback(
        (selection) => {
            const last = selection.slice(-1)
            setSelectionModel(last)
            const data = last.length >= 1 ? rows.find((value) => value.id === last[0]) : {}
            setSelected(data)
        },
        [rows],
    )

    //props for DataGrid
    const control = {
        rows,
        rowCount,
        loading,
        labelRowsPerPage: 'mpp',
        rowsPerPageOptions: optionSize,
        pagination: true,
        page,
        pageSize: size,
        paginationMode: 'server',
        onPageChange,
        onPageSizeChange,
        columns,
        density: 'standard',
        components: {
            NoRowsOverlay: NoData,
        },
        selectionModel: selectionModel,
        onSelectionModelChange,
        // checkboxSelection: true,
        //disableMultipleSelection: true,
        sx: {
            borderLeft: '1px solid #e0e0e0',
            borderRight: '1px solid #e0e0e0',
            border: 'none',
            px: 2,
            '& .MuiDataGrid-columnHeaders ': {
                borderRadius: 2,
                backgroundColor: 'rgb(244, 246, 248)',
            },
            '& .MuiDataGrid-columnHeader': {
                color: 'rgb(99, 115, 129)',
            },
            '& .MuiDataGrid-footerContainer': {
                mx: -2,
            },
            '& .MuiDataGrid-main': {
                mb: 2,
                //border: '1px solid #e0e0e0',
            },
            '& .MuiDataGrid-cell': {
                borderBottom: 'none',
            },
        },
    }

    return { control, data, selected, isLoading: loading, isError, rowCount }
}

export default usePagination
