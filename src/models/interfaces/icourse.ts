export interface ICourse {
  id?: number;
  name: string;
  level: string;
  session_num: number;
  price?: number;
  capacity?: number;
  start_date: Date;
  next_session_date?: any;
  next_session_time?: any;
  schedule: string;
  teacher?: any;
  teacher_pk?: number;
}
