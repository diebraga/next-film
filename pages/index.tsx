import { NextPage, InferGetServerSidePropsType } from 'next'
import { API_URL } from '../utils/url'
import { 
  Wrap, 
  WrapItem,
  Image,
  Box,
  Text,
 } from '@chakra-ui/react'

const Index: NextPage = ({ movies }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  console.log(movies)
  return (
    <Wrap spacing="30px" justify="space-around">
      {movies.map(movie => (
        <WrapItem key={movie._id}>
          <Box
           boxShadow="lg"
           bg="gray.100" 
           p={6} 
           color='gray.800' 
           borderRadius='20px'
           w={{ base: '290px', lg: '320px' }}
          >
            <Image 
              src={API_URL + movie.poster.url}  
              h={{ base: '340px', lg: '400px' }}
             />
            <Text
              as='h3'
              fontSize={{ base: '30px'}}
            >
              {movie.title}
            </Text>

            <Text as='h4'>
              Released: {movie.description}
            </Text>

            <Text
             as='h4'
             fontSize={{ base: '16px'}}
            >
              Released: {movie.release_date}
            </Text>
          </Box>
        </WrapItem>
      ))}
    </Wrap>
  )
}

type Data = {
  _id: string
  title: string
  description: string
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