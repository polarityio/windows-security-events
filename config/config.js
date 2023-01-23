module.exports = {
  name: 'Windows Security Events',
  acronym: 'WIN',
  customTypes: [
    {
      key: 'eventId',
      regex: /\b[456]\d{3}\b/
    }
  ],
  defaultColor: 'light-gray',
  styles: ['./styles/windows.less'],
  block: {
    component: {
      file: './components/windows-block.js'
    },
    template: {
      file: './templates/windows-block.hbs'
    }
  },
  summary: {
    component: {
      file: './components/windows-summary.js'
    },
    template: {
      file: './templates/windows-summary.hbs'
    }
  },
  request: {
    cert: '',
    key: '',
    passphrase: '',
    ca: '',
    proxy: '',
    rejectUnauthorized: true
  },
  logging: {
    level: 'info' //trace, debug, info, warn, error, fatal
  },
  options: []
};
