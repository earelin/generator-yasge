const VersionsService = require('../../commons/versions-service')

describe('VersionsService integration', () => {
  test('Get dependency last version', () => {
    const versionsService = new VersionsService()
    return versionsService.getDependencyLastVersion({
      group: 'org.assertj',
      id: 'assertj-core'
    }).then(version => {
      expect(version).toMatch(/[0-9]*\.[0-9]*\.[0-9]*/)
    })
  })
  test('Get gradle plugin last version', () => {
    const versionsService = new VersionsService()
    return versionsService.getGradlePluginLastVersion({
      id: 'de.aaschmid.cpd'
    }).then(version => {
      expect(version).toMatch(/[0-9]*\.[0-9]/)
    })
  })
})
