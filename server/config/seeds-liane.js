const db = require("./connection");
const {
  getUserArr,
  getCategoryArr,
  getBoothArr,
  getProductArr,
  generateRandomNbrArr,
  generateRandomNbrArr,
  getRandomArrItem,
  getRandomNumber,
} = require("./data");
const { User, Product, Category, Booth } = require("../models");

// make sure we are connected to the database
db.on("error", (err) => err);

// preform this once to the database
db.once("open", async () => {
  await Category.deleteMany();
  console.log("============ ❎ Category Colection deleted ");
  await Product.deleteMany();
  console.log("============ ❎ Product Colection deleted ");
  await Booth.deleteMany();
  console.log("============ ❎ Booth Colection deleted ");
  await User.deleteMany();
  console.log("============ ❎ User Colection deleted ");

  // >>>>>>>>Seed Category
  // seedCategories();
  console.log("Seeding Categories");
  const categoryArr = getCategoryArr();
  const categories = await Category.insertMany(categoryArr);
  console.log("〰️〰️〰️〰️〰️ ✔️ categories seeded 〰️〰️〰️〰️〰️");

  // >>>>>>>Seed Product with categories
  // seedProducts();
  console.log("Seeding Products");
  // const categories = await Category.find({});
  // console.log(categories);
  // console.log(" got here");
  const productArr = getProductArr().map((product) => {
    const catIdx = categories
      .map((category) => category.name)
      .indexOf(product.category);
    if (catIdx !== -1) {
      return {
        ...product,
        category: [
          {
            _id: categories[catIdx]._id,
          },
        ],
      };
    } else {
      return { ...product, category: [] };
    }
  });
  // console.log(productArr);
  const products = await Product.insertMany(productArr);
  console.log("〰️〰️〰️〰️〰️ ✔️ products seeded 〰️〰️〰️〰️〰️");

  // >>>>>>>Seed Booths with products
  console.log("Seeding Booths");
  // const products = await Product.find({});
  const boothArr = getBoothArr();
  // console.log(boothArr)
  //  **** for every booth find an random user as owner and account manager then create booth
  const boothInputArr = boothArr.map((booth) => {
    // console.log(booth)
    // console.log(`*** booth: ${booth.boothName}`)
    // params=
    //   0 we want an index nbr
    //   arr.length of the array of which we want an index
    //   5 number of products per booth
    const productsIdxArr = generateRandomNbrArr(0, products.length, 5, true);
    return {
      ...booth,
      product: [
        {
          _id: products[productsIdxArr[0]]._id,
        },
        {
          _id: products[productsIdxArr[1]]._id,
        },
        {
          _id: products[productsIdxArr[2]]._id,
        },
        {
          _id: products[productsIdxArr[3]]._id,
        },
        {
          _id: products[productsIdxArr[4]]._id,
        },
      ],
    };
  });
  // console.log(boothInputArr)
  const booths = await Booth.insertMany(boothInputArr);
  console.log("〰️〰️〰️〰️〰️ ✔️ seeded Booths with required fields 〰️〰️〰️〰️〰️");

  // >>>>>>>Seed User with required
  console.log("Seeding Users");
  // const booths = await Booth.find({});
  // const userArr = getUserArr();
  await User.create({
    firstName: "Pamela",
    lastName: "Washington",
    username: "PWashington",
    email: "pamela@testmail.com",
    password: "password12345",
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id],
      },
    ],
    boothsOwned: [
      {
        _id: booths[0]._id,
      },
      {
        _id: booths[3]._id,
      },
    ],
  });
  console.log("Pamela Created");

  await User.create({
    firstName: "Elijah",
    lastName: "Holt",
    username: "EHolt",
    email: "eholt@testmail.com",
    password: "password12345",
    boothsOwned: [
      {
        _id: booths[1]._id,
      },
    ],
  });
  console.log("Elijah Created");

  await User.create({
    firstName: "Liane",
    lastName: "Ricciardo",
    username: "LRicciardo",
    email: "LRicciardo@email.com",
    password: "pass123",
    isAdmin: true,
    boothsOwned: [
      {
        _id: booths[2]._id,
      },
    ],
  });
  console.log("Liane Created");

  await User.create({
    firstName: "Christian",
    lastName: "Groselle",
    username: "CGroselle",
    email: "CGroselle@email.com",
    password: "pass123",
    isAdmin: true,
  });
  console.log("Christian Created");

  await User.create({
    firstName: "Alex",
    lastName: "Cook",
    username: "ACook",
    email: "ACook@email.com",
    password: "pass123",
    isAdmin: true,
  });
  console.log("Alex Created");

  await User.create({
    firstName: "Micky",
    lastName: "Adera",
    username: "MAdera",
    email: "MAdera@email.com",
    password: "pass123",
    isAdmin: true,
  });
  console.log("Micky Created");

  console.log("〰️〰️〰️〰️〰️ ✔️ seeded Users with required fields 〰️〰️〰️〰️〰️");

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Seed Booth with required
  // hold db booths
  // const booths = await Booth.find();
  // const booths = await Booth.find();
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

  // ? update owners with user ids?
  // console.log(users)

  console.info(" 🌱 Seeding complete! 🌱");
  process.exit();
});
