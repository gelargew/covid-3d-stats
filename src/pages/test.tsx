import { useAtom } from "jotai";
import { allCountries } from "../storage";

export default function Test() {
    const [data] = useAtom(allCountries)

    return (
        <h1>{data?.length}</h1>
    )
}