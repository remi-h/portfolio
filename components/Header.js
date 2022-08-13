import Link from 'next/link'

export default function Header() {
    return (
        <header>
            <div className="menu">
                <div className='logo'>
                    <Link href="/">
                        <a>
                            <img src="toplogo.svg" width="80" />
                        </a>
                    </Link>
                </div>
                <div className='links'>
                    <Link href="/profile">
                        <a>
                            <p>PROFILE</p>
                        </a>
                    </Link>
                    <Link href="/log">
                        <a>
                            <p>LOG</p>
                        </a>
                    </Link>
                </div>
            </div>
            <style jsx>{`
                .remi{
                    font-family: "newake";
                    font-size: 60px;
                }
            `}</style>
        </header>
    )
}