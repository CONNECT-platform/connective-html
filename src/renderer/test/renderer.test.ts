import { should, expect } from 'chai'; should();
import jsdom from 'jsdom-global';

import { Renderer } from '../renderer';

import { testRendererSpec } from './renderer.spec';


describe('Renderer', () => {
  beforeEach(function() {
    this.jsdom = jsdom();
  });

  afterEach(function() {
    this.jsdom();
  });

  testRendererSpec(<R, T>() => new Renderer<R, T>());
});