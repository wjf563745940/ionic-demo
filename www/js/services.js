angular.module('starter.services', [])
.factory('locals',function($window){ 
  return{
set:function(key,value){
  $window.localStorage[key]=value;
},
get:function(key,defaultVallue){ 
  return $window.localStorage[key] || defaultVallue;
},
setObject:function(key,obj){
  $window.localStorage[key]=JSON.stringify(obj);

},
getObject:function(key){
  return JSON.parse($window.localStorage[key] || '{}');
},
addObject:function(key,obj){
 var objs=JSON.parse($window.localStorage[key]);

 if(Array.prototype.toString.call(objs)==="[object String]"){ 

 }
},
clear:function(){ 
   $window.localStorage.clear();
},
clearByKey:function(key){ 
   $window.localStorage.removeItem(key);
},
getSizeByName:function(name){ 
   return ($window.localStorage.getItem("name").length/1024).toFixed(2)
},
getSize:function(){ 
  var ls=0.00;
      for(o in $window.localStorage){ 
          ls+=($window.localStorage[o].length)/1024;
      }
      return ls.toFixed(2)+"KB"
},
isEmptyObj:function(e){ 
    var t;  
    for (t in e)  
        return !1;  
    return !0  
 
}
  
}

})
.factory('ChatsDetail',function(){ 
  var chatList=[
  {id:1,userId:1,fromUserId:2,list:[{ id:1,userId:1,myself:true,content:'我在测试',time:'18:00'},{ id:2,userId:2,myself:false,content:'你别测试了测试',time:'18:05'}]},
  {id:2,userId:1,fromUserId:1,list:[{ id:1,userId:1,myself:true,content:'我在测试',time:'18:00'},{ id:2,userId:1,myself:true,content:'我针对测试',time:'18:05'}]},
  {id:3,userId:1,fromUserId:3,list:[{ id:1,userId:3,myself:false,content:'my name is Adam',time:'18:05'}]},
  {id:4,userId:1,fromUserId:4,list:[{ id:1,userId:4,myself:false,content:'my name is perry ,how you doning',time:'18:05'}]},
  {id:5,userId:1,fromUserId:5,list:[{ id:1,userId:4,myself:false,content:'my name is mike ,how do you do',time:'18:05'}]}

  ];
  return { 
    getId:function(userId,fromUserId){
      for(var i=0;i<chatList.length;i++){ 
            if(chatList[i].userId==userId && chatList[i].fromUserId==fromUserId ){ 
            return    chatList[i].id         
            }
        }
      return -1
    },
    getByUsersId:function(userId,fromUserId){ 
        for(var i=0;i<chatList.length;i++){ 
            if(chatList[i].userId==userId && chatList[i].fromUserId==fromUserId ){ 
            return    chatList[i].list           
            }
        }
      return null
    },
    getIdByUsersId:function(id){ 
      for(var i=0;i<chatList.length;i++){ 
            if(chatList[i].id==id ){ 
            return    chatList[i].list.length+1;           
            }
        }
    },
    addlist:function(id,obj){ 
       for(var i=0;i<chatList.length;i++){ 
            if(chatList[i].id==id ){ 
                      chatList[i].list.push(obj)
            }
        }
    }
  }
})
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    lastTime:'2016.8.8 18:00',
    face: 'img/ben.png',
    userId:2
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    lastTime:'2016.8.8 18:00',
    face: 'img/max.png',
    userId:1
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    lastTime:'2016.8.8 18:00',
    face: 'img/adam.jpg',
    userId:3
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    lastTime:'2016.8.8 18:00',
    face: 'img/perry.png',
     userId:4
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    lastTime:'2016.8.8 18:00',
    face: 'img/mike.png',
     userId:5
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    gotop:function(chat){ 
    chats.splice(chats.indexOf(chat), 1)
     chats.unshift(chat);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
}).factory('Lbs',function(){ 
  var lbs=[{ 
    id:1,
    order:1,
    ur:'img/index1.jpg'
  },
  { 
    id:2,
    order:2,
    ur:'img/index1.jpg'
  },
  { 
    id:3,
    order:3,
    ur:'img/index1.jpg'
  }];
  return { 
    all:function(){ 
      return lbs;
    },
    getById:function(lbId){ 
      for(var i=0;i<lbs.length;i++){ 
        if(lbs[i].id === parseInt( lbId)){

          return lbs[i];
        }
        
      }return null;
    }
  }
}).factory('HotNews',function(){ 

  var news=[{id:1,title:"test",content:'投资老司机，都要从哪里下载数据报告，行业研究必备',img:'img/l1.jpg',tag:'标签',chatNum:'3',thumbsup:'10'},
  {id:2,title:"test",content:'投资老司机，都要从哪里下载数据报告，行业研究必备',img:'img/l2.jpg',tag:'标签2',chatNum:'3',thumbsup:'10'},
  {id:3,title:"test",content:'投资老司机，都要从哪里下载数据报告，行业研究必备',img:'img/l3.jpg',tag:'标签3',chatNum:'31',thumbsup:'10'}];
  return { 
    all:function(){ 
      return news;
    },
      getById:function(newsId){ 
      for(var i=0;i<news.length;i++){ 
        if(news[i].id===parseInt(newsId)){

          return news[i];
        }
        
      }return null;
    }
  }

}).factory('NewDetial',function(HotNews){
var NewDetials=[{id:1,hotnewId:1,time:'1周前',sections:[{img:'img/s1.jpg',text:'兰博基尼在意大利博洛尼亚的总部的50周年庆典上推出了一款命名为Egoista的概念车。车型采用非常独特的单座布局。Egoista在意大利语中就是自私的意思，因此也比较贴合其非常独特的单座布局。这款概念车是由大众集团首席设计师瓦尔特·德·席尔瓦亲自操刀设计的,'+
'其单座舱的布局来自于飞机，整车的线条感极强，立体感和层次感非常丰富。'},{img:'img/s2.jpg',text:'兰博基尼为了庆祝其品牌成立50周年，在意大利正式发布旗下全新概念车Egoista。车型采用非常独特的单座布局.Egoista在意大利语中的意思就是自私的意思，因此也比较贴合其非常独特的单座布局。这款概念车的设计由大众集团首席设计师瓦尔特·德·席尔瓦亲自操刀设计，其单座舱的布局来自于飞机，整车的线条感极强，立体感和层次感非常丰富'},
{img:'img/s3.jpg',text:'兰博基尼官方称Egoista概念车是一款为个人打造的运动化车型，追求的的就是极致的性能享受，同时独特的外观也可以展现另类的风格。'}
],relation:[{newDetialId:2,title:'哈哈哈',time:'1个月前',tab:'汽车'}],comment:[]
}] 
  return { 
      getById:function(id){ 
          for(var i=0;i<NewDetials.length;i++){ 
              if(id===NewDetials[i].id)
                return NewDetials[i]
          }
          return null;
      }
  }
})
.factory('HotPros',function(){ 

  var pros=[{id:1,title:"tesProt",content:'系列网络电影“正义联盟“喝喝”第一期,等你来认购',img:'img/l1.jpg',state:"预热中",cState:"c-state1",targetFinancing:'150',alreadyFinancing:'0',lastDay:'200',pageViews:'200',successDay:'',financingNumber:'0' },
  {id:2,title:"testPro",content:'系列网络电影“正义联盟“喝喝”第一期,等你来认购',img:'img/l3.jpg',state:"认购中",cState:"c-state2",targetFinancing:'1510',alreadyFinancing:'120',lastDay:'100',pageViews:'200',successDay:'',financingNumber:'22'},
  {id:3,title:"testPro",content:'系列网络电影“正义联盟“喝喝”第一期,等你来认购',img:'img/l2.jpg',state:"筹资成功",cState:"c-state1",targetFinancing:'1150',alreadyFinancing:'1150',lastDay:'0',pageViews:'200',successDay:'2016.8.12',financingNumber:'222'}];
  return { 
    all:function(){ 
      return pros;
    },
      getById:function(prosId){ 
      for(var i=0;i<pros.length;i++){ 
        if(pros[i].id===parseInt(prosId)){

          return pros[i];
        }
       
      } return null;
    }
  }

})
.factory('HotActives',function(){ 
  var acts=[{id:1,title:'[ 热门 ]   1000W赏金猎人： 去寻找潜伏在黑暗中的独角兽！',content:'testActContent',img:'img/index1.jpg'},
  {id:2,title:'[ 热门 ]   1000W赏金猎人： 去寻找潜伏在黑暗中的独角兽！',content:'testActContent',img:'img/index1.jpg'},
  {id:3,title:'[ 热门 ]   1000W赏金猎人： 去寻找潜伏在黑暗中的独角兽！',content:'testActContent',img:'img/index1.jpg'}];
    return { 
    all:function(){ 
      return acts;
    },
      getById:function(actsId){ 
      for(var i=0;i<acts.length;i++){ 
        if(acts[i].id===parseInt(actsId)){

          return acts[i];
        }
       
      } return null;
    }
  }
})
.factory('MyCommunity',function(){ 
  var mycms=[{ id:1,name:'最热',active:'active'},{ id:2,name:'最新',active:'noactive'},{ id:3, name:'社交',active:'noactive'},
{  id:4,name:'国际',active:'noactive'}] ;
return {

  all:function(){ 
    return mycms;
  },
  getById:function(mycmsId){ 
      for(var i=0;i<mycms.length;i++){ 
        if(mycms[i].id===parseInt(mycmsId)){
          return mycms[i];
        }     
      } return null;
  },
  getByActive:function(){ 
    for(var i=0;i<mycms.length;i++){ 
        if(mycms[i].active==='active'){
          return mycms[i];
        }     
      } return null;
  }
}
})
.factory("Issues",function(){ 
  var issues=[{id:1,type:1,questionerId:1,time:'9月9 16:00',tags:["泛投资"],title:'你到底叫不叫爸爸嘿嘿嘿额？',conten:'',content:[
  { id:1,userId:1,content:"如果说乔不是是处女座的ceo，对产品的要求达到了机制；那么我觉得库克孙哥魔蝎座的ceo，工作狂魔，但是亮点难处，毕竟乔布斯的光辉这么强大，一般人很难超越"
  } ],contentNum:1,follow:22},
  {id:2,type:1,questionerId:2,time:'9月9 16:00',tags:["泛投资"],title:'tim cook 是不是一个好的苹果CEO？',conten:'',content:[
  { id:1,userId:1,content:"如果说乔不是是处女座的ceo，对产品的要求达到了机制；那么我觉得库克孙哥魔蝎座的ceo，工作狂魔，但是亮点难处，毕竟乔布斯的光辉这么强大，一般人很难超越"
  } ],contentNum:1,follow:22},
   {id:3,type:2,questionerId:2,time:'9月9 16:00',tags:["泛投资"],title:'你到底叫不叫爸爸嘿嘿嘿额？',conten:'',content:[
  { id:1,userId:3,content:"汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪"
  }, 
  { id:2,userId:4,content:"sadsdsadsadasdasdasd"
  },
  { id:3,userId:5,content:"楼上sb"
  },
  { id:4,userId:5,content:"爸爸来了"
  },
  { id:5,userId:2,content:"鉴定无误"
  },
  ],contentNum:2,follow:22}
  ];
  return { 
    all:function(){ 
    return issues;
  },
  addIss:function(type,questionerId,tags,title){ 
    var id= issues.length+1;
     var myDate = new Date();
     var time=myDate.getHours()+":"+myDate.getMinutes();
      var is={id:id,type:type,questionerId:questionerId,time:time,tags:tags,title:title,contentNum:0,follow:0,content:[],conten:''};
      issues.push(is) ; 
  },
  getNewIs:function(){ 
    return issues[issues.length-1];
  },
  getByType:function(typeId){ 
    var typeissues=[]
    for(var i=0;i<issues.length;i++){ 
        if(issues[i].type===parseInt(typeId)){
          typeissues.push(issues[i])
        }     
      } return typeissues;
  },
   getById:function(issId){ 
   for(var i=0;i<issues.length;i++){ 
        if(issues[i].id===parseInt(issId)){
          return issues[i];
        }     
      } return null;
  }
  }
})
.factory("User",function(){ 
  var users=[{id:1,name:"小那咋",sign:'变态即是正义',follow:100000,header:'img/max.png'},
  {id:2,name:"Ben Sparrow",sign:'变态即是正义2',follow:100000,header:'img/ben.png'},
{id:3,name:"Adam",sign:'变态即是正义3',follow:100000,header:'img/adam.jpg'},
{id:4,name:"perry",sign:'变态即是正义4',follow:100000,header:'img/perry.png'},
{id:5,name:"mike",sign:'变态即是正义5',follow:100000,header:'img/mike.png'}
  ];
  return{
  getById:function(usersId){ 
      for(var i=0;i<users.length;i++){ 
        if(users[i].id===parseInt(usersId)){
          return users[i];
        }     
      } return null;
  }
  }
})
.factory("Question",function(){ 

  return { 
      initQuestion:function(id,title,content,tabs){ 
        this.id=id;
        this.title=title;
        this.content=content;
        this.tabs=tabs
      }

  }
})
.factory("Questions",function(Question){ 
  var questions=[];
  return { 
      getById:function(id){ 
        for(var i=0;i<questions.length;i++){ 
          if(questions[i].id==id)
            return questions[i]
        }
        return null;

      },
      addQuestion:function(title,content,tabs){ 
        var id=questions.length+1;
        var q=new Question.initQuestion(id,title,content,tabs);
        questions.push(q);
        console.log(questions)
      },
      setTabs:function(id,tabs){ 
          for(var i=0;i<questions.length;i++){ 
          if(questions[i].id==id)
            questions[i].tabs=tabs;
        }
      },
      getNewQuestion:function(){ 
        if(questions.length!=0){
          return questions[questions.length-1]
        }
      }
  }
})
.factory("Tags",function(){ 
  var tags=[{id:1,name:'泛投资',img:'ion-medkit',sel:false},
  {id:2,name:'互联网金融',img:'ion-medkit',sel:false},
  {id:3,name:'汽车之家',img:'ion-medkit',sel:false},
  {id:4,name:'医疗健康',img:'ion-medkit',sel:false},
  {id:5,name:'爱游戏',img:'ion-medkit',sel:false},
  {id:6,name:'二次元',img:'ion-medkit',sel:false}];
  return { 
      all:function(){ 
        return tags;
      },
      getById:function(id){ 
        for(var i=0;i<tags.length;i++){
          if(tags[i].id==id)
            return tags[i]
        }
        return null;
      },
      getIndexById:function(id){ 
        for(var i=0;i<tags.length;i++){
          if(tags[i].id==id)
            return i
        }
        return 0;
      }
  }
})
.factory("Dynameics",function(User){ 
  var ds=[{id:1,typeName:'发起了一个问题',title:"test",issueID:3,time:'18:00'},
  {id:2,typeName:'回答了一个问题',title:"test",issueID:3,time:'18:00'}];
  var mTm=[{id:1,dsId:1,userId:5},{id:2,dsId:2,userId:4}]
  return {
    getByUserId:function(userId){ 
    var dsIDs=[]
      for(var i=0;i<mTm.length;i++){ 
        if(mTm[i].userId==userId)
          dsIDs.push(mTm[i].dsId)
      }
      if(dsIDs.length!=0){ 
        var objs=[];
        for(var j=0;j<dsIDs.length;j++){ 
   
            for(var k=0;k<ds.length;k++){ 
              if(ds[k].id==dsIDs[j]){
                ds[k].user=User.getById(userId);
                objs.push(ds[k])
                }
            }
        }
        return objs;
      }
      return null;

  },
  addDs:function(typename,title,issueId,userId){ 
    var id=ds.length+1;
    var myDate = new Date();
     var time=myDate.getHours()+":"+myDate.getMinutes();
    var d={ id:id,typeName:typename,title:title,issueID:issueId,time:time};
    ds.push(d);
    var mId=mTm.length+1;
    var m={id:mId,dsId:id,userId:userId}
    mTm.push(m);
  }
}

})
.factory('QuotesService',function($q,$http){ 
  var QuotesService={};
  QuotesService.get=function(symbols){ 
      symbols=symbols.map(function(symbol){ 
        return "'"+symbol.toUpperCase()+"'";
      });
      var defer=$q.defer();
      $http.get('https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.quotes where symbol in (' + symbols.join(',') + ')&format=json&env=http://datatables.org/alltables.env').success(function(quotes){ 
        if(quotes.query.count===1){ 
          quotes.query.results.quote=[quotes.query.results.quote];
        }
          defer.resolve(quotes.query.results.quote);
      }).error(function(error){ 
         defer.reject(error);
        });
      return defer.promise;
  };
    return QuotesService;
})
.factory('LocalStorageService', function() {
  return {
    get: function LocalStorageServiceGet(key, defaultValue) {
      var stored = localStorage.getItem(key);
      try {
        stored = angular.fromJson(stored);
      } catch(error) {
        stored = null;
      }
      if (defaultValue && stored === null) {
        stored = defaultValue;
      }
      return stored;
    },
    update: function LocalStorageServiceUpdate(key, value) {
      if (value) {
        localStorage.setItem(key, angular.toJson(value));
      }
    },
    clear: function LocalStorageServiceClear(key) {
      localStorage.removeItem(key);
    }
  };

});
;
