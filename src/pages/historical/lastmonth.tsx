import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useEffect } from "react"
import BarChart from "../../components/BarChart"

interface CasesType {
    [key: string]: number
}

interface HistoricalType {
    cases: CasesType,
    deaths: CasesType,
    recovered: CasesType
}

interface PropsType {
    cases: {
        title: string;
        count: number;
    }[],
    deaths : {
        title: string;
        count: number;
    }[]
}

export default function HistoricalMonthly({ data }: InferGetStaticPropsType<typeof getStaticProps>) {

    return (
        <main>
            <BarChart data={data.cases} />
        </main>
    )
}


const getStaticProps: GetStaticProps = async () => {
    const res = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30')
    const jsonData: HistoricalType = await res.json()
    const data: PropsType = {
        cases: [],
        deaths: []
    }
    for (const key of Object.keys(jsonData.cases)) {
        data.cases.push({ title: key, count: jsonData.cases[key]})
    }
    for (const key of Object.keys(jsonData.deaths)) {
        data.deaths.push({ title: key, count: jsonData.cases[key]})
    }

    return { props: { data }}
}

export {getStaticProps}