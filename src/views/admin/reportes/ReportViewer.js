import React, { useState } from 'react';

import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

const ExampleReactPDF = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div>
            <Document
                file="https://tienda-js-api.azurewebsites.net/api/reporte/productos/vence"
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
        </div>
    )
};

export default ExampleReactPDF;