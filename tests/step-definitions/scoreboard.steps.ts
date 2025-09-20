import { Given, Then, When } from '@cucumber/cucumber';

import {
  addPoint,
  formatScore,
  parseScore,
  type ScoreState,
} from '../../src/domain/scoreboard.js';

// Estado real do placar durante os testes
let currentState: ScoreState;

Given('que o placar do set atual é {string}', async function (score: string) {
  currentState = parseScore(score);
  console.info(`Estado inicial: ${formatScore(currentState)}`);
});

When(
  'eu clico no botão de adicionar ponto para o {string}',
  async function (teamName: string) {
    console.info(`Adicionando ponto para: ${teamName}`);
    currentState = addPoint(currentState, teamName);
  },
);

Then('o placar do set atual deve ser {string}', async function (expectedScore: string) {
  const actualScore = formatScore(currentState);
  if (actualScore !== expectedScore) {
    throw new Error(`Esperado: ${expectedScore}, mas obteve: ${actualScore}`);
  }
  console.info(`✓ Placar correto: ${actualScore}`);
});
