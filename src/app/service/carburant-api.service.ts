import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Collection} from "../models/collection";
import {Carburant} from "../models/carburant";
import {Observable} from "rxjs";
import {AbstractApiService} from "./abstract-api.service";

@Injectable({
  providedIn: 'root',
})
export class carburantApiService extends AbstractApiService<Carburant,Carburant>{
  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, 'carburants');
  }
}
