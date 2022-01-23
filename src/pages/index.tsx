import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>3d Covid</title>
        <meta name="description" content="3d Covid Chart" />
        <link rel="icon" href="" />
      </Head>

      <main className={styles.main}>
        <h1>COVID 3d</h1>
      </main>
    </div>
  )
}

export default Home
