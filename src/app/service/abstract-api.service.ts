import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Collection} from "../models/collection";


export abstract class AbstractApiService<T, L> {
  readonly baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    resourceName: string,
  ) {
    this.baseUrl = `https://localhost:8000/api/${resourceName}/`;
  }

  getCollection(page: number = 1 ): Observable<Collection<L>> {
    return this.httpClient.get<Collection<L>>(this.baseUrl, {
      params: {
        page: page.toString(),
      },
    });
  }

  getCollectionSearch(kilometrage: number, marque: number, modele: number, prixVente: number, anneeCirculation: number, carburant: number, page: number = 1): Observable<Collection<L>> {

   let params = new HttpParams();

   if(prixVente!=0) {
     if(prixVente==5000) {
       params = params.append('prix[lt]', 5000);
     }else{
       let prixVentenew = Number(prixVente)-15000;
       params = params.append('prix[gt]', prixVentenew);
       params = params.append('prix[lte]', prixVente);
     }
   }

    if(kilometrage!=0) {
      if(kilometrage==5000) {
        params = params.append('kilometrage[lt]', 5000);
      }else{
        let kilometragenew = Number(kilometrage)-15000;
        params = params.append('kilometrage[gt]', kilometragenew);
        params = params.append('kilometrage[lte]', kilometrage);
      }
    }


   if(anneeCirculation!=0) {
   let annee = Number(anneeCirculation)+5;
   params = params.append('anneeCirculation[between]',`${anneeCirculation}..${annee}`);
   }
   if(carburant!=0) {
      params = params.append('carburant.id', carburant);
    }

    if(modele!=0) {
      params = params.append('modele.id', modele);
    }

    if(marque!=0) {
      params = params.append('marque.id', marque);
    }

    params = params.append(page.toString(), page);


    return this.httpClient.get<Collection<L>>(this.baseUrl,
        { params: params }
    );
  }

  getItem(id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}${id}`);
  }

  getCollectionSpecifique(url: string): Observable<Collection<L>> {
    return this.httpClient.get<Collection<L>>(url);
  }


}
