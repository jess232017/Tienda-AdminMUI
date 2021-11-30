import React from 'react';
import ReactPDF from '@intelllex/react-pdf';

const ExampleReactPDF = () => {
    return (
        <ReactPDF
            url="https://localhost:44314/api/reporte/productos/vence"
            showProgressBar
            showToolbox
        />
    )
};
 
export default ExampleReactPDF;