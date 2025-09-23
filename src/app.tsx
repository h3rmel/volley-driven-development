import { Scoreboard } from '@/components/scoreboard';
import { TeamSetup } from '@/components/team-setup';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import { useAppStore, useScoreboardStore } from '@/stores';

function App() {
  const { screen, startGame, newGame } = useAppStore((s) => s);
  const { setTeamNames } = useScoreboardStore((s) => s);

  const handleGameStart = (teamAName: string, teamBName: string) => {
    startGame(teamAName, teamBName);
    setTeamNames(teamAName, teamBName);
  };

  const handleNewGame = () => {
    newGame();
  };

  if (screen === 'setup') {
    return <TeamSetup onGameStart={handleGameStart} />;
  }

  return (
    <div
      className={cn(
        'w-full max-w-lg min-h-dvh',
        'flex flex-col items-center justify-center gap-8',
        'py-8 px-4 mx-auto',
      )}
    >
      <Scoreboard />
      <div>
        <Button data-testid="new-game-button" onClick={handleNewGame}>
          🔄 Novo Jogo
        </Button>
      </div>
    </div>
  );
}

export default App;
