import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { PlanSiteComponent } from './plan-site/plan-site.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import { CGUComponent } from './cgu/cgu.component';
import { FAQComponent } from './faq/faq.component';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ContactComponent } from './contact/contact.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AproposComponent } from './apropos/apropos.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnnonceComponent } from './annonce/annonce.component';
import { FormRechercheComponent } from './form-recherche/form-recherche.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FicheComponent } from './fiche/fiche.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MonCompteComponent } from './mon-compte/mon-compte.component';
import {HttpClientModule} from "@angular/common/http";
import {JwtModule} from '@auth0/angular-jwt';
import { GarageListComponent } from './garage/garage-list/garage-list.component';
import { GarageViewComponent } from './garage/garage-view/garage-view.component';
import { GarageAddComponent } from './garage/garage-add/garage-add.component';
import { GarageUpdateComponent } from './garage/garage-update/garage-update.component';
import { NgxSpinnerModule } from "ngx-spinner";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AnnonceListComponent } from './annonce/annonce-list/annonce-list.component';
import { AnnonceReadComponent } from './annonce/annonce-read/annonce-read.component';
import { AnnonceAddComponent } from './annonce/annonce-add/annonce-add.component';
import { AnnonceUpdateComponent } from './annonce/annonce-update/annonce-update.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    PlanSiteComponent,
    MentionsLegalesComponent,
    CGUComponent,
    FAQComponent,
    HeaderComponent,
    ContactComponent,
    AccueilComponent,
    AproposComponent,
    AnnonceComponent,
    FormRechercheComponent,
    FicheComponent,
    MonCompteComponent,
    GarageListComponent,
    GarageViewComponent,
    GarageAddComponent,
    GarageUpdateComponent,
    AnnonceListComponent,
    AnnonceReadComponent,
    AnnonceAddComponent,
    AnnonceUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    RouterModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    LeafletModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    HttpClientModule,
    NgxSpinnerModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token'),
        allowedDomains: ['localhost:8000'],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
