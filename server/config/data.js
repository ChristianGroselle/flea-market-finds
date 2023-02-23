const userArr = [
  {
    firstName: "Christian",
    lastName: "Groselle",
    username: "CGroselle",
    email: "CGroselle@email.com",
    password: "pass123",
    isAdmin: true,
  },
  {
    firstName: "Liane",
    lastName: "Ricciardo",
    username: "LRicciardo",
    email: "LRicciardo@email.com",
    password: "pass123",
    isAdmin: true,
  },
  {
    firstName: "Alex",
    lastName: "Cook",
    username: "ACook",
    email: "ACook@email.com",
    password: "pass123",
    isAdmin: true,
  },
  {
    firstName: "Micky",
    lastName: "Adera",
    username: "MAdera",
    email: "MAdera@email.com",
    password: "pass123",
    isAdmin: true,
  },
  {
    firstName: "Pamela",
    lastName: "Washington",
    username: "PWashington",
    email: "pamela@testmail.com",
    password: "password12345",
  },
  {
    firstName: "Elijah",
    lastName: "Holt",
    username: "EHolt",
    email: "eholt@testmail.com",
    password: "password12345",
  },
];

const emailEndings = [
  "@gmail.com",
  "@yahoo.com",
  "@hotmail.com",
  "@outlook.com",
  "@hotmail.co.uk",
  "@yahoo.co.uk",
  "@outlook.co.uk",
  "@company.org",
  "@school.edu",
  "@bureaucracy.gov",
  "@network.net",
  "@military.mil",
  "@domain.co",
  "@thebighouse.us",
  "@mailings.post",
  "@techblog.blog",
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
  {
    boothName: "Marvelous Market",
    description: "Marvelous thing for Marvelous People",
    owner: [],
  },
  {
    boothName: "Prime Packages",
    description: "Miscellaneous items to Pack",
    owner: [],
  },
  {
    boothName: "Flea Market Fancy Finds",
    description: "Prime Collectibles",
    owner: [],
  },
  {
    boothName: "Amazing Games",
    description: "Be Amazed at the games and assorted finds",
    owner: [],
  },
];

