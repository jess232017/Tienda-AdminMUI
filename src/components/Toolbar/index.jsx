import React from 'react';
import { useTranslation } from 'react-i18next';

//Mui
import { styled } from '@mui/system';
import { Box, Stack, Button } from '@mui/material';

//Icon
import PrintIcon from '@mui/icons-material/Print';
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture';

//Owned
import Search from '@/components/Toolbar/Search';

const StackLeft = styled(Stack)({
    flexWrap: 'wrap',
    flexDirection: 'row',
    ' button, div': {
        marginBottom: 4,
        marginRight: 8,
    },
});

const StackRight = styled(Stack)({
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    ' button, div': {
        marginBottom: 4,
        marginLeft: 8,
    },
});

const Toolbar = ({ children, onClickChooser, onClickPrint }) => {
    const { t } = useTranslation();

    return (
        <Box display="flex" justifyContent="space-between" mb={1}>
            <StackLeft>{children}</StackLeft>

            <StackRight>
                {onClickPrint != null && (
                    <Button size="small" variant="outlined" onClick={onClickPrint} startIcon={<PrintIcon />}>
                        {t('toolbar.print')}
                    </Button>
                )}

                {onClickChooser != null && (
                    <Button size="small" variant="outlined" onClick={onClickChooser} startIcon={<PictureInPictureIcon />}>
                        {t('toolbar.filter')}
                    </Button>
                )}
                <Search />
            </StackRight>
        </Box>
    );
};

export default Toolbar;
