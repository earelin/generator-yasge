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
$ yo yasge:import-model <model-yaml-file>
```

Yaml file model example

```yaml
Post:
  properties:
    id: Long
    title: String
    body: BigString
    author: person.Author
    images: [image.Image] # List of embedded images

person.Person:
  abstract: true
  properties:
    id: Long
    groups: (person.Group) # Set of groups

person.Author:
  extends: person.Person # Has a parent class
  properties:
    name: String
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
