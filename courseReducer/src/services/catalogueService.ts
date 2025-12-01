import {catchError, from, map, Observable, of, pipe, switchMap} from 'rxjs'
import type { Produit } from '../types/produit'

const BASE_URL = 'http://localhost:3001/produitsData'

type PageResponse = {
  first: number,
  prev: number | null,
  next: number | null,
  last: number,
  pages: number,
  items: number,
  data: Produit[]
}

export default function loadPage(pageNum: number, pageTaille: number): Observable<Produit[]> {
    return from(
        fetch(`${BASE_URL}?_page=${pageNum}&_per_page=${pageTaille}`)
    ).pipe(
        // handle HTTP response
        switchMap(
            (responseHttp) => {
                if (!responseHttp.ok) {
                    throw new Error("Wrong HTTP status: " + responseHttp.status)
                }
                return from<Promise<PageResponse>>(responseHttp.json())
            }
        ),
        // extract produits from body response
        map(responseHttp => responseHttp.data),
        catchError(
            (err) => {
                 console.log('Erreur:', err)
                 return of([] as Produit[])
            }
        )
    )
}

