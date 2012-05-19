// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require h5bp
//= require jquery.purr
//= require best_in_place

function drawcanvas(){
    text = 'Hello';
    paused=0;
    clockwise=1;
    angle=0.1;
    var scale=1;
    var ball_x=50,
    ball_y=50,
    ball_rad=50,
    ball_mx=1,
    ball_my=1;
    
    var offscreencanvas;
    	
    var imgcanvas=document.getElementById('imgCanvas'),
        imgcontext = imgcanvas.getContext('2d'),
        w = imgcanvas.width,
    	h= imgcanvas.height,    	
    	sw,
    	sh;
        
    //context.font = '66px Arial';
    //context.strokeStyle = 'skyblue';
    //context.fillStyle = 'conrflowerblue';
    
 
    function drawCircle(ctx, x, y, radius, colour){
 	 ctx.fillStyle = colour;
 	 ctx.beginPath();
     ctx.arc(x, y, radius,0,Math.PI*2,true); // Outer circle
     ctx.fill();
    }
    
    function rescale(){
    	sw=image.width*scale;
    	sh=image.height*scale;
    	if (h/w > image.height/image.width){
    		if (sw > w){
    			sh=(sh/sw)*w;
    			sw=w;
    		}
    	}else{
    		if (sh > h){
    			sw=(sw/sh)*h;
    			sh=h;
    		}
    	}
    }
    function drawImage(canvas,context){
    	var w = canvas.width,
    	h=canvas.height,    	
    	sw=image.width*scale,
    	sh=image.height*scale;
    	if (h/w > image.height/image.width){
    		if (sw > w){
    			sh=(sh/sw)*w;
    			sw=w;
    		}
    	}else{
    		if (sh > h){
    			sw=(sw/sh)*h;
    			sh=h;
    		}
    	}
    	context.clearRect(0,0,canvas.width,canvas.height);
    	//context.drawImage(image,0,0,image.width,image.height,-sw/2 + w/2, -sh/2 + h/2,sw,sh);
    	//context.drawImage(image,0,0,image.width,image.height,-origin.x, -origin.y,sw,sh);
    	context.drawImage(canvas,0,0,canvas.width,canvas.height,0, 0,sw,sh);
    }

    //origin = {x:canvas.width/2,y:canvas.height/2};
    origin = {x:0,y:0};
    var image2=new Image();
    image2.src="/assets/green1.jpg";
    var image= new Image();
    image.src="/assets/zita.jpg";
    image.onload= function(){
    	sw=image.width;
    	sh=image.height;
    	imgcontext.drawImage(image,0,0,image.width,image.height,0,0,sw,sh);
    	setInterval(function(){
    	if (!paused){
    		    if (offscreencanvas === undefined) {
                	offscreencanvas = document.createElement('canvas');
    	            offscreencanvas.width=image.width;
    	            offscreencanvas.height=image.height;
    	            offscreencontext= offscreencanvas.getContext('2d');
    	        }    	    
             	
                //offscreencontext.clearRect(0,0,image.width,image.height);
                //offscreencontext.putImageData(imgdata,0,0);
                //offscreencontext.drawImage(image,0,0,image.width,image.height);
                //imgcontext.clearRect(0,0,image.width,image.height);
                //imgcontext.drawImage(image,0,0,image.width,image.height);
             	imgcontext.drawImage(image,0,0,image.width,image.height)

             	
             	
             	imgcontext.save();
             	imgcontext.beginPath();
             	imgcontext.arc(ball_x,ball_y,ball_rad,0,Math.PI *2);        	
             	imgcontext.clip();
             	imgcontext.drawImage(image2,0,0,image2.width,image2.height,0,0,image.width,image2.height * image.width/image2.width);
             	//imgcontext.drawImage(image,0,0,image.width,image.height,-ball_x,-ball_y,image.width * 2 ,image.height * 2);
             	imgcontext.restore();
             	
                ball_x=ball_x + ball_mx;
             	if (ball_x > (image.width-ball_rad)){
             		ball_mx=-1;           
             		ball_x=ball_x+ball_mx;  		
             	}
             	
               if ((ball_x - ball_rad) < 0){
             		ball_mx=1;           
             		ball_x=ball_x+ball_mx;  		
             	}

             	ball_y=ball_y +ball_my;
                if ((ball_y - ball_rad) < 0){
             		ball_my=1;           
             		ball_y=ball_y+ball_my;  		
             	}

             	if (ball_y > (image.height-ball_rad)){             		
             		ball_my=-1;             		
             		ball_y=ball_y+ball_my;
             	}
    	  // context.clearRect(-origin.x,-origin.y,canvas.width,canvas.height);
    	  // context.rotate(clockwise ? angle: -angle);
    	  // context.scale(0.999,0.999)
    	  //	 drawText();	
    	}
    },30);
    }

    var COREHTML5 = COREHTML5 || {};
    COREHTML5.Slider = function(w,h,knobRadius,percent,div){
    	var canvas = document.createElement('canvas');
    	this.domElement = div === undefined?
    	                  document.createElement('div'):div;
    	this.domElement.appendChild(canvas);
        var x,y;
        x_rect=0;
        y_rect=10;
        x= x_rect + w/2;
        y= y_rect + h/2;
        var selected =0;        
        var x_mouse;
        function ev_canvas (ev) {
                 if (ev.layerX || ev.layerX == 0) { // Firefox
                       ev._x = ev.layerX;
                       ev._y = ev.layerY;
                 } else if (ev.offsetX || ev.offsetX == 0) { // Opera
                       ev._x = ev.offsetX;
                       ev._y = ev.offsetY;
                 }

            if (ev.type == 'mousedown'){
            	//alert("mousedown" + ev._x + "," + ev._y + "," + x + "," + y);
            	if ((ev._x > (x-knobRadius) && ev._x < (x+knobRadius)) && (ev._y > (y-knobRadius) && ev._y < (y+knobRadius))){
            		selected=1;
            		x_mouse=ev._x;
            		//alert("selected");
            	} 
            }
            if ((ev.type == 'mousemove') && selected){
            	var offset= ev._x - x_mouse;
            	x_mouse = ev._x;
            	//alert('mousemove' + offset);
            	x=x+offset;
            	if (x > (w-knobRadius)){
            		x = w-knobRadius;
            	}
            	if ((x - knobRadius) < x_rect){
            		x = knobRadius + x_rect;
            	}
            	
             	context = canvas.getContext('2d');
              	context.beginPath();
              	context.clearRect(0, 0, canvas.width,canvas.height);
    	        context.rect(x_rect,y_rect,w,h);
             	context.fillStyle="green";
    	        context.stroke();
    	        context.fill();
             	drawCircle(context,x,y,knobRadius,'skyblue');
    	        if (offscreencanvas === undefined) {
                	offscreencanvas = document.createElement('canvas');
    	            offscreencanvas.width=imgcanvas.width;
    	            offscreencanvas.height=imgcanvas.height;
    	            offscreencontext= offscreencanvas.getContext('2d');
    	        }    	     
    	        //imgdata=imgcontext.getImageData(0,0,sw, sh);
                offscreencontext.clearRect(0,0,imgcanvas.width,imgcanvas.height);
                //offscreencontext.putImageData(imgdata,0,0);
                offscreencontext.drawImage(image,0,0);
             	//context.closePath();
             	scale = scale + offset*2/w;
             	imgcontext.clearRect(0,0,imgcanvas.width,imgcanvas.height);
             	rescale();
             	imgcontext.drawImage(offscreencanvas,0,0,image.width,image.height,0, 0,image.width,image.height);
             	//imgcontext.drawImage(image,0,0,image.width,image.height,0,0,sw,sh);
             	//imgcontext.drawImage(image,0,0);
             	//var e;
             	//ev.target.value=(x - (knobRadius + 20) + w/2)*2/w;
            }
            if ((ev.type == 'mouseup')){
            	selected=0;
            }

            // Call the event handler of the tool.
            //   var func = tool[ev.type];
            //   if (func) {
             //   func(ev);
              // } 
        }

        canvas.addEventListener('mousedown', ev_canvas, false);
        canvas.addEventListener('mousemove', ev_canvas, false);
        canvas.addEventListener('mouseup',   ev_canvas, false);
    	context = canvas.getContext('2d');
    	context.beginPath();
    	context.rect(x_rect,y_rect,w,h);
    	context.fillStyle="green";
    	context.stroke();
    	context.fill();
    	drawCircle(context,x,y,knobRadius,'skyblue');
    	//drawImage(imgcanvas,imgcontext);
    }
    
    var mySlider= new COREHTML5.Slider(300,12,15);
    mySlider.domElement.className='customSlider';
    mySlider.domElement.style.position='relative';
    mySlider.domElement.style.top='100px';
    mySlider.domElement.style.left='100px';
    
    var slider=document.getElementById("slider");
    slider.appendChild(mySlider.domElement);
    

   /* 
    function drawText(){
     context.strokeText(text,0,0);
     context.fillText(text,0,0);
    }
    
    canvas.onclick=function() {
	for (var i=0;i<100;++i) {
		context.beginPath();
		context.moveTo(Math.random()*context.canvas.width,
		Math.random()*context.canvas.height);
		context.lineTo(Math.random()*context.canvas.width,
		Math.random()*context.canvas.height);
		context.strokeStyle='rgba('
		   + (Math.random()*255).toFixed(0) + ', '
		   + (Math.random()*255).toFixed(0) + ', '
		   + (Math.random()*255).toFixed(0) + ', '
		   + (Math.random()).toFixed(0) + ')';
		context.stroke();
	}
   }*/
}

