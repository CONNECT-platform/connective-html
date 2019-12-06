import { should, expect } from 'chai'; should();

import { ref, Ref } from '../ref';


describe('ref()', () => {
  describe('.$', () => {
    it('should be the resolved value.', () => {
      let r = ref<string>();
      r.resolve('hellow world');
      r.$.should.equal('hellow world');
    });

    it('should be undefined before the ref is resolved.', () => {
      let r = ref<string>();
      expect(r.$).to.be.undefined;
    });
  });

  describe('.resolve()', () => {
    it('should resolve the value of the ref (accessible via `.$`)', () => {
      let r = ref<boolean>();
      r.resolve(false);
      r.$.should.be.false;
    });

    it('should only resolve the value of the ref once.', () => {
      let r = ref<number>();
      r.resolve(42);
      r.resolve(43);
      r.$.should.equal(42);
    });
  });

  describe('.resolved', () => {
    it('should be false before the value is resolved.', () => {
      let r = ref<number>();
      r.resolved.should.be.false;
    });

    it('should be true after the ref is resolved.', () => {
      let r = ref<number>();
      r.resolve(42);
      r.resolved.should.be.true;
    });
  });
});