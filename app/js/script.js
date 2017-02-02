/*=================================================
=            Translating magnificPopup            =
=================================================*/

// Add it after jquery.magnific-popup.js and before first initialization code
$.extend(true, $.magnificPopup.defaults, {
  tClose: 'Закрыть (Esc)', // Alt text on close button
  tLoading: 'Загрузка...', // Text that is displayed during loading. Can contain %curr% and %total% keys
  gallery: {
    tPrev: 'Назад (Left arrow key)', // Alt text on left arrow
    tNext: 'Вперед (Right arrow key)', // Alt text on right arrow
    tCounter: '%curr% из %total%' // Markup for "1 of 7" counter
  },
  image: {
    tError: '<a href="%url%">The image</a> could not be loaded.' // Error message when image could not be loaded
  },
  ajax: {
    tError: '<a href="%url%">The content</a> could not be loaded.' // Error message when ajax request failed
  }
});

/*=====  End of Translating magnificPopup  ======*/

document.addEventListener('DOMContentLoaded', function() {
  $('.js-trigger-inline-popup').magnificPopup({
    mainClass: 'popup-fade',
    removalDelay: 300
  });
  
  var primaryHelpSteps = document.querySelector('.primary-help-steps');
  var formPrimaryHelp = document.forms['form-primary-help'];
  var primaryHelpMessage = formPrimaryHelp['help_message'];
  var primaryHelpPhone = formPrimaryHelp['help_phone'];
  var primaryHelpActions = document.querySelector('.primary-help-actions');
  var primaryHelpActionStepPrev = document.querySelector('.primary-help-action-step-prev');
  var primaryHelpActionStepNext = document.querySelector('.primary-help-action-step-next');
  var primaryHelpActionStepFinish = document.querySelector('.primary-help-action-step-finish');
  var primaryHelpActionStepPrevWidth = primaryHelpActionStepPrev.offsetWidth;

  if (primaryHelpSteps) {
    $(primaryHelpSteps).on('init', function(event, slick, currentSlide, nextSlide) {
      triggerStepPrev();
    });

    $(primaryHelpSteps).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      if (nextSlide === 0) {
        triggerStepPrev();
      } else if (nextSlide == slick.slideCount - 1) {
        triggerStepNext();
      }
    });

    $(primaryHelpActionStepPrev).on('click', function(event) {
      event.preventDefault();
      $(primaryHelpSteps).slick('slickPrev');
    });

    $(primaryHelpActionStepNext).on('click', function(event) {
      event.preventDefault();
      if (primaryHelpMessage.value.length) {
        $(primaryHelpSteps).slick('slickNext');
      } else {
        focusingPrimaryControl(primaryHelpMessage);
      }
    });

    $(primaryHelpPhone).on('input', function(event) {
      var pattern = /\([\d]{3}\) [\d]{3}-[\d]{2}-[\d]{2}/;
      var result = this.value.match(pattern)
      if (result != null) {
        $(primaryHelpActionStepFinish).prop('disabled', false);
      } else {
        $(primaryHelpActionStepFinish).prop('disabled', true);
      }
    });

    $(primaryHelpSteps).slick({
      accessibility: false,
      draggable: false,
      infinite: false,
      swipe: false,
      arrows: false,
      touchMove: false,
      fade: true
    });

    $(primaryHelpPhone).inputmask("(999) 999-99-99");

    $(formPrimaryHelp).on('submit', function(event) {
      event.preventDefault();
      var path = formPrimaryHelp.action;
      var formData = $(this).serializeArray();
      formData.push({"name": 'new_request', "value": ""});
      console.log(path, formData);
      var request = $.post(path, formData);
      console.log(request)

      request.done(function(data) {
        console.log(data);
      })
      .fail(function(error) {
        alert('Ошибка' + error);
      })
      .always(function(data) {
        formPrimaryHelp.reset();
        $(primaryHelpSteps).slick('slickPrev');
        alert('Выполняется всегда');
      });
    });

    function focusingPrimaryControl(controlEl) {
      setTimeout(function() {
        controlEl.focus();
      }, 20);
    }

    function triggerStepPrev() {
      $(primaryHelpActionStepPrev).hide(0, function() {
        $(primaryHelpActionStepPrev).addClass('primary-help-action-step-prev--hidden');
        primaryHelpActionStepPrev.style.cssText = 'display: none; width: 0;';
      
        $(primaryHelpActions).addClass('primary-help-actions--start');
        $(primaryHelpActions).removeClass('primary-help-actions--finish');
        focusingPrimaryControl(primaryHelpMessage);
      });
    }

    function triggerStepNext() {
      $(primaryHelpActionStepPrev).show(0, function() {
        primaryHelpActionStepPrev.style.width = primaryHelpActionStepPrevWidth + 'px';
        primaryHelpActionStepPrev.style.cssText = 'display: inline-block; width: '+primaryHelpActionStepPrevWidth+'px;';
        $(primaryHelpActionStepPrev).removeClass('primary-help-action-step-prev--hidden');

        $(primaryHelpActions).removeClass('primary-help-actions--start');
        $(primaryHelpActions).addClass('primary-help-actions--finish');
        focusingPrimaryControl(primaryHelpPhone);
      });

    }
  }
});
