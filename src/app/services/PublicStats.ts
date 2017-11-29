export class BlockTimeDifficulty {
  date: Date;
  difficulty: number;
  block_time: number;
}

export class PublicStats {
  activeMiners: number;
  activeWorkers: number;
  averageBlockTime: number;
  blockTimeDifficulty: BlockTimeDifficulty[];
  hashRate: number;
  timeToNextEpoch: number;
}

