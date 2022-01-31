const fetchSummary = async () => {
    const res = await fetch("https://disease.sh/v3/covid-19/countries")
    const data = await res.json()

    return data
}

export { fetchSummary }