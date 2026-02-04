
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
        if(customer,isGold){
            const topMovies = await getTopMovies((movies) => {
    
            })
        }
    } catch (error) {
        
    }
}


function getCustomer(id, callback) {
  setTimeout(() => {
    callback({ 
      id: 1, 
      name: 'Mosh Hamedani', 
      isGold: true, 
      email: 'email' 
    });
  }, 2000);  
}

function getTopMovies(callback) {
  setTimeout(() => {
    callback(['movie1', 'movie2']);
  }, 2000);
}

function sendEmail(email, movies, callback) {
  setTimeout(() => {
    callback();
  }, 2000);
}