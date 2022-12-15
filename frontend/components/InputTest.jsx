import React from 'react';
import { Input, Stack } from '@chakra-ui/react';

const InputTest = ({ mensaje }) => {
    const message = 'Saludos cordiales'
    return (
        <Stack spacing={3}>
            <Input placeholder={mensaje} />
        </Stack>
    )
}

export default InputTest