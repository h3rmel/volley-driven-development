export interface AppState {
  screen: 'setup' | 'game';
  teamAName: string;
  teamBName: string;
  startGame: (teamAName: string, teamBName: string) => void;
  newGame: () => void;
}

export interface TeamSetupState {
  teamAName: string;
  teamBName: string;
  errorMessage?: string;
  isValid: boolean;
  setTeamAName: (teamAName: string) => void;
  setTeamBName: (teamBName: string) => void;
  validateSetup: () => void;
  resetSetup: () => void;
}

export interface ScoreboardState {
  teamA: { name: string; points: number; sets: number };
  teamB: { name: string; points: number; sets: number };
  addPoint: (teamName: string) => void;
  resetScore: () => void;
  setTeamNames: (teamA: string, teamB: string) => void;
}
