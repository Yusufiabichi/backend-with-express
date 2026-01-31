// const p = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1);
//         reject(new Error('message'));
//     }, 2000);
// });

// p
//     .then(result => console.log('Result', result))
//     .catch(err => console.log('Error', err.message));


    // getUser(1, (user) => {
    //     getRepositories(user.gitHubUsername, (repos) => {
    //         getCommits(repos[0], (commits) => {
    //             console.log(commits);
    //         })
    //     })
    // });

    // getUser(1)
    //     .then(user => getRepositories(user.gitHubUsername))
    //     .then(repos => getCommits(repos[0]))
    //     .then(commits => console.log('Commits', commits))
    //     .catch(err => console.log('Error', err.message))


    const p1 = new Promise((resolve) => {
        setTimeout(() => {
            console.log('Async op 1...')
            resolve(1);
        }, 2000);
    });

    const p2 = new Promise((resolve) => {
        setTimeout(() => {
            console.log('Async op 2...')
            resolve(2);
        }, 2000);
    });

    const p3 = new Promise((resolve) => {
        setTimeout(() => {
            console.log('Async op 3...')
            resolve(3);
        }, 2000);
    });




    Promise.race([p1, p2, p3])
        .then(result => console.log(result))
        .catch(err => console.log('Error', err.message));
