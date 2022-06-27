import React from 'react';
import { apiOrder } from '@/api/tasks';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { nukeCart } from '@/store/features/shopSlice';

const usePaymethod = () => {
    const { mutateAsync } = apiOrder.new();

    //redux
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.shopping.cart);

    const createInvoice = async (method, paidWith, clientId, vendorId, addressId) => {
        console.log(method, paidWith, clientId, vendorId, addressId);
        const details = cart.map(({ id, quantity }) => ({ productId: id, quantity }));

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
                dispatch(nukeCart());
            },
        });
    };

    return { createInvoice };
};

export default usePaymethod;
