import { spellCasterObject } from "./spellcasterObject";
import { subclassObject } from "./subclassObject";

export class classObject {
    classIndex: string = '';
    classLevel: number = 1;
    chosenProficiencyIndex?: string[][];
    chosenExpertisesIntex?: string[][];

    uniqueClassChoices?: string[][][];

    isSpellcaster: boolean = false;
    spellcasterInfo?: spellCasterObject;

    subclassSelected: boolean = false;
    subclassInfo?: subclassObject;
}