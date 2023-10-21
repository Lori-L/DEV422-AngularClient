import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CharacterCardComponent } from './character-card/character-card.component';
import { ChooseViewComponent } from './choose-view/choose-view.component';
import { ViewAllCharactersPageComponent } from './view-all-characters-page/view-all-characters-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  {
    path: 'chars',
    component: ViewAllCharactersPageComponent,
  },
  { path: 'choose-view', component: ChooseViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
