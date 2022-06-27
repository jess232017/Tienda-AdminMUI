import { useCallback } from 'react';

import { show } from '@ebay/nice-modal-react';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const useCrud = (api, form, selected) => {
    const { mutate } = api.delete(`/${selected?.id}`);
    const requestEdit = api.edit(`/${selected?.id}`);
    const requestAdd = api.new();

    const handleAdd = useCallback(() => {
        show(form, { data: {}, request: requestAdd, title: 'Agregar' });
    }, []);

    const handleEdit = useCallback(() => {
        show(form, { data: selected, request: requestEdit, title: 'Editar' });
    }, [selected]);

    const handleDelete = useCallback(() => {
        if (selected != null) {
            Swal.fire({
                title: '¿Estás seguro?',
                text: '¡No seras capaz de revertir esto!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3366ff',
                confirmButtonText: '¡Si, borrarlo!',
                cancelButtonText: 'Cancelar',
                reverseButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    mutate({ id: selected?.id });
                }
            });
        }
    }, [selected]);

    return { handleAdd, handleEdit, handleDelete };
};

export default useCrud;
