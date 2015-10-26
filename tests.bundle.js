import 'babel-core/polyfill';

const context = require.context('./test', true, /\..+\.spec\.js?$/);
context.keys().forEach(context);

export default context;
