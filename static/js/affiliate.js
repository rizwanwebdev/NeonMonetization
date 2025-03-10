    // Countdown timer (for demonstration, you can adjust the target date)
    const targetDate = new Date("March 15, 2025 00:00:00").getTime();
    
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("timer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("timer").innerHTML = "The program is now live!";
      }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);

    // Handle email subscription
    function subscribe() {
      const email = document.getElementById("email").value;
      const errorMessage = document.getElementById("error-message");
      
      // Clear any previous error message
      errorMessage.style.display = 'none';

      if (email && validateEmail(email)) {
        // Display thank you message with email
        document.getElementById("thank-you-email").textContent = email;
        document.getElementById("thank-you").style.display = 'block';
        document.getElementById("email").value = ''; // Clear input field
      } else {
        // Display error message
        errorMessage.style.display = 'block';
      }
    }

    // Email validation function
    function validateEmail(email) {
      // Regular expression to check the email format
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      // Check if email contains '@' symbol and is in the correct format
      if (!email.includes('@')) {
        return false; // Invalid email if '@' is missing
      }

      return regex.test(email);
    }