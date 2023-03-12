import React from "react";
import { PopulationCard } from "./components/PopulationCard";
import { WorkoutCard } from "./components/WorkoutCard";
import { useExercises } from "./hooks/useExercises";
import { useUsers } from "./hooks/useUsers";
import { useWorkouts } from "./hooks/useWorkouts";
import { Exercise } from "./types";

function App() {
  const {
    users,
    loading: usersLoading,
    selectedUser,
    setSelectedUser,
  } = useUsers();
  const {
    exercises,
    loading: exercisesLoading,
    selectedExercise,
    setSelectedExercise,
  } = useExercises();
  const { workouts, changeUser, changeExercise, workoutsByUser } =
    useWorkouts();

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeUser(e.target.value, selectedExercise?.id);
    setSelectedUser(e.target.value);
  };

  const handleChangeExercise = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeExercise(e.target.value, selectedUser?.id);
    const selection =
      exercises.find((ex) => ex.id === parseInt(e.target.value)) ||
      ({} as Exercise);
    setSelectedExercise(selection);
  };

  return (
    <div className="w-screen min-h-screen">
      <div className="flex flex-row flex-wrap">
        <aside className=" w-full sm:w-1/3 md:w-1/4 px-2 bg-gradient-to-b from-blue-800 to-blue-600">
          <div className="sticky top-0 p-4 w-full">
            <ul className="flex flex-col overflow-hidden">
              <li>
                <label htmlFor="user-select" className="hidden">
                  Select a user
                </label>
                {!usersLoading && (
                  <select
                    name="user"
                    id="user-select"
                    onChange={handleUserChange}
                  >
                    <option value="">choose a user</option>
                    {users.map((user) => {
                      return (
                        <option key={user.id} value={user.id}>
                          {user.name_first} {user.name_last}
                        </option>
                      );
                    })}
                  </select>
                )}
              </li>
              <li>
                <label htmlFor="exercise-select" className="hidden">
                  Select an exercise
                </label>
                {!exercisesLoading && (
                  <select
                    name="exercise"
                    id="exercise-select"
                    onChange={handleChangeExercise}
                  >
                    <option value="">choose an exercise</option>
                    {exercises.map((exercise) => {
                      return (
                        <option key={exercise.id} value={exercise.id}>
                          {exercise.title}
                        </option>
                      );
                    })}
                  </select>
                )}
              </li>
            </ul>
          </div>
        </aside>
        <main role="main" className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
          <div className="grid grid-cols-2 gap-4">
            <WorkoutCard
              exercise={selectedExercise}
              workouts={workoutsByUser}
            />
            <PopulationCard exercises={exercises} workouts={workouts} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
