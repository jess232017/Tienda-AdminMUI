import {axiosMutator} from '../utilities/core'

const apiAuth = {
    ingresar : axiosMutator("post", "/usuario/login"),
    registrar : axiosMutator("post", "/usuario/registrar")
}

export default apiAuth;