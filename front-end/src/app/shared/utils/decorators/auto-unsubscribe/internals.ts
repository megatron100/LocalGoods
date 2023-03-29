import { InjectableType, ɵDirectiveType, ɵComponentType } from '@angular/core';

/**
 * Applied to definitions and informs that class is decorated
 */
export const DECORATOR_APPLIED: unique symbol = Symbol('__decoratorApplied');

export function markAsDecorated<T>(
  type: InjectableType<T> | ɵDirectiveType<T> | ɵComponentType<T>
): void {
  // Store this property on the prototype if it's an injectable class, component or directive.
  // We will be able to handle class extension this way.
  type.prototype[DECORATOR_APPLIED] = true;
}
