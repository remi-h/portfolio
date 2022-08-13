import { createClient } from 'contentful'
import Introduction from "../components/Introduction"

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

export default function home({introEdit}) {
  return (
    <div className="wrapper">
      <div>
        <h1>Remi Higuchi</h1>
        {introEdit.map(intro => (
          <Introduction key={intro.sys.id} intro={intro} />
        ))}
      </div>
    </div>
  )
}