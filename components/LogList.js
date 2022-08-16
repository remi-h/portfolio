import Link from 'next/link'

export default function LogList({ log }) {

    const { title, slug, date, thubmnail } = log.fields

    return (
        <div className="log-card">
            <p className="date">{date}</p>
            <span className="actions">
                <Link href={'log' + slug}>
                    <a>
                        <p>{title}</p>
                    </a>
                </Link>
            </span>
        </div>
    )
}