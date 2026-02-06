
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });


async function sendMail() {
    try {
        const customer = await getCustomer(1)
        console.log('Customer: ', customer);
        if (customer.isGold){
          const movies = await getTopMovies()
          console.log('Top movies: ', movies)
          sendEmail(customer.email, movies)
          console.log('Email sent....')
        }
    } catch (error) {
        console.log('Error', err.message)
    }
}

sendMail()

function getCustomer(id) {
  return new Promise((resolve, reject) =>{
    setTimeout(() => {
      resolve({ 
        id: 1, 
        name: 'Yusufia Bichi', 
        isGold: true, 
        email: 'yusufiabichi@yahoo.com' 
      });
    }, 2000);  
  })
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 2000);
  })
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  })
}