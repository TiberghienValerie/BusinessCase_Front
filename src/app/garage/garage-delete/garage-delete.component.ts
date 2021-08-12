import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Garages} from "../../models/garages";
import {Ville} from "../../models/ville";

@Component({
  selector: 'app-garage-delete',
  templateUrl: './garage-delete.component.html',
  styleUrls: ['./garage-delete.component.css']
})
export class GarageDeleteComponent implements OnInit {

  public token: string |null | undefined;
  public id: string |null | undefined;

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute) {

    if (this.authService.hasToken()) {
      this.route.paramMap.subscribe((params) => {
        this.id = params.get('id')!;
      });
      this.token = this.authService.token();
      const httpOptions = {
          headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${this.token}`
          })
      };

      this.httpClient.delete(`https://localhost:8000/api/garages/${this.id}`, httpOptions).subscribe(
        (data) => {
           this.router.navigate(['mesGarages']);
        },
        (e: {error: {code: number, message: string}}) => {
          // When error.
          alert(e.error.message);
        },
      );
    }
  }

  ngOnInit(): void {
  }

}
