import { CasesType, NewCasesType } from "../types"

interface getNewCasesType extends NewCasesType {
    totalCount: number
}

const getNewCasesArray = (cases: CasesType) => {
    const keys = Object.keys(cases)
    const newCases: getNewCasesType[] = []
    let lastCount = 0
    for (const title of keys) {
        let count = cases[title] - lastCount
        lastCount = cases[title]
        newCases.push({ title, count, totalCount: lastCount })
    }
    newCases.shift()

    return newCases
}

export {getNewCasesArray}