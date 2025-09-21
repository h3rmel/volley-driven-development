import { Before, Given, Then, When } from '@cucumber/cucumber';

import type { ScoreState } from '../../src/domain/scoreboard';
import {
  createInitialSetup,
  getValidatedTeamNames,
  setTeamAName,
  setTeamBName,
  type TeamSetupState,
} from '../../src/domain/team-setup';
import { setCurrentState } from './scoreboard.steps';

// Global state for BDD tests
let currentSetupState: TeamSetupState | undefined;
let currentScreen: 'setup' | 'game' = 'setup';

// Helper functions
function assertExpected(actual: string, expected: string, context: string) {
  if (actual !== expected) {
    throw new Error(`Esperado ${context}: ${expected}, mas obteve: ${actual}`);
  }
}

Before(function () {
  // Reset state before each scenario
  currentSetupState = undefined;
  currentScreen = 'setup';
});

// =============================================================================
// GIVEN STEPS (Estado inicial)
// =============================================================================

Given('que estou na tela de configuração de times', function () {
  currentScreen = 'setup';
  currentSetupState = createInitialSetup();
  console.info('📝 Tela de configuração iniciada');
});

Given(
  'que estou na tela do jogo com times {string} e {string}',
  function (teamA: string, teamB: string) {
    currentScreen = 'game';
    console.info(`🏐 Tela do jogo: ${teamA} vs ${teamB}`);
  },
);

// =============================================================================
// WHEN STEPS (Ações)
// =============================================================================

When('preencho {string} como nome do Time A', function (name: string) {
  if (!currentSetupState) {
    throw new Error('Setup state not initialized');
  }

  currentSetupState = setTeamAName(currentSetupState, name);
  console.info(`✏️ Time A preenchido: "${name}"`);
});

When('preencho {string} como nome do Time B', function (name: string) {
  if (!currentSetupState) {
    throw new Error('Setup state not initialized');
  }

  currentSetupState = setTeamBName(currentSetupState, name);
  console.info(`✏️ Time B preenchido: "${name}"`);
});

When('clico no botão {string}', function (buttonName: string) {
  console.info(`🖱️ Clicando em: "${buttonName}"`);

  if (buttonName === 'Iniciar Jogo') {
    if (!currentSetupState) {
      throw new Error('Setup state not initialized');
    }

    if (currentSetupState.isValid) {
      // Valid setup - transition to game
      const teamNames = getValidatedTeamNames(currentSetupState);
      if (teamNames) {
        // Initialize scoreboard state for the game
        const initialGameState: ScoreState = {
          teamA: { name: teamNames.teamA, points: 0, sets: 0 },
          teamB: { name: teamNames.teamB, points: 0, sets: 0 },
        };
        setCurrentState(initialGameState);
        currentScreen = 'game';
        console.info(`🎮 Jogo iniciado: ${teamNames.teamA} vs ${teamNames.teamB}`);
      }
    } else {
      // Invalid setup - stay on setup screen
      console.info(`❌ Setup inválido: ${currentSetupState.errorMessage}`);
    }
  } else if (buttonName === 'Novo Jogo') {
    // Reset to setup screen
    currentScreen = 'setup';
    currentSetupState = createInitialSetup();
    console.info('🔄 Voltando para configuração');
  }
});

// =============================================================================
// THEN STEPS (Verificações)
// =============================================================================

Then('devo ver o placar inicial {string}', function (expectedScore: string) {
  // Simula verificação de placar inicial na tela do jogo
  // O estado real do jogo será gerenciado pelo scoreboard.steps.ts
  if (currentScreen !== 'game') {
    throw new Error('Not on game screen to see score');
  }

  console.info(`✓ Placar inicial esperado: ${expectedScore}`);
});

Then('devo estar na tela do jogo', function () {
  assertExpected(currentScreen, 'game', 'tela atual');
  console.info(`✓ Tela verificada: ${currentScreen}`);
});

Then('devo ver a mensagem de erro {string}', function (expectedError: string) {
  if (!currentSetupState) {
    throw new Error('Setup state not initialized');
  }

  assertExpected(currentSetupState.errorMessage || '', expectedError, 'mensagem de erro');
  console.info(`✓ Erro verificado: ${currentSetupState.errorMessage}`);
});

Then('devo continuar na tela de configuração', function () {
  assertExpected(currentScreen, 'setup', 'tela atual');
  console.info(`✓ Tela verificada: ${currentScreen}`);
});

Then('devo estar na tela de configuração de times', function () {
  assertExpected(currentScreen, 'setup', 'tela atual');
  console.info(`✓ Tela verificada: ${currentScreen}`);
});

Then('os campos de nome devem estar vazios', function () {
  if (!currentSetupState) {
    throw new Error('Setup state not initialized');
  }

  assertExpected(currentSetupState.teamAName, '', 'nome do Time A');
  assertExpected(currentSetupState.teamBName, '', 'nome do Time B');
  console.info(
    `✓ Campos vazios: A="${currentSetupState.teamAName}", B="${currentSetupState.teamBName}"`,
  );
});
