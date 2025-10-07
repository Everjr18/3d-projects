/**
 * Simple event emitter for decoupling components
 */
export class EventEmitter {
  private events: Map<string, Function[]> = new Map()

  on(event: string, callback: Function): void {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }
    this.events.get(event)!.push(callback)
  }

  off(event: string, callback: Function): void {
    if (!this.events.has(event)) return

    const callbacks = this.events.get(event)!
    const index = callbacks.indexOf(callback)
    if (index > -1) {
      callbacks.splice(index, 1)
    }
  }

  emit(event: string, ...args: any[]): void {
    if (!this.events.has(event)) return

    const callbacks = this.events.get(event)!
    callbacks.forEach(callback => callback(...args))
  }

  removeAllListeners(): void {
    this.events.clear()
  }
}
