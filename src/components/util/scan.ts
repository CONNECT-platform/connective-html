export interface ScanOptions {
  includeStart?: boolean;
  includeEnd?: boolean;
  callback?: (n: Node) => void;
}


export function scanRemove(start: Node, end: Node, options?: ScanOptions) {
  const opts = Object.assign({
    includeStart: false,
    includeEnd: false,
  }, options);

  let scanned : Node[] = [];

  const _remscan = (n: Node, cb: (n: Node) => void = n => scanned.push(n)) => {
    (n.parentElement as HTMLElement).removeChild(n);
    if (opts.callback) opts.callback(n);
    cb(n);
  }

  let cursor : Node | null = start;
  while ((cursor = start.nextSibling) && cursor != end) _remscan(cursor);

  if (opts.includeStart) _remscan(start, n => scanned = [n].concat(scanned));
  if (opts.includeEnd) _remscan(end);

  return scanned;
}
