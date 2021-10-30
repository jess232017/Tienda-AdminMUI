import React from 'react';

import styled from 'styled-components'
import { css } from 'styled-components';

const BtnToogle = styled.button`
    background-color: #f8f9fa;
    color: #212529;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    padding: 8px;
`;

const Icon = styled.span`
    width: 18px;
    height: 18px;
    background-position: 0 0;
    background-size: 18px 18px;
    padding: 0;
    font-size: 18px;
    text-align: center;
    line-height: 18px;
    margin-right: 0;
    margin-left: 0;
}
`;

const ToggleGroup = ({value, option, onChange}) => {

    return ( 
        <div class="btn-group">
            {option.map( data => (
                <BtnToogle className={`${value === data.name ? "btn-primary" : "btn-light"}`} data-original-title="List view"
                    onClick={() => onChange(data.name)}
                >
                    <Icon className="material-icons">{data.icon}</Icon>
                </BtnToogle>
            ))}
        </div>
    );
}
 
export default ToggleGroup;