jQuery(document).ready(function() {
    
	/*jQuery.scrollify({             
        easing: "easeOutExpo",
        scrollSpeed: 1000,
        offset : 0,
        scrollbars: true,
        standardScrollElements: "",
        setHeights: true,        
                        section : ".scrollitem",
                    });
	*/

	/*jQuery('#infiniteScroll').jscroll({
            debug :true,
            loadingHtml: '<h2>Loading...</h2>',
            padding: 20,

            nextSelector: '#pagination a',
            contentSelector: '.scrollitem'
        });*/
        jQuery('.infiniteScroll').jscroll({
            contentSelector:".infiniteScroll",
            callback:function(e){
                scrollie();
            }
        });
        
        scrollie();
        function scrollie(){
             var wHeight = jQuery(window).height();

    jQuery('.scrollitem')
      .height(wHeight)
      .scrollie({
        scrollOffset : -150,
        scrollingInView : function(elem) {
                   
          var bgColor = elem.data('background');
          
          jQuery('body').css('background-color', bgColor);
          
        }
      });
        }
   
});

