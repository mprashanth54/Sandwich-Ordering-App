angular.module('myApp').factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;
    var role = null;

    // return available functions for use in the controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register,
      checkRoute:checkRoute
    });

    function isLoggedIn() {
      if(user) {
        return true;
      } else {
        return false;
      }
    }

    function checkRoute(access){
      console.log("Inside check route");
      if (access == role){
        return true;
      }
      else{
        return false;
      }
    }

    function getUserStatus() {
      return $http.get('/user/status')
      // handle success
      .success(function (data) {
        if(data.status){
          console.log(data.role + "Inside get user status");
          user = true;
          role = data.role;
        } else {
          user = false;
        }
      })
      // handle error
      .error(function (data) {
        user = false;
      });
    }

    function login(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/login',
        {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = true;
            deferred.resolve({role:data.role});
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/user/logout')
        // handle success
        .success(function (data) {
          user = false;
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function register(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/register',
        {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

}]);

angular.module('myApp').factory('CategoryService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // return available functions for use in the controllers
    return ({
      getCategory: getCategory,
      save: save
    });

    function getCategory() {
      return $http.get('/admin/category')
      // handle success
      .success(function (data) {
        return data;
      });
      
    }

    function save(category) {

      // create a new instance of deferred
      var deferred = $q.defer();
      console.log(category);
      // send a post request to the server
      $http.post('/admin/category',{name:category.trim()})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }
}]);

angular.module('myApp').factory('ItemsService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // return available functions for use in the controllers
    return ({
      getItems: getItems,
      save: save,
      deleteItem : deleteItem
    });

    function getItems() {
      return $http.get('/admin/items')
      // handle success
      .success(function (data) {
        return data;
      });
      
    }

    function save(item) {

      // create a new instance of deferred
      var deferred = $q.defer();
      // send a post request to the server
      $http.post('/admin/items',item)
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function deleteItem(item) {

      // create a new instance of deferred
      var deferred = $q.defer();
      console.log(item);
      // send a post request to the server
      $http.delete('/admin/items/' + item)
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

}]);