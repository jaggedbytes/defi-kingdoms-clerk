import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import TransactionForm from '../components/form'

export default function Home() {
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
        <TransactionForm />
      </section>
    </Layout>
  )
}