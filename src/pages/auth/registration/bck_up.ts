<script type="text/javascript" src="/wp-content/themes/deaddictions/bundle/deaddictions.1cc09c754c68613027f2.js" async></script>

$('.second-sponsors')
.slick({
    dots: true,
    pauseOnHover: true,
    pauseOnFocus: false,
    arrows: true,
    centerMode: true,
      centerPadding: '0px',
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false

          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]

});


<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.js"></script>

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.js"></script>

<script>
    $(document).ready(function(){
		
	});
</script>

{key:"componentWillMount",value:function(){var e=this;fetch("/wp-json/api/v1/adrotate").then(function(c){c.json().then(function(c){e.setState({loading:!1,html:c})})})}},
return o(c,e),a(c,[{key:"createMarkup",value:function(e){return{__html:e}}}