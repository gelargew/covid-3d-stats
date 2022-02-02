import { useAtom } from "jotai"
import Link from "next/link"
import { useEffect, useLayoutEffect } from "react"
import { allCountries, allCountriesProps } from "../storage"
import { fetchSummary } from "../utils/fetch"
import countries from '../countries.json'

export default function Layout({ data }: { data?: allCountriesProps[]}) {
    useEffect(() => {
        console.log('helo')
    }, [])

    return (
        <nav>
            {Object.keys(countries).map(country => 
            // @ts-ignore
                <Link href={`/${countries[country].slug}`} key={country}>
                    {country}
                </Link>)}
        </nav>
    )
}

const CountryLink = ({ country }: { country: allCountriesProps}) => {

    return (
        <h1>asd</h1>
    )
}
