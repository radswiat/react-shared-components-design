import dtm from './dtm';
import React from 'react';

/**
 * Apply decorator for a method
 * - allows us to define decorator for a class, that could still bind into the inernal methods
 * @param classVar
 * @param method
 */
const nestDecorator = (classVar, method) => {
  let descriptor = {
    value: classVar.prototype.handleTrigger,
    enumerable: false,
    enumerable: true,
    writable: true
  }
  descriptor = dtm(classVar.prototype, method, descriptor);
  Object.defineProperty(classVar.prototype, method, descriptor);
}

/**
 * Nested decorator pattern
 * @param ComposedComponent
 * @returns {FamilySimClass}
 */
export default function password(ComposedComponent) {
  nestDecorator(ComposedComponent, 'handleTrigger');
  return class Decorator extends React.Component {
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  };
}

