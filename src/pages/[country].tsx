import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import countries from '../countries.json'

export default function Country({ country }: InferGetStaticPropsType<typeof getStaticProps>) {

    return (
        <main>
            <h1>{country}</h1>
        </main>
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
    const res = await fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=61`)
    const jsonData = await res.json()

    return {
        props: { country }
    }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const paths = []
    for (const country of countries) {
        paths.push({ params: { country, days: '30' }})
    }


    return { paths, fallback: true }
}