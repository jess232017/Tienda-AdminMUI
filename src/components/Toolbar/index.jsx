import React from 'react';

//Mui
import { styled } from '@mui/system';
import { Box, Stack, Button } from '@mui/material';

//Icon
import PrintIcon from '@mui/icons-material/Print';
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture';

//Owned
import Search from '_@/components/Toolbar/Search';

const Stacky = styled(Stack)({
    " button, div": {
        marginBottom: 4,
        marginRight: 8
    }
})

const Toolbar = ({ children, onClickChooser, onClickPrint }) => {

    return (
        <Box display="flex" justifyContent="space-between" mb={1}>
            <Stacky display="inline-block" direction="row" flexWrap="wrap">
                {children}
            </Stacky>

            <Stacky direction="row">
                {onClickPrint != null &&
                    <Button
                        size='small'
                        variant="outlined"
                        onClick={onClickPrint}
                        startIcon={<PrintIcon />}
                    >
                        Imprimir
                    </Button>
                }

                {onClickChooser != null &&
                    <Button
                        size='small'
                        variant="outlined"
                        onClick={onClickChooser}
                        startIcon={<PictureInPictureIcon />}
                    >
                        Columnas
                    </Button>
                }
                <Search />
            </Stacky>
        </Box>
    );
}

export default Toolbar;
