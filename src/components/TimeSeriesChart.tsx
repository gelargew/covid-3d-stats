import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { CasesType } from "../types";
import { getNewCasesArray } from "../utils/toArray";
import BarChart from "./BarChart";

export default function TimeSeriesChart({ data }: { data: CasesType }) {
    if (!data) return <h1>asdsad</h1>
    else {
        const d = getNewCasesArray(data)
        
        return (
            <Canvas>
                <BarChart data={d} />
            </Canvas>
        )
    }

}