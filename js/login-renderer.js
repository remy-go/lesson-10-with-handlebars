var RenderLoginRegisterModule = (function() {

  var registrationButton = document.querySelector('.registration'),
      content = document.querySelector('#content'),
      NavButtonStyle = NavButtonStyleModule,
      RenderContent = RenderContentModule,
      UserState = UserStateModule,
      BlogData = BlogDataModule,
      Storage = StorageModule,
      loginFormTemplate = Handlebars.compile(document.getElementById('login-form-template').innerHTML),
      registrationFormTemplate = Handlebars.compile(document.getElementById('registration-form-template').innerHTML);

  function renderRegistrationForm() {
    var registrationParent = document.createElement('div'),
        form;
    registrationParent.innerHTML = registrationFormTemplate();
    form = registrationParent.children[0];
    form.addEventListener('submit', function() { submitRegistrationForm(form); });
    content.innerHTML = '';
    content.appendChild(form);
  }

  function submitRegistrationForm(form) {
    var users = Storage.getUsers();
    var user = form.elements.username.value;
    var password = form.elements.password.value;
    if (users.hasOwnProperty(user)) {
      var message = document.createElement('div');
      message.innerHTML = 'Yra jau toks!';
      form.appendChild(message);
    } else {
      UserState.register(user, password);
      content.innerHTML = '';
      RenderContent.renderPostsOfUser(user);
      NavButtonStyle.toggleButtonsOnLoginLogout();
      NavButtonStyle.unPressButton(registrationButton);
    }
  }

  function renderLoginForm() {
    var loginParent = document.createElement('div'), form;
    loginParent.innerHTML = loginFormTemplate();
    form = loginParent.children[0];
    form.addEventListener('submit', function() { submitLoginForm(form); });
    content.innerHTML = '';
    content.appendChild(form);
  }

  function submitLoginForm(form) {
    var users = Storage.getUsers();
    var user = form.elements.username.value;
    var password = form.elements.password.value;
    if (users.hasOwnProperty(user) && users[user].password === password) {
      UserState.login(user, password);
      content.innerHTML = '';
      RenderContent.renderPostsOfUser(user);
      NavButtonStyle.toggleButtonsOnLoginLogout();
    } else {
      var message = document.createElement('div');
      message.innerHTML = 'Neteisingas prisijungimas!';
      form.appendChild(message);
    }
  }

  return { 
    renderRegistrationForm: renderRegistrationForm,
    renderLoginForm: renderLoginForm
  };

})();
