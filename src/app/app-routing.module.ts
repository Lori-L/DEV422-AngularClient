import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ChooseViewComponent } from './choose-view/choose-view.component';
import { CreateEditPageComponent } from './create-edit-page/create-edit-page.component';
import { ViewAllCharactersPageComponent } from './view-all-characters-page/view-all-characters-page.component';
import { ViewCharacterSheetPageComponent } from './view-character-sheet-page/view-character-sheet-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'signup', component: SignupPageComponent },
  {
    path: 'characters',
    component: ViewAllCharactersPageComponent,
  },
  { path: 'choose-view', component: ChooseViewComponent },

  { path: 'create-edit/:id', component: CreateEditPageComponent },

  {
    path: 'sheet-view',
    component: ViewCharacterSheetPageComponent,
  },
  {
    path: 'character/:id',
    component: ViewCharacterSheetPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
