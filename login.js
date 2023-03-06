function togglePasswordVisibility(id) {
  const passwordInput = document.getElementById(id);
  const passwordToggleIcon = document.getElementById('password-toggle-icon');
  
  if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      passwordToggleIcon.setAttribute('name', 'eye');
  } else {
      passwordInput.type = 'password';
      passwordToggleIcon.setAttribute('name', 'eye-off');
  }
}

  
  document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); // prevent form submission
    window.location.href = "system.html"; // redirect to new page
  });
