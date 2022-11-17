import { Flex, Spinner } from '@chakra-ui/react'

export default function Loading({size}) {
  return (
    <>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='teal.200'
        color='teal.500'
        size={size}
      />
    </>
  )
}
