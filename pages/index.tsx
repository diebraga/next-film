import { NextPage, InferGetServerSidePropsType } from 'next'
import { API_URL } from '../utils/url'
import getConfig from 'next/config'
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
import { motionValue } from 'framer-motion'

const Index: NextPage = ({ games }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const SEO = {
    title: 'index page',
    description: 'an index page',

    openGraph: {
      title: 'index page',
      description: 'an index page',
    }  
  } 
  console.log(games)

  return (
    <>
    <NextSeo {...SEO} />
    <Box w='100%' align='center'>
      <Heading as='h1' ml='30px' pt='120px'>Featured games</Heading>
      <Box w='100%' align='center'>
        <Wrap spacing="30px" justify="space-around" mt={10} maxWidth='1309px'>
          {/* {games.map(game => (
            <WrapItem key={game._id}>
              <Box
              boxShadow="lg"
              bg="gray.100" 
              color='gray.800' 
              borderRadius='20px'
              w={{ base: '290px', lg: '320px' }}
              >
                <Image 
                  src={game.poster.url}  
                  h={{ base: '340px', lg: '420px' }}
                  w='100%'
                  borderTopRadius='20px'
                />
                <Box p={3} pb={7}>
                  <Text
                    as='h3'
                    fontSize={{ base: '30px'}}
                  >
                    {game.title}
                  </Text>
                  <Text
                    as='h4'
                    mt={2}
                    fontSize={{ base: '16px'}}
                  >
                    Released: {game.year}
                  </Text>
                  <NextLink href="/games/[genrer]/[slug]" as={`/games/${game.genre.slug}/${game.slug}`}>
                    <Link mt={2} color='blue.500'>
                      more about {game.title}...
                    </Link>
                  </NextLink>
                </Box>

              </Box>
            </WrapItem>
          ))} */}
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
  const res = await fetch(`${process.env.STRAPI_URL}/games`)
  const data: Data[] = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      games: data
    }, // will be passed to the page component as props
  }
}

export default Index