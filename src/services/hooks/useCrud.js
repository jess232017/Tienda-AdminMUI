import { useCallback } from 'react';

import { toast } from 'react-toastify';
import { show } from '@ebay/nice-modal-react';
import { useConfirm } from 'material-ui-confirm';

const deleteData = {
    title: 'Acción permanente ⚠️',
    description: '¿Seguro que quiere realizar la accion?',
    cancellationText: 'No, Cancelar',
    confirmationText: 'Si, Eliminar',
    confirmationButtonProps: {
        color: 'error',
    },
};

const useCrud = (api, form, selected) => {
    const confirm = useConfirm();
    const { mutateAsync } = api.delete(`/${selected?.id}`);
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
            confirm(deleteData).then(() => {
                toast.promise(mutateAsync({ id: selected?.id }), {
                    pending: 'Eliminando...',
                    success: 'Se ha eliminado con exito. 👌',
                    error: {
                        render({
                            data: {
                                response: {
                                    data: { error },
                                },
                            },
                        }) {
                            return error.message;
                        },
                    },
                });
            });
        }
    }, [selected]);

    return { handleAdd, handleEdit, handleDelete };
};

export default useCrud;
