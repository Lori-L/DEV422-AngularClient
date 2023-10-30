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
import { HpContainerComponent } from './hp-container/hp-container.component';
import { DeathSavesComponent } from './death-saves/death-saves.component';
import { CharAttackSpellcastingComponent } from './char-attack-spellcasting/char-attack-spellcasting.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CharacterCardComponent,
    ChooseViewComponent,
    ViewAllCharactersPageComponent,
    ViewCharacterSheetPageComponent,
    SingleSheetPage0Component,
    CharSummaryComponent,
    CharStatsSkillsAttacksTraitsComponent,
    CharProficienciesEquipmentFeaturesComponent,
    CharStatsComponent,
    CharSkillsComponent,
    CharAttacksComponent,
    CharTraitsComponent,
    CharStatBlockComponent,
    NumBoxComponent,
    CheckNumBoxComponent,
    SavingThrowsComponent,
    TextboxComponent,
    HpContainerComponent,
    DeathSavesComponent,
    CreateEditPageComponent,
    CharCreationNrbTabComponent,
    CharCreationClassTabComponent,
    CharCreationStatsTabComponent,
    CharCreationSpellsTabComponent,
    CharCreationEquipmentTabComponent,
    CharCreationPersonalityTabComponent,
    CharCreationAppearanceTabComponent,
    CharCreationBackstoryTabComponent,
    CharCreationClassInfoComponent,
    CharAttackSpellcastingComponent,
    SignupPageComponent,
    NavBarComponent,
    LogoutDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
