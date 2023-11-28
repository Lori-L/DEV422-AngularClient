import { raceObject } from "./raceObject";
import { classObject } from "./classObject";
import { personalityObject } from "./personalityObject";
import { appearanceObject } from "./appearanceObject";
import { backgroundObject } from "./backgroundObject";

export class charObject {
    constructor() {
        //eventually will be used to pass in values when editing existing characters
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

    abilityScores: number[] = [0,0,0,0,0,0]; //in order of STR DEX CON INT WIS CHA

    equippedItemsIndexes: string[] = [];
    inventoryItemsIndexes: string[] = [];

    //charactersShard: any = 0;

    //Non required char creation sections. Can be left blank while still having a completed character
    personality?: personalityObject;
    appearance?: appearanceObject;
    backstory?: string;
}