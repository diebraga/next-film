import { NextPage, InferGetServerSidePropsType } from 'next'
import { API_URL } from '../utils/url'
import { NextSeo } from 'next-seo'
import { 
  Wrap, 
  WrapItem,
  Image,
  Box,
  Text,
  Heading,
  Link
 } from '@chakra-ui/react'
 import NextLink from 'next/link'

const Index: NextPage = ({ movies }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const SEO = {
    title: 'index page',
    description: 'an index page',

    openGraph: {
      title: 'index page',
      description: 'an index page',
    }  
  }

  return (
    <>
    <NextSeo {...SEO} />
    <Box w='100%' align='center'>
      <Heading as='h1' ml='30px' pt='120px'>Featured Movies</Heading>
      <Box w='100%' align='center'>
        <Wrap spacing="30px" justify="space-around" mt={10} maxWidth='1309px'>
          {movies.map(movie => (
            <WrapItem key={movie._id}>
              <Box
              boxShadow="lg"
              bg="gray.100" 
              color='gray.800' 
              borderRadius='20px'
              w={{ base: '290px', lg: '320px' }}
              >
                <Image 
                  src={API_URL + movie.poster.url}  
                  h={{ base: '340px', lg: '420px' }}
                  w='100%'
                  borderTopRadius='20px'
                />
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
                  <NextLink href="/movies/[genre]/[slug]" as={`/movies/${movie.genre.slug}/${movie.slug}`}>
                    <Link mt={2} color='blue.500'>
                      more about {movie.title}...
                    </Link>
                  </NextLink>
                </Box>

              </Box>
            </WrapItem>
          ))}
        </Wrap>
        </Box>
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