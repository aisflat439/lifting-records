import React from "react";
import { Exercise } from "../types";

export const useExercises = () => {
  const [exercises, setExercises] = React.useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = React.useState<Exercise>(
    {} as Exercise
  );
  const [loading, setLoading] = React.useState<boolean>(true);

  const getExercises = async () => {
    const data = await fetch("./data/exercises.json");
    const exercises = await data.json();
    setExercises(exercises);
    setLoading(false);
  };

  React.useEffect(() => {
    getExercises();
  }, []);

  return {
    exercises,
    loading,
    selectedExercise,
    setSelectedExercise,
  };
};
