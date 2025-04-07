$(document).ready(function () {
  $('.thanks, .send_me').hide();

  $('.contact_me').on('click', function () {
    $('.top_flap').removeClass('close_sesame');
    $('.contact_form').delay(500).queue(function () {
      $(this).addClass('open_form').dequeue();
    });
    $(this).fadeOut(300);
    $('.send_me').fadeIn(300);
  });

  $('.reset').on('click', function () {
    $('.contact').delay(800).animate({ marginTop: '0px' }, 300);
    $('.top_flap').delay(800).queue(function () {
      $(this).addClass('close_sesame').dequeue();
    });
    $('.contact_form').removeClass('open_form');
    $('.send_me').fadeOut(300);
    $('.contact_me').fadeIn(300);
    $('.error').remove();
    $('input, textarea').css("border", "none");
  });

  $('.send_me').on('click', function (e) {
    e.preventDefault();

    let isValid = true;
    let prenom = $('#prenom').val().trim();
    let nom = $('#nom').val().trim();
    let email = $('#email').val().trim();
    let pays = $('#pays').val().trim();
    let message = $('#message').val().trim();

    $('.error').remove();
    $('input, textarea').css("border", "none");

    if (prenom.length < 2) {
      isValid = false;
      $('#prenom').after('<div class="error">Prénom trop court</div>');
      $('#prenom').css("border", "2px solid red");
    }
    if (nom.length < 2) {
      isValid = false;
      $('#nom').after('<div class="error">Nom trop court</div>');
      $('#nom').css("border", "2px solid red");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      isValid = false;
      $('#email').after('<div class="error">Email invalide</div>');
      $('#email').css("border", "2px solid red");
    }
    if (pays === "") {
      isValid = false;
      $('#pays').after('<div class="error">Pays requis</div>');
      $('#pays').css("border", "2px solid red");
    }
    if (message === "") {
      isValid = false;
      $('#message').after('<div class="error">Message vide</div>');
      $('#message').css("border", "2px solid red");
    }

    if (isValid) {
      // Soumission normale du formulaire HTML
      document.getElementById("contactForm").submit();
    }
  });
});
