jQuery(document).ready(function() {
    
	
     jQuery('#fullpage').fullpage({
      normalScrollElements: '.grid'
     });
    jQuery('.grid').isotope({  
      percentPosition: true,
        itemSelector: '.grid-item',        
        masonry: {
          columnWidth: '.grid-sizer'
        }
    });
        
   
});

