const scroll = new SmoothScroll('navbar a[href*="#"]',{
    speed: 800
});

jQuery(document).ready(function($) {
 
    $('#myCarousel').carousel({
            interval: 5000
    });
    
    $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");

});