console.log('Before')
getUser(1, displayUsers);
console.log('after');

function displayCommits(commits){
    console.log(commits)
}
function displayRepos(repos){
    getCommits(repos, displayCommits)
}

function displayUsers(user){
    getRepositories(user.gitHubUsername, displayRepos)
}


function getUser(id, callback){
    setTimeout(() => {
        console.log("Reading User from the database");
        callback({ id: id, gitHubUsername: 'Yusufia'});
    }, 2000);
}

function getRepositories(username, callback){
    setTimeout(() => {
        console.log('Getting Repositories');
        callback(['repo1', 'repo2', 'repo3'])
    }, 3000);
}

function getCommits(repos, callback){
    setTimeout(() => {
        console.log('Getting commits');
        callback(['commit1', 'commit2']);
    })
}