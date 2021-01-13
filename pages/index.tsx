import { NextPage, InferGetServerSidePropsType } from 'next'
import { API_URL } from '../utils/url'
import { 
  Wrap, 
  WrapItem,
  Image,
  Box,
  Text,
  Center
 } from '@chakra-ui/react'

const Index: NextPage = ({ movies }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  console.log(movies)
  return (
    <Wrap spacing="30px" justify="center">
      {movies.map(movie => (
        <WrapItem key={movie._id}>
          <Box>
            <Image 
              src={API_URL + movie.poster.url}  
              h={{ md: '300px', lg: '400px' }}
             />
            <Text as='h3'>{movie.title}</Text>
            <Text as='h4'>{movie.release_date}</Text>
          </Box>
        </WrapItem>
      ))}
    </Wrap>
  )
}

type Data = {
  _id: string
  title: string
  release_date: Date
  poster: object
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/movies`)
  const data: Data[] = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      movies: data
    }, // will be passed to the page component as props
  }
}

export default Index