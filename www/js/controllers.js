angular.module('starter.controllers', [])
.controller('navBarCtrl',function($scope,$ionicNavBarDelegate,$ionicHistory){ 
  // $ionicNavBarDelegate.setTitle("x");
  //  $scope.getPreviousTitle = function() {
  //   return $ionicHistory.backTitle();
  // };
  $scope.logo="./img/logo_v2.png";
  console.log("init")
       Array.prototype.indexOf = function(val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
            }
            return -1;
        };
        Array.prototype.remove = function(val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
})
.controller('NavBarCtrl2',function($scope,$ionicNavBarDelegate,$ionicHistory,$ionicActionSheet,$timeout,$state,Questions,$ionicViewSwitcher){ 
   $scope.showSheet=function(){ 
       var hideSheet = $ionicActionSheet.show({
                      buttons: [{ text: '<a >发起提问</a> ' },],
                      cancelText: '取消',
                      cancel: function() {
                         },
                      buttonClicked: function(index) {
                        $state.go("addQuestion",{id:1});
                        $ionicViewSwitcher.nextDirection("forward");
                        return true;
                      }
                  });
                  $timeout(function() {
                      hideSheet();
                  }, 200000);
  }
 $scope.goBack=function(){ 
      $ionicHistory.goBack();
       $ionicViewSwitcher.nextDirection("back");
    }
  $scope.addQuestion=function(){ 
    Questions.addQuestion($scope.$parent.mytitle,$scope.$parent.mycontent,[]);
    var newQu =Questions.getNewQuestion();
    $state.go("questionTab",{id:newQu.id});
  }
  $scope.morePerson=function(){ 
    alert("更多消息");
  }
  $scope.share=function(){ 
alert("分享");
  }

})
.controller('test',function($scope,$ionicHistory,$ionicViewSwitcher){
    $scope.$on("$ionicView.enter", function() {
      console.log("$ionicView.enter  $stateChangeStart如何使用");
    });
    $scope.goBack=function(){ 
      $ionicHistory.goBack();
       $ionicViewSwitcher.nextDirection("back");
    }
})
.controller("LoginCtrl",function($scope,$stateParams,$state,locals){ 
  $scope.login=function(){ 
      locals.setObject("user",{id:1})
     $state.go("tab.personal");
  }
})
.controller('AddQuestionCtrl',function($scope,$stateParams,$ionicHistory,$ionicViewSwitcher,$cordovaImagePicker){
$scope.mytitle="";
$scope.mycontent="" ;
$scope.addPhoto=function(){ 
if (!window.imagePicker) {
      alert('目前您的环境不支持相册上传。')
      return;
    }

    var options = {
      maximumImagesCount: 1,
      width: 800,
      height: 800,
      quality: 80
    };

    $cordovaImagePicker.getPictures(options).then(function(results) {
      var uri = results[0],
        name = uri;
      if (name.indexOf('/')) {
        var i = name.lastIndexOf('/');
        name = name.substring(i + 1);
      }

      // 获取UPYUN的token数据
      Upyun.token(name, 1000).then(function(resp) {
        localStorage.setItem('STREAM_UPLOAD_UPYUN', JSON.stringify(resp.data));
        $scope.uploadimage(uri, prop);
      }).finally(function() {
      });
    }, function(error) {
      alert(error);
    });
}

})
.controller('QuestionTabCtrl',function($scope,$state,$stateParams,Tags,Questions,Dynameics,Issues,$ionicHistory){
$scope.tags=[];
$scope.btndis=true;
$scope.tabs=Tags.all();
$scope.select=function(id){
  var index= Tags.getIndexById(id) ;
  $scope.tabs[index].sel=!(Tags.getById(id).sel);
  if($scope.tabs[index].sel){ 
    $scope.tags.push($scope.tabs[index].name)
    $scope.btndis=false;
  }else{ 
      $scope.tags.remove($scope.tabs[index].name);
      if($scope.tags.length==0){ 
        $scope.btndis=true;
      }
  }
}
$scope.FB=function(){ 
Questions.setTabs($stateParams.id,$scope.tags);
Issues.addIss(2,1,Questions.getNewQuestion().tabs,Questions.getNewQuestion().title);
var newis=Issues.getNewIs()
Dynameics.addDs("发器了一个提问",Questions.getNewQuestion().title,newis.id,1)//动态类型，问题title,issueId,userId
$state.go("tab.dynamics");
$ionicHistory.nextViewOptions({
  disableBack: true
});
}
})
.controller('DynamicsCtrl',function( $state,loginuser,$scope,$ionicNavBarDelegate,$ionicHistory,$ionicViewSwitcher,$ionicActionSheet,Dynameics,$ionicHistory){
   $scope.myHref=function(item){ 
    $ionicViewSwitcher.nextDirection('forward');
                $state.go('communityDetial', {'cmmId':item.issueID});
 } 
  $scope.items=Dynameics.getByUserId(loginuser.id);
  if( $scope.items && $scope.items.length>0){ 
   $scope.muhide=true;
  }
})
.controller('DashCtrl', function($scope) { })
.controller('ChatsCtrl', function($scope, Chats,$ionicListDelegate) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
  $scope.gotop=function(chat){ 
    Chats.gotop(chat);
    $ionicListDelegate.closeOptionButtons();
  }
    // $scope.onItemDelete = function(item) {
    //   $scope.items.splice($scope.items.indexOf(item), 1);
    // };
})
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats,ChatsDetail,User,$ionicScrollDelegate,locals,loginuser) {
  $scope.chat = Chats.get($stateParams.chatId);
  $scope.list=[];
  $scope.inputChat="";
  var myuser=User.getById(1);
  var contents=ChatsDetail.getByUsersId(loginuser.id,$scope.chat.userId);//可以根据对话列表id查询
  var contentslocal2=locals.getObject(loginuser.id+""+$scope.chat.userId)
  var contentsId=ChatsDetail.getId(loginuser.id,$scope.chat.userId)
  for(var i=0;i<contentslocal2.length;i++){ 
    var cont=contentslocal2[i];
    var user=User.getById(cont.userId);
    cont['user']=user
    $scope.list.push(cont);
  }
  $scope.addChat=function(){
    var myDate = new Date();
    var cont={};
    cont.id=ChatsDetail.getIdByUsersId(contentsId);
    cont.content=$scope.inputChat;
    cont.time=myDate.getHours()+":"+myDate.getMinutes();
    cont.myself=true;
    cont.userId=1;
    ChatsDetail.addlist(contentsId,cont);

    //locals.setObject(loginuser.id,cont)
    //locals.updateObject("users",users);
    var contentslocal=ChatsDetail.getByUsersId(loginuser.id,$scope.chat.userId);
    locals.setObject(loginuser.id+""+$scope.chat.userId,contentslocal)
    cont['user']=myuser;
    $scope.list.push(cont);
    $scope.inputChat="";
    $ionicScrollDelegate.scrollBottom();
  }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('IndexCtrl',function($scope,Lbs,HotNews,HotPros,HotActives,$rootScope,$ionicActionSheet,$timeout,$state){ 
  $scope.logo="./img/logo_v2.png"
  $scope.myActiveSlide =1;
  $scope.lbs = Lbs.all();
  $scope.news=HotNews.all();
  $scope.pros=HotPros.all();
 $scope.acts=HotActives.all();
  $scope.$on('$ionicView.enter', function () {
        // 显示 tabs
        $rootScope.hideTabs = false;
    })
  $scope.addQuestion=function(){ 
       var hideSheet = $ionicActionSheet.show({
                      buttons: [{ text: '<a >发起提问</a> ' },],
                      cancelText: '取消',
                      cancel: function() {
                         },
                      buttonClicked: function(index) {
                        $state.go("tab.addQuestion");
                        return true;
                      }
                  });
                  $timeout(function() {
                      hideSheet();
                  }, 2000);
  }
})
.controller("NewsDetailCtrl",function($scope,NewDetial,$stateParams,HotNews){
$scope.newsDetail=NewDetial.getById($stateParams.ida); 
$scope.hotNews=HotNews.getById($scope.newsDetail.hotnewId);
        $scope.isFocus = false;        //判断是不是要取芭蕉扇
        $scope.getFocus=function(){ 
             $scope.isFocus = true; //大圣来了
        }
         $scope.setBlur=function(){ 
            $scope.isFocus = false; //大圣来了
        }
})
.controller('ProDetialCtrl',function($scope,HotPros,$stateParams,$ionicScrollDelegate){ 
   $scope.pro=HotPros.getById($stateParams.ida);
   $scope.mtTabShow=true;
   $scope.showIntro=true;
   $scope.showRule=false;
   $scope.intisActive=true;
   $scope.ruleisActive=false;
   $scope.showItem=function(id){ 
      if(id==1){ 
    $scope.showIntro=true;
   $scope.showRule=false;
   $scope.intisActive=true;
   $scope.ruleisActive=false;
 }else if(id==2){
   $scope.showIntro=false;
   $scope.showRule=true;
   $scope.intisActive=false;
   $scope.ruleisActive=true;
 }
   }
   $scope.test=function(){ 
   if($scope.mtTabShow && $ionicScrollDelegate.getScrollPosition().top>200){ 
       $scope.mtTabShow=false;
         $scope.$evalAsync();
   } 
   if(!$scope.mtTabShow && $ionicScrollDelegate.getScrollPosition().top <= 180){ 

      $scope.mtTabShow=true;
        $scope.$evalAsync();
   }
   }
})
.controller('PersonalCtrl',function($scope,locals,User){
  var userId=locals.getObject("user").id;
  $scope.personalIndex=User.getById(userId)

  $scope.myPro=[{ id:1,name:'我的投资项目',icon:'ion-social-usd-outline'},
    { id:2,name:'我发起项目',icon:'ion-shuffle'},
    { id:3,name:'我的约谈记录',icon:'ion-chatbubble-working'},
    { id:4,name:'我的领头记录',icon:'ion-paper-airplane'}
  ];
  $scope.mySetting={ 
    id:1,
    name:'设置',
    icon:'ion-gear-a'
  }
})
.controller('PersonalProCtrl',function(){ 

})
.controller('PersonalEditCtrl',function($scope,User,locals){ 
 var userId=locals.getObject("user").id;
  $scope.personalIndex=User.getById(userId)
})
.controller('PersonalDetialCtrl',function($scope,User,locals,$state){
    var userId=locals.getObject("user").id;
  $scope.personalIndex=User.getById(userId)
  $scope.myPro=[{ id:1,name:'我的提问',icon:'ion-ios-help-outline'},
    { id:2,name:'我的回答',icon:'ion-ios-information-outline'}
  ];
  $scope.myState={ 
    id:1,
    name:'全部动态',
    icon:'ion-ios-pulse'
  }
  $scope.editMyself=function(){ 
      $state.go('tab.personalEdit');
  }
})
.controller('PersonalSettingsCtrl',function($scope,locals,$state){
  $scope.myPro=[{ id:1,name:'手机号绑定',icon:'ion-social-usd-outline',data:'',url:'',action:"clearCach()"},
    { id:2,name:'新消息通知',icon:'ion-ios-paper-outline',data:'',url:'#/tab/personal/newmsg',action:"clearCach()"},
    { id:3,name:'清楚图片缓存',icon:'ion-ios-paper-outline',data:'309KB',url:'',action:"clearCach()"},
    { id:4,name:'清楚缓存',icon:'ion-ios-paper-outline',url:'',data:locals.getSize(),action:"clearCach()"},
  ];
   $scope.myPro2=[{ id:1,name:'帮助反馈',icon:'ion-social-usd-outline',data:''},
    { id:2,name:'关于我们',icon:'ion-ios-paper-outline',data:''}
  ];
  $scope.clearCach=function(){ 
   locals.clear();
    $scope.myPro[3].data=locals.getSize();
  }
  $scope.loginOut=function(){ 
    locals.clearByKey("user");
    $state.go("login");
  }
})
.controller('PersonalNewMsgCtrl',function($scope){

  $scope.myPro=[{ id:1,name:'接受新消息提示',content:'',icon:'ion-social-usd-outline',data:'',url:''},
    { id:2,name:'消息通知详情',content:'关闭后再收到消息通知将不显示发信人和内容摘要',icon:'ion-ios-paper-outline',data:'',url:'#/tab/personal/newmsg'}
  ];
   $scope.myPro2=[{ id:1,name:'声音',icon:'ion-social-usd-outline',data:''},
    { id:2,name:'振动',icon:'ion-ios-paper-outline',data:''}
  ];
})
.controller('CommunityCtrl',function($scope,MyCommunity,Issues,User,$ionicViewSwitcher){
 $scope.myHref=function(item){ 
    $ionicViewSwitcher.nextDirection('forward');
                $state.go('communityDetial', {'cmmId':item});
 } 
$scope.myCommunity=MyCommunity.all();
var width=$scope.myCommunity.length*40+"%";
if(document.getElementById("my-community")){
document.getElementById("my-community").style.width=width;
}else{ 
}
$scope.pros=Issues.getByType(1);
for(var i=0;i<$scope.pros.length;i++){ 
  $scope.pros[i]['user']=User.getById($scope.pros[i].questionerId)
}
$scope.go=function(id){
var  active=MyCommunity.getByActive();
  if(id==active.id){}else{
    active.active="noactive";
    MyCommunity.getById(id).active="active";
$scope.pros=Issues.getByType(id);
for(var i=0;i<$scope.pros.length;i++){ 
  $scope.pros[i]['user']=User.getById($scope.pros[i].questionerId)
}
  }
}
  })
.controller('CommunityDetialCtrl',function($scope,Issues,User,$stateParams){ 
 $scope.disabled=false;
 $scope.textContent="关注";
$scope.btnColor="btn-green";
$scope.cmmId=$stateParams.cmmId ;
$scope.Issue=Issues.getById($scope.cmmId)  
console.log($scope.Issue)
$scope.questioner=User.getById($scope.Issue.questionerId);
$scope.sign=$scope.questioner.sign;
$scope.name=$scope.questioner.name;
$scope.tags=$scope.Issue.tags;
$scope.contents=[];
for(var i=0;i<$scope.Issue.content.length;i++){
  var obj =$scope.Issue.content[i];
  var user =User.getById(obj.userId)
obj['user']=user;
  $scope.contents.push(obj)
}
  $scope.gofollow=function(){ 
  $scope.Issue.follow+=1;
  $scope.follow=$scope.Issue.follow;
  $scope.disabled=true;
  $scope.textContent="已关注";
  $scope.btnColor="btn-gray";
}
}).
controller("QuotesCtrl",function($scope,$ionicPopup,$ionicLoading,QuotesService,LocalStorageService){
  $scope.symbols = LocalStorageService.get('quotes', ['YHOO', 'AAPL', 'GOOG', 'MSFT', 'FB', 'TWTR']);
  //   $scope.form = { 搜索条件不要了
  //   query: ''
  // };
//    $scope.state = {
//         reorder: false
//       };
//     function updateSymbols() {
//         var symbols = [];
//         angular.forEach($scope.quotes, function(stock) {
//           symbols.push(stock.Symbol);
//         });
//         $scope.symbols = symbols;
//         LocalStorageService.update('quotes', symbols);
//       }//
//重新排序不要了
// $scope.reorder = function(stock, $fromIndex, $toIndex) {
//     $scope.quotes.splice($fromIndex, 1);
//     $scope.quotes.splice($toIndex, 0, stock);
//     updateSymbols();
//   };
   $scope.getQuotes = function() {
        QuotesService.get($scope.symbols).then(function(quotes) {
          $scope.quotes = quotes;
        }, function(error) {
          $ionicPopup.alert({
            template: 'Could not load quotes right now. Please try again later.'
          });
        }).finally(function() {
          $ionicLoading.hide();
          $scope.$broadcast('scroll.refreshComplete');
        });
      };
      //像列表添加。。不要了
    //     $scope.add = function() {
    // if ($scope.form.query) {
    //       QuotesService.get([$scope.form.query]).then(function(results) {
    //         if (results[0].Name) {
    //           $scope.symbols.push($scope.form.query);
    //           $scope.quotes.push(results[0]);
    //           $scope.form.query = '';
    //           updateSymbols();
    //         } else {
    //           $ionicPopup.alert({
    //             title: 'Could not locate symbol.'
    //           });
    //         }
    //       });
    //     }
    //   };
    //像列表删除。。。不要了
      // $scope.remove = function($index) {
      //   $scope.symbols.splice($index, 1);
      //   $scope.quotes.splice($index, 1);
      //   updateSymbols();
      // };
    //样式区别不要了
  //      $scope.quoteClass = function(quote) {
  //   if (quote.PreviousClose < quote.LastTradePriceOnly) {
  //     return 'positive';
  //   }
  //   if (quote.PreviousClose > quote.LastTradePriceOnly) {
  //     return 'negative';
  //   }
  //   return '';
  // };
      $ionicLoading.show();
      $scope.getQuotes();


})
.directive('setFocus',['$timeout', function($timeout){
         return {
             scope:false,
             link:function(scope, element){                     
                 scope.$watch("isFocus",function(newValue,oldValue, scope) {
                     //大圣来了，且要取芭蕉扇
                     if(newValue){
                      $timeout(function() {
                 element[0].focus();
            },300);
                        // element[0].focus(); //获取焦点
                        // console.info("猴哥，老牛不在家，我一介女子还不是你说什么我就照做，可你进入人家的身体也不打声招呼，进了就进了，还搞得我那么难受，求你别搞了，给，芭~~~蕉~~~扇！")
                     }
                }, true);
             }
         };
    }]);
;
