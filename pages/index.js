import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import TransactionForm from '../components/form'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h1>DeFi Kingdoms Clerk</h1>
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