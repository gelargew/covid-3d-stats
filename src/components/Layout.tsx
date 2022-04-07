//@ts-nocheck
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import countries from '../../covid_data/countries_info.json'


export default function Layout() {
    const ref = useRef<HTMLDivElement>(null!)
    const [navClass, setNavClass] = useState('nav-hidden')
    const router = useRouter()



    useEffect(() => {
        setNavClass('nav-hidden')
        for (const el of countriesElements) {
            el.style.display = 'flex'
        }
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
            <h1>COVID STATS</h1>
            {navClass === 'nav-hidden' ? 
            <p onClick={() => setNavClass('')}>
                {router.query.country || 'Worldwide'}
                <img src='/icon-arrow-bottom.svg' />
            </p>
            :
            <>
                <p onClick={() => setNavClass('nav-hidden')}>
                {router.query.country || 'Worldwide'}
                <img src='/icon-arrow-bottom.svg' />     
                </p>
                <input type='search' placeholder="Search" onFocus={() => setNavClass('')} onChange={handleSearch}/>
            </>
            
            }
            

            <ul className="countries-list" ref={ref}>
                <li>
                    <img src='/globe.svg' title='worldwide' />
                    <Link href='/'>Worldwide</Link>
                </li>
                {Object.keys(countries).map(country =>                
                <li onClick={() => setNavClass('nav-hidden')} key={country}>
                    <img src={countries[country].flag} alt={country} title={country} />
                    <Link href={`/${countries[country].slug}`} >
                        {country}
                    </Link>
                </li>)}
            </ul>
            

        </nav>
    )
}
