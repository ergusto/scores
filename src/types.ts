export type SimpleUser = {
  id: string;
  username: string;
  history?: OpponentHistory
};

export type OpponentHistory = {
  id: string;
  handsPlayed: number,  
  handsWon: number,
  handsLost: number, 
  gamesPlayed: number,
  gamesWon: number,
  gamesLost: number,
  matchesPlayed: number,
  matchesWon: number,
  matchesLost: number
}
