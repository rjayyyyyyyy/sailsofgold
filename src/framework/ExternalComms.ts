import { injectable, inject } from "inversify";
import {container} from "@gl/di/container";
import Dispatcher from "@gl/events/Dispatcher";

type CallbackFn = (...args: any[]) => void;

@injectable()
export class ExternalComms {
  private static instance: ExternalComms;
  private events: Map<string, CallbackFn[]>;
  private gameCalls: Record<string, CallbackFn>;
  private dispatcher: Dispatcher;

  constructor(
    @inject("DispatcherGame") public _dispatcher: Dispatcher = container.get<Dispatcher>("DispatcherGame"),
  ) {
    this.gameCalls = {};
    this.events = new Map();
    this.dispatcher = _dispatcher;
    ExternalComms.instance = this;
  }

  public static getInstance(): ExternalComms {
    if (!ExternalComms.instance) {
      ExternalComms.instance = new ExternalComms();
    }
    return ExternalComms.instance;
  }

  addCallback(name: string, callback: CallbackFn) {
    this.gameCalls[name] = callback;
  }

  getCallbacks() {
    return this.gameCalls;
  }

  // Launcher listens to events
  public addEventListener(event: string, callback: CallbackFn) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(callback);

    // Hook into global Dispatcher so game can emit → launcher gets notified
    this.dispatcher.addListener(event, callback);
  }

  public dispatchEvent(event: string, ...args: any[]) {
    this.dispatcher.emit(event, ...args);
  }

  // Clean up
  public removeEventListener(event: string, callback: CallbackFn) {
    const listeners = this.events.get(event) || [];
    const index = listeners.indexOf(callback);
    if (index > -1) listeners.splice(index, 1);
    this.events.set(event, listeners);
    this.dispatcher.removeListener(event, callback);
  }

  // return registered event names
  public getAvailableEvents(): string[] {
    return Array.from(this.events.keys());
  }
}