const productArr = [
  {
    name: "Bauducco Butter Cookies Tin ",
    description:
      "BAUDUCCO BUTTER COOKIES TIN There's nothing like a buttery cookie to match a cup of coffee or tea during an afternoon snack. Bauducco Butter Cookies are made with only the finest ingredients, including real butter. They're perfect for any occasion, and they're also a great gift",
    image: "cookie-tin.jpg",
    category: "Food",
    price: 2.99,
    quantity: 500,
    condition: "new",
  },
  {
    name: "UCC Hawaii Kona Blend Coffee with Milk, 11.3 Fl Oz (Pack of 24)Canned Coffee",
    description:
      "UCC is one of the top coffee and tea beverage companies in Japan. This canned Hawaiian Kona coffee is sweetened and already has milk inside. Great for those who want Hawaiian Kona iced coffee on the go.",
    image: "canned-coffee.jpg",
    category: "Food",
    price: 1.99,
    quantity: 500,
    condition: "excellent",
  },
  {
    name: "Toilet Paper",
    category: "Household Supplies",
    description:
      "Exceptional cleaning without compromising softness. Charmin Clean Touch Family Mega Roll has 5x more sheets per roll* and is a great way to keep everyone’s hiney shiny without having to change the roll as often! It’s more convenient and you get more ‘gos’ per roll. Order for a longer lasting TP for you and your family.",
    image: "toilet-paper.jpg",
    price: 7.99,
    quantity: 20,
    condition: "excellent",
  },
  {
    name: "Handmade Olive Oil Soap - 100% Pure Natural, Vegan - 5.6 oz Each Bar (6)",
    category: "Household Supplies",
    description:
      "OLIVE OIL creates a unique soap that cleanses effectively, producing a velvety smooth lather that leaves the skin silky smooth and refreshed.Olive oil also makes the skin smooth, soft and it stimulates, strengthens and nourishes the skin.",
    image: "soap.jpg",
    price: 3.99,
    quantity: 50,
    condition: "excellent",
  },
  {
    name: "Set of Wooden Spoons",
    category: "Household Supplies",
    description:
      "These wooden spoons works great for dining or serving food from enamel saucepans that you won’t want to scratch up! Never has horrible clinking noise again when using our wooden dinner spoons, cooking spoons",
    image: "wooden-spoons.jpg",
    price: 14.99,
    quantity: 100,
    condition: "excellent",
  },
  {
    name: "Camera",
    category: "Small Electronics",
    description:
      "Perfect for beginners, this camera bundle offers the essential tools needed to take your SLR skills to new heights, all in one convenient package. No matter where your next adventure takes you, count on the EOS Rebel t7's impressive 24.1 Megapixel CMOS sensor and wide ISO range of 100-6400 (H: 12800) to capture high-quality images, even in low-light situations.",
    image: "camera.jpg",
    price: 399.99,
    quantity: 30,
    condition: "excellent",
  },
  {
    name: "Tablet",
    category: "Small Electronics",
    description:
      "Fast and responsive - powerful octa-core processor and 3 GB RAM. 50% more RAM than previous generation. Long-lasting 12-hour battery and 32 or 64 GB internal storage. Add up to 1 TB with microSD (sold separately).",
    image: "tablet.jpg",
    price: 199.99,
    quantity: 30,
    condition: "excellent",
  },
  {
    name: "Tales at Bedtime by Enid Blyton",
    category: "Books",
    description: "1969 collectable Kids Book",
    image: "bedtime-book.jpg",
    price: 9.99,
    quantity: 100,
    condition: "excellent",
  },
  {
    name: "Spinning Top",
    category: "Toys",
    category: "Toys",
    description:
      "Spinning is one of the most classic toys in the past. Nowadays, it is also very hot and among kids. This is a portable mini spinning design",
    image: "spinning-top.jpg",
    price: 1.99,
    quantity: 1000,
    condition: "excellent",
  },
  {
    name: "Set of Plastic Horses",
    category: "Toys",
    category: "Toys",
    description:
      "Vintage 42 Pcs. Marx Plastic Horses & Saddles Roy Rogers Fort Apache",
    image: "plastic-horses.jpg",
    price: 2.99,
    quantity: 1000,
    condition: "excellent",
  },
  {
    name: "Teddy Bear",
    category: "Toys",
    category: "Toys",
    description:
      "13.7 inches 3 Packs of Soft Stuffed Teddy Bear Plush Dolls, Children’s Sleeping and Playing Toys, Home Decorations",
    image: "teddy-bear.jpg",
    price: 7.99,
    quantity: 100,
    condition: "excellent",
  },
  {
    name: "Alphabet Blocks",
    category: "Toys",
    category: "Toys",
    description:
      "Spark. Create. Imagine. 40 pc ABC Blocks are desigend for young boys and girls from ages 18 months to 72 months.",
    image: "alphabet-blocks.jpg",
    price: 9.99,
    quantity: 600,
    condition: "excellent",
  },
];

const reactionDescriptions = [
  "What a cool thought",
  "I never thought of it like that",
  "What a great idea",
  "Interesting",
  "Mind blowing",
  "Little idea. Think Bigger!",
  "Man What were you thing!",
  "Hello world",
  "I need to rethink this",
  "Broaden that idea. You're on to something!",
  "I heard of this.",
  "This is a great idea",
  "Simple yet complex",
  "WoW! Just ... Wow!",
  "I thought of this but you did it.",
];

// Get a random item given an array
//*min is the smallest possible generated number
//    min of 0 will get an index into an array
//*max is the largest possible generated number
const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (min - max) + max);

// Get a random item given an array
//*min is the smallest possible generated number
//*max is the largest possible generated number
//*numOfRandoms is the number of random numbers to generate
//*unique is a boolean specifying whether the generated random numbers need to be unique
const generateRandomNbrArr = (min, max, numOfRandoms, unique) => {
  const randomNbrs = [];
  while (randomNbrs.length < numOfRandoms) {
    const number = getRandomNumber(min, max);
    // if number is not found in array (-1) or
    //   the number is found the array and the unique flag is not true,
    //   then add number to array
    if (randomNbrs.indexOf(number) == -1 || !unique) {
      randomNbrs.push(number);
    }
  }
  return randomNbrs;
};

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
const getEmail = () => {
  const user = getRandomArrItem(userArr);
  console.log(user);
  return `${user.firstName.slice(0, 1)}${user.lastName}${getRandomArrItem(
    emailEndings
  )}`;
};

// Export the functions for use in seed.js
module.exports = {
  getUserArr,
  getCategoryArr,
  getBoothArr,
  getProductArr,
  getEmail,
  getRandomArrItem,
  generateRandomNbrArr,
  getRandomNumber,
};
