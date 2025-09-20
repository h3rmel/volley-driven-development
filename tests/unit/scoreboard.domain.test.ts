import { describe, expect, it } from 'vitest';

import {
  addPoint,
  formatScore,
  parseScore,
  type ScoreState,
} from '../../src/domain/scoreboard';

describe('Scoreboard Domain Logic', () => {
  describe('parseScore', () => {
    it('should parse a valid score string correctly', () => {
      const result = parseScore('Time A 10 x 9 Time B');

      expect(result).toEqual({
        teamA: { name: 'Time A', points: 10, sets: 0 },
        teamB: { name: 'Time B', points: 9, sets: 0 },
      });
    });

    it('should handle single-digit scores', () => {
      const result = parseScore('Alpha 5 x 3 Beta');

      expect(result.teamA.points).toBe(5);
      expect(result.teamB.points).toBe(3);
    });

    it('should throw error for invalid format', () => {
      expect(() => parseScore('invalid format')).toThrow('Invalid format');
    });

    it('should handle team names with spaces', () => {
      const result = parseScore('Team Alpha 15 x 12 Team Beta');

      expect(result.teamA.name).toBe('Team Alpha');
      expect(result.teamB.name).toBe('Team Beta');
    });
  });

  describe('formatScore', () => {
    it('should format score state correctly', () => {
      const state: ScoreState = {
        teamA: { name: 'Time A', points: 15, sets: 1 },
        teamB: { name: 'Time B', points: 12, sets: 0 },
      };

      const result = formatScore(state);
      expect(result).toBe('Time A 15 x 12 Time B');
    });

    it('should handle zero scores', () => {
      const state: ScoreState = {
        teamA: { name: 'Alpha', points: 0, sets: 0 },
        teamB: { name: 'Beta', points: 0, sets: 0 },
      };

      expect(formatScore(state)).toBe('Alpha 0 x 0 Beta');
    });
  });

  describe('addPoint', () => {
    const initialState: ScoreState = {
      teamA: { name: 'Time A', points: 10, sets: 0 },
      teamB: { name: 'Time B', points: 9, sets: 0 },
    };

    it('should add point to team A', () => {
      const result = addPoint(initialState, 'Time A');

      expect(result.teamA.points).toBe(11);
      expect(result.teamB.points).toBe(9); // unchanged
    });

    it('should add point to team B', () => {
      const result = addPoint(initialState, 'Time B');

      expect(result.teamA.points).toBe(10); // unchanged
      expect(result.teamB.points).toBe(10);
    });

    it('should not mutate original state', () => {
      const result = addPoint(initialState, 'Time A');

      expect(initialState.teamA.points).toBe(10); // original unchanged
      expect(result).not.toBe(initialState); // different object
    });

    it('should return unchanged state for unknown team', () => {
      const result = addPoint(initialState, 'Unknown Team');

      expect(result).toEqual(initialState);
    });

    it('should handle case-sensitive team names', () => {
      const result = addPoint(initialState, 'time a'); // lowercase

      expect(result).toEqual(initialState); // no change
    });
  });
});
