import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { AppState } from '@/types/store';

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      // Initial state
      screen: 'setup',
      teamAName: '',
      teamBName: '',

      // Actions
      startGame: (teamAName: string, teamBName: string) =>
        set(
          {
            screen: 'game',
            teamAName,
            teamBName,
          },
          false,
          'app/startGame',
        ),

      newGame: () =>
        set(
          {
            screen: 'setup',
            teamAName: '',
            teamBName: '',
          },
          false,
          'app/newGame',
        ),
    }),
    {
      name: 'app-store',
    },
  ),
);
