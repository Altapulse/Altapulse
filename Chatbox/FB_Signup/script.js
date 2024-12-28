      window.fbAsyncInit = function() {
        // Initialize the Facebook SDK
        FB.init({
          appId: '1540925303218662', // Replace with your actual App ID
          cookie: true,
          xfbml: true,
          version: 'v21.0'
        });
        console.log("Facebook SDK initialized");
      };

      // Asynchronously load the Facebook SDK
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

      // Function to handle button click
      function launchWhatsAppSignup() {
        console.log("Button clicked");
        FB.login(function(response) {
          if (response.authResponse) {
            console.log('User logged in:', response);
            // Add your WhatsApp signup logic here
          } else {
            console.log('User cancelled login or did not fully authorize.');
          }
        }, { scope: 'public_profile,email' }); // Request additional permissions as needed
      }
