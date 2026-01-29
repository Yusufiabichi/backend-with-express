// const p = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1);
//         reject(new Error('message'));
//     }, 2000);
// });

// p
//     .then(result => console.log('Result', result))
//     .catch(err => console.log('Error', err.message));


    getUser(1, (user) => {
        getRepositories(user.gitHubUsername, (repos) => {
            getCommits(repos[0], (commits) => {
                console.log(commits);
            })
        })
    });

    getUser(1)
        .then(user => getRepositories(user.gitHubUsername))
        .then(repos => getCommits(repos[0]))
        .then(commits => console.log('Commits', commits))
        .catch(err => console.log('Error', err.message))