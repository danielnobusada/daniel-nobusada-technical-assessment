import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Todo from '../components/Todo'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>TODO App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          TODO App
        </h1>

        <Todo />

      </main>
    </div>
  )
}

export default Home
