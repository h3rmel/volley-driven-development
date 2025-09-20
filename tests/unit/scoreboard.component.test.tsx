import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Scoreboard } from '../../src/components/scoreboard';

describe('Scoreboard Component', () => {
  describe('Initial Render', () => {
    it('should render with initial state (0-0, no sets)', () => {
      render(<Scoreboard />);

      expect(screen.getByTestId('scoreboard')).toBeInTheDocument();
      expect(screen.getByText('Placar de Vôlei')).toBeInTheDocument();
      expect(screen.getByTestId('score-display')).toHaveTextContent(
        'Time A 0 x 0 Time B',
      );
      expect(screen.getByTestId('sets-display')).toHaveTextContent(
        'Sets: Time A 0 x 0 Time B',
      );
    });

    it('should render both team buttons', () => {
      render(<Scoreboard />);

      expect(screen.getByTestId('team-a-button')).toHaveTextContent('+1 Time A');
      expect(screen.getByTestId('team-b-button')).toHaveTextContent('+1 Time B');
    });

    it('should render detailed info', () => {
      render(<Scoreboard />);

      expect(screen.getByTestId('team-a-points')).toHaveTextContent(
        'Time A: 0 pontos, 0 sets',
      );
      expect(screen.getByTestId('team-b-points')).toHaveTextContent(
        'Time B: 0 pontos, 0 sets',
      );
    });
  });

  describe('Basic Point Addition', () => {
    it('should add point to Team A when button is clicked', async () => {
      const user = userEvent.setup();
      render(<Scoreboard />);

      const teamAButton = screen.getByTestId('team-a-button');
      await user.click(teamAButton);

      expect(screen.getByTestId('score-display')).toHaveTextContent(
        'Time A 1 x 0 Time B',
      );
      expect(screen.getByTestId('team-a-points')).toHaveTextContent(
        'Time A: 1 pontos, 0 sets',
      );
    });

    it('should add point to Team B when button is clicked', async () => {
      const user = userEvent.setup();
      render(<Scoreboard />);

      const teamBButton = screen.getByTestId('team-b-button');
      await user.click(teamBButton);

      expect(screen.getByTestId('score-display')).toHaveTextContent(
        'Time A 0 x 1 Time B',
      );
      expect(screen.getByTestId('team-b-points')).toHaveTextContent(
        'Time B: 1 pontos, 0 sets',
      );
    });

    it('should handle multiple clicks correctly', async () => {
      const user = userEvent.setup();
      render(<Scoreboard />);

      const teamAButton = screen.getByTestId('team-a-button');
      const teamBButton = screen.getByTestId('team-b-button');

      // 3 clicks Team A, 2 clicks Team B
      await user.click(teamAButton);
      await user.click(teamAButton);
      await user.click(teamBButton);
      await user.click(teamAButton);
      await user.click(teamBButton);

      expect(screen.getByTestId('score-display')).toHaveTextContent(
        'Time A 3 x 2 Time B',
      );
    });
  });

  describe('Volleyball Rules Integration', () => {
    it('should complete a set when team reaches 25 points with advantage', async () => {
      const user = userEvent.setup();
      render(<Scoreboard />);

      const teamAButton = screen.getByTestId('team-a-button');
      const teamBButton = screen.getByTestId('team-b-button');

      // Set up score: Team A 24, Team B 20
      for (let i = 0; i < 24; i++) {
        await user.click(teamAButton);
      }
      for (let i = 0; i < 20; i++) {
        await user.click(teamBButton);
      }

      // Team A wins with 25th point (advantage > 2)
      await user.click(teamAButton);

      // Should complete set and reset points
      expect(screen.getByTestId('score-display')).toHaveTextContent(
        'Time A 0 x 0 Time B',
      );
      expect(screen.getByTestId('sets-display')).toHaveTextContent(
        'Sets: Time A 1 x 0 Time B',
      );
      expect(screen.getByTestId('team-a-points')).toHaveTextContent(
        'Time A: 0 pontos, 1 sets',
      );
    });

    it('should NOT complete set at 25-24 (needs 2-point advantage)', async () => {
      const user = userEvent.setup();
      render(<Scoreboard />);

      const teamAButton = screen.getByTestId('team-a-button');
      const teamBButton = screen.getByTestId('team-b-button');

      // Set up score: Team A 24, Team B 24
      for (let i = 0; i < 24; i++) {
        await user.click(teamAButton);
      }
      for (let i = 0; i < 24; i++) {
        await user.click(teamBButton);
      }

      // Team A gets 25th point (25-24 = only 1 point advantage)
      await user.click(teamAButton);

      // Should NOT complete set yet
      expect(screen.getByTestId('score-display')).toHaveTextContent(
        'Time A 25 x 24 Time B',
      );
      expect(screen.getByTestId('sets-display')).toHaveTextContent(
        'Sets: Time A 0 x 0 Time B',
      );
    });

    it('should complete set when advantage reaches 2 points after 25-25 tie', async () => {
      const user = userEvent.setup();
      render(<Scoreboard />);

      const teamAButton = screen.getByTestId('team-a-button');
      const teamBButton = screen.getByTestId('team-b-button');

      // Build up to 24-24 first
      for (let i = 0; i < 24; i++) {
        await user.click(teamAButton);
      }
      for (let i = 0; i < 24; i++) {
        await user.click(teamBButton);
      }

      // Go to 25-25 (still no winner)
      await user.click(teamAButton); // 25-24
      await user.click(teamBButton); // 25-25

      // Team A gets to 26-25 (still only 1 point advantage)
      await user.click(teamAButton); // 26-25
      expect(screen.getByTestId('score-display')).toHaveTextContent(
        'Time A 26 x 25 Time B',
      );

      // Team A gets to 27-25 (2 points advantage - should win!)
      await user.click(teamAButton); // 27-25

      // Should complete set now
      expect(screen.getByTestId('score-display')).toHaveTextContent(
        'Time A 0 x 0 Time B',
      );
      expect(screen.getByTestId('sets-display')).toHaveTextContent(
        'Sets: Time A 1 x 0 Time B',
      );
    });

    it('should allow Team B to win sets too', async () => {
      const user = userEvent.setup();
      render(<Scoreboard />);

      const teamBButton = screen.getByTestId('team-b-button');

      // Team B wins with 25 points (assuming Team A has < 23 points)
      for (let i = 0; i < 25; i++) {
        await user.click(teamBButton);
      }

      expect(screen.getByTestId('score-display')).toHaveTextContent(
        'Time A 0 x 0 Time B',
      );
      expect(screen.getByTestId('sets-display')).toHaveTextContent(
        'Sets: Time A 0 x 1 Time B',
      );
      expect(screen.getByTestId('team-b-points')).toHaveTextContent(
        'Time B: 0 pontos, 1 sets',
      );
    });
  });

  describe('Multiple Sets Scenario', () => {
    it('should handle multiple sets correctly', async () => {
      const user = userEvent.setup();
      render(<Scoreboard />);

      const teamAButton = screen.getByTestId('team-a-button');
      const teamBButton = screen.getByTestId('team-b-button');

      // Team A wins first set (25-0)
      for (let i = 0; i < 25; i++) {
        await user.click(teamAButton);
      }

      expect(screen.getByTestId('sets-display')).toHaveTextContent(
        'Sets: Time A 1 x 0 Time B',
      );

      // Team B wins second set (25-0)
      for (let i = 0; i < 25; i++) {
        await user.click(teamBButton);
      }

      expect(screen.getByTestId('sets-display')).toHaveTextContent(
        'Sets: Time A 1 x 1 Time B',
      );
      expect(screen.getByTestId('score-display')).toHaveTextContent(
        'Time A 0 x 0 Time B',
      );
    });
  });
});
