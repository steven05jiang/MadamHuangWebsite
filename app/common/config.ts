
export class Config {

  public static api_host: string = 'https://madamhuang.com:9000/api/v1';
  //public static api_host: string = 'http://localhost:9000/api/v1';
  public static user_header_folder: string = 'image/headImage';
  //public static applicationId = 'sandbox-sq0idp-ZLC5q6ns15LA8q6vDJY1Hg';
  public static applicationId = 'sq0idp-ZLC5q6ns15LA8q6vDJY1Hg';

  public static PAGE_NUM: number = 50;

  public static formatDate(secondStr: string): string {

    let date = new Date();
    let seconds = parseInt(secondStr);
    date.setTime(seconds);
    //console.log("ISO Time String: " + date.toISOString());
    return date.toISOString();
  }

  public static getToken(): string {
    return localStorage.getItem('token');
  }

}

export const TEXTS: Text[] = [

    {id:0, val:"Please login"},
    {id:100, val:"Invalid user name/password"},
    {id:200, val:"Your session has timed out or you are not authorized"},
    {id:300, val:"You have successfully logged out"},
    {id:500, val:"Server error: Please try again later"}
];

export class Text {

  id: number;
  val: string;

  constructor(id:number, val:string) {
    this.id = id;
    this.val = val;
  }

  public static val(id: number): string {

    // [note]: forEach cannot break!
    let isGoing = true;
    let value = '';

    TEXTS.forEach((text: Text) => {
      if(isGoing) {
        if(id == text.id) {
          console.log(text.val);
          value = text.val;
          isGoing = false;
        }
      }
    });
    return value;
  }
}

