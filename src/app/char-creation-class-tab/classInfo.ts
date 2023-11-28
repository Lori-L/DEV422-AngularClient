export class classInfo {
  constructor(pClassIndex: string) {
    this.classIndex = pClassIndex;
  }

  classIndex: string = '';
  classLevel: number = 0;
  hitDie: number = 0;
  skillProficiencies?: any[][];
  levelFeatures: string[][] = [];
  test: boolean = false;
  skillProficiencyCount?: number;
  startingEquipment?: any[][];

  userProficienciesOptions?: any[][];

  //make a subclassInfo object?
}