export interface Exercise {
  id: number;
  title: string;
}

export interface User {
  id: number;
  name_first: string;
  name_last: string;
}

export interface Workout {
  user_id: number;
  datetime_completed: string;
  blocks: BlocksEntity[];
}

export interface BlocksEntity {
  exercise_id: number;
  sets: SetsEntity[];
}

export interface SetsEntity {
  reps: number;
  weight?: number | null;
}
