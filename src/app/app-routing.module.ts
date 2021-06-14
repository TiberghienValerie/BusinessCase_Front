import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AproposComponent } from './apropos/apropos.component';
import { CGUComponent } from './cgu/cgu.component';
import { ContactComponent } from './contact/contact.component';
import { FAQComponent } from './faq/faq.component';
import { FicheComponent } from './fiche/fiche.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import { PlanSiteComponent } from './plan-site/plan-site.component';
import { IsSignedInGuard } from './service/is-signed-in-guard';

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
    component: AproposComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'mesGarages',
    component: AproposComponent,
    canActivate: [IsSignedInGuard],
  },
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
