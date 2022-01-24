import { CasesType, NewCasesType } from "../types"

interface getNewCasesType extends NewCasesType {
    totalCount: number
}

const getNewCasesArray = (cases: CasesType) => {
    console.log(cases, 'GETEMAWEAWE ASDASIODJASDOASIDJAWOIEJAWIOEJAWIJODSIJ')
    if (!cases) return [] as getNewCasesType[]
    const data = cases
    const newCases = Object.keys(data).reduce((prev, title) => {
        let count = data[title]     
        const lastItem = prev.at(-1)
        if (lastItem) {
            count -= lastItem.totalCount
        }
        return [...prev, { title, count,  totalCount: data[title] }]
    }, [] as getNewCasesType[])
    newCases.shift()

    return newCases
}

export {getNewCasesArray}