import { should, expect } from 'chai'; should();
import jsdom from 'jsdom-global';

import { ExtensibleRenderer } from '../../extensible-renderer';
import { ObjectValuePlugin } from '../object-value';


describe('ObjectValuePlugin', () => {
  beforeEach(function() {
    this.jsdom = jsdom();
  });

  afterEach(function() {
    this.jsdom();
  });

  it('should set `._value` proprety on select options.', () => {
    const renderer = new ExtensibleRenderer().plug(new ObjectValuePlugin());

    const data = { whatevs: true };
    (<option _value={data}></option> as any)._value.should.equal(data);
  });
});