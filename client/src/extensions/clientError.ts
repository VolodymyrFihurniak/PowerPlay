class ClientError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ClientError";
    }

    public static NotFound(message = "Not Found") {
        return new ClientError(message);
    }
}

export { ClientError };
