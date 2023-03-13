import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { WorkoutCard } from "./WorkoutCard";

const workouts = [
  {
    user_id: 1,
    datetime_completed: "2016-08-07 09:38:36",
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
    ],
  },
  {
    user_id: 1,
    datetime_completed: "2016-01-07 09:38:36",
    blocks: [
      {
        exercise_id: 568,
        sets: [
          {
            reps: 1,
            weight: 1,
          },
        ],
      },
    ],
  },
  {
    user_id: 1,
    datetime_completed: "2016-04-07 09:38:36",
    blocks: [
      {
        exercise_id: 568,
        sets: [
          {
            reps: 200,
            weight: 2000,
          },
        ],
      },
    ],
  },
];

const exercise = {
  id: 568,
  title: "Bench Press",
};

type Overrides = Partial<React.ComponentProps<typeof WorkoutCard>>;

const setup = (overrides?: Overrides) => {
  const props = {
    exercise,
    workouts,
    ...overrides,
  };

  const R = render(<WorkoutCard {...props} />);

  return {
    ...R,
    props,
  };
};

describe("WorkoutCard", () => {
  it("renders a workout card", () => {
    const { getByText } = setup();

    expect(getByText(/user data/i)).toBeInTheDocument();
  });

  it("shows the PR (2000 pounds in mock data)", () => {
    const { getByText } = setup();

    expect(getByText("Bench Press PR:")).toBeInTheDocument();
    expect(getByText("2000")).toBeInTheDocument();
  });

  it("displays the annual total", () => {
    const { getByText } = setup();

    expect(getByText(/Bench Press/i)).toBeInTheDocument();
    expect(getByText(/PR:/i)).toBeInTheDocument();
    expect(getByText("2000")).toBeInTheDocument();
  });

  it("displays the months sorted", () => {
    const { queryAllByText, debug } = setup();
    debug();

    const years = queryAllByText(/2016/i);
    expect(years.length).toBe(4);
    expect(years[1].nextSibling).toHaveTextContent("1115");
    expect(years[2].nextSibling).toHaveTextContent("400000");
    expect(years[3].nextSibling).toHaveTextContent("1");
  });
});
