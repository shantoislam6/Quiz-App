//For header
jQuery(document).ready(function($){

    $('.nav-section>a').on('click', hoverActive );
   
    function hoverActive(){
          $('#hoveAnim').animate({
              width :  $(this).outerWidth() + 'px',
              left : $(this).position().left + 'px'
          },400);
         
    }
    
   
    
    $('#menuTigger').on('click',slideDownMenu);
    function slideDownMenu(){
        $('.nav-section').slideToggle();
    }

    
})