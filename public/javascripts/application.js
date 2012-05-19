var canvas=document.getElementById('helloCanvas'),
    context = canvas.getContext('2d'),
    text = 'Hello Canvas';
    
    context.font = '66px Arial';
    context.strokeStyle = 'skyblue';
    context.fillStyle = 'conrflowerblue';
    
    
    context.textAlign = 'center';
    context.textBaseline='middle';
    
    context.strokeText(text,canvas.width/2,canvas.height/2);
    context.fillText(text,canvas.width/2,canvas.height/2);
