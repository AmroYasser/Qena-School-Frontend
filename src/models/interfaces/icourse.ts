export interface ICourse {
  id?: number;
  name: string;
  level: string;
  session_num: number;
  start_date: Date;
  schedule: string;
  teacher?: any;
  teacher_pk?: number;
}
