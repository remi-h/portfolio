import { createClient } from 'contentful'
import Introduction from "../components/Introduction"
import Link from 'next/link'

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  })
  const res_p = await client.getEntries({ content_type: 'intro' })
  return {
    props: { introEdit: res_p.items },
    revalidate: 10
  }
}

export default function home({ introEdit }) {
  return (
    <div className="wrapper">
      <div className='intro'>
        <h1>Hi! I'm Remi Higuchi.</h1>
        {introEdit.map(intro => (
          <Introduction key={intro.sys.id} intro={intro} />
        ))}
        <Link href="/profile">
          <a className='button'>
            <p>PROFILE →</p>
          </a>
        </Link>
      </div>
      <section>
        <h2>Take a look at my work</h2>
      </section>
    </div>
  )
}