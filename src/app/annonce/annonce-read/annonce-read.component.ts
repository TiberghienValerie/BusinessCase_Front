import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Garages} from "../../models/garages";
import {Annonces} from "../../models/annonces";
import {AuthService} from "../../service/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Ville} from "../../models/ville";
import {Photos} from "../../models/photos";
import {Annonce} from "../../models/annonce";
import {Modele} from "../../models/modele";
import {Marque} from "../../models/marque";
import {Garage} from "../../models/garage";
import {Carburant} from "../../models/carburant";
import {NgxSpinnerService} from "ngx-spinner";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content2',
  template: `

      <div class="modal-header">
        <h4 id="deconnexion-name" class="modal-title pull-left">
          Suppression
        </h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="modal-container">
          <p>Voulez-vous supprimer la photo {{name}} ?</p>
          <p>
            <input type="submit" (click)="suppression(id);activeModal.close('Close click')" value="Ok"/>
          </p>
        </div>
      </div>

  `
})
export class NgbdModalContent2 {
  @Input() name!:string;
  @Input() id!:number;

  public token: string |null | undefined;
  public apiURL = environment.apiURL;

  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  suppression(idphoto: number){

    if (this.authService.hasToken()) {
      this.token = this.authService.token();
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      };

      this.httpClient.delete(`${this.apiURL}/photo/remove/${idphoto}`, httpOptions).subscribe(
        (data) => {
          this.router.navigate(['mesAnnonces']);
        },
        (e: {error: {code: number, message: string}}) => {
          // When error.
          alert(e.error.message);
        },
      );
    }

  }
}


@Component({
  selector: 'app-annonce-read',
  templateUrl: './annonce-read.component.html',
  styleUrls: ['./annonce-read.component.css']
})
export class AnnonceReadComponent implements OnInit {

  public token: string |null | undefined;
  public id: string |null | undefined;
  public tabAnnonce: Array<Annonces> = [];
  public apiURL = environment.apiURL;
  public photos: Photos[] = [];
  faTimes = faTimes;
  public imageSrc!: string;

  public mauvaisImage !: string;

  public photoForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    file: ['', [Validators.required]],
    fileSource: ['', [Validators.required]]
  });

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) {


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
      this.spinner.show("annonce-read");
      this.httpClient.get<Annonces>(`${this.apiURL}/api/annonces/${this.id}`, httpOptions).subscribe(
        (data) => {
          this.photos = [];
          if(data.photos.length>0) {
            let i = 0;
            for(let p of data.photos) {
              this.photos[i] = new Photos(p.id, p.nomPhotos, `${this.apiURL}/uploads/${data.id}/${p.pathPhotos}`);
              i = i+1;
            }
          }
          this.tabAnnonce.push(
            new Annonce(
              data.id,
              data.refAnnonce,
              data.DateAnnonce,
              data.nom,
              data.descriptionCourte,
              data.descriptionLongue,
              data.anneeCirculation,
              data.kilometrage,
              data.prix,
              new Modele(data.modele.id, data.modele.nomModele, new Marque(data.modele.Marque.id, data.modele.Marque.nomMarque)),
              new Garage(data.garage.id, data.garage.nom),
              new Carburant(data.carburant.id, data.carburant.NomCarburant),
              this.photos
            )
          );
          this.spinner.hide("annonce-read");
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

  onFileChange(event: any) {

    const reader = new FileReader();

    if (this.validateFile(event.target.files[0].name)) {
      this.mauvaisImage = '';
      if(event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageSrc = reader.result as string;
          this.photoForm.patchValue({
            fileSource: reader.result
          });
        };
      }
    }else{
      this.mauvaisImage = 'Le fichier doit être de type image : png ou jpeg';
      this.imageSrc = '';
    }




  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if ((ext.toLowerCase() == 'png') || (ext.toLowerCase() == 'jpg') || (ext.toLowerCase() == 'jpeg')) {
      return true;
    }
    else {
      return false;
    }
  }


  submit() {


    if (this.photoForm.valid) {
      this.token = this.authService.token();
      const body = JSON.stringify(this.photoForm.value);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json, multipart/form-data',
          'Authorization': `Bearer ${this.token}`,
        })
      };

      this.httpClient.post(`${this.apiURL}/photo/upload/${this.id}`, body, httpOptions).subscribe(
        (data) => {

          this.router.navigate(['mesAnnonces']);


        },
        (e: { error: { code: number, message: string } }) => {
          // When error.
          alert(e.error.message);
        },
      );
    }
  }

  open(id: number, name: string) {
    const modalRef = this.modalService.open(NgbdModalContent2);
    modalRef.componentInstance.name = name;
    modalRef.componentInstance.id = id;
  }
}
