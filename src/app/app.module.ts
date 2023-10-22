import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CharacterCardComponent } from './character-card/character-card.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { ChooseViewComponent } from './choose-view/choose-view.component';
import { ViewAllCharactersPageComponent } from './view-all-characters-page/view-all-characters-page.component';
import { ViewCharacterSheetPageComponent } from './view-character-sheet-page/view-character-sheet-page.component';

@NgModule({
  declarations: [AppComponent, HomePageComponent, CharacterCardComponent, ChooseViewComponent, ViewAllCharactersPageComponent, ViewCharacterSheetPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
