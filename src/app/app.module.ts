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
import { SingleSheetPage0Component } from './single-sheet-page0/single-sheet-page0.component';
import { CharSummaryComponent } from './char-summary/char-summary.component';
import { CharStatsSkillsAttacksTraitsComponent } from './char-stats-skills-attacks-traits/char-stats-skills-attacks-traits.component';
import { CharProficienciesEquipmentFeaturesComponent } from './char-proficiencies-equipment-features/char-proficiencies-equipment-features.component';
import { CharStatsComponent } from './char-stats/char-stats.component';
import { CharSkillsComponent } from './char-skills/char-skills.component';
import { CharAttacksComponent } from './char-attacks/char-attacks.component';
import { CharTraitsComponent } from './char-traits/char-traits.component';
import { CharStatBlockComponent } from './char-stat-block/char-stat-block.component';
import { NumBoxComponent } from './num-box/num-box.component';
import { CheckNumBoxComponent } from './check-num-box/check-num-box.component';
import { SavingThrowsComponent } from './saving-throws/saving-throws.component';
import { TextboxComponent } from './textbox/textbox.component';

@NgModule({
  declarations: [AppComponent, HomePageComponent, CharacterCardComponent, ChooseViewComponent, ViewAllCharactersPageComponent, ViewCharacterSheetPageComponent, SingleSheetPage0Component, CharSummaryComponent, CharStatsSkillsAttacksTraitsComponent, CharProficienciesEquipmentFeaturesComponent, CharStatsComponent, CharSkillsComponent, CharAttacksComponent, CharTraitsComponent, CharStatBlockComponent, NumBoxComponent, CheckNumBoxComponent, SavingThrowsComponent, TextboxComponent],
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
