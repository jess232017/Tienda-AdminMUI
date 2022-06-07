import { useEffect, useState } from 'react';

import { useAuthUser } from 'react-auth-kit';
import useStore from '@/services/context/carrito';

import { apiPaymentMethod, apiOrder } from '@/api/tasks';

const usePaymethod = (page = 1, size = 30) => {
    const auth = useAuthUser()();
    const { mutateAsync } = apiOrder.new();
    const { carrito, nukeItems } = useStore();
    const [methods, setMethods] = useState([]);
    const { data } = apiPaymentMethod.get(page, size);

    useEffect(() => {
        if (data?.data) {
            console.log('changing methods', data?.data);
            setMethods(data?.data);
        }
    }, [data]);

    const getMethod = (method) => {
        console.log('data->payment', methods);
        return methods.find(({ name }) => name.toUpperCase() === method.toUpperCase());
    };

    const createInvoice = async (method, paidWith, clientId, vendorId, addressId) => {
        console.log(method, paidWith, clientId, vendorId, addressId);
        const details = carrito.map(({ id, quantity }) => ({ productId: id, quantity }));

        const data = {
            vendorId: vendorId,
            addressId: addressId,
            clientId: clientId,
            paymentName: method,
            paidWith: paidWith,
            discount: 0,
            note: '',
            status: 1,
            details,
        };

        await mutateAsync(data, {
            onSuccess: () => {
                nukeItems();
            },
        });
    };

    return { getMethod, createInvoice };
};

export default usePaymethod;
