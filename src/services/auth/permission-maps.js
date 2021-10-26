//Usuarios de la aplicacion
export const ROLES = {
    administrador: "Administrador",
    bodeguero: "Bodeguero",
    vendedor: "Vendedor",
    cliente: "Cliente",
    cajero: "Cajero"
}

//
export const SCOPES = {
    canCreate: "can-create",
    canEdit: "can-edit",
    canDelete: "can-delete",
    canView:  "can-view"
}

export const PERMISSIONS = {
    [ROLES.vendedor]: [SCOPES.canView],
    [ROLES.administrador]: [SCOPES.canDelete],
    [ROLES.bodeguero]: [SCOPES.canEdit],
    [ROLES.cajero]: [SCOPES.canCreate]
}