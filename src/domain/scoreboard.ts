/** Scoreboard state for a volleyball match between two teams */
export interface ScoreState {
  teamA: { name: string; points: number; sets: number };
  teamB: { name: string; points: number; sets: number };
}

// Helper functions
function updateTeam(
  state: ScoreState,
  teamKey: 'teamA' | 'teamB',
  updates: Partial<ScoreState['teamA']>,
): ScoreState {
  return { ...state, [teamKey]: { ...state[teamKey], ...updates } };
}

function parseScoreString(scoreString: string): {
  teamAName: string;
  teamAPoints: number;
  teamBPoints: number;
  teamBName: string;
} {
  const match = scoreString.match(/(.+) (\d+) x (\d+) (.+)/);
  if (!match) throw new Error(`Invalid format: ${scoreString}`);

  const [, teamAName, teamAPoints, teamBPoints, teamBName] = match;
  return {
    teamAName,
    teamAPoints: parseInt(teamAPoints, 10),
    teamBPoints: parseInt(teamBPoints, 10),
    teamBName,
  };
}

/** Adds a point to the specified team (immutable) */
export function addPoint(state: ScoreState, teamName: string): ScoreState {
  if (teamName === state.teamA.name) {
    return updateTeam(state, 'teamA', { points: state.teamA.points + 1 });
  }
  if (teamName === state.teamB.name) {
    return updateTeam(state, 'teamB', { points: state.teamB.points + 1 });
  }
  return state;
}

/** Formats score as "Team A 10 x 9 Team B" */
export function formatScore(state: ScoreState): string {
  return `${state.teamA.name} ${state.teamA.points} x ${state.teamB.points} ${state.teamB.name}`;
}

/** Parses "Team A 10 x 9 Team B" into ScoreState */
export function parseScore(scoreString: string): ScoreState {
  const { teamAName, teamAPoints, teamBPoints, teamBName } =
    parseScoreString(scoreString);
  return {
    teamA: { name: teamAName, points: teamAPoints, sets: 0 },
    teamB: { name: teamBName, points: teamBPoints, sets: 0 },
  };
}

/** Checks if a team won the set (25+ points with 2+ point advantage) */
export function checkSetWinner(state: ScoreState): string | null {
  const { teamA, teamB } = state;
  const diff = teamA.points - teamB.points;

  if (teamA.points >= 25 && diff >= 2) return teamA.name;
  if (teamB.points >= 25 && diff <= -2) return teamB.name;
  return null;
}

/** Adds point and handles set completion automatically */
export function addPointWithSetLogic(state: ScoreState, teamName: string): ScoreState {
  const stateWithPoint = addPoint(state, teamName);
  const winner = checkSetWinner(stateWithPoint);
  return winner ? finishSet(stateWithPoint, winner) : stateWithPoint;
}

/** Awards set to winner and resets points to 0-0 */
export function finishSet(state: ScoreState, winnerName: string): ScoreState {
  if (winnerName === state.teamA.name) {
    return {
      teamA: { ...state.teamA, points: 0, sets: state.teamA.sets + 1 },
      teamB: { ...state.teamB, points: 0 },
    };
  }
  if (winnerName === state.teamB.name) {
    return {
      teamA: { ...state.teamA, points: 0 },
      teamB: { ...state.teamB, points: 0, sets: state.teamB.sets + 1 },
    };
  }
  return state;
}

/** Formats sets as "Team A 1 x 0 Team B" */
export function formatSets(state: ScoreState): string {
  return `${state.teamA.name} ${state.teamA.sets} x ${state.teamB.sets} ${state.teamB.name}`;
}

/** Parses "Team A 1 x 0 Team B" into team names and set counts */
export function parseSets(setsString: string): {
  teamA: { name: string; sets: number };
  teamB: { name: string; sets: number };
} {
  const {
    teamAName,
    teamAPoints: teamASets,
    teamBPoints: teamBSets,
    teamBName,
  } = parseScoreString(setsString);
  return {
    teamA: { name: teamAName, sets: teamASets },
    teamB: { name: teamBName, sets: teamBSets },
  };
}
