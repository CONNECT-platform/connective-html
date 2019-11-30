export const _DefaultIdCharset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
export const _DefaultIdLength = 10;


export function autoId(len = _DefaultIdLength, charset = _DefaultIdCharset) {
  let res = '';
  for (let i = 0; i < len; i++)
    res += charset[Math.floor(Math.random() * charset.length)];
  return res;
}


export default autoId;