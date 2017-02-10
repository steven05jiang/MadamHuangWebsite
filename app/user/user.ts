
export class User {
  id:           number;
  username:     string;
  password:     string;
  lastlogOn:    string;

  constructor() {

    this.id = -1;
    this.username = '';
    this.password = '';
    this.lastlogOn = (new Date().getTime()).toString();

  }
}
