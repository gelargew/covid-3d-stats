import { useAtom } from "jotai"
import Link from "next/link"
import { useEffect, useLayoutEffect } from "react"
import { allCountries, allCountriesProps } from "../storage"
import { fetchSummary } from "../utils/fetch"

export default function Layout({ data }: { data?: allCountriesProps[]}) {

    return (
        <nav>
            {data?.map(country => 
                <Link href={`/${country.country}`} key={country.country}>
                    {country.country}
                </Link>)}
        </nav>
    )
}

const CountryLink = ({ country }: { country: allCountriesProps}) => {

    return (
        <h1>asd</h1>
    )
}
