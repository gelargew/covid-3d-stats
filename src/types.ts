interface CasesType {
    [key: string]: number
}

interface TimeSeriesType {
    cases: CasesType,
    deaths: CasesType,
    recovered?: CasesType
}

interface NewCasesType {
    title: string,
    count: number
}

interface PropsType {
    cases: NewCasesType[],
    deaths : NewCasesType[]
}




export type {CasesType, TimeSeriesType, NewCasesType, PropsType}