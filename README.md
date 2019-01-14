# yasge

Yeat Another Spring Generator is a set of yeoman generators for the Spring Framework

## Usage

### Generate a project

```
$ mkdir demo
$ cd demo
$ yo yasge
```

### Generate simple classes

```
$ yo yasge:create-class
```

### Generate artifact from model

```
$ yo yasge:import-model [model-yaml-file]
```

model-yaml-file should be the path to a model yaml file from the root of the project. By default the path is: 'model.yml'

Yaml file model example

```yaml
Post:
  properties:
    id: Long
    title: String
    body: BigString
    author: person.Author # Many to one relationship
    images: [image.Image] # List of embedded images

Category:
  properties:
    id: Long
    name: String
    posts: [Post]+ # List of posts, one to many relationship

person.Person:
  abstract: true # Abstract class, per table inheritance
  properties:
    id: Long
    name: String
    groups: {person.Group}* # Set of groups, many to many relationship

person.Author:
  extends: person.Person # Has a parent class
  properties:
    email: String

person.Group:
  properties:
    id: Long
    name: String

image.Image:
  embedded: true
  properties:
    title: String
    url: String
```
