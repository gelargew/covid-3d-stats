import { atom } from "jotai";


interface allCountriesProps {
    country: string,
    cases: number,
    updated: number,
    countryInfo: {
        _id: number,
        iso2: string,
        iso3: string,
        lat: number,
        long: number,
        flag: string
    },
    todayCases: number,
    deaths: number,
    recovered: number,
    todayRecovered: 0,
    active: number,
    critical: number,
    casesPerOneMillion: number,
    deathsPerOneMillion: number,
    tests: number,
    testsPerOneMillion: number,
    population: number,
    continent: string,
    oneCasePerPeople: number,
    oneDeathPerPeople: number,
    oneTestPerPeople: number,
    activePerOneMillion: number,
    recoveredPerOneMillion: number,
    criticalPerOneMillion: number


}

const allCountries = atom<allCountriesProps[] | null>(null)


export { allCountries }
export type { allCountriesProps }