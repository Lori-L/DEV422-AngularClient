import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterApiService } from '../character-api.service';
import { DndApiServiceService } from '../dnd-api-service.service';

@Component({
  selector: 'app-view-character-sheet-page',
  templateUrl: './view-character-sheet-page.component.html',
  styleUrls: ['./view-character-sheet-page.component.css'],
})
export class ViewCharacterSheetPageComponent implements OnInit {
  @Input() characterData: any;
  @Input() RaceInfo: any;
  @Input() savingThrows: any = [];
  @Input() apiInfo: any = {
    proficiencyBonus: null,
    speed: null,
    hitDie: null,
    classIndex: null,
    equipment: [],
    savingThrows: [],
    savingThrowProficiencies: [],
    skillProficiencies: [],
  };

  character = {
    name: 'Klor',
    overallLevel: 2,
    health: {
      maxHP: 24,
      currentHP: 20,
      tempHP: 0,
    },
    race: {
      raceIndex: 'tiefling',
      chosenLanguageIndex: [],
      chosenProficiencyIndex: [], //?
    },

    background: {
      backgroundIndex: 'acolyte',
      chosenLanguageIndex: 'celestial',
      chosenProficiencyIndex: null,
    },

    classes: [
      {
        classIndex: 'barbarian',
        classLevel: 2,
        chosenProficiencyIndex: ['skill-intimidation', 'skill-animal-handling'],
        uniqueClassChoices: null,
        spellcaster: false,
        spellcasterInfo: null,
        subclassSelected: false,
        subclassInfo: null,
      },
    ],

    abilityScores: [15, 13, 14, 8, 12, 10],
    equippedItemsIndexes: ['club'],
    inventoryItemsIndexes: ['explorers-pack', 'javelin'],

    personality: {
      alignmentIndex: 'chaotic-evil',
      personalityTraits: ['personalityTrait'],
      ideals: ['ideal'],
      bonds: ['bonds'],
      flaws: ['flaws'],
    },
    appearance: {
      age: '45',
      height: 'tall',
      weight: 'weight',
      eyes: 'eyes',
      skin: 'skin',
      hair: 'hair',
      otherNotes: 'other appearance note',
    },
    backstory: 'likes to hit things',
    spells: [
      {
        name: 'spell1',
        level: 1,
        school: 'school',
        castingTime: 'casting time',
        range: 'range',
        components: 'components',
        duration: 'duration',
        description: 'description',
      },
      {
        name: 'spell2',
        level: 1,
        school: 'school',
        castingTime: 'casting time',
        range: 'range',
        components: 'components',
        duration: 'duration',
        description: 'description',
      },
      {
        name: 'spell3',
        level: 1,
        school: 'school',
        castingTime: 'casting time',
        range: 'range',
        components: 'components',
        duration: 'duration',
        description: 'description',
      },
    ],
    apiInfo: {
      proficiencyBonus: 2,

      // Takes the base ability scores from the original character object
      // And adds any bonuses to find the totals.
      // In this case, racial bonuses have changed the Int and Cha stats
      totalAbilityScores: [15, 13, 14, 9, 12, 12],
      abilityScoreModifiers: [2, 1, 2, -1, 1, 1],

      race: {
        speed: 30,

        //some playable races have inherent bonuses to certain stats. That's what this is reflecting:
        abilityScoreBonuses: [
          ['int', 1],
          ['cha', 2],
        ],

        knownLanguages: ['common', 'infernal'],

        //traits are basically the same thing as features
        //the only difference is that traits are inherent from character race
        //these can still be displayed in the 'features' section of the char sheet
        //an array of traits. each trait is an array of strings.
        traits: [
          [
            'DARKVISION:',
            'You have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You cannot discern color in darkness, only shades of gray.',
          ],
          [
            'DARKVISION:',
            'You have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You cannot discern color in darkness, only shades of gray.',
          ],
          [
            'DARKVISION:',
            'You have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You cannot discern color in darkness, only shades of gray.',
          ],
          [
            'DARKVISION:',
            'You have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You cannot discern color in darkness, only shades of gray.',
          ],
          [
            'DARKVISION:',
            'You have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You cannot discern color in darkness, only shades of gray.',
          ],
          [
            'DARKVISION:',
            'You have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You cannot discern color in darkness, only shades of gray.',
          ],
          [
            'DARKVISION:',
            'You have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You cannot discern color in darkness, only shades of gray.',
          ],
          [
            'DARKVISION:',
            'You have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You cannot discern color in darkness, only shades of gray.',
          ],
          [
            'DARKVISION:',
            'You have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You cannot discern color in darkness, only shades of gray.',
          ],

          ['HELLISH RESISTANCE:', 'You have resistance to fire damage.'],

          [
            'INFERNAL LEGACY:',
            'You know the thaumaturgy cantrip. When you reach 3rd level, you can cast the hellish rebuke spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the darkness spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.',
          ],
        ],
      },

      background: {
        //For greater readability, this would be the Insight and Religion skills
        skillProficiencies: ['skill-insight', 'skill-religion'],

        features: [
          [
            'SHELTER OF THE FAITHFUL:',
            'As an acolyte, you command the respect of those who share your faith, and you can perform the religious ceremonies of your deity. You and your adventuring companions can expect to receive free healing and care at a temple, shrine, or other established presence of your faith, though you must provide any material components needed for spells. Those who share your religion will support you (but only you) at a modest lifestyle.',
            'You might also have ties to a specific temple dedicated to your chosen deity or pantheon, and you have a residence there. This could be the temple where you used to serve, if you remain on good terms with it, or a temple where you have found a new home. While near your temple, you can call upon the priests for assistance, provided the assistance you ask for is not hazardous and you remain in good standing with your temple.',
          ],
        ],
      },

      class: {
        //indicates the dice rolled for health increases (would be a d12 - a twelve sided die - here)
        hitDie: 12,

        //for readability, would be "Light Armor", "Medium Armor", Shields", Simple Weapons", "Martial Weapons"
        equipmentProficiencies: [
          'light-armor',
          'medium-armor',
          'shields',
          'simple-weapons',
          'martial-weapons',
        ],

        savingThrowProficiencies: ['str', 'con'],

        //An array of features. Each feature is an array of strings.
        features: [
          [
            'RAGE:',
            "In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action. While raging, you gain the following benefits if you aren't wearing heavy armor:",
            '- You have advantage on Strength checks and Strength saving throws.',
            '- When you make a melee weapon Attack using Strength, you gain a bonus to the damage roll. This bonus increases as you level.',
            '- You have Resistance to bludgeoning, piercing, and slashing damage.',
            "If you are able to cast Spells, you can't cast them or concentrate on them while raging.",
            "Your rage lasts for 1 minute. It ends early if you are knocked Unconscious or if Your Turn ends and you haven't attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on Your Turn as a Bonus Action.",
            'Once you have raged the maximum number of times for your barbarian level, you must finish a Long Rest before you can rage again.',
          ],

          ['Rages per long rest: 2', 'Rage damage bonus: 2'],

          [
            'UNARMORED DEFENSE:',
            'While you are not wearing any armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.',
          ],

          [
            'RECKLESS ATTACK:',
            'Starting at 2nd level, you can throw aside all concern for defense to attack with fierce desperation. When you make your first attack on your turn, you can decide to attack recklessly. Doing so gives you advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn.',
          ],

          [
            'DANGER SENSE:',
            "At 2nd level, you gain an uncanny sense of when things nearby aren't as they should be, giving you an edge when you dodge away from danger. You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells. To gain this benefit, you can't be blinded, deafened, or incapacitated.",
          ],
        ],
      },
    },
  };
  constructor(
    private route: ActivatedRoute,
    private characterApiService: CharacterApiService,
    private apiService: DndApiServiceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const id = params['id'];
      this.characterApiService.getCharacter(id).subscribe((data: any) => {
        this.characterData = data.result;
        console.log(this.characterData);

        // api calls
        this.apiService
          .RaceInfo(this.characterData.race.raceIndex)
          .subscribe((data: any) => {
            this.apiInfo.speed = data.speed;

            this.apiService
              .SingleClassData(this.characterData.classes[0].classIndex)
              .subscribe((data: any) => {
                this.apiInfo.classIndex =
                  this.characterData.classes[0].classIndex;
                for (const i of data.saving_throws) {
                  this.apiInfo.savingThrows.push(i.index);
                }

                this.apiInfo.proficiencyBonus = data.proficiency_bonus;
                this.apiInfo.hitDie = data.hit_die;
              });
          });
      });
    });
  }

  logChar() {
    console.log(this.characterData);
  }
}
