import { raceObject } from "./raceObject";
import { classObject } from "./classObject";
import { personalityObject } from "./personalityObject";
import { appearanceObject } from "./appearanceObject";
import { backgroundObject } from "./backgroundObject";
import { hpObject } from "./hpObject";

export class charObject {
    constructor() {
    }

    userId: any = '';
    active: boolean = false;
    favorite: boolean = false;
    startingEquipmentSelected: boolean = false;
    defaultStartingEquipmentCollected: boolean = false;

    name: string = '';
    overallLevel: number = 0;

    race: raceObject = new raceObject;

    background: backgroundObject = new backgroundObject;

    classes: classObject[] = [];

    hp: hpObject = new hpObject;

    abilityScoresBasic: number[] = [0,0,0,0,0,0]; //in order of STR DEX CON INT WIS CHA
    abilityScores: number[] = [0,0,0,0,0,0] //accounts for boosts to ability scores

    equippedItemsIndexes: string[] = [];
    inventoryItemsIndexes: string[] = [];

    _id?: string;
    charactersShard?: number;

    //Non required char creation sections. Can be left blank while still having a completed character
    personality: personalityObject = new personalityObject;
    appearance: appearanceObject = new appearanceObject;
    backstory: string = '';
}