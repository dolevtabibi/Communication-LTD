function togglePasswordVisibility(inputId) {
    const inputs = inputId ? [document.getElementById(inputId)] : document.querySelectorAll('input[type="password"]');
    inputs.forEach(input => {
      const icon = input.parentElement.querySelector('.password-toggle ion-icon');
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      icon.setAttribute('name', type === 'password' ? 'eye' : 'eye-off');
    });
  }
  
function validateDetails()
    {
        let password = document.getElementById("passwordText");
        if(password.value.length < 10)
        {
            alert("password must be at least 10 characters long");
            return false;
        }
        if(password.value !== document.getElementById("rePasswordText").value)
        {
            alert("password does not match retype");
            return false;
        }
        if (badPasswords.includes(password.value))
        {
            alert("password is too weak");
            return false;
        }
        return true;
    }

    const badPasswords = ["mypassword", "password1234", "1234567890", "0987654321"];