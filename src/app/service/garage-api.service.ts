import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Collection} from "../models/collection";
import {Annonce} from "../models/annonce";
import {Observable} from "rxjs";
import {AbstractApiService} from "./abstract-api.service";
import {RetourApi} from "../models/retourApi";
import {Modele} from "../models/modele";
import {Garages} from "../models/garages";

@Injectable({
  providedIn: 'root',
})
export class GarageApiService extends AbstractApiService<Garages,Garages>{


  constructor(
  httpClient: HttpClient
) {
  super(httpClient, 'garages');
}

}
