import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import Skeleton from '../../components/Skeleton'
import Image from 'next/image'
import Link from 'next/link'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'log',
    "fields.slug": "the-power-of-the-contentful-rich-text-field",
  })
  const paths = res.items.map(item => {
    return {
      params: { slug: item.fields.slug }
    }
  })
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: 'log',
    'fields.slug': params.slug
  })
  if (!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: { log: items[0] },
    revalidate: 10
  }
}

const renderOptions = {
  renderText: text => {
    return text.split('\n').reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      // works
      return (
        <Image
          src={'https:' + node.data.target.fields.file.url}
          className="richtextimg"
          width={node.data.target.fields.file.details.image.width}
          height={node.data.target.fields.file.details.image.height}
          objectFit="contain"
        />
      );
    },
  },
};

export default function log({ log }) {
  if (!log) return <Skeleton />
  const { title, date, summary, icon, tag, link, text } = log.fields
  return (
    <div className="log-content">
      <div className='log-details'>
        <Image src={'https:' + icon.fields.file.url} width={100} height={80} objectFit="contain" />
        <h1>{title}</h1>
      </div>
      <div className='log-released'>
        <div>
          <span className='details'>Date</span><span>{date}</span>
        </div>
        <div>
          <span className='details'>Released</span>
          <Link href={link}>
            <a target="_blank">{link}</a>
          </Link>
          <img className="external" src="../images/external-link.svg"/>
        </div>
        <hr />
        <div>
          {summary}
        </div>
        <div className='tag'>
          {documentToReactComponents(tag, renderOptions)}
        </div>
      </div>
      <div className='richtext log-rich'>
        {documentToReactComponents(text, renderOptions)}
      </div>
    </div>
  )
}