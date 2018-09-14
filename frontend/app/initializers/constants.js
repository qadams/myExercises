export function initialize(application) {
  application.inject('controller', 'constants', 'service:constants');
}

export default {
  name: 'constants',
  initialize
};
