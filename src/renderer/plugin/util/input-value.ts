export function getInputValue(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
  if (el instanceof HTMLInputElement) {
    if (el.type === 'number') return parseFloat(el.value);
    else if (el.type === 'checkbox') return el.checked;
    else if (el.type === 'radio' && (el as any)._value) return (el as any)._value;
    else return el.value;
  }
  else if (el instanceof HTMLSelectElement) {
    let _res = [];
    for (let i = 0; i < el.options.length; i++) {
      let opt = el.options.item(i);
      if (opt && opt.selected)
        _res.push((opt as any)._value || opt.value || opt.text);
    }

    if (!el.multiple) return _res[0];
    else return _res;
  }
  else return el.value;
}


export function setInputValue(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, value: any) {
  if (el instanceof HTMLInputElement) {
    if (el.type === 'checkbox') el.checked = !!value;
    else if (el.type === 'radio') 
      el.checked = ((el as any)._value && (el as any)._value === value) || value === el.value;
    else el.value = value;
  }
  else if (el instanceof HTMLSelectElement) {
    let val = value;
    if (!Array.isArray(val)) val = [val];

    for (let i = 0; i < el.options.length; i++) {
      let opt = el.options.item(i);
      if (opt) {
        opt.selected = (
          ((opt as any)._value && val.includes((opt as any)._value))
          || (opt.value && val.includes(opt.value))
          || (!opt.value && val.includes(opt.text))
        );
      }
    }
  }
  else el.value = value;
}