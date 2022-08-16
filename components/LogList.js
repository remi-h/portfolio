import Link from 'next/link'
import Image from 'next/image'

export default function LogList({ log }) {

    const { title, slug, date, icon } = log.fields

    return (
        <div className="log-card">
            <div>
                <Image src={'https:' + icon.fields.file.url} width={120} height={120} objectFit="contain"/>
            </div>
            <div className='log-card-text'>
                <p className="date">{date}</p>
                <span className="actions">
                    <Link href={'log/' + slug}>
                        <a>
                            <p className='title'>{title}</p>
                        </a>
                    </Link>
                </span>
            </div>
        </div>
    )
}