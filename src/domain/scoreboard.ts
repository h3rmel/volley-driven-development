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
  const match = scoreString.match(/^(.+?) (-?\d+) x (-?\d+) (.+?)$/);
  if (!match) throw new Error(`Invalid format: ${scoreString}`);

  const [, teamAName, teamAPoints, teamBPoints, teamBName] = match;

  // Validate team names are not empty or whitespace only
  if (!teamAName.trim() || !teamBName.trim()) {
    throw new Error('Team names cannot be empty');
  }

  const pointsA = parseInt(teamAPoints, 10);
  const pointsB = parseInt(teamBPoints, 10);

  // Validate points are not negative
  if (pointsA < 0 || pointsB < 0) {
    throw new Error('Points cannot be negative');
  }

  return {
    teamAName: teamAName.trim(),
    teamAPoints: pointsA,
    teamBPoints: pointsB,
    teamBName: teamBName.trim(),
  };
}

/** Adds a point to the specified team (immutable) */
export function addPoint(state: ScoreState, teamName: string): ScoreState {
  // Validate team name is not empty or whitespace only
  if (!teamName?.trim()) {
    throw new Error('Team name cannot be empty');
  }

  const trimmedName = teamName.trim();

  if (trimmedName === state.teamA.name) {
    return updateTeam(state, 'teamA', { points: state.teamA.points + 1 });
  }
  if (trimmedName === state.teamB.name) {
    return updateTeam(state, 'teamB', { points: state.teamB.points + 1 });
  }

  // Team not found - throw error instead of silently returning unchanged state
  throw new Error(`Team "${trimmedName}" not found`);
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
  // Validate winner name is not empty or whitespace only
  if (!winnerName?.trim()) {
    throw new Error('Winner name cannot be empty');
  }

  const trimmedName = winnerName.trim();

  if (trimmedName === state.teamA.name) {
    return {
      teamA: { ...state.teamA, points: 0, sets: state.teamA.sets + 1 },
      teamB: { ...state.teamB, points: 0 },
    };
  }
  if (trimmedName === state.teamB.name) {
    return {
      teamA: { ...state.teamA, points: 0 },
      teamB: { ...state.teamB, points: 0, sets: state.teamB.sets + 1 },
    };
  }

  // Winner not found - throw error
  throw new Error(`Winner "${trimmedName}" not found`);
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
  // Parse manually for sets to provide specific error messages
  const match = setsString.match(/^(.+?) (-?\d+) x (-?\d+) (.+?)$/);
  if (!match) throw new Error(`Invalid format: ${setsString}`);

  const [, teamAName, teamAPointsStr, teamBPointsStr, teamBName] = match;

  // Validate team names are not empty or whitespace only
  if (!teamAName.trim() || !teamBName.trim()) {
    throw new Error('Team names cannot be empty');
  }

  const teamASets = parseInt(teamAPointsStr, 10);
  const teamBSets = parseInt(teamBPointsStr, 10);

  // Validate sets are not negative (specific error for sets)
  if (teamASets < 0 || teamBSets < 0) {
    throw new Error('Sets cannot be negative');
  }

  return {
    teamA: { name: teamAName.trim(), sets: teamASets },
    teamB: { name: teamBName.trim(), sets: teamBSets },
  };
}
