import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Collection} from "../models/collection";
import {Modele} from "../models/modele";
import {Observable} from "rxjs";
import {AbstractApiService} from "./abstract-api.service";

@Injectable({
  providedIn: 'root',
})
export class modeleApiService extends AbstractApiService<Modele,Modele>{
  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, 'modeles');
  }
}
