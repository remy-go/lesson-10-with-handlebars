var users = {
  "vart1": { "name": "vart1", "password": "slaptas1" },
  "vart2": { "name": "vart2", "password": "slaptas2" },
};

function createUserListHTML(data) {
  var html = Handlebars.compile(document.getElementById('user-list-template').innerHTML)(data);
  return minify(html);
}

function minify(text) {
  return text.replace(/\s+/g,' ').trim();
}

var html = `
  <h3>Tinklaraščių autoriai</h3>
  <div id="user" class="user-list-entry">
    <img src="images/user-icon.png">
    <div>
      <span class="link btn-link author">vart1</span>
    </div>
  </div>
    <div id="user" class="user-list-entry">
    <img src="images/user-icon.png">
    <div>
      <span class="link btn-link author">vart2</span>
    </div>
  </div>
`;

QUnit.test("userListTemplate", function(assert) {
  assert.equal(createUserListHTML({ users: users }), minify(html));
});
