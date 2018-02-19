export interface IUser {
  admin: Boolean;
  hireDate: Date;
  _id?: Number;
  email: String;
  name: String;
  slotType?: Number | String;
  isFirstPassword?: Boolean;
}
