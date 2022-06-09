import { useAxiosMutator } from '../utilities/core';

const apiIdentity = {
    Authenticate: useAxiosMutator('post', '/Identity/sign-in'),
    Register: useAxiosMutator('post', '/Identity/sign-up'),
};

export default apiIdentity;
