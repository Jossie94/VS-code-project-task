class Person {
    constructor() {
      this.personName = {};
    }
  
    setPrefix(prefix) {
      this.personName['prefix'] = prefix;
    }
  
    getGivenName() {
      return this.personName['givenName'];
    }
  
    getPrefix() {
      return this.personName['prefix'];
    }
  
    setGivenName(givenName) {
      this.personName['givenName'] = givenName;
    }
  }
  
  class PersonProvider {
    getPerson(persons, givenName) {
      for (let i = 0; i < persons.length; i++) {
        if (persons[i].getGivenName() === givenName) {
          return persons[i];
        }
      }
    }
  
    filterPrefix(persons, prefix) {
      const filteredPersons = [];
      for (let i = 0; i < persons.length; i++) {
        if (persons[i].getPrefix() === prefix) {
          filteredPersons.push(persons[i]);
        }
      }
      return filteredPersons;
    }
  }
  
  class PersonProviderFactory {
    static createProvider(type) {
      if (type === 'manual') {
        return new LocatorPersonProvider();
      } else {
        return null;
      }
    }
  }
  
  class LocatorPersonProvider extends PersonProvider {
    constructor() {
      super();
    }
  }
  
  const person = new Person();
  person.setPrefix("Mr.");
  person.setGivenName("John");
  const person1 = new Person();
  person1.setPrefix("Ms.");
  person1.setGivenName("Jane");
  const person2 = new Person();
  person2.setPrefix("Ms.");
  person2.setGivenName("Valery");
  const person3 = new Person();
  person3.setPrefix("Mr.");
  person3.setGivenName("Vincent");
  const person4 = new Person();
  person4.setPrefix("Mx.");
  person4.setGivenName("Charlie");
  const persons = [person, person1, person2, person3, person4];
  
  const config = 'manual';
  
  const provider = PersonProviderFactory.createProvider(config);
  if (provider === null) {
    console.log("Provider is null");
    process.exit(1);
  }
  const personData = provider.getPerson(persons, "John");
  const personsMs = provider.filterPrefix(persons, "Ms.");
  
  console.log(personData.getPrefix());
  console.log(personData.getGivenName());
  console.log("</br>Ms(s):</br>");
  personsMs.forEach((personMs) => {
    console.log(personMs.getPrefix());
    console.log(personMs.getGivenName());
    console.log("</br>");
  });
  