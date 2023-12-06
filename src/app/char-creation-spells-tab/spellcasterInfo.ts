export class spellCasterInfo {
    constructor(pClassIndex: string, pClassLevel: number) {
        this.classIndex = pClassIndex;
        this.classLevel = pClassLevel;
    }
    classIndex: string = '';
    classLevel: number = 0;
    spellCastingAbility: string = '';
    spellCastingModifier: number = 0;

    spellSlotsArray: number[] = [];
    spellsByLevel: any[][][] = [];
    cantripsKnownCount?: number;
    cantripsList: string[][] = [];
    spellsKnownCount?: number;
    maxPreparedSpells?: number;
}