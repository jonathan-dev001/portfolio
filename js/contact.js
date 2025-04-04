$('.thanks,.send_me').hide();

$('.contact_me').on('click', function () {
    $('.top_flap').removeClass('close_sesame');
    $('.contact_form').delay(500).queue(function () {
        $('.contact_form').addClass('open_form').dequeue();
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
    let nom = $('#name').val().trim();
    let email = $('#email').val().trim();
    let pays = $('#country').val().trim();
    let message = $('#message').val().trim();

    $('.error').remove();
    $('input, textarea').css("border", "none");

    // Prénom
    if (prenom.length < 2) {
        isValid = false;
        $('#prenom').after('<div class="error">Prénom trop court (min. 2 caractères)</div>');
        $('#prenom').css("border", "2px solid red");
    }

    // Nom
    if (nom.length < 2) {
        isValid = false;
        $('#name').after('<div class="error">Nom trop court (min. 2 caractères)</div>');
        $('#name').css("border", "2px solid red");
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        isValid = false;
        $('#email').after('<div class="error">Adresse courriel invalide</div>');
        $('#email').css("border", "2px solid red");
    }

    // Pays
    if (pays === "") {
        isValid = false;
        $('#country').after('<div class="error">Pays est requis</div>');
        $('#country').css("border", "2px solid red");
    }

    // Message
    if (message === "") {
        isValid = false;
        $('#message').after('<div class="error">Le message ne peut pas être vide</div>');
        $('#message').css("border", "2px solid red");
    }

    if (isValid) {
        $('.thanks').fadeIn(300).delay(1500).fadeOut(300);
        $('.contact_form').removeClass('open_form');
        $('.send_me').fadeOut(300);
        $('.contact_me').fadeIn(300);
        $('.top_flap').delay(300).queue(function () {
            $(this).addClass('close_sesame').dequeue();
        });

        // ✅ Vider les champs avant envoi
        $('form')[0].reset();

        // ✅ Puis soumettre le formulaire à FormSubmit
        $('form')[0].submit();
    }
});
