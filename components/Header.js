import Link from 'next/link'

export default function Header() {
    return (
        <header>
            <div className="menu">
                <div className='logo'>
                    <Link href="/">
                        <a>
                            <img src="toplogo.svg" width="80"  />
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
            <div>
                <h1>Remi Higuchi</h1>
                <p>Born in 2000, now based in Tokyo. | 2000年生まれ。東京に戻ってきた。</p>
                <p>Senior at Keio University - Excahnge studies at KTH Royal Institute of Technology. | 慶應義塾大学4年 - 王立工科大学</p>
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