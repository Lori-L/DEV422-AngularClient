import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CharacterCardComponent } from './character-card/character-card.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { ChooseViewComponent } from './choose-view/choose-view.component';
import { CreateEditPageComponent } from './create-edit-page/create-edit-page.component';
import { CharCreationNrbTabComponent } from './char-creation-nrb-tab/char-creation-nrb-tab.component';
import { CharCreationClassTabComponent } from './char-creation-class-tab/char-creation-class-tab.component';
import { CharCreationStatsTabComponent } from './char-creation-stats-tab/char-creation-stats-tab.component';
import { CharCreationSpellsTabComponent } from './char-creation-spells-tab/char-creation-spells-tab.component';
import { CharCreationEquipmentTabComponent } from './char-creation-equipment-tab/char-creation-equipment-tab.component';
import { CharCreationPersonalityTabComponent } from './char-creation-personality-tab/char-creation-personality-tab.component';
import { CharCreationAppearanceTabComponent } from './char-creation-appearance-tab/char-creation-appearance-tab.component';
import { CharCreationBackstoryTabComponent } from './char-creation-backstory-tab/char-creation-backstory-tab.component';
import { CharCreationClassInfoComponent } from './char-creation-class-info/char-creation-class-info.component';

@NgModule({
  declarations: [AppComponent, HomePageComponent, CharacterCardComponent, ChooseViewComponent, CreateEditPageComponent, CharCreationNrbTabComponent, CharCreationClassTabComponent, CharCreationStatsTabComponent, CharCreationSpellsTabComponent, CharCreationEquipmentTabComponent, CharCreationPersonalityTabComponent, CharCreationAppearanceTabComponent, CharCreationBackstoryTabComponent, CharCreationClassInfoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatIconModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
