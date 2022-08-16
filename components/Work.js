import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function Work({resume}) {
    const {year, area, org, list, type} = resume.fields
    if(type=="education"){
        return null
    }
    else return (
        <>
            <div className="resume-box">
                <div className="year">
                    <p>{year}</p>
                    <p className="area">{area}</p>
                </div>
                <div className="org">
                    <h3>{org}</h3>
                    {documentToReactComponents(list)}
                </div>
            </div>
        </>
    )
}