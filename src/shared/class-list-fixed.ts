export function get(node: HTMLElement) {
  return (node as any).classListFixed || [];
}

export function add(node: HTMLElement, clazz: string) {
  (node as any).classListFixed = (node as any).classListFixed || [];
  if (!(node as any).classListFixed.includes(clazz))
    (node as any).classListFixed.push(clazz);
}

export function remove(node: HTMLElement, clazz: string) {
  if ((node as any).classListFixed) {
    (node as any).classListFixed = (node as any).classListFixed.filter((c: string) => c !== clazz);
  }
}
