class PaymentDTO {
  constructor(
    readonly id: number,
    readonly userId: number,
    readonly amount: number,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}
}

export { PaymentDTO };
