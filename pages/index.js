import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import TransactionForm from '../components/form'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <link 
          rel="preconnect"
          href="https://fonts.googleapis.com" 
        />
        <link 
          rel="preconnect"
          href="https://fonts.gstatic.com" crossorigin
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Lora&family=Poppins&display=swap"
          rel="stylesheet"
        />
      </Head>
      <section>
        <h1 className="font-header text-lg underline">... of Serendale</h1>
        <p>
          What has been written is history.
        </p>
      </section>
      <section>
        <TransactionForm />
      </section>
    </Layout>
  )
}