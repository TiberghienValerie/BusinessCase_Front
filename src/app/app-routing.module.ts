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

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  {
    path: 'plan',
    component: PlanSiteComponent,
  },
  { path: 'mentionsLegales', component: MentionsLegalesComponent },
  { path: 'CGU', component: CGUComponent },
  { path: 'FAQ', component: FAQComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'apropos', component: AproposComponent },
  { path: 'fiche/:id', component: FicheComponent },
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
  { path: 'garage-view/:id', component: GarageViewComponent, canActivate: [IsSignedInGuard], },
  { path: 'garage-update/:id', component: GarageUpdateComponent, canActivate: [IsSignedInGuard],},
  { path: 'garage-add', component: GarageAddComponent, canActivate: [IsSignedInGuard], },
  {
    path: 'mesAnnonces',
    component: AproposComponent,
    canActivate: [IsSignedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
