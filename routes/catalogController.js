var express = require('express');
var router = express.Router();
var itemDb = require('../utility/ItemDB');



router.get('/',function(req, res){
	  var userSession=req.session.theUser;
		var userId="tnandam";
		  if(userSession==undefined){
	res.render('index', {login:[]});
}
else {
		res.render('index',{firstname:userId,login:[1]})
}
});



router.get('/categories',function(req, res){
	  var userSession=req.session.theUser;
		var userId="tnandam";
    var itemData = itemDb.getItems();
		itemData = itemData.exec();
  if(userSession==undefined){
		itemData.then(function(docs){
			console.log("likki", docs);
res.render('categories',{data:docs, login:[]});
		});
}
else {
	itemData.then(function(docs){
		res.render('categories',{data:docs, firstname:userId, login:[1]});
			});
}
});



router.get('/categories/viewCatalog/:itemCode',function(req, res){
  var itemCode = req.params.itemCode;
	var userSession=req.session.theUser;
	var userId="tnandam";
    var item = itemDb.getItem(itemCode);
		var myBooks=itemDb.getItems();
		item = item.exec();
		myBooks=myBooks.exec();
    var data= {
        title:'Item',
        path: req.url,
        item: item
    }
		if(item == "error" ){
			//test
		}
else{
	   if(userSession==undefined){
			 item.then(function(docs){
				 test = docs;
				 if(docs.length!=0){
					 res.render('item',{data:docs,myBooks:myBooks, alert:'', login:[]});
				 }
				 else{
					 myBooks.then(function(docs){
				 		console.log("likki", docs);
				 res.render('categories',{data:docs, login:[]});
			 });
				}
			 });
	}
	else {
		item.then(function(docs){
			console.log("likki", docs);
			if(docs.length!=0){
res.render('item',{data:docs,myBooks:myBooks, alert:'', firstname:userId, login:[1]});
}
else {
	myBooks.then(function(docs){
	 console.log("likki", docs);
res.render('categories',{data:docs,firstname:userId, login:[1]});
});
}
		});
	}
	}
// 	if(itemCode.length===0){
// 		  if(userSession==undefined){
// 				myBooks.then(function(docs){
// 					console.log("likki", docs);
// 		res.render('categories',{data:docs, login:[]});
// 				});
// 	}
// 	else {
// 		itemData.then(function(docs){
// 			console.log("likki", docs);
// res.render('categories',{data:docs,  firstname:userId, login:[1]})
// 		});
// 	}
// 	}
	// else if(item.length===0){
	// 	res.render('categories','We cannot find the item you ar looking for')
	// }
});



router.get('/contact',function(req, res){
	var userSession=req.session.theUser;
	var userId="tnandam";
	if(req.url == '/' || req.url == '/contact')
	if(userSession==undefined){
    res.render('contact', {alert:'', login:[]});
}
else {
res.render('contact', {firstname:userId, login:[1], alert:''});
}
});


router.get('/about',function(req, res){
	var userSession=req.session.theUser;
	var userId="tnandam";
	if(req.url == '/' || req.url == '/about')
	if(userSession==undefined){
    res.render('about', { login:[]});
	}
	else {
		res.render('about', {firstname:userId, login:[1]});
	}
});

router.get('/store',function(req, res){
	var userSession=req.session.theUser;
	var userId="tnandam";
	if(req.url == '/' || req.url == '/store')
	if(userSession==undefined){
  	res.render('store', { login:[]});
	}
	else {
		res.render('store', {firstname:userId, login:[1]});
	}
});

router.get('/profile',function(req, res){
	var userSession=req.session.theUser;
	var userId="tnandam";
	if(req.url == '/' || req.url == '/profile')
	if(userSession==undefined){
    	res.render('feedback', {login:[]});
	}
	else {
		res.render('feedback', {firstname:userId, login:[1]});
	}
});


router.get('/*',function(req, res){
	var userSession=req.session.theUser;
	var userId="tnandam";
	if(userSession==undefined){
		res.render('sessionerror', { login:[]});
}
else {
		res.render('sessionerror', {firstname:userId, login:[1]});
}
});

// var categories = [];
//
// let getCategories = function() {
//     var data = itemDb.getItems();
//     data.forEach(function (item) {
//         if(!categories.includes(item.catalogCategory)){
//             categories.push(item.catalogCategory);
//         }
//
//     });
//     return categories;
// };

module.exports = router;
