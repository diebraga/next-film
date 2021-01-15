import { NextPage, InferGetServerSidePropsType } from 'next'
import { Box, Text, Heading, Tag } from '@chakra-ui/react'
import { API_URL } from '../../../utils/url'
import { NextSeo } from 'next-seo'

const Movie: NextPage = ({ movie }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const SEO = {
    title: `Next Films | ${movie.title}`,
    description: movie.description,

    openGraph: {
      title: `Next Films | ${movie.title}`,
      description: movie.description,
    }  
  }
  return (
    <Box align='center'>
      <NextSeo {...SEO} />
      <Box ml={3} mr={3} pt='120px' maxWidth='850px' textAlign='start'>
        <Heading as='h1' mt={2}>{movie.title}</Heading>
        <Text as='p' mt={6}>{movie.description}</Text>
        <Text as='h4' mt={6}>Genre: <Tag>{movie.genre.genre_type}</Tag></Text>

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