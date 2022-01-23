import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useEffect } from "react"
import BarChart from "../../components/BarChart"

interface CasesType {
    [key: string]: number
}

interface TimeSeriesType {
    cases: CasesType,
    deaths: CasesType,
    recovered: CasesType
}

interface NewCasesType {
    title: string,
    count: number
}

interface PropsType {
    cases: NewCasesType[],
    deaths : NewCasesType[]
}

export default function HistoricalMonthly({ data }: InferGetStaticPropsType<typeof getStaticProps>) {

    console.log(data.cases)
    return (
        <main>
            <BarChart data={data.cases} />
        </main>
    )
}


const getStaticProps: GetStaticProps = async () => {
    const res = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=61')
    const jsonData: TimeSeriesType = await res.json()
    const data: PropsType = {
        cases: getNewCasesList(jsonData.cases),
        deaths: getNewCasesList(jsonData.deaths)
    }

    return { props: { data } }
}

interface getNewCasesType extends NewCasesType {
    totalCount: number
}

const getNewCasesList = (data: CasesType) => {

    const newCases = Object.keys(data).reduce((prev, title) => {
        let count = data[title]     
        const lastItem = prev.at(-1)
        if (lastItem) {
            count -= lastItem.totalCount
        }
        return [...prev, { title, count,  totalCount: data[title] }]
    }, [] as getNewCasesType[])
    newCases.shift()

    return newCases
}


export {getStaticProps}