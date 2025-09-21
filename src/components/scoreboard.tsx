import { useState } from 'react';

import { cn } from '@/lib/utils';

import { addPointWithSetLogic, type ScoreState } from '@/domain/scoreboard';

import { Button } from './ui/button';

interface ScoreboardProps {
  teamAName?: string;
  teamBName?: string;
}

export function Scoreboard({
  teamAName = 'Time A',
  teamBName = 'Time B',
}: ScoreboardProps) {
  const [scoreState, setScoreState] = useState<ScoreState>({
    teamA: { name: teamAName, points: 0, sets: 0 },
    teamB: { name: teamBName, points: 0, sets: 0 },
  });

  function handleAddPoint(teamName: string) {
    setScoreState((currentState) => addPointWithSetLogic(currentState, teamName));
  }

  return (
    <div
      data-testid="scoreboard"
      className={cn('flex flex-col gap-8', 'w-full max-w-md')}
    >
      <hgroup className={cn('flex flex-col', 'text-center')}>
        <h1 className="scroll-m-20 border-b pb-4 text-4xl font-extrabold tracking-tight text-balance">
          🏐 Placar de Vôlei 🏐
        </h1>
        {/* Placar de sets */}
        <div className={cn('flex flex-col pt-2', 'text-left')}>
          <h2
            className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0"
            data-testid="sets-display"
          >
            Sets: {scoreState.teamA.name} {scoreState.teamA.sets} x{' '}
            {scoreState.teamB.sets} {scoreState.teamB.name}
          </h2>
          {/* Placar de pontos */}
          <h3
            className="scroll-m-20 text-xl font-semibold tracking-tight"
            data-testid="score-display"
          >
            Pontos: {scoreState.teamA.name} {scoreState.teamA.points} x{' '}
            {scoreState.teamB.points} {scoreState.teamB.name}
          </h3>
        </div>
      </hgroup>

      {/* Botões para adicionar pontos */}
      <div className={cn('flex justify-baseline items-center gap-4')}>
        <Button
          className="grow"
          data-testid="team-a-button"
          onClick={() => handleAddPoint(scoreState.teamA.name)}
        >
          +1 {scoreState.teamA.name}
        </Button>

        <Button
          className="grow"
          data-testid="team-b-button"
          onClick={() => handleAddPoint(scoreState.teamB.name)}
        >
          +1 {scoreState.teamB.name}
        </Button>
      </div>
    </div>
  );
}
