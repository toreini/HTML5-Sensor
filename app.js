//Mongodb Connection
	
 /* if(process.env.VCAP_SERVICES){
	
	var env = JSON.parse(process.env.VCAP_SERVICES);
	var mongo = env['MONGOLAB_URI'][0]['credentials'];
	
	//console.log("Server Service in "+process.env.VCAP_SERVICES+" Entered!");
}
else{
    var mongo = {
    "hostname":"localhost",
    "port":27017,
    "username":"",
    "password":"",
    "name":"",
    "db":"db"
    }
}
var generate_mongo_url = function(obj){
	obj.hostname = (obj.hostname || 'localhost');
	obj.port = (obj.port || 27017);
	obj.db = (obj.db || 'test');
	if(obj.username && obj.password){
		return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
	}
	else{
		return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
	}
}  */


//console.log('Mongo is listening to Port '+mongo['port']);
//var mongourl = generate_mongo_url(mongo);
//console.log('Connection to '+mongourl+' Created!');


//var mongourl="mongodb://ehsan:manehsanam@ds029828.mongolab.com:29828/af_socket-toreini";
var mongourl="mongodb://ehsan:manehsanam@ds033818.mongolab.com:33818/sensordata";
//console.log(mongourl);


/*var record_visit = function(req, type){
	console.log(req + ' Entered Record Visit to MongoDB');
    Connect to the DB and auth
    require('mongodb').connect(mongourl, function(err, conn){
		console.log("Mongo Connected!");
		conn.collection('sensor', function(err, coll){
			/* Simple object to insert: ip address and date 
			object_to_insert = { 'type' : type, 'data': req, 'ts': new Date() };
			/* Insert the object then print in response 
			/* Note the _id has been created 
			coll.insert( object_to_insert, {safe:true}, function(err){
				//res.writeHead(200, {'Content-Type': 'text/plain'});
				//res.write(JSON.stringify(object_to_insert));
				//res.end('\n');
				
				//res+='{"Data Inserted:"'+object_to_insert+'"!"}';	
				//console.log(type + ' inserted success');		
				console.log(Data+" Inserted!");
			});
				
			//console.log(req + ' Inserted Data in Mongo DB!');
			
			//var res2;
			//print_visits(req, res2);
		});
    });
}*/


// var print_visits = function(req, res){
    // /* Connect to the DB and auth */
	// console.log(req + ' Entered print_visits to read');
    // require('mongodb').connect(mongourl, function(err, conn){
		// console.log(req + ' connected to MongoDB to read');		
		// conn.collection('datas', function(err, coll){
			// coll.find({}, {limit:10, sort:[['_id','desc']]}, function(err, cursor){
				// cursor.toArray(function(err, items){
					//res.writeHead(200, {'Content-Type': 'text/plain'});
					// res="";
					// for(i=0; i<items.length;i++){
						//res.write(JSON.stringify(items[i]) + "\n");						
						// res+='{"data:"'+items[i].data+",time:"+items[i].ts+'"!"}';	
						// console.log(req + ' Read '+res+' FROM Mongo DB!');
					// }
					//res.end();					
				// });
			// });
		// });
    // });
	
	// console.log('The read Data is:' + res + '\n');
// }

var express=require('express');
var http=require('http');
var app=express();
var server=http.createServer(app);
var socket=require('socket.io').listen(server);
//var mongo=require('mongodb').connect(mongourl);

/* params = require('url').parse(req.url);
if(params.pathname === '/history') 
{
	print_visits(req, res);
}
else
{ */
	app.use(express.static(__dirname+'/Test'));
//}

server.listen(8080);

console.log('server Started at port 8080');
//console.log('MongoConnected!');
//record_visit('test','OX');



    require('mongodb').connect(mongourl, function(err, conn){
		console.log("Mongo Connected!");
		
		socket.sockets.on('connection', function(socket){
			socket.emit('connected');
			console.log('user connected');
	
			socket.on('OX',function(data){
				console.log('OX='+data+' arrived!');
				
				conn.collection('sensor', function(err, coll){
				
					object_to_insert = { 'type' : 'OX', 'data': data, 'ts': new Date() };

					coll.insert( object_to_insert, {safe:true}, function(err){
						console.log("OX Inserted!");
					});				
		//record_visit(data,'OX');
				});
			});
			
			
			socket.on('OY',function(data){
				console.log('OY='+data+' arrived!');
				
				conn.collection('sensor', function(err, coll){
				
					object_to_insert = { 'type' : 'OY', 'data': data, 'ts': new Date() };

					coll.insert( object_to_insert, {safe:true}, function(err){
						console.log("OY Inserted!");
					});				
				});
			});
			
			socket.on('OZ',function(data){
				console.log('OZ='+data+' arrived!');
				
				conn.collection('sensor', function(err, coll){
				
					object_to_insert = { 'type' : 'OZ', 'data': data, 'ts': new Date() };

					coll.insert( object_to_insert, {safe:true}, function(err){
						console.log("OZ Inserted!");
					});				
				});
			});	

			socket.on('count',function(data){			
				console.log("Count is "+data);
			});
		});
	});

//socket.sockets.on('connection', function(socket){
//	socket.emit('connected');
//	console.log('user connected');
	
//	socket.on('OX',function(data){
		
		
//		console.log('Currently '+data+' arrived!');
				
		//record_visit(data,'OX');
//	});
	/* 
	socket.on('OY',function(data){
		//socket.data=data;
		
		//console.log('Currently '+data+' connected!');
		
		//var res;
		
		record_visit(data, 'OY');
	});
	
	socket.on('OZ',function(data){
		//socket.data=data;
		
		//console.log('Currently '+data+' connected!');
		
		//var res;
		
		record_visit(data, res);
	});
	
	socket.on('MX',function(data){
		//socket.data=data;
		
		//console.log('Currently '+data+' connected!');
		
		//var res;
		
		record_visit(data, 'MX');
	});
	
	socket.on('MY',function(data){
		//socket.data=data;
		
		//console.log('Currently '+data+' connected!');
		
		//var res;
		
		record_visit(data, 'MY');
	});
	
	socket.on('MZ',function(data){
		//socket.data=data;
		
		//console.log('Currently '+data+' connected!');
		
		//var res;
		
		record_visit(data, 'MZ');
	});
	
	socket.on('MGX',function(data){
		//socket.data=data;
		
		//console.log('Currently '+data+' connected!');
		
		//var res;
		
		record_visit(data, 'MGX');
	});
	
	socket.on('MGY',function(data){
		//socket.data=data;
		
		//console.log('Currently '+data+' connected!');
		
		//var res;
		
		record_visit(data, 'MGY');
	});
	
	socket.on('MGZ',function(data){
		//socket.data=data;
		
		//console.log('Currently '+data+' connected!');
		
		//var res;
		
		record_visit(data, 'MGZ');
	}); */
	
	
	
	
	// socket.on('set data',function(data){
		// //socket.data=data;
		
		// console.log('Currently '+data+' connected!');
		
		// var res;
		
		// record_visit(data, res);
			
		
	// });
//});



/* var io = require('socket.io').listen(8080);
io.on('Name'
io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
}); */