import { CriteriaSdaModel } from '../criiteria-sda/criteria-sda.model';

export class CompetencieSdaModel {
  constructor(
    private _competencyUUID: string,
    private _competencyUUIDTPL: string,
    private _competencyDescription: string,
    private _competencyOrder: number,
    private _competencyWorked: boolean,
    private _competencyType: number,
    private _criteria: CriteriaSdaModel[] = [],
    public expanded: boolean = false
  ) {}

  get competencyUUID(): string {
    return this._competencyUUID;
  }
  set competencyUUID(value: string) {
    this._competencyUUID = value;
  }

  get competencyUUIDTPL(): string {
    return this._competencyUUIDTPL;
  }
  set competencyUUIDTPL(value: string) {
    this._competencyUUIDTPL = value;
  }

  get competencyDescription(): string {
    return this._competencyDescription;
  }
  set competencyDescription(value: string) {
    this._competencyDescription = value;
  }

  get competencyOrder(): number {
    return this._competencyOrder;
  }
  set competencyOrder(value: number) {
    this._competencyOrder = value;
  }

  get competencyWorked(): boolean {
    return this._competencyWorked;
  }
  set competencyWorked(value: boolean) {
    this._competencyWorked = value;
  }

  get competencyType(): number {
    return this._competencyType;
  }
  set competencyType(value: number) {
    this._competencyType = value;
  }

  get criteria(): CriteriaSdaModel[] {
    return this._criteria;
  }
  set criteria(value: CriteriaSdaModel[]) {
    this._criteria = value;
  }
}
