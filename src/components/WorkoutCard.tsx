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
    const date = new Date(workout.datetime_completed);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const total = getBlockTotalById(workout.blocks, exercise.id);
    const monthData = { month, year, total, isHeaviestMonth: false };

    const matchingMonth = acc.find(
      (list) => list.month === month && list.year === year
    );

    if (matchingMonth) {
      return acc.map((list) => {
        if (list.month === matchingMonth.month) {
          return { ...list, total: list.total + total };
        }

        return list;
      });
    }

    return [...acc, monthData];
  }, [] as { month: number; year: number; total: number; isHeaviestMonth: boolean }[]);

  const sortedMonths = months.sort((a, b) => {
    if (a.year === b.year) {
      return a.month > b.month ? -1 : 1;
    }

    return a.year > b.year ? -1 : 1;
  });

  const yearsList = [...new Set([...sortedMonths.map((month) => month.year)])];

  yearsList.forEach((year) => {
    const heaviestMonth = sortedMonths
      .filter((month) => month.year === year)
      .sort((a, b) => (a.total > b.total ? -1 : 1))[0];

    sortedMonths.forEach((month) => {
      if (
        month.month === heaviestMonth.month &&
        month.year === heaviestMonth.year
      ) {
        month.isHeaviestMonth = true;
      }
    });
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
            {sortedMonths.map((data) => {
              return (
                <div
                  key={`${data.month}-${data.year}`}
                  className={
                    data.isHeaviestMonth
                      ? "bg-green-200 flex justify-between"
                      : "flex justify-between"
                  }
                >
                  <span className="text-sm text-gray-500">
                    {data.month}/{data.year}:
                  </span>
                  <span>{data.total}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
