import { useState } from 'react';

import { cn } from '@/lib/utils';

import { addPointWithSetLogic, type ScoreState } from '@/domain/scoreboard';

import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

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
    <div data-testid="scoreboard" className={cn('flex flex-col gap-8', 'w-full')}>
      <hgroup className={cn('flex flex-col', 'text-center')}>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-balance">
          🏐 Placar de Vôlei 🏐
        </h1>
      </hgroup>

      {/* Botões para adicionar pontos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Sets</CardTitle>
          <div className={cn('flex flex-row gap-2')}>
            <div
              className={cn('flex flex-col items-center gap-2', 'w-full', 'text-center')}
            >
              <p className="text-lg">{scoreState.teamA.name}</p>
              <Badge
                variant="secondary"
                className="h-6 min-w-6 rounded-full px-1 font-mono text-lg tabular-nums"
              >
                {scoreState.teamA.sets}
              </Badge>
            </div>
            <div
              className={cn('flex flex-col items-center gap-2', 'w-full', 'text-center')}
            >
              <p className="text-lg">{scoreState.teamB.name}</p>
              <Badge
                variant="secondary"
                className="h-6 min-w-6 rounded-full px-1 font-mono text-lg tabular-nums"
              >
                {scoreState.teamB.sets}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <CardTitle className="text-center">Pontos</CardTitle>
          <div className={cn('flex flex-row gap-2')}>
            <div
              className={cn('flex flex-col items-center gap-2', 'w-full', 'text-center')}
            >
              <p className="text-lg">{scoreState.teamA.name}</p>
              <Badge
                variant="secondary"
                className="h-6 min-w-6 rounded-full px-1 font-mono text-lg tabular-nums"
              >
                {scoreState.teamA.points}
              </Badge>
            </div>
            <div
              className={cn('flex flex-col items-center gap-2', 'w-full', 'text-center')}
            >
              <p className="text-lg">{scoreState.teamB.name}</p>
              <Badge
                variant="secondary"
                className="h-6 min-w-6 rounded-full px-1 font-mono text-lg tabular-nums"
              >
                {scoreState.teamB.points}
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="space-x-4">
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
        </CardFooter>
      </Card>
    </div>
  );
}
