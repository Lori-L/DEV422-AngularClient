import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CharacterCardComponent } from './character-card/character-card.component';
import { ChooseViewComponent } from './choose-view/choose-view.component';
import { CreateEditPageComponent } from './create-edit-page/create-edit-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  {
    path: 'chars',
    component: CharacterCardComponent,
  },
  { path: 'choose-view', component: ChooseViewComponent },
  { path: 'create-edit', component: CreateEditPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
