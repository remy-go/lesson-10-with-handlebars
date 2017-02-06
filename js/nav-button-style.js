var NavButtonStyleModule = (function() {

  var loginButton = document.querySelector('.login'),
      registrationButton = document.querySelector('.registration'),
      navButtons = document.querySelectorAll('.nav-button'),
      logoutButton = document.querySelector('.logout');

  function pressButton(button) {
    for (var i = 0; i < navButtons.length; i++) {
      navButtons[i].classList.remove('active');
    } 
    button.classList.add('active');
  }

  function unPressButton(button) {
    button.classList.remove('active');
  }

  function unPressAllButtons() {
    for (var i = 0; i < navButtons.length; i++)
    { navButtons[i].classList.remove('active'); } 
  }

  function toggleButtonsOnLoginLogout() {
    logoutButton.classList.toggle('removed');
    loginButton.classList.toggle('removed');
    registrationButton.classList.toggle('removed');
  }

  return {
    pressButton: pressButton,
    unPressButton: unPressButton,
    unPressAllButtons: unPressAllButtons,
    toggleButtonsOnLoginLogout: toggleButtonsOnLoginLogout
  };

})();
