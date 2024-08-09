class SessionDTO {
  constructor(
    readonly id: number,
    readonly userId: number,
    readonly computerId: number,
    readonly startTime: Date,
    readonly endTime: Date,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}
}

export { SessionDTO };
