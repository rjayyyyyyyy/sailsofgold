import { EVENTS } from './events';
import { ACTION_EVENTS } from './actionEvents';
import { AUDIO_EVENTS } from './audioEvents';
import { CommandEvent, SystemEvent, NetworkEvent } from './eventEnums';
import { Logger } from '@gl/Logger';

export { EVENTS, ACTION_EVENTS, AUDIO_EVENTS, CommandEvent, SystemEvent, NetworkEvent };

export class Dispatcher<EventType = string> {
    private static instance: Dispatcher;
    private logger = new Logger();
    _listeners: Map<EventType, ((...args: any[]) => void)[]>;

    constructor() {
        this._listeners = new Map();
    }

    public static getInstance(): Dispatcher {
        if (!Dispatcher.instance) {
            Dispatcher.instance = new Dispatcher();
        }
        return Dispatcher.instance;
    }

    addListener(event: EventType, callback: (...args: any[]) => void) {
        const callbacks = this._listeners.get(event) || [];
        callbacks.push(callback);
        this._listeners.set(event, callbacks);
    }

    emit(event: EventType, ...args: any[]) {
        if(event !== SystemEvent.TICK) {
            this.logger.trace(`Dispatcher emit: ${event}`);
            this.logger.trace(args);
        }

        const callbacks = this._listeners.get(event) || [];
        callbacks.forEach((callback, /*index*/) => {
            try {
                callback(...args);
            } catch (error) {
                console.error(`Error in callback ${event}`, error);
                this.removeListener(event, callback);
            }
        });
    }

    removeListener(event: EventType, callback: (...args: any[]) => void) {
        const callbacks = this._listeners.get(event) || [];
        callbacks.splice(callbacks.indexOf(callback), 1);
        this._listeners.set(event, callbacks);
    }
}

export default Dispatcher.getInstance();