import React, { useState } from 'react';

import NiceModal from '@ebay/nice-modal-react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

//Owned
import FormDialog from 'src/common/FormDialog';

const FormCaja = NiceModal.create(({ title, link }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <FormDialog
            title={"Reporte: " + title}
            footerControl={false}
        >
            <Document
                file={link}
                onLoadSuccess={onDocumentLoadSuccess}
                loading="Cargando documento"
                noData="No se pudo cargar el documento"
                error="Error al cargar el documento"

            >
                <Page pageNumber={pageNumber} width="850" />
            </Document>
            <p>Paginas {pageNumber} de {numPages}</p>
        </FormDialog>
    )
});

export default FormCaja;
