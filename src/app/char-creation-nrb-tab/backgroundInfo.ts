export class backgroundInfo {
    constructor(pBackgroundIndex: string) {
        this.backgroundIndex = pBackgroundIndex;
    }

    backgroundIndex: string = '';
    feature: string[] = [];
    startingEquipment: string[][] = [];
    startingProfiencies: string[][] = [];

    userLanguages: string[][] = [];
}