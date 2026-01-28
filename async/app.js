getUser(1, (user) => {
    console.log('User', user);

    getRepositories(user.gitHubUsername, (repos) =>{
        console.log('Repos', repos);
    })
});
console.log('after');

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