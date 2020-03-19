import { should, expect } from 'chai'; should();
import jsdom from 'jsdom-global';

import { ExtensibleRenderer } from '../../extensible-renderer';
import { EventHandlerPlugin } from '../event-handler';


describe('EventHandlerPlugin', () => {
  beforeEach(function() {
    this.jsdom = jsdom();
  });

  afterEach(function() {
    this.jsdom();
  });

  it('should allow adding functions as event listeners.', done => {
    const renderer = new ExtensibleRenderer().plug(new EventHandlerPlugin());

    (
      <div onclick={event => {
        event.should.be.instanceOf(MouseEvent);
        done();
      }}/>
    ).click();
  });
});