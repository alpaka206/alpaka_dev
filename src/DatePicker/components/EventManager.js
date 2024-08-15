export class EventManager {
  constructor() {
    this.events = [];
  }

  addEvent(target, type, listener, options = {}) {
    target.addEventListener(type, listener, options);
    this.events.push({ target, type, listener, options });
  }

  removeEvent(target, type, listener, options = {}) {
    target.removeEventListener(type, listener, options);
    this.events = this.events.filter(
      (event) =>
        event.target !== target ||
        event.type !== type ||
        event.listener !== listener ||
        event.options !== options
    );
  }

  removeAllEvents() {
    this.events.forEach(({ target, type, listener, options }) => {
      target.removeEventListener(type, listener, options);
    });
    this.events = [];
  }
}
