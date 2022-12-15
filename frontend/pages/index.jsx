import { Stack } from '@chakra-ui/react'
import { useState } from 'react'
import InputTest from '../components/InputTest'

export default function Home() {
  return (
    <Stack>
      <InputTest mensaje='Placeholder 1' />
      <InputTest mensaje='Placeholder 2' />
    </Stack>
  )
}