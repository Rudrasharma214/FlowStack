import { EventEmitter } from 'events';

/**
 * Universal EventEmitter instance.
 * All modules talk to this.
 */
const eventBus = new EventEmitter();
eventBus.setMaxListeners(50);

export default eventBus;
