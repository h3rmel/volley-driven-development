import { useState } from 'react';

import { Scoreboard } from '@/components/scoreboard';
import { TeamSetup } from '@/components/team-setup';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

type AppState =
  | { screen: 'setup' }
  | { screen: 'game'; teamAName: string; teamBName: string };

function App() {
  const [appState, setAppState] = useState<AppState>({ screen: 'setup' });

  const handleGameStart = (teamAName: string, teamBName: string) => {
    setAppState({ screen: 'game', teamAName, teamBName });
  };

  const handleNewGame = () => {
    setAppState({ screen: 'setup' });
  };

  if (appState.screen === 'setup') {
    return <TeamSetup onGameStart={handleGameStart} />;
  }

  return (
    <div
      className={cn(
        'w-full max-w-md min-h-dvh',
        'flex flex-col items-center justify-center gap-8',
        'py-8 px-4 mx-auto',
      )}
    >
      <Scoreboard teamAName={appState.teamAName} teamBName={appState.teamBName} />
      <div>
        <Button data-testid="new-game-button" onClick={handleNewGame}>
          🔄 Novo Jogo
        </Button>
      </div>
    </div>
  );
}

export default App;
