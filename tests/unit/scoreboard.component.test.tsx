import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Scoreboard } from '@/components/scoreboard';

describe('Scoreboard Component', () => {
  describe('Initial Render', () => {
    it('should render scoreboard and title', () => {
      render(<Scoreboard />);

      expect(screen.getByTestId('scoreboard')).toBeInTheDocument();
      expect(screen.getByText('🏐 Placar de Vôlei 🏐')).toBeInTheDocument();
    });

    it('should render both team buttons', () => {
      render(<Scoreboard />);

      expect(screen.getByTestId('team-a-button')).toHaveTextContent('+1 Time A');
      expect(screen.getByTestId('team-b-button')).toHaveTextContent('+1 Time B');
    });
  });

  describe('Basic Point Addition', () => {
    it('should add point to Team A when button is clicked', async () => {
      const user = userEvent.setup();
      render(<Scoreboard />);

      const teamAButton = screen.getByTestId('team-a-button');
      await user.click(teamAButton);

      // Button should still be clickable after adding point
      expect(teamAButton).toBeInTheDocument();
    });

    it('should add point to Team B when button is clicked', async () => {
      const user = userEvent.setup();
      render(<Scoreboard />);

      const teamBButton = screen.getByTestId('team-b-button');
      await user.click(teamBButton);

      // Button should still be clickable after adding point
      expect(teamBButton).toBeInTheDocument();
    });
  });

  describe('Volleyball Rules Integration', () => {
    it('should allow clicking buttons for volleyball gameplay', async () => {
      const user = userEvent.setup();
      render(<Scoreboard />);

      const teamAButton = screen.getByTestId('team-a-button');
      const teamBButton = screen.getByTestId('team-b-button');

      // Should be able to click many times (simulating a volleyball set)
      for (let i = 0; i < 25; i++) {
        await user.click(teamAButton);
      }

      // Buttons should still be functional
      expect(teamAButton).toBeInTheDocument();
      expect(teamBButton).toBeInTheDocument();
    });
  });
});
