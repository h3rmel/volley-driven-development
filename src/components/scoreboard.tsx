import { useState } from 'react';

import {
  addPointWithSetLogic,
  formatScore,
  formatSets,
  type ScoreState,
} from '@/domain/scoreboard';

export function Scoreboard() {
  const [scoreState, setScoreState] = useState<ScoreState>({
    teamA: { name: 'Time A', points: 0, sets: 0 },
    teamB: { name: 'Time B', points: 0, sets: 0 },
  });

  function handleAddPoint(teamName: string) {
    setScoreState((currentState) => addPointWithSetLogic(currentState, teamName));
  }

  return (
    <div data-testid="scoreboard">
      <h1>Placar de Vôlei</h1>

      {/* Placar de sets */}
      <div>
        <h2 data-testid="sets-display">Sets: {formatSets(scoreState)}</h2>
      </div>

      {/* Placar atual */}
      <div>
        <h2 data-testid="score-display">{formatScore(scoreState)}</h2>
      </div>

      {/* Botões para adicionar pontos */}
      <div>
        <button
          data-testid="team-a-button"
          onClick={() => handleAddPoint(scoreState.teamA.name)}
        >
          +1 {scoreState.teamA.name}
        </button>

        <button
          data-testid="team-b-button"
          onClick={() => handleAddPoint(scoreState.teamB.name)}
        >
          +1 {scoreState.teamB.name}
        </button>
      </div>

      {/* Info detalhada */}
      <div data-testid="detailed-info">
        <p data-testid="team-a-points">
          {scoreState.teamA.name}: {scoreState.teamA.points} pontos,{' '}
          {scoreState.teamA.sets} sets
        </p>
        <p data-testid="team-b-points">
          {scoreState.teamB.name}: {scoreState.teamB.points} pontos,{' '}
          {scoreState.teamB.sets} sets
        </p>
      </div>
    </div>
  );
}
