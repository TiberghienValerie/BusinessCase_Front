import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {AbstractApiService} from "./abstract-api.service";

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends AbstractApiService<User,User>{
  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, 'users');
  }
}
