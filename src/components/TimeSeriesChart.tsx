import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { CasesType } from "../types";
import { getNewCasesArray } from "../utils/toArray";
import BarChart from "./BarChart";

export default function TimeSeriesChart({ data }: { data: CasesType }) {
    const a = getNewCasesArray
    if (!data) return <h1>asdsad</h1>
    else {
        const a = getNewCasesArray(data)
        return (
            <Canvas>
                <BarChart data={a} />
            </Canvas>
        )
    }

}