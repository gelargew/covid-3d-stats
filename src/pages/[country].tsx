import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Layout from '../components/Layout'
import { ParsedUrlQuery } from "querystring";
import countries from '../countries.json'

export default function Country({ country }: InferGetStaticPropsType<typeof getStaticProps>) {

    return (
        <>
            <main>
                <h1>{country}</h1>
            </main>
        </>

    )
}

interface Props {
    country: string,
}

interface Params extends ParsedUrlQuery {
    country: string
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
    const params = context.params!
    const { country } = params

    return {
        props: { country }, revalidate: 60*60*24
    }
}



export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const paths = []
    
    for (const country in countries) {
        //@ts-ignore
        const slug: string = countries[country].slug
        paths.push({ params: { country: slug, days: '30' }})
    }


    return { paths, fallback: true }
}