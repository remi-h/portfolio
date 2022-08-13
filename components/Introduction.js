import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function Intro({ intro }) {
    const { introtext } = intro.fields
    return (
        <>
            {documentToReactComponents(introtext)}
        </>
    )
}