$(document).ready(function(){
    $('.carousel-inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                  dots: true,
                  arrows: false
                }
            }
        ]
    });

    $('ul.catalog-tabs').on('click', 'li:not(.catalog-tab-active)', function() {
        $(this)
          .addClass('catalog-tab-active').siblings().removeClass('catalog-tab-active')
          .closest('div.container').find('div.catalog-content').removeClass('catalog-content-active').eq($(this).index()).addClass('catalog-content-active');
    });

   function toggleSlide(item){
        $(item).each(function(i){
            $(this).on('click', function(e){
                e.preventDefault();
                $('.catalog-item-content').eq(i).toggleClass('catalog-item-content-active');
                $('.catalog-item-list').eq(i).toggleClass('catalog-item-list-active');
            })
        })
    };
    toggleSlide('.catalog-item-link');
    toggleSlide('.catalog-item-back');

    //----------------Modals 
    $('[data-modal="consultation"]').on('click', function(){
        $('.overlay, #consultation').fadeIn();
    })
    $('.modal-close').on('click', function(){
        $('.overlay, #consultation, #thanks, #order').fadeOut();
    })
    $('.button-mini').on('click', function(){
        $('.overlay, #order').fadeIn();
    })
    $('.button-mini').each(function(i){
        $(this).on('click', function(){
            $('#order .modal-descr').text($('.catalog-item-subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        })
    })

 function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                  },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свой почтовый адрес",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    }
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $("input[name=phone]").mask("+38(099) 999-9999");

    $('form').submit(function(e){
        e.preventDefault();
        
        if(!$(this).valid()){
            return;
        }
        $.ajax({
            type: "POST",
    //         url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find('input').val('');
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn();
            $('form').trigger('reset');
        });
        return false;
    })

    //---------------PAGE-UP 

    $(window).scroll(function(){
        if($(this).scrollTop() > 1600){
            $('.pageup').fadeIn();
        }else{
            $('.pageup').fadeOut();
        }
    })
  });