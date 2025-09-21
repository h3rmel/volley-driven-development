/** Team setup state and configuration */
export interface TeamSetupState {
  teamAName: string;
  teamBName: string;
  errorMessage?: string;
  isValid: boolean;
}

/** Initial empty team setup state */
export function createInitialSetup(): TeamSetupState {
  return {
    teamAName: '',
    teamBName: '',
    isValid: false,
  };
}

/** Updates team A name and revalidates */
export function setTeamAName(state: TeamSetupState, name: string): TeamSetupState {
  const newState = { ...state, teamAName: name };
  return validateTeamSetup(newState);
}

/** Updates team B name and revalidates */
export function setTeamBName(state: TeamSetupState, name: string): TeamSetupState {
  const newState = { ...state, teamBName: name };
  return validateTeamSetup(newState);
}

/** Validates team setup and returns updated state with error messages */
export function validateTeamSetup(state: TeamSetupState): TeamSetupState {
  const { teamAName, teamBName } = state;

  // Trim whitespace for validation
  const trimmedA = teamAName.trim();
  const trimmedB = teamBName.trim();

  // Check for empty Team A name
  if (!trimmedA) {
    return {
      ...state,
      errorMessage: 'Nome do Time A não pode estar vazio',
      isValid: false,
    };
  }

  // Check for empty Team B name
  if (!trimmedB) {
    return {
      ...state,
      errorMessage: 'Nome do Time B não pode estar vazio',
      isValid: false,
    };
  }

  // Check for duplicate names
  if (trimmedA === trimmedB) {
    return {
      ...state,
      errorMessage: 'Times devem ter nomes diferentes',
      isValid: false,
    };
  }

  // All validations passed
  return {
    ...state,
    errorMessage: undefined,
    isValid: true,
  };
}

/** Creates a team setup with both names and validates */
export function createTeamSetup(teamAName: string, teamBName: string): TeamSetupState {
  const state: TeamSetupState = {
    teamAName,
    teamBName,
    isValid: false,
  };

  return validateTeamSetup(state);
}

/** Gets trimmed team names if setup is valid */
export function getValidatedTeamNames(state: TeamSetupState): {
  teamA: string;
  teamB: string;
} | null {
  if (!state.isValid) {
    return null;
  }

  return {
    teamA: state.teamAName.trim(),
    teamB: state.teamBName.trim(),
  };
}
