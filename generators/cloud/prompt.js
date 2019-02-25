module.exports = function() {
  return [{
    type: 'confirm',
    name: 'cloud',
    message: 'Cloud support',
    store: true,
    default: true
  }, {
    type: 'list',
    name: 'cloudPlatform',
    message: 'Cloud platform',
    store: true,
    when: answers => answers.cloud,
    choices: [
      { value: 'aws', name: 'AWS' },
      { value: 'gcp', name: 'Google Cloud Platform' }
    ],
    default: 'aws'
  }]
}
