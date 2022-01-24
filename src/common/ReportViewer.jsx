import React, { useState } from 'react';

import NiceModal from '@ebay/nice-modal-react';

//Owned
import FormDialog from '_@/common/FormDialog';

const FormCaja = NiceModal.create(({ title, link }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const URL = import.meta.env.VITE_API_URL + link;


    return (
        <FormDialog
            title={"Reporte: " + title}
            footerControl={false}
        >
            <embed
                type="application/pdf"
                src={URL}
                id="pdfDocument"
                width="100%"
                height="400px"
            />
        </FormDialog>
    )
});

export default FormCaja;
