export function getInputValue(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
  if (el.getAttribute('type') === 'number') return parseFloat(el.value);
  else if (el instanceof HTMLSelectElement && el.multiple) {
    return Array.from(el.options).filter(opt => opt.selected).map(opt => (opt as any)._value || opt.value || opt.text);
  }
  else return el.value;
}


export function setInputValue(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, value: any) {
  if (el instanceof HTMLSelectElement && el.multiple) {
    let val = value;
    if (!Array.isArray(val)) val = [val];

    Array.from(el.options).forEach(opt => {
      opt.selected = (
        ((opt as any)._value && val.includes((opt as any)._value)) ||
        (opt.value && val.includes(opt.value)) || 
        (!opt.value && val.includes(opt.text))
      );
    });
  }
  else el.value = value;
}