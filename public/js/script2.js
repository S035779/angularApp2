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

// Angular sample code#10
var PersonManager3 = function ()
{
  return {
    $get: function (person)
    {
      return {
        getPersonFirstName: function ()
        {
          return person.firstName;
        },
        getPersonLastName: function ()
        {
          return person.lastName;
        },
        getPersonFullName: function (separator)
        {
          return person.firstName + separator + person.lastName;
        }
      };
    }
  };
};

angular.module("mainModule5", [])
.value("person", 
{
  firstName: "",
  lastName: ""
})
.provider("personManager", PersonManager3)
.controller("mainController", function ($scope, person, personManager)
{
  person.firstName = "John";
  person.lastName = "Doe";
  $scope.personInstance = person;
  $scope.personManagerInstance = personManager;
});

// Anjular sample code#11
var PersonManager4 = function ()
{
  var fullNameSeparator = " ";

  return {
    setFullNameSeparator: function (separator)
    {
      fullNameSeparator = separator;
    },
    $get: function (person)
    {
      return {
        getPersonFirstName: function ()
        {
          return person.firstName;
        },
        getPersonLastName: function ()
        {
          return person.lastName;
        },
        getPersonFullName: function ()
        {
          return person.firstName + fullNameSeparator + person.lastName;
        }
      };
    }
  };
};

angular.module("mainModule6", [])
.value("person", {
  firstName: "",
  lastName: ""
})
.provider("personManager", PersonManager4)
.config(function (personManagerProvider)
{
  personManagerProvider.setFullNameSeparator("*");
})
.run(function (person)
{
  person.firstName = "John";
  person.lastName = "Doe";
})
.controller("mainController", function ($scope, person, personManager)
{
  $scope.personInstance = person;
  $scope.personManagerInstance = personManager;
});

// Anjular sample code#12
var BaseProvider = function ()
{
  var providerID;

  return {
    setID: function (id)
    {
      providerID = id;
    },
    $get: function ()
    {
      return {
        getProviderID: function ()
        {
          return providerID;
        }
      };
    }
  };
};

angular.module("childModule1", [])
  .provider("provider1", BaseProvider)
  .config(function (provider1Provider)
{
  provider1Provider.setID("provider1-childModule1");
})
  .provider("provider2", BaseProvider)
  .config(function (provider2Provider)
{
  provider2Provider.setID("provider2-childModule1");
});

angular.module("childModule2", ["childModule3"])
  .provider("provider1", BaseProvider)
  .config(function (provider1Provider)
{
  provider1Provider.setID("provider1-childModule2");
})
  .provider("provider3", BaseProvider)
  .config(function (provider3Provider)
{
  provider3Provider.setID("provider3-childModule2");
});

angular.module("childModule3", [])
  .provider("provider1", BaseProvider)
  .config(function (provider1Provider)
{
  provider1Provider.setID("provider1-childModule3");
})
  .provider("provider4", BaseProvider)
  .config(function (provider4Provider)
{
  provider4Provider.setID("provider4-childModule3");
});

angular.module("mainModule7", ["childModule1", "childModule2"])
  .controller("mainController", function ($scope, provider1, provider2, provider3, provider4)
{
  $scope.provider1 = provider1;
  $scope.provider2 = provider2;
  $scope.provider3 = provider3;
  $scope.provider4 = provider4;
});

