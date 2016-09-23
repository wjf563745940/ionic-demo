define(['apprequire'], function (app) {
  'use strict';
var app=angular.module('starter');
var ctrl=function($scope){
  
  $scope.personalIndex={ id:1,
    name:'啊 锋',
    img:'img/max.png'
  }   ;
  $scope.myPro=[{ id:1,name:'我的投资项目',icon:'ion-social-usd-outline'},
    { id:2,name:'我发起项目',icon:'ion-ios-paper-outline'},
    { id:3,name:'我的约趟记录',icon:'ion-ios-paper-outline'},
    { id:4,name:'我的领头记录',icon:'ion-ios-paper-outline'}
  ];
  $scope.mySetting={ 
    id:1,
    name:'设置',
    icon:'ion-gear-a'
  }
}
  ctrl.$inject = ['$scope'];
  //return ctrl;
  app.registerController('PersonalCtrl',ctrl);
})