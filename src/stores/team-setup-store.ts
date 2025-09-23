import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { TeamSetupState } from '@/types/store';

function validateTeamSetup(
  teamAName: string,
  teamBName: string,
): { isValid: boolean; errorMessage?: string } {
  const trimmedA = teamAName.trim();
  const trimmedB = teamBName.trim();

  if (!trimmedA) {
    return { isValid: false, errorMessage: 'Nome do Time A não pode estar vazio' };
  }

  if (!trimmedB) {
    return { isValid: false, errorMessage: 'Nome do Time B não pode estar vazio' };
  }

  if (trimmedA === trimmedB) {
    return { isValid: false, errorMessage: 'Times devem ter nomes diferentes' };
  }

  return { isValid: true, errorMessage: undefined };
}

export const useTeamSetupStore = create<TeamSetupState>()(
  devtools(
    (set, get) => ({
      // Initial state
      teamAName: '',
      teamBName: '',
      errorMessage: undefined,
      isValid: false,

      // Actions
      setTeamAName: (teamAName: string) => {
        const { teamBName } = get();
        const validation = validateTeamSetup(teamAName, teamBName);
        set({ teamAName, ...validation }, false, 'teamSetup/setTeamAName');
      },

      setTeamBName: (teamBName: string) => {
        const { teamAName } = get();
        const validation = validateTeamSetup(teamAName, teamBName);
        set({ teamBName, ...validation }, false, 'teamSetup/setTeamBName');
      },

      validateSetup: () => {
        const { teamAName, teamBName } = get();
        const validation = validateTeamSetup(teamAName, teamBName);
        set(validation, false, 'teamSetup/validateSetup');
      },

      resetSetup: () =>
        set(
          {
            teamAName: '',
            teamBName: '',
            errorMessage: undefined,
            isValid: false,
          },
          false,
          'teamSetup/resetSetup',
        ),
    }),
    { name: 'team-setup-store' },
  ),
);
