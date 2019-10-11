const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-110361.okta.com',
  token: '00ybwT6SPA_ptC5Rb_bqDXHCmJpoxo6iyz5fz8a0Ms'
});

module.exports = client;