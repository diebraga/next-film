import { NextPage, InferGetServerSidePropsType } from 'next'
import { Box, Text, Heading } from '@chakra-ui/react'
import { API_URL } from '../../../utils/url'

const Movie: NextPage = ({ movie }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Box align='center'>
      <Box pt='120px' maxWidth='850px' textAlign='start'>
        <Heading as='h1' mt={2}>{movie.title}</Heading>
        <Text as='p' mt={6}>{movie.description}</Text>
      </Box>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.query

  const res = await fetch(`${API_URL}/movies?slug=${slug}`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      movie: data[0]
    }, // will be passed to the page component as props
  }
}

export default Movie;