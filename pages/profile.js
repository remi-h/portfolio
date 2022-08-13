import { createClient } from 'contentful'
import ProfileCont from "../components/ProfileCont"
import Resume from "../components/Resume"
import Image from 'next/image'


export async function getStaticProps() {
    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY
    })
    const res_p = await client.getEntries({ content_type: 'resumeCont' })
    return {
        props: { resume: res_p.items },
        revalidate: 10
    }
}

export default function profile({ resume }) {
    return (
        <div className="wrapper">
            <h1>Hi! I'm Remi Higuchi.</h1>
            <ProfileCont />
            <div className="profile-box">
                {resume.map(resume => (
                    <Resume key={resume.sys.id} resume={resume} />
                ))}
            </div>
            <Image src={"/images/profile-pic.jpg"} width={300} height={300} objectFit="cover" />
        </div>
    )
}