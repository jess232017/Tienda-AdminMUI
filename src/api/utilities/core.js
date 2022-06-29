import { useCallback } from 'react';

import { useAuthHeader } from 'react-auth-kit';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import withAxios from './provider';

const useAxiosQuery =
    (method, url, queryKey) =>
    (urlParams = '') => {
        const authHeader = useAuthHeader()();
        const axios = withAxios(method, url + urlParams, authHeader);

        return useQuery([queryKey, urlParams], axios, {
            retry: false,
            keepPreviousData: true,
            select: useCallback((data) => data.data, []),
            onError: (error) => {
                console.log('error', JSON.stringify(error));
                const bodyError = error?.response?.data?.error;

                if (import.meta.env.VITE_DEBUG === 'true') {
                    Swal.fire({
                        title: 'Error!',
                        text: bodyError?.message2,
                        icon: 'error',
                        confirmButtonText: 'OK',
                        toast: true,
                        timer: 4000,
                        timerProgressBar: true,
                    });
                }
                console.log('backend-error', bodyError?.message2);
            },
        });
    };

const useAxiosMutator =
    (method, url, queryKey) =>
    (urlParams = '') => {
        const queryClient = useQueryClient();
        const authHeader = useAuthHeader()();
        const axios = withAxios(method, url + urlParams, authHeader);

        const notify = () => {
            Swal.fire({
                title: 'Procesando su solicitud',
                html: 'Espere por favor...',
                timer: 5000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
        };

        return useMutation(axios, {
            retry: false,
            onMutate: () => notify(),
            onError: (error) => {
                console.log('error', JSON.stringify(error));
                const bodyError = error?.response?.data?.error;
                const bodyErrors = JSON.stringify(error?.response?.data?.errors);
                const render = bodyError?.message || bodyErrors || 'La petición no pudo ser procesada';

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

export { useAxiosMutator, useAxiosQuery };
