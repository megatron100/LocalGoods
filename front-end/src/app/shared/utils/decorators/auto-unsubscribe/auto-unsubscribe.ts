// @ts-nocheck

import { markAsDecorated } from './internals';
import {
  InjectableType,
  ɵComponentType as ComponentType,
  ɵDirectiveType as DirectiveType,
} from '@angular/core';
import { Subscription } from 'rxjs';

const SUBSCRIPTIONS_KEY = 'subscription';

export function AutoUnsubscribe(
  subscriptionsKey = SUBSCRIPTIONS_KEY
): ClassDecorator {
  return (type: any): void => {
    decorateProviderDirectiveOrComponent(type, subscriptionsKey);
    markAsDecorated(type);
  };
}

function decorateProviderDirectiveOrComponent<T>(
  type: InjectableType<T> | DirectiveType<T> | ComponentType<T>,
  subscriptionsKey: string
): void {
  type.prototype.ngOnDestroy = decorateNgOnDestroy(
    type.prototype.ngOnDestroy,
    subscriptionsKey
  );
}

function decorateNgOnDestroy(ngOnDestroy: any, subscriptionsKey: any) {
  return function (this: any): void {
    // Invoke the original `ngOnDestroy` if it exists
    if (ngOnDestroy) {
      ngOnDestroy.call(this);
    }

    // Check if subscriptions exists
    if (this[subscriptionsKey] instanceof Subscription) {
      this[subscriptionsKey].unsubscribe();
      console.log('unsubscribed');
    }
  };
}
