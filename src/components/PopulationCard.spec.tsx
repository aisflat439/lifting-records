import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { PopulationCard } from "./PopulationCard";

const workouts = [
  {
    user_id: 1,
    datetime_completed: "2021-01-01T00:00:00.000Z",
    blocks: [
      {
        exercise_id: 568,
        sets: [
          {
            reps: 3,
            weight: 0,
          },
          {
            reps: 6,
            weight: 160,
          },
        ],
      },
      {
        exercise_id: 568,
        sets: [
          {
            reps: 1,
            weight: 155,
          },
        ],
      },
      {
        exercise_id: 797,
        sets: [
          {
            reps: 12,
            weight: null,
          },
          {
            reps: 4,
            weight: 145,
          },
        ],
      },
    ],
  },
  {
    user_id: 1,
    datetime_completed: "2021-01-01T00:00:00.000Z",
    blocks: [
      {
        exercise_id: 797,
        sets: [
          {
            reps: 7,
            weight: 315,
          },
          {
            reps: 7,
            weight: 225,
          },
        ],
      },
    ],
  },
  {
    user_id: 1,
    datetime_completed: "2021-01-01T00:00:00.000Z",
    blocks: [
      {
        exercise_id: 797,
        sets: [
          {
            reps: 11,
            weight: 155,
          },
        ],
      },
    ],
  },
];

const exercises = [
  {
    id: 326,
    title: "Back Squat",
  },
  {
    id: 568,
    title: "Bench Press",
  },
  {
    id: 797,
    title: "Lat Pulldown",
  },
];

type Overrides = Partial<React.ComponentProps<typeof PopulationCard>>;

const setup = (overrides?: Overrides) => {
  const props = {
    exercises,
    workouts,
    ...overrides,
  };

  const R = render(<PopulationCard {...props} />);

  return {
    ...R,
    props,
  };
};

describe("PopulationCard", () => {
  it("renders a population card", () => {
    const { getByText } = setup();

    expect(getByText(/population totals/i)).toBeInTheDocument();
  });

  it.each(["Back Squat", "Lat Pulldown", "Bench Press"])(
    "shows an entry for %s",
    (exercise) => {
      const { getByText } = setup();

      expect(getByText(exercise)).toBeInTheDocument();
    }
  );

  it.each(["1115", "0", "6065"])("shows a weight entry for %s", (exercise) => {
    const { getByText } = setup();

    expect(getByText(exercise)).toBeInTheDocument();
  });
});
