
export class Event {

  public static RELOAD: string = 'RELOAD';
  
  type: string;

  constructor(type:string) {
    this.type = type;

  }

}
