import React from 'react';
import './Truncable.css'

const Truncable = ({text, length}) => {
    const truncar = (str) => {
        return str.length > length ? str.substring(0, length - 3) + "..." : str;
    }

    return ( 
        <div className="title-text" data-title={text}>{truncar(text)}</div>
    );
}
 
export default Truncable;