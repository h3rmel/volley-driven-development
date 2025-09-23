import { cn } from '@/lib/utils';

import { useScoreboardStore } from '@/stores';

import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

export function Scoreboard() {
  const { teamA, teamB, addPoint } = useScoreboardStore((s) => s);

  function handleAddPoint(teamName: string) {
    addPoint(teamName);
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
              <p className="text-lg">{teamA.name}</p>
              <Badge
                variant="secondary"
                className="h-6 min-w-6 rounded-full px-1 font-mono text-lg tabular-nums"
              >
                {teamA.sets}
              </Badge>
            </div>
            <div
              className={cn('flex flex-col items-center gap-2', 'w-full', 'text-center')}
            >
              <p className="text-lg">{teamB.name}</p>
              <Badge
                variant="secondary"
                className="h-6 min-w-6 rounded-full px-1 font-mono text-lg tabular-nums"
              >
                {teamB.sets}
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
              <p className="text-lg">{teamA.name}</p>
              <Badge
                variant="secondary"
                className="h-6 min-w-6 rounded-full px-1 font-mono text-lg tabular-nums"
              >
                {teamA.points}
              </Badge>
            </div>
            <div
              className={cn('flex flex-col items-center gap-2', 'w-full', 'text-center')}
            >
              <p className="text-lg">{teamB.name}</p>
              <Badge
                variant="secondary"
                className="h-6 min-w-6 rounded-full px-1 font-mono text-lg tabular-nums"
              >
                {teamB.points}
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="space-x-4">
          <Button
            className="grow"
            data-testid="team-a-button"
            onClick={() => handleAddPoint(teamA.name)}
          >
            +1 {teamA.name}
          </Button>

          <Button
            className="grow"
            data-testid="team-b-button"
            onClick={() => handleAddPoint(teamB.name)}
          >
            +1 {teamB.name}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
