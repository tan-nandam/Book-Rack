var express=require('express')
var app=express();
var router =express.Router();
var bodyParser= require('body-parser');
var urlencodedParser= bodyParser.urlencoded({extended:false});
var itemDB=require('../utility/ItemDB')
var userItemProfile=require('../models/UserProfile.js');

var myBooks=itemDB.getItems();
var listofitems=itemDB.itemcodes();

var theUser=function(req,res,next){
  req.session.listofitems=listofitems;
  req.session.save();
  next()
}

router.use(theUser);

router.get('/myItems',function(req,res,next){
console.log("You have accessed Profile Controller");
var action=req.query.action
var userSession=req.session.theUser;
var userId="tnandam";
if(userSession==undefined){
  if( action==undefined){

var alert='';
      // req.session.currentProfile=currentProfile;
       // var myBooks=req.session.currentProfile.UserItems;

      // req.session.save();
      var userProfile=userItemProfile.getUserItems(userId);
      userProfile.then(function(docs){
      req.session.theUser=docs;
      var items=docs
      if (docs.length==0)
      {
          res.render('myItems',{myBooks:[],firstname:userId,alert:'No Books', login:[1]});
      }
      else{

          res.render('myItems',{myBooks:docs,firstname:userId,alert:alert, login:[1]});
      }
    });
  }


  else if(action=='bookSave'){
    console.log('Save Action is Called');
 var itemCode=req.query.theItem;
 var myBooks=itemDB.getItem(itemCode);
 item=myBooks.exec();
  item.then(function(docs) {
    if(docs.length!=0){
res.render('item',{data:docs,alert:'Please Sign In to Save this Book!', login:[]});
}
else {
  var myBooks=itemDB.getItems();
  myBooks=myBooks.exec();
  myBooks.then(function(docs){
  res.render('categories',{data:docs,firstname:userId, login:[1],alert:''});
});
}
  });
  // for(i=0;i<myItems.length;i++){
  //   if(myItems[i]._itemCode==itemCode){
  //     myBooks=myItems[i];
  //   }
  // }
  //
  // console.log(myBooks,'is tanusha');
  // if(myBooks.length==0){
  // res.render('item',{data:myBooks,alert:'Added', login:[]});
  // }
  // else if(myBooks.length!=0) {
  //      res.render('item',{data:myBooks,alert:'Please Sign In to Save this Book!', login:[]});
  // }
  }

  else if(action=='bookRate'){
    console.log('Rate Action is Called');
    var itemCode=req.query.theItem;
console.log("likki", itemCode);
    var myBooks=itemDB.getItem(itemCode);
    item=myBooks.exec();
    item.then(function(docs){
      if(docs.length!=0){
       res.render('item',{data:docs,alert:'Please Sign In / add the Book before you Rate It', login:[]});
     }
     else {
       var myBooks=itemDB.getItems();
       myBooks=myBooks.exec();
       myBooks.then(function(docs){
       res.render('categories',{data:docs,firstname:userId, login:[1],alert:''});
     });
     }
     });
  }
}
else
{
  var alert='';
  if(action=='delete'){
  itemCode=req.query.theItem

  var stored=0;

  var myBooks=userItemProfile.getUserItems(userId);
  var present=0;
  myBooks.exec().then(function(docs){
    for(i=0;i<docs.length;i++){
      console.log(docs[i].itemCode,'is the item id ',i)
      if(docs[i].itemCode==itemCode){
        present=1;
      }
    }
    if(present==1){
        userItemProfile.removeItem(userId,itemCode);
    }
    else{
      message='Cant delete'
    }
  });
  var myBooks=userItemProfile.getUserItems(userId);

  myBooks.then(function(docs){
    if(docs.length!=0){
   res.redirect('myitems')
   res.render('myitems',{myBooks:docs,firstname:userId,alert:alert, login:[1]});
 }
 else {
      res.render('myitems',{myBooks:[],firstname:userId,alert:alert, login:[1]});
 }
})
 //   if(myBooks.length!=0){
 // res.render('myitems',{myBooks:myBooks,firstname:req.session.theUser.FirstName,alert:alert, login:[1]});
 //   }
 //   else {console.log('length=0')
 //        res.render('myitems',{myBooks:[],firstname:req.session.theUser.FirstName,alert:alert, login:[1]});
 //   }
}

else if(action==undefined){

  var myBooks=userItemProfile.getUserItems(userId);
  myBooks.exec().then(function(docs){
if(docs.length!=0){
    res.render('myitems',{myBooks:docs,firstname:userId,alert:alert, login:[1]});
}
else{
  message='No Books for this Usser'
    res.render('myitems',{myBooks:[],firstname:userId,alert:alert, login:[1]});
}
});
// userProfile.getUserItems(myBooks);
//  if(myBooks.length!=0){
// res.render('myitems',{myBooks:myBooks,firstname:req.session.theUser.FirstName,alert:alert, login:[1]});
//  }
//  else {
//       res.render('myitems',{myBooks:[],firstname:req.session.theUser.FirstName,alert:alert, login:[1]});
//  }
}


else if(action=='bookSave'){
  var alert='';
var itemCode=req.query.theItem;
var stored=0;
var myBooks=userItemProfile.getUserItems(userId);
myBooks.exec().then(function(docs){
  for(i=0;i<docs.length;i++){
    if(docs[i].itemCode==itemCode){
      stored=1
    }
  }
if(stored==0){
userItemProfile.addItem(userId,itemCode);
}
if(stored==1){
  alert='Book is already saved!';
}
});

var allBooks=userItemProfile.getUserItems(userId);
allBooks.exec().then(function(docs){
res.redirect('myitems')
res.render('myitems',{myBooks:docs,firstname:userId,alert:alert, login:[1]});

});
// if(myBooks.length!=0){
// res.render('myitems',{myBooks:myBooks,firstname:req.session.theUser.FirstName,alert:alert, login:[1]});
// }
// else {
//      res.render('myitems',{myBooks:[],firstname:req.session.theUser.FirstName,alert:alert, login:[1]});
// }

}

else if(action=='update'){
var itemCode=req.query.theItem;
var item=userItemProfile.getUpdatedData(userId, itemCode).exec().then(function(docs){

  if(docs.length!=0){

  res.render('feedback',{myBooks:docs,firstname:userId, login:[1]});
  }
  else
   {
     var myBooks=itemDB.getItems();
     myBooks=myBooks.exec();
     myBooks.then(function(docs){
     res.render('categories',{data:docs,firstname:userId, login:[1],alert:''});
   });
  }

});
// var myBooks=req.session.currentProfile.UserItems;
// myitem=userProfile.updateUserItem(itemCode,myBooks);
// if(myitem.length!=0){
//   for(i=0;i<myitem.length;i++){
// }
// res.render('feedback',{myBooks:myitem,firstname:req.session.theUser.FirstName, login:[1]});
// }
// else {
//      res.render('feedback',{myBooks:[],firstname:req.session.theUser.FirstName, login:[1]});
// }
}

else if(action=='bookRate'){
var itemCode=req.query.theItem;
var stored=0;
var allUserItems=userItemProfile.getUserItems(userId);
allUserItems.exec().then(function(docs){
for(i=0;i<docs.length;i++){
  if(docs[i].itemCode==itemCode){
    stored=1
  }
}

if(stored==1){
  var item=userItemProfile.getUpdatedData(userId, itemCode)
  item.exec().then(function(docs){
res.render('feedback',{myBooks:docs,firstname:userId, login:[1],alert:''});

});
}
else {
  var myBooks=itemDB.getItems();
  myBooks=myBooks.exec();
  myBooks.then(function(docs){
  res.render('categories',{data:docs,firstname:userId, login:[1],alert:''});
});

}
});
// var myBooks=req.session.currentProfile.UserItems;
// var myitem=[]
// for(i=0;i<myBooks.length;i++){
//   if(myBooks[i].Item._itemCode==itemCode){
//     myitem.push(myBooks[i]);
//   }
// }
// items=itemDB.getItems();
// for(i=0;i<items.length;i++){
//   if(items[i]._itemCode==itemCode){
//     item=items[i];
//   }
// }
//
// if(myitem.length!=0){
//   for(i=0;i<myitem.length;i++){
// }
// res.render('feedback',{myBooks:myitem,firstname:req.session.theUser.FirstName, login:[1],alert:''});
// }
// else {
//      res.render('item',{data:item,firstname:req.session.theUser.FirstName, login:[1],alert:'Save the Book before Rating!'});
// }
}

}
});

