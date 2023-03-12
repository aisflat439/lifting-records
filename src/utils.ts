import { BlocksEntity, SetsEntity, Workout } from "./types";

export const getSetTotal = (sets: SetsEntity[]) => {
  return sets.reduce((acc: number, set) => {
    const weight = set.weight || 0;
    return (acc += set.reps * weight);
  }, 0);
};

export const getBlockTotalById = (blocks: BlocksEntity[], id: number) => {
  return blocks.reduce((acc, block) => {
    if (block.exercise_id === id) {
      return (acc += getSetTotal(block.sets));
    }
    return acc;
  }, 0);
};

export const getPR = (workouts: Workout[]) => {
  const weights = workouts.flatMap(({ blocks }) => {
    return blocks.flatMap(({ sets }) => {
      return sets.map(({ weight }) => weight || 0);
    });
  });

  return Math.max(...weights);
};

export const getUsersWorkouts = (
  workouts: Workout[],
  id: number,
  workoutID?: number
) => {
  return workouts.reduce((acc: Workout[], workout: Workout) => {
    if (workout.user_id === id) {
      if (Boolean(workoutID)) {
        const relevantExercises = workout.blocks.filter(
          (block) => block.exercise_id === workoutID
        );

        if (relevantExercises.length > 0) {
          acc.push({ ...workout, blocks: relevantExercises });
        }
      } else {
        acc.push(workout);
      }
    }
    return acc;
  }, []);
};
