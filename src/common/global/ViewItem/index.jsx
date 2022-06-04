import React, { useState, useEffect } from 'react';

import { styled } from '@mui/system';

import Box from '@mui/material/Box';
import Select from 'react-select';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';

// Icon
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';

// own
import Viewer from './Viewer';
import apiProduct from '@/api/tasks/ApiProduct';
import apiCategory from '@/api/tasks/ApiCategory';

const Toggle = styled('div')({
    display: 'flex',
    borderRadius: '.3rem',
    border: '1px solid rgb(209 213 219/ 1)',
    button: {
        borderRadius: 0,
        '&.MuiIconButton-colorPrimary': {
            color: 'white',
            backgroundColor: '#3366ff',
        },
        '&:first-of-type': {
            borderTopLeftRadius: 3,
            borderBottomLeftRadius: 3,
        },
        '&:last-of-type': {
            borderTopRightRadius: 3,
            borderBottomRightRadius: 3,
        },
    },
});

const ViewItem = () => {
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [view, setView] = useState('grid');
    const [selected, setSelected] = useState(1);

    const { data: categories, loading: fetching } = apiCategory.get(1, 10);
    const { data: dataItem } = apiProduct.getByCategory(selected?.value, page);

    useEffect(() => {
        if (categories != null) {
            const { data } = categories;
            const defaultSelected = data.find((a) => a.name === 'General');
            setSelected({ value: defaultSelected?.id, label: defaultSelected?.name });
        }
    }, [categories]);

    useEffect(() => {
        if (dataItem != null) {
            const {
                data: { totalPages },
            } = dataItem;
            setTotal(totalPages);
        }
    }, [dataItem]);

    const handleChange = (_, value) => {
        setPage(value);
    };

    const handleCategory = (value) => {
        if (value != null) {
            setSelected(value);
            console.log(value);
        }
    };

    return (
        <>
            <CardContent sx={{ p: '16px' }}>
                <Box display="flex" justifyContent="space-between" flexWrap="wrap" pb={0}>
                    <Box display="flex" alignItems="center">
                        <label htmlFor="category">Categoria</label>
                        <Box ml={1} className="input-style">
                            <Select
                                options={categories?.data?.map(({ id, name }) => ({
                                    label: name,
                                    value: id,
                                }))}
                                value={selected}
                                isLoading={fetching}
                                onChange={handleCategory}
                                name="select-category"
                                menuPortalTarget={document.body}
                                menuShouldScrollIntoView={false}
                                placeholder="Seleccione..."
                                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                            />
                        </Box>
                    </Box>

                    <Stack spacing={1} direction="row">
                        <div className="input-style">
                            <input type="text" placeholder="Buscar..." />
                        </div>
                        <Toggle>
                            <IconButton color={view === 'list' ? 'primary' : 'secondary'} onClick={() => setView('list')}>
                                <ViewListIcon />
                            </IconButton>
                            <IconButton color={view === 'grid' ? 'primary' : 'secondary'} onClick={() => setView('grid')}>
                                <GridViewIcon />
                            </IconButton>
                        </Toggle>
                    </Stack>
                </Box>
            </CardContent>
            <Divider />

            <CardContent>
                <Viewer view={view} page={page} total={total} data={dataItem} handleChange={handleChange} />
            </CardContent>
        </>
    );
};

export default ViewItem;
