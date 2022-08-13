import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function Resume({resume}) {
    const {year, org, list} = resume.fields
    return (
        <>
            <div className="resume-box">
                <div className="year">
                    <p>{year}</p>
                </div>
                <div className="org">
                    <h3>{org}</h3>
                    {documentToReactComponents(list)}
                </div>
            </div>
            <style>
                {`
                    .profile-box{
                        background: #f3f3f3;
                        padding: 30px;
                        margin: 30px 0;
                        border-radius: 15px;
                    }
                    .resume-box{
                        display: flex;
                        flex-wrap: wrap;
                        align-items: baseline;
                        margin: 10px 0;
                    }
                    .resume-box div.year{
                        width: 200px;
                        margin: 0;
                    }
                    .resume-box div.org{
                        margin: 0;
                    }
                    .resume-box div.year p{
                        font-size: 0.9rem;
                        display: inline;
                    }
                `}
            </style>
        </>
    )
}