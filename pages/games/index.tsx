import { NextPage, InferGetServerSidePropsType } from 'next'
import { 
  Wrap, 
  WrapItem,
  Box,
  Text,
  Heading,
  Button
 } from '@chakra-ui/react'
 import { useRouter } from 'next/router'

const GameList: NextPage = ({ games, page, numberOfGames }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  const lastPage = Math.ceil(numberOfGames / 3)

  return (
    <>
    <Box w='100%' align='center'>
    <Heading as='h1' pt='120px'>Game List</Heading>
      <Wrap spacing="30px" justify="space-around" mt={10} maxWidth='1309px'>
        {games.map(game => (
          <WrapItem key={game._id}>
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
              </Box>
          </WrapItem>
        ))}
      </Wrap>
      <Wrap justify='center'>
        <Button onClick={() => router.push(`/games?page=${page - 1}`)}
          disabled={page <= 1}>Previous</Button>&nbsp;&nbsp;
        <Button onClick={() => router.push(`/games?page=${page + 1}`)}
          disabled={page >= lastPage}>Next</Button>
      </Wrap>
      </Box>
    </>
  )
}

export async function getServerSideProps({ query: {page=1}}) {

  const start = +page === 1 ? 0 : (+page - 1) * 3

  const numberOfGamesResponse = await fetch(`${process.env.STRAPI_URL}/games/count`)
  const numberOfGames = await numberOfGamesResponse.json()

  const res = await fetch(`${process.env.STRAPI_URL}/games?_limit=3&_start=${start}`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      games: data,
      page: +page,
      numberOfGames
    }, // will be passed to the page component as props
  }
}

export default GameList