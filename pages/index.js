import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import TransactionForm from '../components/form'
import { getImageFilenames } from '../lib/itemImages'

export async function getStaticProps() {
  const allImageFiles = getImageFilenames()

  return {
    props: {
      allImageFiles
    }
  }
}

export default function Home({ allImageFiles }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <link 
          href="https://fonts.googleapis.com/css2?family=Lora&family=Poppins&display=optional"
          rel="stylesheet"
        />
      </Head>
      <section>
        <TransactionForm { ...allImageFiles } />
      </section>
    </Layout>
  )
}