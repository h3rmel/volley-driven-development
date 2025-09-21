import { describe, expect, it } from 'vitest';

import {
  createInitialSetup,
  createTeamSetup,
  getValidatedTeamNames,
  setTeamAName,
  setTeamBName,
  validateTeamSetup,
  type TeamSetupState,
} from '../../src/domain/team-setup';

describe('Team Setup Domain Logic', () => {
  describe('createInitialSetup', () => {
    it('should create initial state with empty names and invalid status', () => {
      const result = createInitialSetup();

      expect(result).toEqual({
        teamAName: '',
        teamBName: '',
        isValid: false,
      });
    });

    it('should not have error message initially', () => {
      const result = createInitialSetup();

      expect(result.errorMessage).toBeUndefined();
    });
  });

  describe('setTeamAName', () => {
    it('should update team A name and preserve other fields', () => {
      const initialState = createInitialSetup();
      const result = setTeamAName(initialState, 'Flamengo');

      expect(result.teamAName).toBe('Flamengo');
      expect(result.teamBName).toBe('');
    });

    it('should revalidate after updating team A name', () => {
      const state: TeamSetupState = {
        teamAName: '',
        teamBName: 'Santos',
        isValid: false,
        errorMessage: 'Nome do Time A não pode estar vazio',
      };

      const result = setTeamAName(state, 'Flamengo');

      expect(result.isValid).toBe(true);
      expect(result.errorMessage).toBeUndefined();
    });

    it('should trigger validation error when team A name becomes empty', () => {
      const state: TeamSetupState = {
        teamAName: 'Flamengo',
        teamBName: 'Santos',
        isValid: true,
      };

      const result = setTeamAName(state, '');

      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Nome do Time A não pode estar vazio');
    });
  });

  describe('setTeamBName', () => {
    it('should update team B name and preserve other fields', () => {
      const initialState = createInitialSetup();
      const result = setTeamBName(initialState, 'Santos');

      expect(result.teamAName).toBe('');
      expect(result.teamBName).toBe('Santos');
    });

    it('should revalidate after updating team B name', () => {
      const state: TeamSetupState = {
        teamAName: 'Flamengo',
        teamBName: '',
        isValid: false,
        errorMessage: 'Nome do Time B não pode estar vazio',
      };

      const result = setTeamBName(state, 'Santos');

      expect(result.isValid).toBe(true);
      expect(result.errorMessage).toBeUndefined();
    });

    it('should trigger duplicate names validation error', () => {
      const state: TeamSetupState = {
        teamAName: 'Flamengo',
        teamBName: 'Santos',
        isValid: true,
      };

      const result = setTeamBName(state, 'Flamengo');

      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Times devem ter nomes diferentes');
    });
  });

  describe('validateTeamSetup', () => {
    it('should return valid state when both names are provided and different', () => {
      const state: TeamSetupState = {
        teamAName: 'Flamengo',
        teamBName: 'Santos',
        isValid: false,
      };

      const result = validateTeamSetup(state);

      expect(result.isValid).toBe(true);
      expect(result.errorMessage).toBeUndefined();
    });

    it('should return error when team A name is empty', () => {
      const state: TeamSetupState = {
        teamAName: '',
        teamBName: 'Santos',
        isValid: false,
      };

      const result = validateTeamSetup(state);

      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Nome do Time A não pode estar vazio');
    });

    it('should return error when team B name is empty', () => {
      const state: TeamSetupState = {
        teamAName: 'Flamengo',
        teamBName: '',
        isValid: false,
      };

      const result = validateTeamSetup(state);

      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Nome do Time B não pode estar vazio');
    });

    it('should return error when team names are identical', () => {
      const state: TeamSetupState = {
        teamAName: 'Flamengo',
        teamBName: 'Flamengo',
        isValid: false,
      };

      const result = validateTeamSetup(state);

      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Times devem ter nomes diferentes');
    });

    it('should handle whitespace-only names as empty', () => {
      const state: TeamSetupState = {
        teamAName: '   ',
        teamBName: 'Santos',
        isValid: false,
      };

      const result = validateTeamSetup(state);

      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Nome do Time A não pode estar vazio');
    });

    it('should trim names before comparing for duplicates', () => {
      const state: TeamSetupState = {
        teamAName: '  Flamengo  ',
        teamBName: 'Flamengo',
        isValid: false,
      };

      const result = validateTeamSetup(state);

      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Times devem ter nomes diferentes');
    });

    it('should not mutate original state', () => {
      const originalState: TeamSetupState = {
        teamAName: 'Flamengo',
        teamBName: 'Santos',
        isValid: false,
      };

      const result = validateTeamSetup(originalState);

      expect(result).not.toBe(originalState);
      expect(originalState.isValid).toBe(false); // original unchanged
      expect(result.isValid).toBe(true); // new state is valid
    });
  });

  describe('createTeamSetup', () => {
    it('should create and validate setup with both names', () => {
      const result = createTeamSetup('Flamengo', 'Santos');

      expect(result).toEqual({
        teamAName: 'Flamengo',
        teamBName: 'Santos',
        isValid: true,
        errorMessage: undefined,
      });
    });

    it('should create invalid setup when names are identical', () => {
      const result = createTeamSetup('Flamengo', 'Flamengo');

      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Times devem ter nomes diferentes');
    });

    it('should create invalid setup when team A name is empty', () => {
      const result = createTeamSetup('', 'Santos');

      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Nome do Time A não pode estar vazio');
    });

    it('should create invalid setup when team B name is empty', () => {
      const result = createTeamSetup('Flamengo', '');

      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Nome do Time B não pode estar vazio');
    });
  });

  describe('getValidatedTeamNames', () => {
    it('should return trimmed names when state is valid', () => {
      const validState: TeamSetupState = {
        teamAName: '  Flamengo  ',
        teamBName: '  Santos  ',
        isValid: true,
      };

      const result = getValidatedTeamNames(validState);

      expect(result).toEqual({
        teamA: 'Flamengo',
        teamB: 'Santos',
      });
    });

    it('should return null when state is invalid', () => {
      const invalidState: TeamSetupState = {
        teamAName: '',
        teamBName: 'Santos',
        isValid: false,
        errorMessage: 'Nome do Time A não pode estar vazio',
      };

      const result = getValidatedTeamNames(invalidState);

      expect(result).toBeNull();
    });

    it('should properly trim whitespace from names', () => {
      const validState: TeamSetupState = {
        teamAName: '\t Águias Douradas \n',
        teamBName: ' Leões do Mar\t ',
        isValid: true,
      };

      const result = getValidatedTeamNames(validState);

      expect(result).toEqual({
        teamA: 'Águias Douradas',
        teamB: 'Leões do Mar',
      });
    });
  });

  describe('Edge Cases and Integration', () => {
    it('should handle special characters in team names', () => {
      const result = createTeamSetup('Águias-FC', 'Leões@2024');

      expect(result.isValid).toBe(true);
      expect(result.teamAName).toBe('Águias-FC');
      expect(result.teamBName).toBe('Leões@2024');
    });

    it('should handle very long team names', () => {
      const longName = 'A'.repeat(100);
      const result = createTeamSetup(longName, 'Santos');

      expect(result.isValid).toBe(true);
      expect(result.teamAName).toBe(longName);
    });

    it('should handle names with only spaces but different lengths as both empty', () => {
      const result = createTeamSetup('   ', '     ');

      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Nome do Time A não pode estar vazio');
    });

    it('should prioritize Team A empty error over Team B empty error', () => {
      const state: TeamSetupState = {
        teamAName: '',
        teamBName: '',
        isValid: false,
      };

      const result = validateTeamSetup(state);

      expect(result.errorMessage).toBe('Nome do Time A não pode estar vazio');
    });

    it('should prioritize empty name errors over duplicate name errors', () => {
      const state: TeamSetupState = {
        teamAName: '',
        teamBName: '',
        isValid: false,
      };

      const result = validateTeamSetup(state);

      // Should get Team A empty error, not duplicate error
      expect(result.errorMessage).toBe('Nome do Time A não pode estar vazio');
    });
  });
});
