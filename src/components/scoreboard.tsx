import { useState } from 'react';

import { addPoint, formatScore, type ScoreState } from '@/domain/scoreboard';

export function Scoreboard() {
  const [scoreState, setScoreState] = useState<ScoreState>({
    teamA: { name: 'Time A', points: 0, sets: 0 },
    teamB: { name: 'Time B', points: 0, sets: 0 },
  });

  function handleAddPoint(teamName: string) {
    setScoreState((currentState) => addPoint(currentState, teamName));
  }

  return (
    <div>
      <h1>Placar de Vôlei</h1>

      <div>
        <h2>{formatScore(scoreState)}</h2>
      </div>

      {/* Botões para adicionar pontos */}
      <div>
        <button onClick={() => handleAddPoint(scoreState.teamA.name)}>
          +1 {scoreState.teamA.name}
        </button>

        <button onClick={() => handleAddPoint(scoreState.teamB.name)}>
          +1 {scoreState.teamB.name}
        </button>
      </div>

      {/* Info detalhada (opcional) */}
      <div>
        <p>
          {scoreState.teamA.name}: {scoreState.teamA.points} pontos
        </p>
        <p>
          {scoreState.teamB.name}: {scoreState.teamB.points} pontos
        </p>
      </div>
    </div>
  );
}
