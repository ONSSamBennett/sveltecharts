import { mount } from 'svelte';
import App from './app.svelte';

export default mount(App, {
  target: document.getElementById('app'),
  props: {},
});

export { App };
