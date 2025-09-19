export enum LogLevel {
    TRACE = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4
}

export class Logger {
    private level: LogLevel;

    constructor(level: LogLevel = LogLevel.INFO) {
        this.level = level;
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

    trace(message: string) {
        if (this.level <= LogLevel.TRACE) console.log(`TRACE [${this.getCaller()}]: ${message}`);
    }

    debug(message: string) {
        if (this.level <= LogLevel.DEBUG) console.log(`DEBUG [${this.getCaller()}]: ${message}`);
    }

    info(message: string) {
        if (this.level <= LogLevel.INFO) console.log(`INFO [${this.getCaller()}]: ${message}`);
    }

    warn(message: string) {
        if (this.level <= LogLevel.WARN) console.warn(`WARN [${this.getCaller()}]: ${message}`);
    }

    error(message: string) {
        if (this.level <= LogLevel.ERROR) console.error(`ERROR [${this.getCaller()}]: ${message}`);
    }
}