router.post('/action*',urlencodedParser,function(req,res,next){
  var userId='tnandam'
    var itemcodeobj=req.session.listofitems;
    var theItem=req.query.theItem;
     var action=req.query.action;

      if(action=='feedback'){
     var itemCode=req.query.theItem;

     var rating;
     var madeIt;
     if(req.body.rating!=null){
        rating=req.body.rating;


    userItemProfile.updateRating(userId,itemCode,rating);
    var items=userItemProfile.getUserItems(userId)
    items.exec().then(function(docs){
      if(docs.length!=0){
        res.redirect('myItems')
         res.render('myItems',{myBooks:docs,firstname:userId,alert:'', login:[1]});
      }
      else{
          res.send('No Books');
      }
    });
  }

  if(req.body.madeIt!=null){
    madeIt=req.body.madeIt;
    userItemProfile.updateMadeIt(userId,itemCode,madeIt);
    var items=userItemProfile.getUserItems(userId)
    items.exec().then(function(docs){
      if(docs.length!=0){
        res.redirect('myItems')
         res.render('myItems',{myBooks:docs,firstname:userId,alert:'', login:[1]});
      }
      else{
          res.send('No Books');
      }
    });

  }

     }
 });

router.get('/login', function(req,res,next){
  var userId='tnandam';
  console.log(req.session.theUser,'User Login');
    if(req.session.theUser==undefined){
      var myBooks=userItemProfile.getUserItems(userId)
          myBooks.exec().then(function(docs){
      req.session.theUser=docs
        req.session.save();
    });
    res.render('index',{login:[1],firstname:userId})
    }

});

router.get('/logout',function(req,res,next){
    req.session.destroy();
    console.log('User Logout');
    res.render('index',{login:[]})

});

 module.exports= router;
