const searchBtn = document.getElementById('search-btn');
let User = {
    name:'',
    company:'',
    location:'',
    website:'',
    created_at:'',
    public_repos:'',
    public_gists:'',
    followers:'',
    following:'',
    avatar_url:'',
    html_url:'',
    repos : []
}
searchBtn.addEventListener('click', async () =>{
    const name = document.getElementById('search-input').value;
    try {
        const user = await fetch(`https://api.github.com/users/${name}`)
        .then(res => res.json())
        .then(data => {User = data;});
        const repos = await fetch(`https://api.github.com/users/${name}/repos`)
        .then(res => res.json())
        .then(data => {
            let arr = [];
            for(let i = 0; i < data.length; i++){
                arr.push({html_url:data[i].html_url,name:data[i].name, star:data[i].stargazers_count, watchers:data[i].watchers_count, forks:data[i].forks});
            }
            User.repos = arr;
        });
    }catch(err){
        console.log(err);
    } finally{
        document.getElementById('user-avatar-picture').src = User.avatar_url;
        document.getElementById('public_repos_span').innerText = 'Public Repos : ' + User.public_repos;
        document.getElementById('public_gists_span').innerText = 'Public Gists :'+ User.public_gists;
        document.getElementById('followers_span').innerText = 'Followers :'+ User.followers;
        document.getElementById('following_span').innerText = 'Following :'+ User.following;
        document.getElementById('location_p').innerText = 'Location :'+ User.location;
        document.getElementById('company_p').innerText = 'Company :'+ User.company;
        document.getElementById('website_p').innerText = 'Website :'+ User.website;
        document.getElementById('member_p').innerText = 'Member :'+ User.created_at;
        document.getElementById('user-profile-btn').addEventListener('click', () =>{
            window.open(User.html_url, '_blank');
        })
        const repo_div = document.getElementById('latest-repos');
        for(let i = 0; i < User.repos.length; i++){
            repo_div.append(create_repo_element(User.repos[i]));
        }
    }
})

function create_repo_element(repo_info){
    const repo_div = document.createElement('div');
    const repo_name_span = document.createElement('span');
    const repo_star_span = document.createElement('span');
    const repo_watchers_span = document.createElement('span');
    const repo_forks_span = document.createElement('span');
    const repo_url_a = document.createElement('a');
    repo_url_a.href = repo_info.html_url;
    repo_url_a.innerText = repo_info.name;
    repo_name_span.append(repo_url_a);
    
    repo_star_span.innerText = 'Star :'+ repo_info.star;
    repo_watchers_span.innerText = 'Watchers :'+ repo_info.watchers;
    repo_forks_span.innerText = 'Forks :'+ repo_info.forks;

    repo_star_span.classList.add('blue-span');
    repo_watchers_span.classList.add('gray-span');
    repo_forks_span.classList.add('green-span');
    repo_name_span.classList.add('repo-name-span');

    repo_div.classList.add('repo-div');

    repo_div.append(repo_name_span);
    repo_div.append(repo_star_span);
    repo_div.append(repo_watchers_span);
    repo_div.append(repo_forks_span);

    return repo_div;
}