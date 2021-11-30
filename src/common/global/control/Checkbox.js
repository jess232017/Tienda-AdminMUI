
import React from "react";

import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiCheckbox from '@mui/material/Checkbox';
import { Controller } from "react-hook-form";

const ControlLabel = styled(FormControlLabel)({
    marginLeft: '2px' ,
    marginTop: '1.2rem',
    ' .MuiTypography-root': {
        fontWeight: 600,
        fontSize: ".88rem"
    }
});

const CheckBox = ({name, label, control}) => {
    return(
        <ControlLabel
            control={
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <MuiCheckbox
                            {...field} 
                            helperText="Incorrect entry."
                        />
                    )}
                />
            }
            label={label}
            labelPlacement="start"
        />
    )
};

export default CheckBox;