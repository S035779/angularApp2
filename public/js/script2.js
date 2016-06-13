// Angular sample code#6
// A simple module with no dependencies
angular.module("mainModule", [])
.controller("simpleController", function ($scope)
{
  // Initialize the model
  $scope.person = {
    firstName: "John",
    lastName: "Doe",

    // Define utility functions on the model object
    getFullName: function ()
    {
      return this.firstName + " " + this.lastName;
    }
  };
});

// Angular sample code#7
// Register an object instance as a value and name it "person"
angular.module("mainModule2", [])
.value("person", 
{
  firstName: "",
  lastName: "",

  getFullName: function ()
  {
    return this.firstName + " " + this.lastName;
  }
})
// Get the "person" registered object instance through Dependency Injection
.controller("mainController", function ($scope, person)
{
  person.firstName = "John";
  person.lastName = "Doe";

  // Set a variable on the scope to reference the "person" instance
  // from the HTML template.
  $scope.personInstance = person;
});

// Angular sample code#8
// Definition of a PersonManager object
var PersonManager = function (person)
{
  this.personInstance = person;
};

PersonManager.prototype.getPersonFirstName = function ()
{
  return this.personInstance.firstName;
};

PersonManager.prototype.getPersonLastName = function ()
{
  return this.personInstance.lastName;
};

PersonManager.prototype.getPersonFullName = function (separator)
{
  return this.personInstance.firstName + separator + this.personInstance.lastName;
};

// Initialization of the "mainModule"
angular.module("mainModule3", [])
  .value("person", {
  firstName: "",
  lastName: ""
})
  .service("personManager", PersonManager) 
  .controller("mainController", function ($scope, person, personManager)
{
  person.firstName = "John";
  person.lastName = "Doe";
  $scope.personManagerInstance = personManager;
});

// Angular sample code#9
var PersonManager2 = function (person)
{
  var personInstance = person;

  return {
    getPersonFirstName: function ()
    {
      return personInstance.firstName;
    },
    getPersonLastName: function ()
    {
      return personInstance.lastName;
    },
    getPersonFullName: function (separator)
    {
      return personInstance.firstName + separator + personInstance.lastName;
    }
  };
};

angular.module("mainModule4", [])
  .value("person", 
{
  firstName: "",
  lastName: ""
})
  .factory("personManager", PersonManager2)
  .controller("mainController", function ($scope, person, personManager)
{
  person.firstName = "John";
  person.lastName = "Doe";
  $scope.personInstance = person;
  $scope.personManagerInstance = personManager;
});

