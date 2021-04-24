export interface IAdmin {
  id?: number;
  name: string;
  manager: IAdmin;
  ssn: string;
  user_id?: number;
}
