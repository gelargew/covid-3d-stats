import { useAtom } from "jotai"
import Link from "next/link"
import { useEffect, useLayoutEffect, useMemo } from "react"
import { allCountries, allCountriesProps } from "../storage"
import { fetchSummary } from "../utils/fetch"
import countries from '../../covid_data/countries_info.json'
import { useRouter } from "next/router"

export default function Layout() {
    const router = useRouter()
    const selected = useMemo(() => {
        const path = router.pathname.replace(/-/g, ' ')

        return path
    }, [router.pathname])

    return (
        <nav>
            <Link href='/'>Worldwide</Link>
            {Object.keys(countries).map(country => 
            // @ts-ignore
                <Link href={`/${countries[country].slug}`} key={country}>
                    {country}
                </Link>)}
        </nav>
    )
}
