'use strict'

const $window = $(window)

function initializeAnimationTriggers() {
  const elements = {
    quarter: $('.__is-quarter-in-view'),
    half: $('.__is-half-in-view'),
    top: $('.__is-top-in-view'),
    innerQuarter: $('.__is-inner-quarter-in-view > *'),
    innerHalf: $('.__is-inner-half-in-view > *'),
    innerTop: $('.__is-inner-top-in-view > *')
  }

  // TODO: debounce/throttle
  $window.on('scroll resize', triggerAnimations)

  function triggerAnimations() {
    const windowHeight = $window.height()
    const windowTopPosition = $window.scrollTop()
    const windowBottomPosition = (windowTopPosition + windowHeight)

    $.each(elements.innerTop, function () {
      const $element = $(this)
      const elementHeight = $element.outerHeight()
      const marker = $element.offset().top
      if ((marker <= windowBottomPosition) && !$element.hasClass('is-top-in-view')) {
        $element.addClass('is-top-in-view')
      }
    })
    $.each(elements.innerQuarter, function () {
      const $element = $(this)
      const elementHeight = $element.outerHeight()
      const marker = $element.offset().top + (elementHeight / 4)
      if ((marker <= windowBottomPosition) && !$element.hasClass('is-quarter-in-view')) {
        $element.addClass('is-quarter-in-view')
      }
    })
    $.each(elements.innerHalf, function () {
      const $element = $(this)
      const elementHeight = $element.outerHeight()
      const marker = $element.offset().top + (elementHeight / 2)
      if ((marker <= windowBottomPosition) && !$element.hasClass('is-half-in-view')) {
        $element.addClass('is-half-in-view')
      }
    })
  }

  $window.trigger('scroll')

  $('*[data-aria-controls]').on('click', function () {
    $('[aria-controls="' + $(this).data('aria-controls') + '"]').click()
  })

  $('*[aria-controls][aria-expanded]').on('click', function () {
    const $control = $(this)
    const $target = $('#' + $control.attr('aria-controls'))

    if ($control.attr('aria-expanded') === 'true') {
      $control.attr('aria-expanded', 'false')
      $target.toggleClass('is-expanded', false)
    }
    else {
      $control.attr('aria-expanded', 'true')
      $target.toggleClass('is-expanded', true)
    }
  })
}

function initializeImproveFloatedImages() {
  const $image = $('.Image--Left')
  const $paragraph = $image.parent().next('p')

  function matchImageHeightWithSiblingParagraph() {
    if ($image.css('float') !== 'none') {
      $image.css('height', $paragraph.innerHeight())
    }
    else {
      $image.css('height', 'auto')
    }
  }

  matchImageHeightWithSiblingParagraph()

  $image.on('load', matchImageHeightWithSiblingParagraph)
  // TODO: debounce/throttle
  $window.on('resize', matchImageHeightWithSiblingParagraph)
}

initializeAnimationTriggers()
initializeImproveFloatedImages()
