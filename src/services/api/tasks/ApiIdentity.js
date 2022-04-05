import { axiosMutator } from '../utilities/core'

const apiIdentity = {
    Authenticate: axiosMutator("post", "/Identity/sign-in"),
    Register: axiosMutator("post", "/Identity/sign-up")
}

export default apiIdentity;