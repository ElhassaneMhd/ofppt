import { router } from '@inertiajs/react';

export class SearchParams {
  constructor({ endpoint, options, cleanupConditions }) {
    this.searchParams = new URLSearchParams(window.location.search);
    this.endpoint = endpoint;
    this.options = options || {};
    this.cleanupConditions = cleanupConditions;
  }

  get(key) {
    return this.searchParams.get(key);
  }

  set(key, value) {
    !value || String(this.cleanupConditions[key]) === String(value)
      ? this.searchParams.delete(key)
      : this.searchParams.set(key, value);

    this.update();
  }

  update() {
    const searchParamsString = this.searchParams.toString();
    this.endpoint = window.location.pathname + (searchParamsString ? `?${searchParamsString}` : '');

    router.visit(this.endpoint, {
      preserveState: true,
      replace: true,
      ...this.options,
    });
  }

  delete(key) {
    this.searchParams.delete(key);
    this.update();
  }
}
