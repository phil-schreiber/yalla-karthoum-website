/*Helpers begin*/
var mainHeight;
var mainWidth;
var imagesDimensions=new Array();
function range(start, count) {
        return Array.apply(0, Array(count))
                    .map(function (element, index) { 
                             return index + start;  
                         });
    } 
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function isElementInViewport (el) {

   

    var rect = el[0].getBoundingClientRect();

    return (
        rect.top <= mainHeight  && rect.bottom >50
    );
}
function getRandomInt(min, max) { 
  return Math.floor(Math.random() * (max - min +1)) + min; 
}

function preload(arrayOfImages) {
    jQuery(arrayOfImages).each(function(){
        var img=jQuery('<img/>');
        jQuery(img)[0].src = 'images/'+this;
        
        imagesDimensions.push([jQuery(img)[0].width,jQuery(img)[0].height]);
        // Alternatively you could use:
        // (new Image()).src = this;
    });
    
}
function randomPos(){
       var lr=getRandomInt(1,2);
       
       var pos='';
       var horPos=getRandomInt(2,15);
       var randWidth=getRandomInt(40,50);
       var randHeight=getRandomInt(60,80);
       var randVert=getRandomInt(5,35);
       if(lr==1){
           pos='left:'+horPos+'vw;';
           
       }else{
           pos='right:'+horPos+'vw;';
       }
       pos+='max-height:'+randHeight+'vh;'+'max-width:'+randWidth+'vw;'+'top:'+randVert+'vh';
     
       return pos;
    }
function getImgThreshold(){
    
    return getRandomInt(Math.round(mainHeight/3),Math.round(mainHeight/3)*2);
}
/*Helpers end*/
var images=new Array("1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg");

jQuery(window).load(function(){preload(images);});
jQuery(document).ready(function() {
       mainHeight=jQuery(this).height();
       mainWidth=jQuery(this).width();
       var colors=new Array("#f0acb2","#84eccf","#7598e7","#f0bdff","#f6d270");
        
     
       var helper=range(0,images.length);
       
       shuffle(helper);
       
      
      
     
      var threshold=Math.round(mainHeight/2);
      
      var imgThreshold=getImgThreshold(mainHeight);
    
    
    
      
      var lastScrollTop = 0;
      var vidScrollTop=0;
      var imgScrollTop=0;
      var color=0;
      var contentHeight=jQuery('#content').height();
      var contentThreshold=(contentHeight-mainHeight)-100;
      var contentScrollTop=0;
      var content=jQuery('#content').html();
      var firstPos=randomPos();
      var delta=10;
      jQuery('#imageContainer').prepend('<img src=images/'+images[helper[0]]+' alt="" style="position:absolute;display:none;'+firstPos+'" id="moodImg">');
       jQuery('#moodImg').fadeIn(1300);
      var imageCounter=1;
      jQuery( "#main" ).scroll(function() {
        var nowScrollTop = jQuery(this).scrollTop();  
        /*BG Anim*/
        if(Math.abs(lastScrollTop - nowScrollTop) >= threshold){            
            if(color<4&&color>=0 && lastScrollTop - nowScrollTop <0){
                color++;
            }else if(color<4 &&color>0 && lastScrollTop - nowScrollTop >0){
                color--;
            }else{
                color=0;
            }
             jQuery("#main").animate({
                backgroundColor: colors[color]
            }, 2000 );
            lastScrollTop = nowScrollTop;
         }
        /*BG Anim end*/
        /*IMG Anim*/
        if(Math.abs(imgScrollTop - nowScrollTop) >= imgThreshold){
           imgThreshold=getImgThreshold();
            jQuery('#moodImg').fadeOut(1300).remove();
            var pos=randomPos();
            jQuery('#imageContainer').prepend('<img src=images/'+images[helper[imageCounter]]+' alt="" style="position:absolute;display:none;'+pos+'" id="moodImg">');
            jQuery('#moodImg').fadeIn(1300);
            imgScrollTop = nowScrollTop;
            if(imageCounter<images.length-1){
                imageCounter++;
            }else{
                imageCounter=0;
                shuffle(helper);
            }
        }
        /*IMG Anim end*/
        /*Infinite Scroll*/
        if(nowScrollTop-contentScrollTop   >= contentThreshold){
            jQuery('#content').append(content);
            contentScrollTop=nowScrollTop;
        }
        /*Infinite Scroll end*/
        /*check video visibility*/
        if(Math.abs(vidScrollTop - nowScrollTop) >= delta){ 
            vidScrollTop=nowScrollTop;
            jQuery('iframe').each(function(ind,el){
                console.log(isElementInViewport(jQuery(el)));
                
                if(isElementInViewport(jQuery(el))){
                    jQuery('#moodImg').fadeOut(1000).remove();
                }
            });
        }
        /*check video visibility end*/
         
      });
   
});

