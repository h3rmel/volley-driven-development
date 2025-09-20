import { Before, Given, Then, When } from '@cucumber/cucumber';

import {
  addPointWithSetLogic,
  checkSetWinner,
  formatScore,
  formatSets,
  parseScore,
  parseSets,
  type ScoreState,
} from '../../src/domain/scoreboard.js';

let currentState: ScoreState;

// #region Helper functions
function assertExpected(actual: string, expected: string, context: string) {
  if (actual !== expected) {
    throw new Error(`Esperado ${context}: ${expected}, mas obteve: ${actual}`);
  }
}

function isSameTeams(state1: ScoreState, state2: ScoreState): boolean {
  return (
    state1?.teamA.name === state2?.teamA.name && state1?.teamB.name === state2?.teamB.name
  );
}

// #endregion

// Hooks
Before(() => {
  currentState = undefined as never;
});

// #region Step definitions

Given('que o placar do set atual é {string}', function (score: string) {
  const parsedScore = parseScore(score);

  // Preserve sets only if same teams in same scenario
  currentState =
    currentState && isSameTeams(currentState, parsedScore)
      ? {
          teamA: { ...currentState.teamA, points: parsedScore.teamA.points },
          teamB: { ...currentState.teamB, points: parsedScore.teamB.points },
        }
      : parsedScore;

  console.info(`Estado inicial: ${formatScore(currentState)}`);
});

Given('que o placar de sets é {string}', function (setsScore: string) {
  const { teamA, teamB } = parseSets(setsScore);

  currentState = currentState
    ? {
        teamA: { ...currentState.teamA, name: teamA.name, sets: teamA.sets },
        teamB: { ...currentState.teamB, name: teamB.name, sets: teamB.sets },
      }
    : {
        teamA: { ...teamA, points: 0 },
        teamB: { ...teamB, points: 0 },
      };

  console.info(`Sets configurados: ${formatSets(currentState)}`);
});

When('eu clico no botão de adicionar ponto para o {string}', function (teamName: string) {
  console.info(`Adicionando ponto para: ${teamName}`);
  currentState = addPointWithSetLogic(currentState, teamName);
});

Then('o placar do set atual deve ser {string}', function (expectedScore: string) {
  const actualScore = formatScore(currentState);
  assertExpected(actualScore, expectedScore, 'placar');
  console.info(`✓ Placar correto: ${actualScore}`);
});

Then(
  'o placar de sets vencidos deve ser atualizado para {string}',
  function (expectedSets: string) {
    const actualSets = formatSets(currentState);
    assertExpected(actualSets, expectedSets, 'sets');
    console.info(`✓ Sets corretos: ${actualSets}`);
  },
);

Then(
  'o placar do próximo set deve ser resetado para {string}',
  function (expectedScore: string) {
    const actualScore = formatScore(currentState);
    assertExpected(actualScore, expectedScore, 'pontos resetados');
    console.info(`✓ Pontos resetados: ${actualScore}`);
  },
);

Then('o placar de sets deve continuar {string}', function (expectedSets: string) {
  const actualSets = formatSets(currentState);
  assertExpected(actualSets, expectedSets, 'sets continuarem');
  console.info(`✓ Sets continuam: ${actualSets}`);
});

Then('nenhum set deve ser vencido ainda', function () {
  const winner = checkSetWinner(currentState);
  if (winner !== null) {
    throw new Error(`Não deveria haver vencedor do set ainda, mas ${winner} venceu`);
  }
  console.info(`✓ Nenhum set vencido ainda - placar: ${formatScore(currentState)}`);
});

// #endregion
