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
 import { useRouter } from 'next/router'

const MoviesList: NextPage = ({ movies, page, numberOfMovies }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  const lastPage = Math.ceil(numberOfMovies / 3)

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
                  Released: {movie.year}
                </Text>
              </Box>
          </WrapItem>
        ))}
      </Wrap>
      <Wrap justify='center'>
        <Button onClick={() => router.push(`/movies?page=${page - 1}`)}
          disabled={page <= 1}>Previous</Button>&nbsp;&nbsp;
        <Button onClick={() => router.push(`/movies?page=${page + 1}`)}
          disabled={page >= lastPage}>Next</Button>
      </Wrap>
      </Box>
    </>
  )
}

export async function getServerSideProps({ query: {page=1}}) {

  const start = +page === 1 ? 0 : (+page - 1) * 3

  const numberOfMoviesResponse = await fetch(`${API_URL}/movies/count`)
  const numberOfMovies = await numberOfMoviesResponse.json()

  const res = await fetch(`${API_URL}/movies?_limit=3&_start=${start}`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      movies: data,
      page: +page,
      numberOfMovies
    }, // will be passed to the page component as props
  }
}

export default MoviesList