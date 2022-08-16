import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import Skeleton from '../../components/Skeleton'
import Image from 'next/image'

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
        <img
          src={`https://${node.data.target.fields.file.url}`}
          className="richtextimg"
        />
      );
    },
  },
};

export default function log({ log }) {
  if (!log) return <Skeleton />
  const { title, date, icon, text } = log.fields
  console.log('https:' + icon.fields.file.url)
  return (
    <div className="log-content">
      <h1>{title}</h1>
      <p>{date}</p>
      <Image src={'https:' + icon.fields.file.url} width={100} height={100} objectFit="contain" />
      <p>
        {documentToReactComponents(text, renderOptions)}
      </p>
    </div>
  )
}