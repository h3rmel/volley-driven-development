import React from 'react';

import { Info } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { cn } from '@/lib/utils';

import { getValidatedTeamNames } from '@/domain/team-setup';
import { useTeamSetupStore } from '@/stores';

interface TeamSetupProps {
  onGameStart: (teamAName: string, teamBName: string) => void;
}

export function TeamSetup({ onGameStart }: TeamSetupProps) {
  const { teamAName, teamBName, errorMessage, isValid, setTeamAName, setTeamBName } =
    useTeamSetupStore((s) => s);

  function handleTeamAChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTeamAName(event.target.value);
  }

  function handleTeamBChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTeamBName(event.target.value);
  }

  function handleStartGame() {
    if (isValid) {
      const teamNames = getValidatedTeamNames({
        teamAName,
        teamBName,
        errorMessage,
        isValid,
      });
      if (teamNames) {
        onGameStart(teamNames.teamA, teamNames.teamB);
      }
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    handleStartGame();
  }

  return (
    <div
      className={cn(
        'w-full max-w-lg min-h-dvh',
        'flex flex-col items-center justify-center gap-8',
        'py-8 px-4 mx-auto',
      )}
      data-testid="team-setup"
    >
      <hgroup className={cn('flex flex-col', 'text-center')}>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-balance">
          🏐 Placar de Vôlei 🏐
        </h1>
        <h2 className="scroll-m-20 text-xl text-muted-foreground font-semibold tracking-tight">
          Configuração dos Times
        </h2>
      </hgroup>

      <form
        className={cn('flex flex-col gap-4', 'w-full', 'p-6 border rounded-md')}
        onSubmit={handleSubmit}
      >
        <div className={cn('flex flex-col gap-2')}>
          <Label htmlFor="team-a-input">Nome do Time A:</Label>
          <Input
            id="team-a-input"
            data-testid="team-a-input"
            type="text"
            value={teamAName}
            onChange={handleTeamAChange}
            placeholder="Ex: Flamengo"
          />
        </div>

        <div className={cn('flex flex-col gap-2')}>
          <Label htmlFor="team-b-input">Nome do Time B:</Label>
          <Input
            id="team-b-input"
            data-testid="team-b-input"
            type="text"
            value={teamBName}
            onChange={handleTeamBChange}
            placeholder="Ex: Santos"
          />
        </div>

        {errorMessage && (
          <Alert variant="destructive" data-testid="error-message">
            <AlertTitle>Erro:</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <Button data-testid="start-game-button" type="submit" disabled={!isValid}>
          🚀 Iniciar Jogo
        </Button>
      </form>

      <Alert variant="info">
        <Info />
        <AlertTitle>Regras:</AlertTitle>
        <AlertDescription>
          <ul className={cn('list-disc list-inside', 'text-blue-500')}>
            <li> Ambos os times devem ter nomes </li>
            <li> Os nomes devem ser diferentes </li>
            <li> Espaços em branco serão ignorados </li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
}
