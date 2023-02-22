const userArr = [
  { firstName: 'Christian', lastName: "Groselle", username: "CGroselle", email: 'CGroselle@email.com', password: 'pass123', isAdmin: true },
  { firstName: 'Liane', lastName: "Ricciardo", username: "LRicciardo", email: 'LRicciardo@email.com', password: 'pass123', isAdmin: true},
  { firstName: 'Alex', lastName: "Cook", username: "ACook", email: 'ACook@email.com', password: 'pass123', isAdmin: true},
  { firstName: 'Micky', lastName: "Adera", username: "MAdera", email: 'MAdera@email.com', password: 'pass123', isAdmin: true},
  { firstName: "Pamela", lastName: "Washington", username: "PWashington", email: "pamela@testmail.com", password: "password12345" },
  { firstName: "Elijah", lastName: "Holt", username: "EHolt", email: "eholt@testmail.com", password: "password12345" },
];

const emailEndings = [
  '@gmail.com',
  '@yahoo.com',
  '@hotmail.com',
  '@outlook.com',
  '@hotmail.co.uk',
  '@yahoo.co.uk',
  '@outlook.co.uk',
  '@company.org',
  '@school.edu',
  '@bureaucracy.gov',
  '@network.net',
  '@military.mil',
  '@domain.co',
  '@thebighouse.us',
  '@mailings.post',
  '@techblog.blog',
];

const categoryArr = [
  { name: "Food" },
  { name: "Household Supplies" },
  { name: "Household Goods" },
  { name: "Small Electronics" },
  { name: "Large Electronics" },
  { name: "Tech" },
  { name: "Books" },
  { name: "Fashion" },
  { name: "Auto" },
  { name: "Collectible" },
  { name: "Furniture" },
  { name: "Crafts" },
  { name: "Art" },
  { name: "Toys" },
];

const boothArr = [
  { boothName: "Marvelous Market", description: "Marvelous thing for Marvelous People", owner: [] },
  { boothName: "Prime Packages", description: "Miscellaneous items to Pack", owner: [] },
  { boothName: "Flea Market Fancy Finds", description: "Prime Collectibles", owner: [] },
  { boothName: "Amazing Games", description: "Be Amazed at the games and assorted finds", owner: [] },
];

const productArr = [  
  {
    name: "Tin of Cookies",
    description:
      "12 oz tin of shortbread cookies",
    image: "cookie-tin.jpg",
    // category: categories[0]._id,
    price: 2.99,
    quantity: 500,
    condition: "new",
  },
  {
    name: "Canned Coffee",
    description:
      "Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.",
    image: "canned-coffee.jpg",
    // category: categories[0]._id,
    price: 1.99,
    quantity: 500,
    condition: "excellent",
  },
  {
    name: "Toilet Paper",
    // category: categories[1]._id,
    description:
      "Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.",
    image: "toilet-paper.jpg",
    price: 7.99,
    quantity: 20,
    condition: "excellent",
  },
  {
    name: "Handmade Soap",
    // category: categories[1]._id,
    description:
      "Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.",
    image: "soap.jpg",
    price: 3.99,
    quantity: 50,
    condition: "excellent",
  },
  {
    name: "Set of Wooden Spoons",
    // category: categories[1]._id,
    description:
      "Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.",
    image: "wooden-spoons.jpg",
    price: 14.99,
    quantity: 100,
    condition: "excellent",
  },
  {
    name: "Camera",
    // category: categories[2]._id,
    description:
      "Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.",
    image: "camera.jpg",
    price: 399.99,
    quantity: 30,
    condition: "excellent",
  },
  {
    name: "Tablet",
    // category: categories[2]._id,
    description:
      "In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.",
    image: "tablet.jpg",
    price: 199.99,
    quantity: 30,
    condition: "excellent",
  },
  {
    name: "Tales at Bedtime",
    // category: categories[3]._id,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.",
    image: "bedtime-book.jpg",
    price: 9.99,
    quantity: 100,
    condition: "excellent",
  },
  {
    name: "Spinning Top",
    // category: categories[4]._id,
    description:
      "Ut vulputate hendrerit nibh, a placerat elit cursus interdum.",
    image: "spinning-top.jpg",
    price: 1.99,
    quantity: 1000,
    condition: "excellent",
  },
  {
    name: "Set of Plastic Horses",
    // category: categories[4]._id,
    description:
      "Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.",
    image: "plastic-horses.jpg",
    price: 2.99,
    quantity: 1000,
    condition: "excellent",
  },
  {
    name: "Teddy Bear",
    // category: categories[4]._id,
    description:
      "Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.",
    image: "teddy-bear.jpg",
    price: 7.99,
    quantity: 100,
    condition: "excellent",
  },
  {
    name: "Alphabet Blocks",
    // category: categories[4]._id,
    description:
      "Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.",
    image: "alphabet-blocks.jpg",
    price: 9.99,
    quantity: 600,
    condition: "excellent",
  },
];

const reactionDescriptions = [
  'What a cool thought',
  'I never thought of it like that',
  'What a great idea',
  'Interesting',
  'Mind blowing',
  'Little idea. Think Bigger!',
  'Man What were you thing!',
  'Hello world',
  'I need to rethink this',
  'Broaden that idea. You\'re on to something!',
  'I heard of this.',
  'This is a great idea',
  'Simple yet complex',
  'WoW! Just ... Wow!',
  'I thought of this but you did it.',
];

// Get a random item given an array
const getRandomNumber = (nbr) => Math.floor(Math.random() * nbr);

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets users
const getUserArr = () => userArr;

// Gets categories
const getCategoryArr = () => categoryArr;

// Gets booths
const getBoothArr = () => boothArr;

// Gets products
const getProductArr = () => productArr;

// Gets a random full name
const getEmail = () =>{
  const user = getRandomArrItem(userArr);
  console.log(user);
  return `${user.firstName.slice(0,1)}${user.lastName}${getRandomArrItem(emailEndings)}`;
}


// Export the functions for use in seed.js
module.exports = { 
  getUserArr, 
  getCategoryArr, 
  getBoothArr, 
  getProductArr,
  getEmail,
  getRandomArrItem, 
  getRandomNumber };
