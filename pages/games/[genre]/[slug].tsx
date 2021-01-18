import { NextPage, InferGetServerSidePropsType } from 'next'
import { Box, Text, Heading, Tag } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'

interface Props {
  title: string
}
const game: NextPage = ({ game }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const SEO = {
    title: `Next Games | ${game.title}`,
    description: game.description,

    openGraph: {
      title: `Next Games | ${game.title}`,
      description: game.description,
    }  
  }

  console.log(game)
  return (
    <Box align='center'>
      <NextSeo {...SEO} />
      <Box ml={3} mr={3} pt='120px' maxWidth='850px' textAlign='start'>
        <Heading as='h1' mt={2}>{game.title}</Heading>
        <Text as='p' mt={6}>{game.description}</Text>
        <Text>Genre: <Tag>{game.genre.genre_type}</Tag></Text>
      </Box>
    </Box>
  )
}

export async function getServerSideProps(context) {

  const { slug } = context.query

  const res = await fetch(`${process.env.STRAPI_URL}/games?slug=${slug}`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      game: data[0]
    }, // will be passed to the page component as props
  }
}

export default game;