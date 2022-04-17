import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { useQueryClient, useMutation } from 'react-query';
import { useAuthHeader } from 'react-auth-kit';

import withAxios from '../utilities/provider';

const axiosQuery =
    (method, url, queryKey) =>
    (urlParams = '') => {
        const authHeader = useAuthHeader()();
        const axios = withAxios(method, url + urlParams, authHeader);

        return useQuery([queryKey, urlParams], axios, {
            keepPreviousData: true,
            select: useCallback((data) => data.data, []),
        });
    };

const axiosMutator =
    (method, url, queryKey) =>
    (urlParams = '') => {
        const queryClient = useQueryClient();
        const authHeader = useAuthHeader()();

        const axios = withAxios(method, url + urlParams, authHeader);

        return useMutation(axios, {
            retry: 2,
            onSuccess: () => {
                queryClient.invalidateQueries(queryKey);
            },
        });
    };

const axiosPaginator = (method, url, queryKey) => (page) => {
    const authHeader = useAuthHeader()();
    const axios = withAxios(method, url, authHeader);

    return useQuery([queryKey, page], axios, {
        keepPreviousData: true,
        staleTime: 5000,
    });
};

export { axiosMutator, axiosQuery, axiosPaginator };
