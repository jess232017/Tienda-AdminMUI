import React, { useState } from 'react';

import { IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import TextFieldElement from './Input';

const PasswordElement = (props) => {
    const [password, setPassword] = useState(true)
    return (
        <TextFieldElement
            {...props}
            InputProps={{
                endAdornment: (
                    <InputAdornment position={'end'}>
                        <IconButton
                            onMouseDown={(e) =>
                                e.preventDefault()
                            }
                            onClick={() => setPassword(!password)}
                            tabIndex={-1}
                        >
                            {password ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
            type={password ? 'password' : 'text'}
        />
    )
}
export default PasswordElement;