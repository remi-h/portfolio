import Link from 'next/link'
import Image from 'next/image'

export default function LogFeatured({ log }) {

    const {title, slug, summary, icon, feature } = log.fields
    if(feature==false){ return null }
    else return (
        <div className="featured">
            <div>
                <Image src={'https:' + icon.fields.file.url} width={80} height={80} objectFit="contain"/>
            </div>
            <div className='log-card-text'>
                <span>
                    <Link href={'log/' + slug}>
                        <a>
                            <p>{summary}</p>
                        </a>
                    </Link>
                </span>
            </div>
            <style jsx>{`
                a{
                    text-decoration: none;
                }
            `}</style>
        </div>
    )
}