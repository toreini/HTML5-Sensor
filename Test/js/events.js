var socket;
var count=1;

function socketInit()
{
	//alert("Enter Soclet Init!");
	socket=io.connect();
	socket.on('connected',function(){
		console.log('user Connected to Browsers!');
		//var name=prompt('What is you Name?');
		//this.emit('connection','OK');
		//alert('Socket Connected!');
		
		if (window.DeviceOrientationEvent){
			console.log("Orientation is Supported!");
			
			document.getElementById("Odata").innerHTML="Device Orientation";

			window.addEventListener('deviceorientation',function(event){
				
				var gamma=event.gamma;
				var beta=event.beta;
				var alpha=event.alpha;						
				
				document.getElementById("OX").innerHTML=gamma;
				document.getElementById("OY").innerHTML=beta;
				document.getElementById("OZ").innerHTML=alpha;	
				//var i;
				//for (i=1;i<=10;i++)
				//{
				//	console.log(i+" Is Sending!");
				//	socket.emit('OX',i);
				//} 
				socket.emit('OX',gamma);
				count++;
				socket.emit('OY',beta);
				count++;
				socket.emit('OZ',alpha);
				count++;				
			});		
		}
		else if (window.OrientationEvent){
			alert("MozOrientation is Supprted!");
		}
		else{		
			alert("Not Supprted!");
		}



		/*if (window.DeviceMotionEvent){
			alert("Motion is Supported!");
			
			 document.getElementById("Mdata").innerHTML="Device Motion";
			document.getElementById("MGdata").innerHTML="Device G Motion";

			window.addEventListener('devicemotion',function(event){

				var acceleration=event.acceleration;
				var gacc=event.accelerationIncludingGravity;

				//var ax=acceleration.x;
				//var ay=acceleration.y;
				//var az=acceleration.z;			
							
				document.getElementById("MX").innerHTML=ax;
				document.getElementById("MY").innerHTML=ay;
				document.getElementById("MZ").innerHTML=az;
				
				//var gx=gacc.x;
				//var gy=gacc.y;
				//var gz=gacc.z;

				document.getElementById("MGX").innerHTML=gx;
				document.getElementById("MGY").innerHTML=gy;
				document.getElementById("MGZ").innerHTML=gz;
				
				//socket.emit('MX',ax);
				//socket.emit('MY',ay);
				//socket.emit('MZ',az);
				
				//socket.emit('MGX',gx);
				//socket.emit('MGY',gy);
				//socket.emit('MGZ',gz);			
				
			});		 
		}
		
		else{		
			alert("Motion Not Supprted!");
		}*/
	
    });
}

function orient(){
	socketInit();
}


function showCount(){
	socket.emit('count',count);
}