import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import countries from '../../covid_data/countries_info.json'


export default function Layout() {
    const ref = useRef<HTMLDivElement>(null!)
    const [navClass, setNavClass] = useState('')
    const {pathname} = useRouter()



    useEffect(() => {
        setNavClass('nav-hidden')
    }, [pathname])

    const handleSearch = (e:React.KeyboardEvent<HTMLInputElement>) => {
        const query = (e.target as HTMLInputElement).value.toUpperCase()
        const countriesElements = Array.from(ref.current.children)
        for (const el of countriesElements) {
            console.log(el.textContent)
            if (el.textContent?.toUpperCase().startsWith(query)) {
                //@ts-ignore
                el.style.display = 'block'
            }
            //@ts-ignore
            else el.style.display = 'none'
        }
    }

    return (
        <nav className={navClass}>

            <input type='search' placeholder="Search" onKeyUp={handleSearch}/>

            <div className="countries-list" ref={ref}>
                <span>
                    <img src='/globe.svg' title='worldwide' />
                    <Link href='/'>Worldwide</Link>
                </span>
                {Object.keys(countries).map(country =>                
                <span key={country}>
                    <img src={countries[country].flag} alt={country} title={country} />
                    <Link href={`/${countries[country].slug}`} >
                        {country}
                    </Link>
                </span>)}
            </div>
            

        </nav>
    )
}
