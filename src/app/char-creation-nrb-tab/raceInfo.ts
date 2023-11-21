export class raceInfo {
    constructor(pRaceIndex: string) {
        this.raceIndex = pRaceIndex;
    }

    raceIndex: string = '';
    raceSpeed: number = 0;
    raceAbilityBonuses: any[][] = []; //[['wis', 2], ['cha', 1]]
    raceProficiencies: string[][] = []; //[[index, name], [index, name]]
    raceLanguages: string[][] = []; //[[index, name], [index, name]]

    //subject to change
    raceTraits: string[][] = []; //[[index, name], [index, name]]

    
    userAbilityBonuses?: any[][]; //[['wis', 2], ['cha', 1]]
    userProfiencies?: string[][]; //[[index, name], [index, name]]
    userLanguages?: string[][]; //[[index, name], [index, name]]

    alignmentText: string = '';
    ageText: string = '';
    sizeText: string = '';
    languageText: string = '';
}