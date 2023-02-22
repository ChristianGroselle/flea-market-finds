const db = require("./connection");
const {
  getUserArr,
  getCategoryArr,
  getBoothArr,
  getProductArr,
  getRandomArrItem,
  getRandomNumber
} = require("./data");
const { User, Product, Category, Booth } = require("../models");

// make sure we are connected to the database
db.on('error', (err) => err);

// preform this once to the database
db.once("open", async () => {
  await Category.deleteMany();
  console.log('============ ❎ Category Colection deleted ');
  await User.deleteMany();
  console.log('============ ❎ User Colection deleted ');
  await Booth.deleteMany();
  console.log('============ ❎ Booth Colection deleted ');
  await Product.deleteMany();
  console.log('============ ❎ Product Colection deleted ');
  
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Seed Category
  
  const categoryArr = getCategoryArr()
  await Category.insertMany(categoryArr);;
  console.log("〰️〰️〰️〰️〰️ ✔️ categories seeded 〰️〰️〰️〰️〰️");
  
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Seed User with required
  const userArr = getUserArr();
  await User.insertMany(userArr);
  console.log("〰️〰️〰️〰️〰️ ✔️ seeded Users with required fields 〰️〰️〰️〰️〰️");

  // hold db users
  const users = await User.find();
  // console.log(users)
 
      
  const productArr = getProductArr();
  await Product.insertMany(productArr);;
  console.log("〰️〰️〰️〰️〰️ ✔️ products seeded 〰️〰️〰️〰️〰️");
  
  // hold db users
  const products = await Product.find();
  console.log(products)

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Seed Booth with required
  const boothArr = getBoothArr();
  // console.log(boothArr)
  //  **** for every booth find an random user as owner and account manager then create booth
  const boothInputArr  = boothArr.map((booth)=> {
    // console.log(booth)
    const userIdx1 = getRandomNumber(users.length)
    const userIdx2 = getRandomNumber(users.length)
    console.log(`*** booth: ${booth.boothName}`)
    console.log(`owner 1: ${users[userIdx1].username}, ${users[userIdx1]._id}   owner 2: ${users[userIdx2].username}, ${users[userIdx2]._id}`)
    booth.owner.push(users[userIdx1]._id)
    if (userIdx1 !== userIdx2) {
      booth.owner.push(users[userIdx2]._id)
    }
    // console.log(`booth owner==> ${booth.owner}`)
    return {      
      ...booth,
    }
  })
  // console.log(boothInputArr)
  await Booth.insertMany(boothInputArr);
  console.log("〰️〰️〰️〰️〰️ ✔️ seeded Booths with required fields 〰️〰️〰️〰️〰️");

  // hold db booths
  const booths = await Booth.find();
  // console.log(booths);
  //  for every booth find the owners and update with boothid
  // for(let b=0; b<booths.length; b++) {
  //   console.log("  ");
  //   console.log(` === booth:${booths[b].boothName} <=> ${booths[b]._id}`);
  //   const boothID = booths[b]._id;
  //   const owner = booths[b].owner || [];
  //   if (owner.length > 0){
  //     for(let o=0; o<owner.length; o++){
  //       console.log(` ==== owner id:${owner[o]._id} ${typeof owner[o]._id} `);
  //       const ownerID = owner[o];
  //       for(let u=0; u<users.length; u++){
  //         console.log(`> user:${users[u].username} <=> ${users[u]._id} ${typeof users[u]._id}`);
  //         const userID = users[u]._id;
  //       // check to see if the owner = user
  //       if (userID == ownerID) {
  //         console.log(` 🆗 boothID ${boothID} pushed to user owner arr ***`);
  //         users[u].boothsOwned.push(boothID);
  //       } else {
  //         console.log(` 🚫 userID ${userID} doesn't match ownerID ${ownerID} `)
  //       }
  //     }
  //   }
  //   }
  // };


  // //  for every booth find the owners and update with boothid
  // for(let u=0; u<users.length; u++){
  //   console.log("  ");
  //   console.log(`> user:${users[u].username} <=> ${users[u]._id}`);
  //   const userID = users[u]._id;
  //   const boothsOwned = await Booth.find({ "owner": db.
  //   db.Schema.Types.ObjectId(userID) });
  //   if (boothsOwned.length > 0) {
  //     console.log(`> boothsOwned: ${boothsOwned}`)
  //   }
  // }
    
    

// ? update user with booth id
// console.log(users)



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Seed Product
  // const productArr = getProductArr();
// for every product find a random booth then create product
// ? update booth with product id?
  // const products = await Product.insertMany(productArr);

  console.info(' 🌱 Seeding complete! 🌱');
  process.exit();
});
