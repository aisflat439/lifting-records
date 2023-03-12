import { Exercise, Workout } from "../types";
import { getBlockTotalById } from "../utils";

export const PopulationCard = ({
  exercises,
  workouts,
}: {
  exercises: Exercise[];
  workouts: Workout[];
}) => {
  const populationTotals = exercises.map((exercise) => {
    const workoutGroup = workouts.reduce((acc, workout) => {
      const tally = getBlockTotalById(workout.blocks, exercise.id);

      const current = acc[exercise.title] || 0;

      return {
        [exercise.title]: current + tally,
      };
    }, {} as { [key: string]: number });
    return workoutGroup;
  });

  return (
    <div className="shadow-md">
      <h3>Population Totals</h3>
      {populationTotals.map((total) => {
        return Object.entries(total).map(([key, value]) => {
          return (
            <div key={key}>
              <p>
                {key}: {value}
              </p>
            </div>
          );
        });
      })}
    </div>
  );
};
