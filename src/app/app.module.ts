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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
