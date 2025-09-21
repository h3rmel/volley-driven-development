import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { TeamSetup } from '@/components/team-setup';

describe('TeamSetup Component', () => {
  describe('Initial Render', () => {
    it('should render team setup form with all elements', () => {
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      expect(screen.getByTestId('team-setup')).toBeInTheDocument();
      expect(screen.getByText('🏐 Placar de Vôlei 🏐')).toBeInTheDocument();
      expect(screen.getByText('Configuração dos Times')).toBeInTheDocument();
    });

    it('should render both input fields with correct labels', () => {
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      expect(screen.getByLabelText('Nome do Time A:')).toBeInTheDocument();
      expect(screen.getByLabelText('Nome do Time B:')).toBeInTheDocument();

      expect(screen.getByTestId('team-a-input')).toBeInTheDocument();
      expect(screen.getByTestId('team-b-input')).toBeInTheDocument();
    });

    it('should render start game button initially disabled', () => {
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      const startButton = screen.getByTestId('start-game-button');
      expect(startButton).toBeInTheDocument();
      expect(startButton).toHaveTextContent('🚀 Iniciar Jogo');
      expect(startButton).toBeDisabled();
    });

    it('should render rules section', () => {
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      expect(screen.getByText('Regras:')).toBeInTheDocument();
      expect(screen.getByText('Ambos os times devem ter nomes')).toBeInTheDocument();
      expect(screen.getByText('Os nomes devem ser diferentes')).toBeInTheDocument();
      expect(screen.getByText('Espaços em branco serão ignorados')).toBeInTheDocument();
    });

    it('should have empty input fields initially', () => {
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      expect(screen.getByTestId('team-a-input')).toHaveValue('');
      expect(screen.getByTestId('team-b-input')).toHaveValue('');
    });

    it('should not show error message initially', () => {
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });
  });

  describe('Form Input Handling', () => {
    it('should update Team A input when user types', async () => {
      const user = userEvent.setup();
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      const teamAInput = screen.getByTestId('team-a-input');
      await user.type(teamAInput, 'Flamengo');

      expect(teamAInput).toHaveValue('Flamengo');
    });

    it('should update Team B input when user types', async () => {
      const user = userEvent.setup();
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      const teamBInput = screen.getByTestId('team-b-input');
      await user.type(teamBInput, 'Santos');

      expect(teamBInput).toHaveValue('Santos');
    });

    it('should enable start button when both valid names are entered', async () => {
      const user = userEvent.setup();
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      const teamAInput = screen.getByTestId('team-a-input');
      const teamBInput = screen.getByTestId('team-b-input');
      const startButton = screen.getByTestId('start-game-button');

      await user.type(teamAInput, 'Flamengo');
      await user.type(teamBInput, 'Santos');

      expect(startButton).toBeEnabled();
    });

    it('should clear input and re-disable button when name is removed', async () => {
      const user = userEvent.setup();
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      const teamAInput = screen.getByTestId('team-a-input');
      const teamBInput = screen.getByTestId('team-b-input');
      const startButton = screen.getByTestId('start-game-button');

      // Fill both inputs
      await user.type(teamAInput, 'Flamengo');
      await user.type(teamBInput, 'Santos');
      expect(startButton).toBeEnabled();

      // Clear Team A input
      await user.clear(teamAInput);
      expect(startButton).toBeDisabled();
    });
  });

  describe('Validation and Error Messages', () => {
    it('should show error when Team A name is empty and Team B is filled', async () => {
      const user = userEvent.setup();
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      const teamBInput = screen.getByTestId('team-b-input');
      await user.type(teamBInput, 'Santos');

      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Erro:Nome do Time A não pode estar vazio',
      );
      expect(screen.getByTestId('start-game-button')).toBeDisabled();
    });

    it('should show error when Team B name is empty and Team A is filled', async () => {
      const user = userEvent.setup();
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      const teamAInput = screen.getByTestId('team-a-input');
      await user.type(teamAInput, 'Flamengo');

      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Erro:Nome do Time B não pode estar vazio',
      );
      expect(screen.getByTestId('start-game-button')).toBeDisabled();
    });

    it('should show error when both team names are identical', async () => {
      const user = userEvent.setup();
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      const teamAInput = screen.getByTestId('team-a-input');
      const teamBInput = screen.getByTestId('team-b-input');

      await user.type(teamAInput, 'Flamengo');
      await user.type(teamBInput, 'Flamengo');

      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Erro:Times devem ter nomes diferentes',
      );
      expect(screen.getByTestId('start-game-button')).toBeDisabled();
    });

    it('should handle whitespace-only names as empty', async () => {
      const user = userEvent.setup();
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      const teamAInput = screen.getByTestId('team-a-input');
      const teamBInput = screen.getByTestId('team-b-input');

      await user.type(teamAInput, '   ');
      await user.type(teamBInput, 'Santos');

      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Erro:Nome do Time A não pode estar vazio',
      );
      expect(screen.getByTestId('start-game-button')).toBeDisabled();
    });

    it('should remove error message when validation passes', async () => {
      const user = userEvent.setup();
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      const teamAInput = screen.getByTestId('team-a-input');
      const teamBInput = screen.getByTestId('team-b-input');

      // First create an error
      await user.type(teamBInput, 'Santos');
      expect(screen.getByTestId('error-message')).toBeInTheDocument();

      // Then fix it
      await user.type(teamAInput, 'Flamengo');
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    it('should call onGameStart with team names when form is submitted', async () => {
      const user = userEvent.setup();
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      const teamAInput = screen.getByTestId('team-a-input');
      const teamBInput = screen.getByTestId('team-b-input');
      const startButton = screen.getByTestId('start-game-button');

      await user.type(teamAInput, 'Flamengo');
      await user.type(teamBInput, 'Santos');
      await user.click(startButton);

      expect(mockOnGameStart).toHaveBeenCalledTimes(1);
      expect(mockOnGameStart).toHaveBeenCalledWith('Flamengo', 'Santos');
    });

    it('should call onGameStart when Enter is pressed in form', async () => {
      const user = userEvent.setup();
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      const teamAInput = screen.getByTestId('team-a-input');
      const teamBInput = screen.getByTestId('team-b-input');

      await user.type(teamAInput, 'Flamengo');
      await user.type(teamBInput, 'Santos');
      await user.keyboard('{Enter}');

      expect(mockOnGameStart).toHaveBeenCalledTimes(1);
      expect(mockOnGameStart).toHaveBeenCalledWith('Flamengo', 'Santos');
    });

    it('should trim whitespace from team names before calling onGameStart', async () => {
      const user = userEvent.setup();
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      const teamAInput = screen.getByTestId('team-a-input');
      const teamBInput = screen.getByTestId('team-b-input');
      const startButton = screen.getByTestId('start-game-button');

      await user.type(teamAInput, '  Flamengo  ');
      await user.type(teamBInput, '  Santos  ');
      await user.click(startButton);

      expect(mockOnGameStart).toHaveBeenCalledWith('Flamengo', 'Santos');
    });

    it('should not call onGameStart when form is invalid', async () => {
      const user = userEvent.setup();
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      const teamAInput = screen.getByTestId('team-a-input');
      const startButton = screen.getByTestId('start-game-button');

      await user.type(teamAInput, 'Flamengo');
      // Team B is empty, so form is invalid
      await user.click(startButton);

      expect(mockOnGameStart).not.toHaveBeenCalled();
    });

    it('should prevent default form submission behavior', async () => {
      const user = userEvent.setup();
      const mockOnGameStart = vi.fn();
      const { container } = render(<TeamSetup onGameStart={mockOnGameStart} />);

      const form = container.querySelector('form');
      expect(form).toBeInTheDocument();

      const teamAInput = screen.getByTestId('team-a-input');
      const teamBInput = screen.getByTestId('team-b-input');

      await user.type(teamAInput, 'Flamengo');
      await user.type(teamBInput, 'Santos');

      // Submit form via Enter key
      await user.keyboard('{Enter}');

      // Should not cause page reload (no jsdom navigation)
      expect(mockOnGameStart).toHaveBeenCalled();
    });
  });

  describe('Accessibility and User Experience', () => {
    it('should have proper form labels associated with inputs', () => {
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      const teamAInput = screen.getByTestId('team-a-input');
      const teamBInput = screen.getByTestId('team-b-input');

      expect(teamAInput).toHaveAttribute('id', 'team-a-input');
      expect(teamBInput).toHaveAttribute('id', 'team-b-input');

      expect(screen.getByLabelText('Nome do Time A:')).toBe(teamAInput);
      expect(screen.getByLabelText('Nome do Time B:')).toBe(teamBInput);
    });

    it('should have helpful placeholder text', () => {
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      expect(screen.getByTestId('team-a-input')).toHaveAttribute(
        'placeholder',
        'Ex: Flamengo',
      );
      expect(screen.getByTestId('team-b-input')).toHaveAttribute(
        'placeholder',
        'Ex: Santos',
      );
    });

    it('should show button as disabled with proper text', () => {
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      const button = screen.getByTestId('start-game-button');
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent('🚀 Iniciar Jogo');
      expect(button).toHaveAttribute('type', 'submit');
    });
  });

  describe('Edge Cases and Integration', () => {
    it('should handle rapid typing and validation updates', async () => {
      const user = userEvent.setup();
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      const teamAInput = screen.getByTestId('team-a-input');
      const teamBInput = screen.getByTestId('team-b-input');

      // Type same name in both fields to trigger duplicate error
      await user.type(teamAInput, 'Flamengo');
      await user.type(teamBInput, 'Flamengo');
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Times devem ter nomes diferentes',
      );

      // Fix by changing Team B name
      await user.clear(teamBInput);
      await user.type(teamBInput, 'Santos');
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });

    it('should handle special characters in team names', async () => {
      const user = userEvent.setup();
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      const teamAInput = screen.getByTestId('team-a-input');
      const teamBInput = screen.getByTestId('team-b-input');
      const startButton = screen.getByTestId('start-game-button');

      await user.type(teamAInput, 'Águias-FC');
      await user.type(teamBInput, 'Leões@2024');
      await user.click(startButton);

      expect(mockOnGameStart).toHaveBeenCalledWith('Águias-FC', 'Leões@2024');
    });

    it('should handle very long team names', async () => {
      const user = userEvent.setup();
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      const longName = 'A'.repeat(50);
      const teamAInput = screen.getByTestId('team-a-input');
      const teamBInput = screen.getByTestId('team-b-input');

      await user.type(teamAInput, longName);
      await user.type(teamBInput, 'Santos');

      expect(screen.getByTestId('start-game-button')).toBeEnabled();
    });

    it('should handle copy-paste operations', async () => {
      const user = userEvent.setup();
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      const teamAInput = screen.getByTestId('team-a-input');

      // Simulate pasting text
      await user.click(teamAInput);
      await user.paste('Flamengo');

      expect(teamAInput).toHaveValue('Flamengo');
    });

    it('should maintain focus management during validation', async () => {
      const user = userEvent.setup();
      const mockOnGameStart = vi.fn();
      render(<TeamSetup onGameStart={mockOnGameStart} />);

      const teamAInput = screen.getByTestId('team-a-input');
      const teamBInput = screen.getByTestId('team-b-input');

      await user.click(teamAInput);
      expect(teamAInput).toHaveFocus();

      await user.type(teamAInput, 'Test');
      expect(teamAInput).toHaveFocus(); // Should still have focus after validation

      await user.tab();
      expect(teamBInput).toHaveFocus();
    });
  });
});
