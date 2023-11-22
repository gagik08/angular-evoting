export class ParticipationStatus {
  voterId: number;
  subscriptionId: number;
  hasParticipated: boolean;

  constructor(voterId: number, subscriptionId: number, hasParticipated: boolean) {
    this.voterId = voterId;
    this.subscriptionId = subscriptionId;
    this.hasParticipated = hasParticipated;
  }
}
