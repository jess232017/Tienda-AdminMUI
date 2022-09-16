import React from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'

import ServerDown from '@/pages/error/ServerDown'

const PageCard = ({ headerProps = {}, isLoading = false, isError = false, children }) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader
                {...headerProps}
                subheader={isLoading ? 'Cargando...' : headerProps.subheader}
                titleTypographyProps={{
                    variant: 'h5',
                }}
            />
            <Divider />

            {isError ? <ServerDown /> : <>{children}</>}
        </Card>
    )
}

export default PageCard
