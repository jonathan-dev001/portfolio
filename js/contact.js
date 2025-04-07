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
  
    $('.send_me').on('click', async function (e) {
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
        $('#prenom').after('<div class="error">Prénom trop court</div>').css("border", "2px solid red");
      }
      if (nom.length < 2) {
        isValid = false;
        $('#nom').after('<div class="error">Nom trop court</div>').css("border", "2px solid red");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        isValid = false;
        $('#email').after('<div class="error">Email invalide</div>').css("border", "2px solid red");
      }
      if (pays === "") {
        isValid = false;
        $('#pays').after('<div class="error">Pays requis</div>').css("border", "2px solid red");
      }
      if (message === "") {
        isValid = false;
        $('#message').after('<div class="error">Message vide</div>').css("border", "2px solid red");
      }
  
      if (isValid) {
        const form = document.getElementById("contactForm");
        const formData = new FormData(form);
        formData.append("_subject", "Nouveau message depuis ton portfolio !");
        formData.append("_autoresponse", "Merci pour votre message !");
        formData.append("_captcha", "false");
  
        try {
          const response = await fetch("https://formsubmit.co/el/doraxa", {
            method: "POST",
            body: formData
          });
  
          if (response.ok) {
            form.reset();
            $('.thanks').fadeIn(300).delay(10000).fadeOut(300);
            $('.contact_form').removeClass('open_form');
            $('.send_me').fadeOut(300);
            $('.contact_me').fadeIn(300);
            $('.top_flap').delay(300).queue(function () {
              $(this).addClass('close_sesame').dequeue();
            });
          } else {
            alert("Erreur lors de l'envoi du formulaire.");
          }
        } catch (error) {
          console.error("Erreur fetch :", error);
          alert("Erreur de réseau.");
        }
      }
    });
  });
  
