import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

interface CardProps {
    logo: React.ReactNode;
    heading: string;
    description: string;
}

const CardComponent: React.FC<CardProps> = ({ logo, heading, description }) => {
    return (
        <Card>
            <CardContent>
                <Box display="flex" alignItems="flex-start">
                    <Box mr={2} display="flex" alignItems="center">
                    {logo}
                    </Box>
                    <Box>
                    <Typography variant="h6" fontWeight={'bold'}>{heading}</Typography>
                    <Typography variant="subtitle2" color={'grey'}>{description}</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CardComponent;