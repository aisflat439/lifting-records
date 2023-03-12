import React from "react";
import { Workout } from "../types";
import { getUsersWorkouts } from "../utils";

export const useWorkouts = () => {
  const [workouts, setWorkouts] = React.useState<Workout[]>([]);
  const [workoutsByUser, setWorkoutsByUser] = React.useState<Workout[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(true);

  const getWorkouts = async () => {
    try {
      const data = await fetch("./data/workouts.json");
      const workouts = await data.json();

      setWorkouts(workouts);
      setError(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const changeUser = (id: string, workoutID?: number) => {
    const userWorkout = getUsersWorkouts(workouts, parseInt(id), workoutID);

    setWorkoutsByUser(userWorkout);
  };

  const changeExercise = (id: string, userID?: number) => {
    const usersWorkouts = userID
      ? getUsersWorkouts(workouts, userID)
      : workouts;
    const workoutData = usersWorkouts.reduce((list, workout) => {
      const relevantExercises = workout.blocks.filter(
        (block) => block.exercise_id === parseInt(id)
      );

      if (relevantExercises.length > 0) {
        return [...list, { ...workout, blocks: relevantExercises }];
      }

      return list;
    }, [] as Workout[]);

    setWorkoutsByUser(workoutData);
  };

  React.useEffect(() => {
    getWorkouts();
  }, []);

  return { workouts, loading, workoutsByUser, changeUser, changeExercise };
};
