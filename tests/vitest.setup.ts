/* eslint-disable no-empty */

import '@testing-library/jest-dom';

import { beforeEach } from 'vitest';

import { useAppStore, useScoreboardStore, useTeamSetupStore } from '@/stores';

beforeEach(() => {
  // Reset all Zustand stores to a clean state before each test
  try {
    useAppStore.getState().newGame();
  } catch {}

  try {
    useTeamSetupStore.getState().resetSetup();
  } catch {}

  try {
    useScoreboardStore.getState().resetScore();
  } catch {}
});
