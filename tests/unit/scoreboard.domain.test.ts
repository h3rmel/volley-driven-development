import { describe, expect, it } from 'vitest';

import {
  addPoint,
  finishSet,
  parseScore,
  parseSets,
  type ScoreState,
} from '@/domain/scoreboard';

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

    it('should throw error for unknown team', () => {
      expect(() => addPoint(initialState, 'Unknown Team')).toThrow(
        'Team "Unknown Team" not found',
      );
    });

    it('should throw error for case-sensitive team names', () => {
      expect(() => addPoint(initialState, 'time a')).toThrow('Team "time a" not found'); // lowercase
    });
  });

  describe('Validation Tests', () => {
    const testState: ScoreState = {
      teamA: { name: 'Time A', points: 10, sets: 1 },
      teamB: { name: 'Time B', points: 9, sets: 2 },
    };

    describe('addPoint validation', () => {
      it('should throw error for empty team name', () => {
        expect(() => addPoint(testState, '')).toThrow('Team name cannot be empty');
      });

      it('should throw error for whitespace-only team name', () => {
        expect(() => addPoint(testState, '   ')).toThrow('Team name cannot be empty');
      });

      it('should throw error for non-existent team', () => {
        expect(() => addPoint(testState, 'Team C')).toThrow('Team "Team C" not found');
      });
    });

    describe('parseScore validation', () => {
      it('should throw error for negative points', () => {
        expect(() => parseScore('Team A -1 x 5 Team B')).toThrow(
          'Points cannot be negative',
        );
      });

      it('should throw error for empty team names', () => {
        expect(() => parseScore('   10 x 5 Team B')).toThrow(
          'Team names cannot be empty',
        );
        expect(() => parseScore('Team A 10 x 5   ')).toThrow(
          'Team names cannot be empty',
        );
      });
    });

    describe('parseSets validation', () => {
      it('should throw error for negative sets', () => {
        expect(() => parseSets('Team A -1 x 2 Team B')).toThrow(
          'Sets cannot be negative',
        );
      });
    });

    describe('finishSet validation', () => {
      it('should throw error for empty winner name', () => {
        expect(() => finishSet(testState, '')).toThrow('Winner name cannot be empty');
      });

      it('should throw error for non-existent winner', () => {
        expect(() => finishSet(testState, 'Team C')).toThrow('Winner "Team C" not found');
      });
    });
  });
});
