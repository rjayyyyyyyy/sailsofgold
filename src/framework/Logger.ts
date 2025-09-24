export enum LogLevel {
    TRACE = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4
}

export class Logger {
    private level: LogLevel;

    constructor() {
        const level = import.meta.env.VITE_LOG_LEVEL?.toUpperCase() as keyof typeof LogLevel || 'INFO';
        this.level = LogLevel[level];
    }

    setLevel(level: LogLevel) {
        this.level = level;
    }

    private getCaller(): string {
        const error = new Error();
        const stack = error.stack || '';
        const lines = stack.split('\n');
        if (lines.length < 4) return '';
        const callerLine = lines[3];
        const match = callerLine.match(/at (.+?) \((.+?):(\d+):(\d+)\)/) || callerLine.match(/(.+?):(\d+):(\d+)/);
        if (match) {
            const func = match[1] || '';
            let file = match[2] || '';
            const line = match[3] || '';
            // Clean the file path: remove URL and query params
            if (file.includes('http')) {
                const parts = file.split('/src');
                if (parts.length > 1) {
                    file = '/src' + parts[1].split('?')[0];
                } else {
                    file = file.split('?')[0];
                }
            }
            return `${file}:${line}`;
        }
        return callerLine.trim();
    }

    private formatMessage(message: any): string {
        return typeof message === 'string' ? message : JSON.stringify(message);
    }

    trace(message: any) {
        if (this.level <= LogLevel.TRACE) console.log(`TRACE [${this.getCaller()}]: ${this.formatMessage(message)}`);
    }

    debug(message: any) {
        if (this.level <= LogLevel.DEBUG) console.log(`DEBUG [${this.getCaller()}]: ${this.formatMessage(message)}`);
    }

    info(message: any) {
        if (this.level <= LogLevel.INFO) console.log(`INFO [${this.getCaller()}]: ${this.formatMessage(message)}`);
    }

    warn(message: any) {
        if (this.level <= LogLevel.WARN) console.warn(`WARN [${this.getCaller()}]: ${this.formatMessage(message)}`);
    }

    error(message: any) {
        if (this.level <= LogLevel.ERROR) console.error(`ERROR [${this.getCaller()}]: ${this.formatMessage(message)}`);
    }
}