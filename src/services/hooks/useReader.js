import React, { useEffect, useCallback, useRef, useState } from 'react';
const clientId = 'bc7cc9e2c6d443dda8d7d97b58249263';

const useReader = () => {
    const ref = useRef(null);
    const [enable, setEnable] = useState(false);

    const viewLightBox = (url, fileName = 'File.pdf') => {
        const viewr = new AdobeDC.View({ clientId });
        viewr.previewFile(
            {
                content: { location: { url } },
                metaData: { fileName },
            },
            { embedMode: 'LIGHT_BOX', defaultViewMode: 'FIT_PAGE', exitPDFViewerType: 'RETURN' }
        );
    };

    const viewFull = (url, fileName, divId) => {
        const viewr = new AdobeDC.View({ clientId, divId });
        viewr.previewFile(
            {
                content: { location: { url } },
                metaData: { fileName },
            },
            {}
        );
    };

    const viewContain = (url, fileName, divId) => {
        const viewr = new AdobeDC.View({ clientId, divId });
        viewr.previewFile(
            {
                content: { location: { url } },
                metaData: { fileName },
            },
            { embedMode: 'SIZED_CONTAINER' }
        );
    };

    useEffect(() => {
        document.addEventListener('adobe_dc_view_sdk.ready', function () {
            console.log('hola mund');
            setEnable(true);
            new AdobeDC.View({ clientId: 'bc7cc9e2c6d443dda8d7d97b58249263' });
        });
    }, []);

    return { viewLightBox, viewFull, viewContain, enable };
};
export default useReader;
