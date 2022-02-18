import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const cancelData = {
    title: "Acción permanente ⚠️",
    description: '¿Seguro que quiere eliminar los productos agregados al carrito?',
    cancellationText: 'No, Cancelar',
    confirmationText: 'Eliminar Todo',
    confirmationButtonProps: {
        color: 'error',
        startIcon: <HighlightOffIcon />
    },
}

export { cancelData }