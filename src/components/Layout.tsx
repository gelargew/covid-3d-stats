//@ts-nocheck
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import countries from '../../covid_data/countries_info.json'


export default function Layout() {
    const ref = useRef<HTMLDivElement>(null!)
    const [navClass, setNavClass] = useState('')
    const router = useRouter()



    useEffect(() => {
        setNavClass('nav-hidden')
        console.log(router)
    }, [router.asPath])

    const handleSearch = (e:React.KeyboardEvent<HTMLInputElement>) => {
        const query = (e.target as HTMLInputElement).value.toUpperCase()
        const countriesElements = Array.from(ref.current.children)
        for (const el of countriesElements) {
            if (el.textContent?.toUpperCase().startsWith(query)) {
                el.style.display = 'flex'
            }
            else el.style.display = 'none'
        }
        setNavClass('')
    }

    return (
        <nav className={navClass}>
            {navClass === 'nav-hidden' ? 
            <p onClick={() => setNavClass('')}>
                {router.query.country || 'Worldwide'}
                <img src='/icon-arrow-bottom.svg' />
            </p>
            :
            <input type='search' placeholder="Search" onFocus={() => setNavClass('')} onChange={handleSearch}/>
            }
            

            <div className="countries-list" ref={ref}>
                <span>
                    <img src='/globe.svg' title='worldwide' />
                    <Link href='/'>Worldwide</Link>
                </span>
                {Object.keys(countries).map(country =>                
                <span onClick={() => setNavClass('nav-hidden')} key={country}>
                    <img src={countries[country].flag} alt={country} title={country} />
                    <Link href={`/${countries[country].slug}`} >
                        {country}
                    </Link>
                </span>)}
            </div>
            

        </nav>
    )
}
