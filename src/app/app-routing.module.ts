import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AproposComponent } from './apropos/apropos.component';
import { CGUComponent } from './cgu/cgu.component';
import { ContactComponent } from './contact/contact.component';
import { FAQComponent } from './faq/faq.component';
import { FicheComponent } from './fiche/fiche.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import { MonCompteComponent } from './mon-compte/mon-compte.component';
import { PlanSiteComponent } from './plan-site/plan-site.component';
import { IsSignedInGuard } from './service/is-signed-in-guard';
import {GarageListComponent} from "./garage/garage-list/garage-list.component";
import {GarageViewComponent} from "./garage/garage-view/garage-view.component";
import {GarageAddComponent} from "./garage/garage-add/garage-add.component";
import {GarageUpdateComponent} from "./garage/garage-update/garage-update.component";
import {AnnonceListComponent} from "./annonce/annonce-list/annonce-list.component";
import {AnnonceReadComponent} from "./annonce/annonce-read/annonce-read.component";
import {AnnonceAddComponent} from "./annonce/annonce-add/annonce-add.component";
import {AnnonceUpdateComponent} from "./annonce/annonce-update/annonce-update.component";
import {UserListComponent} from "./user/user-list/user-list.component";
import {UserViewComponent} from "./user/user-view/user-view.component";
import {UserAddComponent} from "./user/user-add/user-add.component";
import {UserUpdateComponent} from "./user/user-update/user-update.component";
import {StatistiqueComponent} from "./statistique/statistique/statistique.component";

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

const routes: Routes = [
  {
    path: '',
    redirectTo: '/accueil',
    pathMatch: 'full'
  },
  {
    path: 'plan',
    component: PlanSiteComponent,
  },
  {
    path: 'mentionsLegales',
    component: MentionsLegalesComponent
  },
  {
    path: 'CGU',
    component: CGUComponent
  },
  {
    path: 'FAQ',
    component: FAQComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'accueil',
    component: AccueilComponent
  },
  {
    path: 'apropos',
    component: AproposComponent
  },
  {
    path: 'fiche/:id',
    component: FicheComponent
  },

  {
    path: 'lesStatistiques',
    component: StatistiqueComponent,
    canActivate: [IsSignedInGuard],
  },

  {
    path: 'lesUsers',
    component: UserListComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'user-view/:id',
    component: UserViewComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'user-add',
    component: UserAddComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'user-update/:id',
    component: UserUpdateComponent,
    canActivate: [IsSignedInGuard],
  },

  {
    path: 'monCompte',
    component: MonCompteComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'mesGarages',
    component: GarageListComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'garage-view/:id',
    component: GarageViewComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'garage-update/:id',
    component: GarageUpdateComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'garage-add',
    component: GarageAddComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'mesAnnonces',
    component: AnnonceListComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'annonce-read/:id',
    component: AnnonceReadComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'annonce-update/:id',
    component: AnnonceUpdateComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'annonce-add',
    component: AnnonceAddComponent,
    canActivate: [IsSignedInGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
