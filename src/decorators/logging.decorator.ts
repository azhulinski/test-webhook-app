import { Logger } from '@nestjs/common';

export function Logging(): MethodDecorator {
const logger: Logger = new Logger('Logging');

  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function(...args: any[]) {
      const result = await originalMethod.apply(this, args);
      logger.log(`Method ${propertyKey} has been invoked and responded with result '${JSON.stringify(result)}'`);
    };
  };
}