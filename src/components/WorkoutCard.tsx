import { Exercise, Workout } from "../types";
import { getBlockTotalById, getPR } from "../utils";

export const WorkoutCard = ({
  workouts,
  exercise,
}: {
  exercise: Exercise;
  workouts: Workout[];
}) => {
  const pr = getPR(workouts);
  const years = workouts.reduce((acc, workout) => {
    const year = new Date(workout.datetime_completed).getFullYear();

    const total = getBlockTotalById(workout.blocks, exercise.id);
    const currentTotal = acc[year] || 0;

    return { ...acc, [year]: total + currentTotal };
  }, {} as { [key: string]: number });

  const months = workouts.reduce((acc, workout) => {
    const year = new Date(workout.datetime_completed);
    const mmYyyy = `${year.getMonth() + 1}/${year.getFullYear()}`;

    const total = getBlockTotalById(workout.blocks, exercise.id);
    const currentTotal = acc[mmYyyy] || 0;

    return { ...acc, [mmYyyy]: total + currentTotal };
  }, {} as { [key: string]: number });

  const sortedMonths = Object.entries(months).sort((a, b) => {
    const [aMonth, aYear] = a[0].split("/");
    const [bMonth, bYear] = b[0].split("/");
    if (aYear === bYear) {
      return parseInt(aMonth) > parseInt(bMonth) ? -1 : 1;
    }

    return parseInt(aYear) > parseInt(bYear) ? -1 : 1;
  });

  return (
    <div className="ml-2 pl-2 shadow-md">
      <h1 className="text-2xl font-bold">User Data</h1>
      <div>
        {exercise.id && (
          <div key={exercise.id}>
            <h3>
              {exercise.title} PR: <span>{pr}</span>
            </h3>
            <hr />
            {Object.entries(years).map(([year, total]) => {
              return (
                <div key={year}>
                  <p>
                    {year}: {total}
                  </p>
                </div>
              );
            })}
            <hr />
            {Object.entries(sortedMonths).map(([index, detail]) => {
              return (
                <div key={index}>
                  <span className="text-sm text-gray-500">{detail[0]}</span>:{" "}
                  {detail[1]}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
