import config from 'ember-get-config';

export default function developerLog(message) {
  if (config.environment === 'development') {
    // eslint-disable-next-line no-console
    console.warn(message);
  }
}
