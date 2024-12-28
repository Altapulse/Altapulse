// Initialize Facebook SDK
window.fbAsyncInit = function () {
    FB.init({
        appId: '1540925303218662', // Replace with your Facebook App ID
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v21.0'
    });
};

// Launch WhatsApp Signup Flow
function launchWhatsAppSignup() {
    FB.login((response) => {
        if (response.authResponse) {
            console.log("User authenticated successfully!");
            document.getElementById("sdk-response").textContent = JSON.stringify(response, null, 2);
        } else {
            console.error("User canceled or denied access.");
        }
    }, {
        config_id: '1315986066086999', // Replace with your configuration ID
        response_type: 'code',
        override_default_response_type: true
    });
}

// Handle PostMessage Events from Embedded Signup
window.addEventListener('message', (event) => {
    if (event.origin !== "https://www.facebook.com" && event.origin !== "https://web.facebook.com") {
        return; // Ignore messages from untrusted origins
    }

    try {
        const data = JSON.parse(event.data);
        if (data.type === 'WA_EMBEDDED_SIGNUP') {
            if (data.event === 'FINISH') {
                const { phone_number_id, waba_id } = data.data;
                console.log("Signup completed with:", phone_number_id, waba_id);
            } else if (data.event === 'CANCEL') {
                console.warn("Signup canceled at step:", data.data.current_step);
            } else if (data.event === 'ERROR') {
                console.error("Error during signup:", data.data.error_message);
            }
        }
        document.getElementById("session-info-response").textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error("Invalid event data received:", event.data);
    }
});

// Bind the button to the function
document.getElementById("signup-btn").addEventListener("click", launchWhatsAppSignup);
