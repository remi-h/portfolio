import { createClient } from 'contentful'
import Introduction from "../components/Introduction"
import LogFeatured from '../components/LogFeatured'
import Link from 'next/link'

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  })
  const res_p = await client.getEntries({ content_type: 'intro' })
  const res_l = await client.getEntries({ content_type: 'log' })
  return {
    props: { introEdit: res_p.items, log: res_l.items },
    revalidate: 10
  }
}

export default function home({ introEdit, log }) {
  return (
    <div className="wrapper">
      <section className='intro'>
        {introEdit.map(intro => (
          <Introduction key={intro.sys.id} intro={intro} />
        ))}
        <Link href="/profile">
          <a className='button button-a'>
            <p>PROFILE →</p>
          </a>
        </Link>
      </section>
      <section>
        <h2>Take a look at my work</h2>
        <div className="log-list featured-list">
          {log.map(log => (
            <LogFeatured key={log.sys.id} log={log} />
          ))}
        </div>
        <Link href="/log">
          <a className='button button-b'>
            <p>VIEW MORE →</p>
          </a>
        </Link>
      </section>
    </div>
  )
}