var UserState = UserStateModule,
    BlogData = BlogDataModule,
    InitialData = InitialDataModule,
    Storage = StorageModule;

InitialData.initializeStorage();

function resetUser() {
  UserState.setCurrentUser(null);
}

QUnit.test('set-get current user', function(assert) {
  resetUser();
  UserState.setCurrentUser('vart1');
  assert.equal(UserState.getCurrentUser(), 'vart1');
  resetUser();
});

QUnit.test('login-logout', function(assert) {
  resetUser();
  UserState.login('vart1', 'slaptas1');
  assert.equal(UserState.getCurrentUser(), 'vart1');
  UserState.logout();
  assert.equal(UserState.getCurrentUser(), null);
  UserState.login('vart1', 'bad_password'); // bad password
  assert.equal(UserState.getCurrentUser(), null);
  UserState.login('nonexistent', 'nonexistent'); //nonexistent user
  assert.equal(UserState.getCurrentUser(), null);
  resetUser();
});

QUnit.test('login on registration', function(assert) {
  resetUser();
  UserState.register('vart1', 'slaptas1'); // existing user
  assert.equal(UserState.getCurrentUser(), null);
  UserState.register('new_user', 'new_user'); // new user
  assert.equal(UserState.getCurrentUser(), 'new_user'); //{ name: 'new_user', password: 'new_user' });
  resetUser();
  BlogData.removeUser('new_user');
});

QUnit.test('adding user on registration', function(assert) {
  var usersBefore = Storage.getUsers();
  UserState.register('vart1', 'slaptas1'); // existing user
  var usersAfter = Storage.getUsers();
  assert.deepEqual(usersBefore, usersAfter); // nothing changed

  UserState.register('new_user', 'new_user'); // new user
  assert.deepEqual(Storage.getUsers().new_user, { "name": "new_user", "password": "new_user" });
  resetUser();
  BlogData.removeUser('new_user');
});
