import { CasesType } from "../types";
import { getNewCasesArray } from "../utils/toArray";
import BarChart from "./BarChart";

export default function TimeSeriesChart({ data }: { data: CasesType}) {
    return <BarChart data={getNewCasesArray(data)} />
}