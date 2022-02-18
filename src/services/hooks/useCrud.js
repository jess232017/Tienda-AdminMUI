import { useCallback } from 'react';

import { show } from '@ebay/nice-modal-react';
import { toast } from 'react-toastify';

const deleteData = {
    title: "Acción permanente ⚠️",
    description: '¿Seguro que quiere realizar la accion?',
    cancellationText: 'No, Cancelar',
    confirmationText: 'Si, Eliminar',
    confirmationButtonProps: {
        color: 'error',
    },
}

const useCrud = (api, form, selected) => {
    const { mutateAsync } = api.delete(`/${selected[0]}`);
    const requestEdit = api.edit(`/${selected[0]}`)
    const requestAdd = api.new();

    const handleAdd = useCallback(() => {
        show(form, { request: requestAdd })
    }, []);

    const handleEdit = useCallback(() => {
        show(form, { data: selected, request: requestEdit })
    }, [selected]);

    const handleDelete = useCallback(() => {
        if (selected != null) {
            confirm(deleteData).then(() => {
                toast.promise(mutateAsync({ id: selected[0] }), {
                    pending: 'Eliminando...',
                    success: 'Se ha eliminado con exito. 👌',
                    error: {
                        render({ data: { response: { data: { error } } } }) {
                            return error.message
                        }
                    }
                });
            })
        }
    }, [selected])

    return { handleAdd, handleEdit, handleDelete }
}

export default useCrud;
