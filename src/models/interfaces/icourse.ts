export interface ICourse {
  id?: number;
  name: string;
  level: string;
  session_num: number;
  price?: number;
  capacity?: number;
  start_date: Date;
  next_session_date?: string;
  schedule: string;
  teacher?: any;
  teacher_pk?: number;
}
