import { createClient } from 'contentful'
import LogList from '../components/LogList'

export async function getStaticProps() {

    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY
    })

    const res = await client.getEntries({ content_type: 'log', order: '-fields.date' })
    return {
        props: { log: res.items },
        revalidate: 10
    }
}

export default function Log({ log }) {
    return (
        <>
            <h1>Remi's LOG</h1>
            <div className="log-list">
                {log.map(log => (
                    <LogList key={log.sys.id} log={log} />
                ))}
            </div>
        </>
    )
}