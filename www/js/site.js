$( document ).ready(function() {
	$(document).on('click','.button-fees',function(){
		$("#fees").modal();
		scrollEnb = false;
	});
	$("#fees").on('hide.bs.modal', function(){
		scrollEnb = true;
  });

  $(document).on('click','.button-terms',function(){
		$("#terms").modal();
		scrollEnb = false;
	});
	$("#terms").on('hide.bs.modal', function(){
		scrollEnb = true;
  });

  $(document).on('click','.button-faq',function(){
		$("#faq").modal();
		scrollEnb = false;
	});
	$("#faq").on('hide.bs.modal', function(){
		scrollEnb = true;
	});


//   $('ul#parallax-menu > li').eq(6).click(function(e) { 
//     $('.nav-animation').fadeOut();
// });


$('ul#parallax-menu > li').click(function(e) {
	var index = $( "ul#parallax-menu > li" ).index( this );
   if(index == 6){
	$('.nav-animation').fadeOut();
   }
   else {
	$('.nav-animation').fadeIn();
   }
});

});