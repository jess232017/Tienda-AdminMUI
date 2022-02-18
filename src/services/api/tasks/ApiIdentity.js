import { axiosMutator } from '../utilities/core'

const apiIdentity = {
    SignIn: axiosMutator("post", "/api/Identity/sign-in"),
    SignUp: axiosMutator("post", "/api/Identity/sign-up")
}

export default apiIdentity;