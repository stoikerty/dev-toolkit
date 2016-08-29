// Setup jsdom to be used all throughout mocha tests
// Using suggested version from: https://github.com/facebook/react/issues/5046
import { jsdom } from 'jsdom';

global.document = jsdom('<!doctype html><html><body id="mock-dom"></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
