import { NextPage } from 'next'
import { Box } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'

const About: NextPage = () => {
  const SEO = {
    title: 'about page',
    description: 'an about page',

    openGraph: {
      title: 'about page',
      description: 'an about page',
    }  
  }

  return (
    <Box pt='120px'>
      <NextSeo {...SEO} />
      About Page
    </Box>
  )
}

export default About
