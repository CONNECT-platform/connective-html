export type PropsType<T> = {[prop: string]: T};

export function isRawValue(value: any): value is RawValue {
  return typeof(value) ===  'string' ||
        typeof(value) === 'number' ||
        typeof(value) === 'boolean';
}