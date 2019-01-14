module.exports = {
  generateEntities(properties) {
    let templates = []

    for (let entity in properties.importedModel) {
      const packageName = calculatePackageName(
        properties.basePackage,
        entity,
        "entity"
      )
      const packageFolder = packageName.replace(/\./g, '/')
      templates.push({
        template: 'Entity.java',
        destination: `src/main/java/${packageFolder}/${entity}.java`,
        data: {
          entity: entity,
          package: packageName,
          model: properties.importedModel[entity]
        }
      })      
    }

    return templates
  },

  generateSql(properties) {

  },

  generateRepositories(properties) {

  },

  generateServices(properties) {

  },

  generateControllers(properties) {

  },
  
  processEntityModel(properties) {
    
  }
}

function calculatePackageName(basePackage, rawClassName, type) {
  const fullClassName = `${basePackage}.${type}.${rawClassName}`
  return fullClassName.slice(0, fullClassName.lastIndexOf('.'))
}
