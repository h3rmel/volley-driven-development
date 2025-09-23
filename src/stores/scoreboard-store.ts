import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { addPointWithSetLogic } from '@/domain/scoreboard';
import type { ScoreboardState } from '@/types/store';

export const useScoreboardStore = create<ScoreboardState>()(
  devtools(
    (set, get) => ({
      // Initial state
      teamA: { name: 'Time A', points: 0, sets: 0 },
      teamB: { name: 'Time B', points: 0, sets: 0 },

      // Actions
      addPoint: (teamName: string) => {
        const current = { teamA: get().teamA, teamB: get().teamB };
        const next = addPointWithSetLogic(current, teamName);
        set({ teamA: next.teamA, teamB: next.teamB }, false, 'scoreboard/addPoint');
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
