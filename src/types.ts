export type PropsType<T> = {[prop: string]: T};
export type RawValue = string | number | boolean;

export function isRawValue(value: any): value is RawValue {
  return typeof(value) ===  'string' ||
        typeof(value) === 'number' ||
        typeof(value) === 'boolean';
}