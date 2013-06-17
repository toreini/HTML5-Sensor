function orient(){
	if (window.DeviceOrientationEvent){
		alert("Orientation is Supported!");
		
		document.getElementById("Odata").innerHTML="Device Orientation";

		window.addEventListener('deviceorientation',function(event){

			var gamma=event.gamma;
			var beta=event.beta;
			var alpha=event.alpha;			
			
			document.getElementById("OX").innerHTML=gamma;
			document.getElementById("OY").innerHTML=beta;
			document.getElementById("OZ").innerHTML=alpha;	
		});		
	}
	else if (window.OrientationEvent){
		alert("MozOrientation is Supprted!");
	}
	else{		
		alert("Not Supprted!");
	}



	if (window.DeviceMotionEvent){
		alert("Motion is Supported!");
		
		document.getElementById("Mdata").innerHTML="Device Motion";
		document.getElementById("MGdata").innerHTML="Device G Motion";

		window.addEventListener('devicemotion',function(event){

			var acceleration=event.acceleration;
			var gacc=event.accelerationIncludingGravity;

			var x=acceleration.x;
			var y=acceleration.y;
			var z=acceleration.z;			
			
			document.getElementById("MX").innerHTML=x;
			document.getElementById("MY").innerHTML=y;
			document.getElementById("MZ").innerHTML=z;

			var x=gacc.x;
			var y=gacc.y;
			var z=gacc.z;			
			
			document.getElementById("MGX").innerHTML=x;
			document.getElementById("MGY").innerHTML=y;
			document.getElementById("MGZ").innerHTML=z;
		});		
	}
	
	else{		
		alert("Motion Not Supprted!");
	}

}