import { CasesType, NewCasesType } from "../types"

interface getNewCasesType extends NewCasesType {
    totalCount: number
}

const getNewCasesArray = (cases: CasesType) => {
    const data = cases
    const newCases = Object.keys(data).reduce((prevArray, title) => {
        console.log(prevArray, 'AKEADIASJDOASIJD ASDJAOWIDJAOIDJ')
        let count = data[title]     
        if (prevArray.length > 0) {
            const lastItem = prevArray.at(-1)
            if (lastItem)
            count -= lastItem.totalCount
        }
        
        return [...prevArray, { title, count,  totalCount: data[title] }]
    }, [] as getNewCasesType[])
    newCases.shift()

    return newCases
}

export {getNewCasesArray}