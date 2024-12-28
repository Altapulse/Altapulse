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

      // Event listener
      window.addEventListener('message', (event) => {
        if (event.origin !== "https://www.facebook.com" && event.origin !== "https://web.facebook.com") {
          return;
        }
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'WA_EMBEDDED_SIGNUP') {
            // if user finishes the Embedded Signup flow
            if (data.event === 'FINISH') {
              const {phone_number_id, waba_id} = data.data;
              console.log("Phone number ID ", phone_number_id, " WhatsApp business account ID ", waba_id);
              // if user cancels the Embedded Signup flow
            } else if (data.event === 'CANCEL') {
              const {current_step} = data.data;
              console.warn("Cancel at ", current_step);
              // if user reports an error during the Embedded Signup flow
            } else if (data.event === 'ERROR') {
              const {error_message} = data.data;
              console.error("error ", error_message);
            }
          }
          document.getElementById("session-info-response").textContent = JSON.stringify(data, null, 2);
        } catch {
          console.log('Non JSON Responses', event.data);
        }
      });

      //login callback
      const fbLoginCallback = (response) => {
        if (response.authResponse) {
          const code = response.authResponse.code;
          // The returned code must be transmitted to your backend first and then
          // perform a server-to-server call from there to our servers for an access token.
        }
        document.getElementById("sdk-response").textContent = JSON.stringify(response, null, 2);
      }

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

      
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });

        function launchWhatsAppSignup() {
            // Check if FB is defined and initialized
            if (typeof FB === 'undefined') {
              console.error("Facebook SDK not loaded yet.");
              return;
            }
      
            // Launch Facebook login
            FB.login(function(response) {
              if (response.authResponse) {
                console.log('User logged in successfully');
                const code = response.authResponse.code;
                // Handle successful login here (e.g., send `code` to your backend if needed)
              } else {
                console.log('User cancelled login or did not fully authorize.');
              }
            }, {
              config_id: '1315986066086999', // configuration ID
              response_type: 'code',
              override_default_response_type: true,
              extras: {
                setup: {
                  "business": { "id": null, "phone": {}, "address": {}, "timezone": null },
                  "phone": { "category": null, "description": "" }
                }
              }
            });
          }