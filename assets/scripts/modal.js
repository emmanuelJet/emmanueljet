$(document).ready(function(){

  // MODAL
  var modalText = {
    library: {
      title: 'EKSU Library',
      tag: 'Library Management System',
      detail: 'This is a Library Management System built for Ekiti State University (EKSU), Ado-Ekiti, Ekiti State. This solution helps to manage the books, and library users of the library. This solution was written in PHP[Laravel] and Javascript[Vue Js]',
      link: 'http://eksu-library.herokuapp.com'
    },
    crypto: {
      title: 'Crypto',
      tag: 'Flutter Cryptocurrency',
      detail: 'Crypto is an app for a group of cryptocurrency lovers. Crypto was written with Flutter and it uses Coinmarketcap API to fetch latest currency details',
      link: 'https://github.com/emmanuelJet/Crypto'
    },
    jossy: {
      title: 'Jossy Vegetable Oil',
      tag: 'Graphics Jossy',
      detail: 'Jossy Vegetable Oil is a company that sells vegetable Oil. I helped in design their logo, business card and lots more.',
    },
    thesoft: {
      title: 'The Soft Company NG',
      tag: 'Laravel TheSoftCompany',
      detail: 'The Soft Company is a company with developers and designers that craft digital products and services that help their customers change; change the way they work, change the way they sell, change the way they communicate, and ultimately, help them change the world',
      link: 'http://thesoftcomapany.herokuapp.com/'
    },
    portfolioo: {
      title: 'JET Portfolio',
      tag: 'Flutter Flutter4Web',
      detail: 'This is my portfolio platform built with Flutter For Web',
      link: 'https://jet-portfolio.surge.sh/#/'
    },
    successland: {
      title: 'CAC Successland',
      tag: 'Laravel Church',
      detail: 'CAC Successland is a church based in Lagos with a mission to reach out to the world, preaching, and proclaiming the gospel of Jesus Christ and winning souls for the kingdom of God.',
      link: 'http://cac-successland.herokuapp.com/'
    }
  };

  $('#gallery .button').on('click', function(){
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
      slideWidth = 700,
      threshold = slideWidth/3,
      dragStart, 
      dragEnd;

  setDimensions();

  $('#next').click(function(){ shiftSlide(-1) })
  $('#prev').click(function(){ shiftSlide(1) })

  carousel.on('mousedown', function(){
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function(){
      dragEnd = event.pageX;
      $(this).css('transform','translateX('+ dragPos() +'px)');
    });
    $(document).on('mouseup', function(){
      if (dragPos() > threshold) { return shiftSlide(1) }
      if (dragPos() < -threshold) { return shiftSlide(-1) }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1)
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup')
    carousel.off('mousemove')
            .addClass('transition')
            .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
    setTimeout(function(){
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition')
      carousel.css('transform','translateX(0px)'); 
    },700)
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link) $('#modal .button').addClass('visible')
                                               .parent()
                                               .attr('href', modalText[id].link)

    $.each($('#modal li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background: "url('assets/img/slides/" + id + '-' + index + ".png') center center/cover",
        backgroundSize: 'cover'
      });
              
    });
  }
})
