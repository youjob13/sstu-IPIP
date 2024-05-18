export class Storage {
  #storage = localStorage;

  set(key, value) {
    this.#storage.setItem(key, JSON.stringify(value));
  }

  has(key) {
    return !!this.#storage.getItem(key);
  }

  get(key) {
    const value = this.#storage.getItem(key);
    return value && JSON.parse(value);
  }

  remove(key) {
    this.#storage.removeItem(key);
  }

  clear() {
    this.#storage.clear();
  }
}
