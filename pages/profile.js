import { createClient } from 'contentful'
import ProfileCont from "../components/ProfileCont"
import Education from "../components/Education"
import Work from '../components/Work'
import Image from 'next/image'

export async function getStaticProps() {
    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY
    })
    const res_r = await client.getEntries({ content_type: 'resumeCont', order: '-fields.graduate' })
    return {
        props: { resume: res_r.items },
        revalidate: 10
    }
}

export default function profile({ resume }) {
    return (
        <div className="wrapper">
            <h1>Hi! I'm Remi Higuchi.</h1>
            <ProfileCont />
            <div className="profile-box">
                <h2>EDUCATION</h2>
                {resume.map(resume => (
                    <Education key={resume.sys.id} resume={resume} />
                ))}
            </div>
            <div className="profile-box">
                <h2>EXPERIENCE</h2>
                {resume.map(resume => (
                    <Work key={resume.sys.id} resume={resume} />
                ))}
            </div>
            {/* <Image src={"/images/profile-pic.jpg"} width={300} height={300} objectFit="cover" /> */}
        </div>
    )
}