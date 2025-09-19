// ObservableState.ts
type Listener<T> = (value: T) => void;

export class ObservableState<T> {
  private value: T;
  private listeners: Listener<T>[] = [];

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  get(): T {
    return this.value;
  }

  set(newValue: T) {
    this.value = newValue;
    this.listeners.forEach(listener => listener(this.value));
  }

  subscribe(listener: Listener<T>) {
    this.listeners.push(listener);
    listener(this.value); // initial call
    return () => this.unsubscribe(listener);
  }

  unsubscribe(listener: Listener<T>) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }
}
