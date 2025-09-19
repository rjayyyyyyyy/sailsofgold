export enum CommandEvent {
    GAME_IN = "game-in",
    GAME_OUT = "game-out",
}

export enum SystemEvent {
    TICK = "tick",
}

export enum NetworkEvent {
    CLIENT_PACKET = "client-packet",
    GAME_HISTORY = "game-history",
    REQUEST_DATA = "request-data",
    REQUEST_ERROR = "request-error",

    SESSION_CREATED = "session-created",
    CHANGE_SESSION_ID = "change-session-id",
    SIMULATE_REQUEST_DATA = "SIMULATE_REQUEST_DATA",
}