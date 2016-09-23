define([
    'services/services',
    'controllers/controllers'],

  function () {
    'use strict';
var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

app.run(function($ionicPlatform,$rootScope,$state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
     var needLoginView = ["tab.personal1"];//需要登录的页面state
     $rootScope.$on('$stateChangeStart',function(event,toStart,toParams,fromState,fromParams,options){ 
       if(needLoginView.indexOf(toStart.name)>=0 && !$rootScope.isLogin){ 
        $state.go("login");//跳转到登录页
        event.preventDefault(); //阻止默认事件，即原本页面的加载
       } 
     })
  });
}).value('loginuser',{"id":1})

.config(function($stateProvider, $urlRouterProvider,$controllerProvider) {
  app.registerController = $controllerProvider.register;//
  app.loadControllerJs=function(controllerJs){ 
      return function($rootScope,$q){ 
        var def=$q.defer(),deps=[];
        angular.isArray(controllerJs)?(deps=controllerJs):deps.push(controllerJs);
        require(deps,function(){
          $rootScope.$apply(function(){ 
            def.resolve();
          })

        });
        return def.promise;
      }
  }
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
     abstract: true,
    views:{
      'main':{
        templateUrl: 'templates/tabs.html'
      }
    }
    
  })
    .state('login',{ 
      url:'/login',
      views:{ 
        'main':{ 
          templateUrl:'templates/public/login.html'
        }
      }
    })
    .state('test',{ 
      url:'/test',
      views:{ 
        'main':{
           templateUrl: 'templates/tab-proDetial2.html'
        }
      }
    })
    .state('notab',{ 
      url:'/notab',
       abstract: true,
      templateUrl:'templates/no-tab.html'
    })
  .state('tab.index', {
    url: '/index',
    views: {
      'tab-index': {
        templateUrl: 'templates/index/tab-index.html',
 
      }
    }
  })
  .state('addQuestion',{
    url:'/addQuestion',
    params:{id:null},
     views:{ 
        'main':{
           templateUrl: 'templates/public/addquestion.html'
        }
      }
  })
  .state("questionTab",{ 
    url:'/questionTab',
    params:{
      id:null
    },
    views:{ 
      'main':{
        templateUrl:"templates/public/questionTab.html"
      }

    }
  })
.state('tab.indexHotProDetial', {
    url: '/proDetial:ids',
    params: {
        ida: null
    },
    views: {
      'tab-index': {
        templateUrl: 'templates/index/tab-proDetial.html'
      }
    }
  })
.state('tab.HotNewDetial',{
url:'/newsDetial:ids',
params:{
  ida:null
},
views:{
  'tab-index':{
    templateUrl:'templates/index/tab-newsDetial.html'
  }
}

})
.state('indexHotProDetial2', {
    url: '/proDetial2',
    // views: {
    //   'tab-index': {
        templateUrl: 'templates/index/tab-proDetial2.html'
    //   }
    // }
  })
  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chats/chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chats/chatsDetail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.community', {
    url: '/community',
    views: {
      'tab-community': {
        templateUrl: 'templates/community/index.html',
        controller: 'CommunityCtrl'
      }
    }
  })
  .state('communityDetial', {
    url: '/community/detial/:cmmId',
    views: {
       'main': {
        templateUrl: 'templates/public/communityDetial.html'
      }
      
    }
  })
  .state('tab.community.hot', {
    url: '/community/hot',
    views: {
      'tab-community': {
        templateUrl: 'templates/community/hot.html',
        controller: 'CommunityCtrl'
      }
    }
  })
  .state('tab.personal',{ 
    url:'/personal',
    views:{ 
      'tab-personal':{ 
        templateUrl:'templates/personal/tab-personal.html',
         resolve:{
          //这里要执行加载js，我们使用$q的方法阻塞执行
          //定义了一个方法，这个方法接受一个路径名称或者包含路径名称的数组
          //使用$q的方式异步执行
          //这里的话应该是这么理解的，使用require的方式加载文件，通过require的相应callback
          //响应了$q的执行结果事件resolve
          deps: app.loadControllerJs('./controllers/personalCtrl')
        }
      }
    }
  })
  .state('tab.quotes',{ 
    url:'/personal/quotes',
    views:{ 
      'tab-personal':{ 
        templateUrl:'templates/personal/quotes.html',
        controller:'QuotesCtrl'
      
      },
        resolve:{ 
          
          //deps:app.loadControllerJs('../personal/quotesController')
        }
    }
  })
  .state('tab.personalpro',{ 
    url:'/personal/pro',
    views:{ 
      'tab-personal':{ 
        templateUrl:'templates/personal/personPro.html'
      }
    }
  })
  .state('tab.personalDetial',{ 
    url:'/personal/detial',
    views:{ 
      'tab-personal':{ 
        templateUrl:'templates/personal/tab-personalDetial.html'
      }
    }
  })
.state('tab.personalSettings',{ 
    url:'/personal/settings',
    views:{ 
      'tab-personal':{ 
        templateUrl:'templates/personal/tab-personalSettings.html'
      }
    }
  })
.state('tab.personalNewMsg',{ 
    url:'/personal/newmsg',
    views:{ 
      'tab-personal':{ 
        templateUrl:'templates/personal/tab-personalNewMsg.html'
      }
    }
  })
.state('tab.dynamics',{ 
  cache: false,
  url:'/dynamics/index',
  views:{ 
    'tab-dynamics':{ 
      templateUrl:'templates/dynamics/index.html',
      controller:'DynamicsCtrl'
    }
  }
})
;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/personal');

})
.directive('hideTabs', function($rootScope) {//隐藏tabs指令
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            scope.$on('$ionicView.beforeEnter', function() {
                scope.$watch(attributes.hideTabs, function(value){
                    $rootScope.hideTabs = value;
                });
            });

            scope.$on('$ionicView.beforeLeave', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
})
 return app;
})