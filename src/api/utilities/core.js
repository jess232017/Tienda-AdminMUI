import { useCallback, useRef } from 'react';

import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useAuthHeader } from 'react-auth-kit';
import { useQuery } from 'react-query';
import { useQueryClient, useMutation } from 'react-query';

//import Loading from './Loading';

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
        const toastId = useRef(null);
        const queryClient = useQueryClient();
        const authHeader = useAuthHeader()();

        const axios = withAxios(method, url + urlParams, authHeader);
        const notify = () =>
            (toastId.current = toast('Procesando, por favor espere...', {
                type: toast.TYPE.INFO,
                pauseOnHover: false,
                autoClose: false,
            }));

        return useMutation(axios, {
            retry: 2,
            onMutate: () => notify(),
            onError: (error) => {
                const bodyError = error?.response?.data?.error;
                const bodyErrors = JSON.stringify(error?.response?.data?.errors);
                const render = bodyError?.message || bodyErrors || 'La petición no pudo ser procesada';
                console.log('render', render);
                toast.update(toastId.current, { render, type: toast.TYPE.ERROR, autoClose: 4000 });

                Swal.fire({
                    title: 'Error!',
                    text: render,
                    icon: 'error',
                    confirmButtonText: 'De acuerdo',
                });
            },
            onSuccess: ({ data }) => {
                queryClient.invalidateQueries(queryKey);
                const render = data?.message || 'Petición procesada con exito';
                toast.update(toastId.current, { render, type: toast.TYPE.SUCCESS, autoClose: 4000 });
                Swal.fire({
                    title: 'Todo correcto!',
                    text: render,
                    icon: 'success',
                    confirmButtonText: 'Perfecto',
                });
            },
            onSettled: (data, error, variables, context) => {},
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
