document.addEventListener('DOMContentLoaded', function() {
  var primaryHelpSteps = document.querySelector('.primary-help-steps');
  var formPrimaryHelp = document.forms['form-primary-help'];
  var primaryHelpMessage = formPrimaryHelp['help-message'];
  var primaryHelpPhone = formPrimaryHelp['help-phone'];
  var primaryHelpActions = document.querySelector('.primary-help-actions');
  var primaryHelpActionStepPrev = document.querySelector('.primary-help-action-step-prev');
  var primaryHelpActionStepNext = document.querySelector('.primary-help-action-step-next');
  var primaryHelpActionStepPrevWidth = primaryHelpActionStepPrev.offsetWidth;

  if (primaryHelpSteps) {
    $(primaryHelpSteps).on('init', function(event, slick, currentSlide, nextSlide) {
      triggerStepStart();
    });

    $(primaryHelpSteps).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      if (nextSlide === 0) {
        triggerStepStart();
      } else if (nextSlide == slick.slideCount - 1) {
        triggerStepFinish();
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

    $(primaryHelpSteps).slick({
      accessibility: false,
      draggable: false,
      infinite: false,
      swipe: false,
      arrows: false,
      touchMove: false,
      fade: true
    });

    $('#field-help-phone').mask("(999) 999-99-99", {
      completed: function(){
        $(primaryHelpActionStepNext).addClass('primary-help-action--completed');
      }
    });

    function focusingPrimaryControl(control) {
      setTimeout(function() {
        control.focus();
      }, 20);
    }

    function triggerStepStart() {
      // primaryHelpActionStepPrev.style.cssText = 'width: 0; padding: 0; border-width: 0;';
      $(primaryHelpActionStepPrev).addClass('primary-help-action--hidden');
      $(primaryHelpActions).addClass('primary-help-actions--start');
      $(primaryHelpActions).removeClass('primary-help-actions--finish');
      focusingPrimaryControl(primaryHelpMessage);
    }

    function triggerStepFinish() {
      primaryHelpActionStepPrev.style.cssText = 'width' + primaryHelpActionStepPrevWidth + 'px';
      $(primaryHelpActionStepPrev).removeClass('primary-help-action--hidden');
      $(primaryHelpActions).removeClass('primary-help-actions--start');
      $(primaryHelpActions).addClass('primary-help-actions--finish');
      focusingPrimaryControl(primaryHelpPhone);
    }

  }
});
