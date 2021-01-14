import { NextPage, InferGetServerSidePropsType } from 'next'
import { API_URL } from '../../utils/url'
import { 
  Wrap, 
  WrapItem,
  Box,
  Text,
  Heading,
  Button
 } from '@chakra-ui/react'
 import { NextRouter, useRouter } from 'next/router'

const MoviesList: NextPage = ({ movies, page }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  return (
    <>
    <Box w='100%' align='center'>
    <Heading as='h1' ml='30px' pt='120px'>Movies List</Heading>
      <Wrap spacing="30px" justify="space-around" mt={10} maxWidth='1309px'>
        {movies.map(movie => (
          <WrapItem key={movie._id}>
              <Box p={3} pb={7}>
                <Text
                  as='h3'
                  fontSize={{ base: '30px'}}
                >
                  {movie.title}
                </Text>
                <Text
                  as='h4'
                  mt={2}
                  fontSize={{ base: '16px'}}
                >
                  Released: {movie.release_date}
                </Text>
              </Box>
          </WrapItem>
        ))}
      </Wrap>
      <Wrap justify='center'>
        <Button variant="solid" onClick={() => router.push(`/movies?=/page=${page - 1}`)}>Previous</Button>&nbsp;&nbsp;
        <Button variant="solid" onClick={() => router.push(`/movies?=/page=${page + 1}`)}>Next</Button>
      </Wrap>
      </Box>
    </>
  )
}

type Data = {
  _id: string
  title: string
  description: string
  release_date: Date
  poster: object
}


export async function getServerSideProps({ query: {page=1}}) {

  const start = +page === 1 ? 0 : (page - 1) * 3

  const res = await fetch(`${API_URL}/movies?_limit=3&_start=${start}`)
  const data: Data[] = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      movies: data,
      page: page
    }, // will be passed to the page component as props
  }
}

export default MoviesList