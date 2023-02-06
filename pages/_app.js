import '../styles/globals.css'
import { Prompt } from '@next/font/google'

const prompt = Prompt({
  subsets:['thai'],
  weight: ['400','700']
})

function MyApp({ Component, pageProps }) {
  return (
    <main className={prompt.className}>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
