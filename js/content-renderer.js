var RenderContentModule = (function() {

  var navButtons = document.querySelectorAll('.nav-button'),
      content = document.querySelector('#content'),
      NavButtonStyle = NavButtonStyleModule,
      UserState = UserStateModule,
      BlogData = BlogDataModule,
      Storage = StorageModule,
      recentPostsTemplate = Handlebars.compile(document.getElementById('recent-posts-template').innerHTML),
      userListTemplate = Handlebars.compile(document.getElementById('user-list-template').innerHTML),
      postsOfUserTemplate = Handlebars.compile(document.getElementById('posts-of-user-template').innerHTML),
      commentFormTemplate = Handlebars.compile(document.getElementById('comment-form-template').innerHTML),
      RECENT_POSTS_LIMIT = 3;

  function printDate(date) {
    return new Date(date).toLocaleDateString([], { hour: '2-digit', minute: '2-digit' }); 
  }

  Handlebars.registerHelper("printDate", printDate);

  function renderRecentPosts() {
    var posts = Storage.getPosts();
    var recentPosts = posts.slice(posts.length-RECENT_POSTS_LIMIT, posts.length).reverse(),
    div = document.createElement('div');
    div.innerHTML = recentPostsTemplate({ recentPosts: recentPosts });
    for (var i = 0; i < RECENT_POSTS_LIMIT; i++) {
      (function(i) {
        div.children[i + 1].children[2].addEventListener('click', function() { renderPostsOfUser(recentPosts[i].author); });
        div.children[i + 1].children[3].addEventListener('click', function() {
          renderPostsOfUser(recentPosts[i].author);
          document.getElementById(div.children[i + 1].id).scrollIntoView(true);
        });
      })(i);
    }
    content.innerHTML = '';
    content.appendChild(div);
  }

  function renderUserList() {
    var users = Storage.getUsers();
    var userList = document.createElement('div');
    userList.innerHTML = userListTemplate({ users: users });
    for (var i = 1; i < userList.children.length; i++ ) {
      (function(i) {
      var userLink = userList.children[i].children[1].children[0];
      userLink.addEventListener('click', function() {
        renderPostsOfUser(userList.children[i].children[1].children[0].innerHTML);
        });
      })(i);
    }
    content.innerHTML = '';
    content.appendChild(userList);
  }

  function renderPostsOfUser(user) {
    var posts = Storage.getPosts().filter(function(post) { return post.author === user; });
    var isLogged = (user === UserState.getCurrentUser());
    var div = document.createElement('div');
    div.innerHTML = postsOfUserTemplate({ user: user, posts: posts, isLogged: isLogged });
    var postForm = div.children[1];
    if (isLogged) {
      postForm.addEventListener('submit', function() { submitPost(postForm); });
      postForm.classList.remove('display-none');
    }
    for (var i = 0, k = 2; i < posts.length; i++, k++) {
      (function(i, k) {
        div.children[k].children[5].children[0].addEventListener('click',
        function() { renderCommentForm(div.children[k], posts[i]); });
      })(i, k);
    }
    content.innerHTML = '';
    content.appendChild(div);
    NavButtonStyle.unPressAllButtons();
  }

  function renderCommentForm(div, post) {
    var formParent = document.createElement('div');
    formParent.innerHTML = commentFormTemplate();
    var form = formParent.children[0];
    form.addEventListener('submit', function() { submitComment(post, form); });
    var nextToCommentLink = div.children[6];
    if (nextToCommentLink.tagName.toLowerCase() !== 'form') {
      div.insertBefore(form, nextToCommentLink);
    }
  }

  function submitComment(post, form) {
    var author = UserState.getCurrentUser() || 'Anonymous',
        content = form.elements[0].value;
    BlogData.addComment(post.id, author, content);
    renderPostsOfUser(post.author);
  }

  function submitPost(form) {
    var author = UserState.getCurrentUser(),
        title = form.elements.title.value,
        content = form.elements.text.value;
    BlogData.addPost(author, title, content);
    renderPostsOfUser(author);
  }

  return { 
    renderPostsOfUser: renderPostsOfUser,
    renderRecentPosts: renderRecentPosts,
    renderUserList: renderUserList
  };

})();
