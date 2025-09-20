/**
 * Represents the current state of a scoreboard for a match between two teams.
 *
 * This interface defines the structure for tracking scores in a competitive match,
 * where each team has a name, current points in the ongoing set, and total sets won.
 * The state is designed to be immutable and should be updated through pure functions.
 *
 * @interface ScoreState
 *
 * @example
 * ```typescript
 * const initialState: ScoreState = {
 *   teamA: { name: "Team Alpha", points: 0, sets: 0 },
 *   teamB: { name: "Team Beta", points: 0, sets: 0 }
 * };
 * ```
 */
export interface ScoreState {
  /** Information and score data for the first team */
  teamA: {
    /** The display name of team A */
    name: string;
    /** Current points scored by team A in the ongoing set */
    points: number;
    /** Total number of sets won by team A */
    sets: number;
  };
  /** Information and score data for the second team */
  teamB: {
    /** The display name of team B */
    name: string;
    /** Current points scored by team B in the ongoing set */
    points: number;
    /** Total number of sets won by team B */
    sets: number;
  };
}

/**
 * Adds a point to the specified team in the scoreboard.
 *
 * This function follows immutable principles, returning a new ScoreState object
 * without modifying the original state. If the team name doesn't match either
 * teamA or teamB, the original state is returned unchanged.
 *
 * @param state - The current scoreboard state containing both teams' information
 * @param teamName - The name of the team to add a point to
 * @returns A new ScoreState object with the updated score, or the original state if team not found
 *
 * @example
 * ```typescript
 * const currentState = {
 *   teamA: { name: "Team A", points: 10, sets: 0 },
 *   teamB: { name: "Team B", points: 9, sets: 0 }
 * };
 *
 * const newState = addPoint(currentState, "Team A");
 * // Result: Team A will have 11 points
 * ```
 */
export function addPoint(state: ScoreState, teamName: string): ScoreState {
  const { teamA, teamB } = state;

  // Imutável - retorna novo estado sem modificar o original
  if (teamName === teamA.name) {
    return {
      ...state,
      teamA: {
        ...teamA,
        points: teamA.points + 1,
      },
    };
  }

  if (teamName === teamB.name) {
    return {
      ...state,
      teamB: {
        ...teamB,
        points: teamB.points + 1,
      },
    };
  }

  // Se o time não for encontrado, retorna estado inalterado
  return state;
}

/**
 * Formats a ScoreState object into a human-readable string representation.
 *
 * This function takes the current scoreboard state and converts it into a standardized
 * string format that displays both teams' names and their current points in the format:
 * "TeamA Name X x Y TeamB Name" where X and Y are the respective point totals.
 *
 * @param state - The current scoreboard state containing both teams' information
 * @returns A formatted string representation of the current score
 *
 * @example
 * ```typescript
 * const currentState = {
 *   teamA: { name: "Team A", points: 10, sets: 0 },
 *   teamB: { name: "Team B", points: 9, sets: 0 }
 * };
 *
 * const scoreString = formatScore(currentState);
 * // Result: "Team A 10 x 9 Team B"
 * ```
 */

export function formatScore(state: ScoreState): string {
  return `${state.teamA.name} ${state.teamA.points} x ${state.teamB.points} ${state.teamB.name}`;
}

/**
 * Parses a string representation of a scoreboard state into a ScoreState object.
 *
 * This function takes a string in the format "TeamA Name X x Y TeamB Name" and
 * converts it into a ScoreState object with the respective team names and points.
 *
 * @param scoreString - The string representation of the scoreboard state
 * @returns A ScoreState object with the parsed team names and points
 *
 * @example
 * ```typescript
 * const scoreString = "Team A 10 x 9 Team B";
 *
 * const parsedState = parseScore(scoreString);
 * // Result: { teamA: { name: "Team A", points: 10, sets: 0 }, teamB: { name: "Team B", points: 9, sets: 0 } }
 * ```
 */
export function parseScore(scoreString: string): ScoreState {
  // Parseia "Time A 10 x 9 Time B" -> ScoreState
  const regex = /(.+) (\d+) x (\d+) (.+)/;
  const match = scoreString.match(regex);

  if (!match) {
    throw new Error(`Invalid scoreboard format: ${scoreString}`);
  }

  const [, teamAName, teamAPoints, teamBPoints, teamBName] = match;

  return {
    teamA: {
      name: teamAName,
      points: parseInt(teamAPoints, 10),
      sets: 0,
    },
    teamB: {
      name: teamBName,
      points: parseInt(teamBPoints, 10),
      sets: 0,
    },
  };
}
