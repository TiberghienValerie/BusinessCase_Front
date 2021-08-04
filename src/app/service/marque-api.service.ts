import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Collection} from "../models/collection";
import {Marque} from "../models/marque";
import {Observable} from "rxjs";
import {AbstractApiService} from "./abstract-api.service";

@Injectable({
  providedIn: 'root',
})
export class marqueApiService extends AbstractApiService<Marque,Marque>{
  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, 'marques');
  }
}
