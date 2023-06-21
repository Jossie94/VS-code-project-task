<?php
class Person
{
    private $personName = array();

    public function setPrefix($prefix)
    {
        $this->personName['prefix'] = $prefix;
    }

    public function getGivenName()
    {
        return $this->personName['givenName'];
    }

	public function getPrefix()
	{
		return $this->personName['prefix'];
	}

	public function setGivenName($givenName)
	{
		$this->personName['givenName'] = $givenName;
	}
}

interface PersonProvider
{
    public function getPerson($persons, $givenName);
	public function filterPrefix($persons, $prefix);
}

class LocatorPersonProvider implements PersonProvider {
	public function getPerson($persons,$givenName)
    {
		for ($i = 0; $i < count($persons); $i++) {
			if ($persons[$i]->getGivenName() == $givenName) {
				return $persons[$i];
			}
		}
    }
	public function filterPrefix($persons, $prefix) {
		$filteredPersons = [];
		for ($i = 0; $i < count($persons); $i++) {
			if ($persons[$i]->getPrefix() == $prefix) {
				$filteredPersons[] = $persons[$i];
			}
		}
		return $filteredPersons;
	}
}

class PersonProviderFactory
{
    public static function createProvider($type)
    {
        if ($type == 'manual')
        {
            return new LocatorPersonProvider();
        } else {
            return null;
        }
    }
}

$person = new Person();
$person->setPrefix("Mr.");
$person->setGivenName("John");
$person1 = new Person();
$person1->setPrefix("Ms.");
$person1->setGivenName("Jane");
$person2 = new Person();
$person2->setPrefix("Ms.");
$person2->setGivenName("Valery");
$person3 = new Person();
$person3->setPrefix("Mr.");
$person3->setGivenName("Vincent");
$person4 = new Person();
$person4->setPrefix("Mx.");
$person4->setGivenName("Charlie");
$persons = [$person, $person1, $person2, $person3, $person4];

$config = 'manual';
/* I need to get person data... */
$provider = PersonProviderFactory::createProvider($config);
if ($provider == null) {
	echo "Provider is null";
	exit;
}
$person = $provider->getPerson($persons,"John");
$personsMs = $provider->filterPrefix($persons,"Ms.");

echo $person->getPrefix();
echo $person->getGivenName();
echo "</br>Ms(s):</br>";
foreach ($personsMs as $personMs) {
	echo $personMs->getPrefix();
	echo $personMs->getGivenName();
	echo "</br>";
}
?> 