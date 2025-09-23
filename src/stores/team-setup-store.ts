import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import {
  createInitialSetup,
  setTeamAName as setTeamANameDomain,
  setTeamBName as setTeamBNameDomain,
  validateTeamSetup as validateTeamSetupDomain,
} from '@/domain/team-setup';
import type { TeamSetupState } from '@/types/store';

export const useTeamSetupStore = create<TeamSetupState>()(
  devtools(
    (set, get) => ({
      // Initial state from domain
      ...createInitialSetup(),

      // Actions delegating to domain
      setTeamAName: (name: string) => {
        const current: TeamSetupState = { ...get() };
        const next = setTeamANameDomain(current, name);
        set(next, false, 'teamSetup/setTeamAName');
      },

      setTeamBName: (name: string) => {
        const current: TeamSetupState = { ...get() };
        const next = setTeamBNameDomain(current, name);
        set(next, false, 'teamSetup/setTeamBName');
      },

      validateSetup: () => {
        const current: TeamSetupState = { ...get() };
        const next = validateTeamSetupDomain(current);
        set(next, false, 'teamSetup/validateSetup');
      },

      resetSetup: () => set(createInitialSetup(), false, 'teamSetup/resetSetup'),
    }),
    { name: 'team-setup-store' },
  ),
);
