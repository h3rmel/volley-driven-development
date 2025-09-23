import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { ScoreboardState } from '@/types/store';

type Team = ScoreboardState['teamA'];

function checkSetWinner(teamA: Team, teamB: Team): string | null {
  const diff = teamA.points - teamB.points;
  if (teamA.points >= 25 && diff >= 2) return teamA.name;
  if (teamB.points >= 25 && diff <= -2) return teamB.name;
  return null;
}

function finishSet(
  teamA: Team,
  teamB: Team,
  winnerName: string,
): { teamA: Team; teamB: Team } {
  const trimmedName = winnerName.trim();
  if (trimmedName === teamA.name) {
    return {
      teamA: { ...teamA, points: 0, sets: teamA.sets + 1 },
      teamB: { ...teamB, points: 0 },
    };
  }
  if (trimmedName === teamB.name) {
    return {
      teamA: { ...teamA, points: 0 },
      teamB: { ...teamB, points: 0, sets: teamB.sets + 1 },
    };
  }
  throw new Error(`Winner "${trimmedName}" not found`);
}

export const useScoreboardStore = create<ScoreboardState>()(
  devtools(
    (set, get) => ({
      // Initial state
      teamA: { name: 'Time A', points: 0, sets: 0 },
      teamB: { name: 'Time B', points: 0, sets: 0 },

      // Actions
      addPoint: (teamName: string) => {
        const { teamA, teamB } = get();
        const trimmedName = teamName.trim();
        if (!trimmedName) {
          throw new Error('Team name cannot be empty');
        }

        let newTeamA = teamA;
        let newTeamB = teamB;

        if (trimmedName === teamA.name) {
          newTeamA = { ...teamA, points: teamA.points + 1 };
        } else if (trimmedName === teamB.name) {
          newTeamB = { ...teamB, points: teamB.points + 1 };
        } else {
          throw new Error(`Team "${trimmedName}" not found`);
        }

        const winner = checkSetWinner(newTeamA, newTeamB);
        if (winner) {
          const { teamA: finalTeamA, teamB: finalTeamB } = finishSet(
            newTeamA,
            newTeamB,
            winner,
          );
          set(
            { teamA: finalTeamA, teamB: finalTeamB },
            false,
            'scoreboard/addPointAndFinishSet',
          );
        } else {
          set({ teamA: newTeamA, teamB: newTeamB }, false, 'scoreboard/addPoint');
        }
      },

      resetScore: () =>
        set(
          {
            teamA: { name: 'Time A', points: 0, sets: 0 },
            teamB: { name: 'Time B', points: 0, sets: 0 },
          },
          false,
          'scoreboard/resetScore',
        ),

      setTeamNames: (teamA: string, teamB: string) =>
        set(
          {
            teamA: { name: teamA, points: 0, sets: 0 },
            teamB: { name: teamB, points: 0, sets: 0 },
          },
          false,
          'scoreboard/setTeamNames',
        ),
    }),
    { name: 'scoreboard-store' },
  ),
);
