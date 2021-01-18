import { NextPage, InferGetStaticPropsType, GetStaticProps } from 'next'
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

const Index: NextPage = ({ pages }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const SEO = {
    title: 'about page',
    description: 'an about page',

    openGraph: {
      title: 'about page',
      description: 'an about page',
    }  
  } 

  return (
    <>
    <NextSeo {...SEO} />
    <Box w='100%' align='center'>
    {pages.map(page => (
      <Box w='100%' align='center' pt={9} key={page.id}>
        <Heading as='h1' pt={20}>{page.title}</Heading>
          <Wrap spacing="30px" justify="space-around" maxWidth='1309px'>
            <WrapItem key={page._id} >
              
              <Text p={{ md: '40px', lg: '50px' }} dangerouslySetInnerHTML={{ __html: page.content }}></Text>
            </WrapItem>
          </Wrap>
        </Box>
        ))}
      </Box>
    </>
  )
}

type Data = {
  _id: string
  title: string
  content: string
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.STRAPI_URL}/pages`)
  const data: Data[] = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      pages: data
    }, // will be passed to the page component as props
  }
}

export default Index