$(document).ready(function(){
  $('#searchUser').on('keyup', function(e){
    let username = (e.target.value);

    // make request to Github
    $.ajax({
      url:'https://api.github.com/users/' + username,
      data:{
        client_id: '56d804e6e15911ab2bc5',
        client_secret:'16efe1dba21c6a175707a132a657b9438b48ee7e'
      }
    }).done(function(user){
      $.ajax({
        url:'https://api.github.com/users/' + username + '/repos',
        data:{
          client_id: '56d804e6e15911ab2bc5',
          client_secret:'16efe1dba21c6a175707a132a657b9438b48ee7e',
          sort: 'created: asc',
          per_page: 5
        }
      }).done(function(repos){
        $.each(repos, function(index, repo){
          $('#repos').append(`
            <div class="well">
              <div class="row">
                <div class="col-md-7">
                  <li class="list-group-item"><h4> ${repo.name}</h4>${repo.description}</li>
                </div>
                <div class="col-md-3">
                  <span class="badge badge-primary">Forks: ${repo.forks_count}</span>
                  <span class="badge badge-success">Watchers: ${repo.watchers_count}</span>
                  <span class="badge badge-danger">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank"  button type="button" class="btn btn-primary button">Repo Page</a>
                </div>
              </div>
            </div>
            `);
        });
      });
      $('#profile').html(`
        <div class="card">
          <div class="card-header">
            ${user.name}
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-3">
                <img class="thumbnail avatar"  src="${user.avatar_url}">
                <a target="_blank" button type="button" class="btn btn-primary button" href="${user.html_url}">View Profile</button></a>
              </div>
              <div class="col-md-9">
                <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                <span class="badge badge-success">Public Gists: ${user.public_gist}</span>
                <span class="badge badge-danger">Followers: ${user.followers}</span>
                <span class="badge badge-warning">Following: ${user.following}</span>
                <br><br>
                <ul class="list-group">
                  <li class="list-group-item">Company: ${user.company}</li>
                  <li class="list-group-item">Blog: ${user.blog}</li>
                  <li class="list-group-item">Location: ${user.location}</li>
                  <li class="list-group-item">Member Since: ${user.created_at}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>
        `);
    });
  });
});
