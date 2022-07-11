const signUpFormHandler = async (event) => {
    console.log('signUpFormHandler');
      event.preventDefault();
      const email = document.querySelector('#email-signup').value.trim();  
      const username = document.querySelector('#username-signup').value.trim();
      const password = document.querySelector('#password-signup').value.trim();
    
      if (email && username && password) {
        console.log("signup");
        const response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({ email, username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert(response.statusText);
        }
      }
    };
  
    document.getElementById("submitBtn").addEventListener("click", signUpFormHandler);