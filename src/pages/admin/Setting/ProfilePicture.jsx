import React from 'react';
import { Card, CardHeader, CardContent, Typography, Button, Stack } from '@mui/material';
import Image from 'mui-image';
import LandscapeIcon from '@mui/icons-material/Landscape';

const ProfilePicture = () => {
    return (
        <>
            <Card>
                <CardContent>
                    <Stack spacing={2}>
                        <Image width="50%" src="https://flowbite.com/application-ui/demo/images/users/jese-leos-2x.png" />
                        <Typography variant="h5">
                            Jesus Hernandez
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: '400' }}>
                            Ingeniero en Computacion
                        </Typography>
                        <Button variant="contained"
                            startIcon={<LandscapeIcon />}
                            fullWidth={false}
                        >
                            Cambiar imagen
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </>
    );
}

export default ProfilePicture;