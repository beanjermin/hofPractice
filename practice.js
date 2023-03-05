// This repo is optional extra practice to use the underscore functions.
// Here we'll be writing new functions, but these functions will use
// the underscore functions within them.

// If you would like to take a look at the inputs that are passed into these functions, please
// feel free to check out the data.js file.

/*
 *
 *  _.each
 *
 */

// use _.each to create a copy of the given array.
var moreFruits = function (fruits) {
  var results = [];

  _.each(fruits, function(fruit, index, collection) {
    results.push(fruit);
  });

  return results;
};


//================================================================================================
// use _.each to traverse the number array and determine
// which are multiples of five.

var multiplesOfFive = function (numbers) {
  var results = [];
  _.each(numbers, function(testNumber, index, collection) {
    if (testNumber % 5 === 0) {
      results.push(testNumber);
    }
  })
  return results.length;
};


//================================================================================================
// use _.each to build an array containing only tweets belonging to a specified user.

var getUserTweets = function(tweets, user) {
  var targetUser = [];
  _.each(tweets, function(currentTweet, index, collection) {
    if (currentTweet.user === user) {
      targetUser.push(currentTweet);
    }
  })
  return targetUser;
};


//================================================================================================


/*
 *
 *  _.filter
 *
 */


// use _.filter to return the fruits array with only the desired fruit.
var onlyOneFruit = function (fruits, targetFruit) {
  var target = function (currentFruit) {
    return currentFruit === targetFruit;
  }
  return _.filter (fruits, target);
};


//================================================================================================
// use _.filter to return the fruits array with only fruits
// starting with the letter 'P'.
var startsWith = function (fruits, letter) {
  var fruitWithLetter = function (targetLetter) {
    return targetLetter.charAt(0) === letter;
  }
  return _.filter (fruits, fruitWithLetter)
};


//================================================================================================
// return a filtered array containing only cookie-type desserts.
var cookiesOnly = function (desserts) {
  var cookieDesserts = function (cookies) {
    return cookies.type === 'cookie';
  }
  return _.filter (desserts, cookieDesserts);
};


//================================================================================================
// rebuild the getUserTweets function from above with _.filter instead
var filterUserTweets = function(tweets, user) {
  var targetedUser = function (tweet) {
    return tweet.user === user;
  }
  return _.filter (tweets, targetedUser);
};


//================================================================================================
/*
 *
 *  _.map
 *
 */

// given an array of strings, use _.map to return a new array containing all
// strings converted to uppercase letters.
var upperCaseFruits = function (fruits) {
  var upperCase = function (fruit) {
    return fruit.toUpperCase();
  }
  return _.map(fruits, upperCase);
};


//================================================================================================
// given an array of dessert objects, return a new array of objects
// that have a new "glutenFree" property, with a boolean value.
// TIP: Items that contain flour are not gluten-free.
var glutenFree = function (desserts) {
  var hasFlour = function (currentDessert) {
    if (currentDessert.ingredients.indexOf('flour') === -1) {
      currentDessert.glutenFree = true;
    } else {
      currentDessert.glutenFree = false;
    }
    return currentDessert;
  }
  var changedArray = _.map(desserts, hasFlour);

  var glutenFreeDesserts = function (currentDessert) {
    return currentDessert.glutenFree === true;
  }
  return _.filter(changedArray, glutenFreeDesserts);
};


//================================================================================================
// given an array of tweet objects, return a new array of strings
// containing only the message properties.
var allUserMessages = function(tweets) {
  var messageOnly = function (currentTweet) {
    return currentTweet = currentTweet.message;
  }
  return _.map(tweets, messageOnly);
};


//================================================================================================
// use _.map to return an array of items with their sale prices, with a new property
// containing the sale price. round any decimals to 2 places.
//
// having trouble with decimals? check out this article:
// http://adripofjavascript.com/blog/drips/avoiding-problems-with-decimal-math-in-javascript.html
//
/*

 example output:
  var salePrices = applyCoupon(groceries, 0.20);
  [
    {
      id: 1,
      product: 'Olive Oil',
      price: '$12.1',
      salePrice: '$9.68'
    }
  ];

*/
var applyCoupon = function (groceries, coupon) {
  var addCoupon = function (currentItem) {
    var changeToNumber = parseFloat(currentItem.price.split('$').join(''));
    var discount = (changeToNumber - (changeToNumber * coupon)).toFixed(2);
    if (currentItem.salePrice === undefined) {
      currentItem.salePrice = '$' + discount;
    }
    return currentItem;
  }
  return _.map(groceries, addCoupon);
};


//================================================================================================
/*
 *
 *  _.reduce
 *
 */

// return the total price of all products.
var sumTotal = function (products) {
  var totalPrice = function (accumulatedPrice, currentPrice) {
    var changeToNumber = parseFloat(currentPrice.price.split('$').join(''));
    return accumulatedPrice + changeToNumber;
  }
  return _.reduce(products, totalPrice, 0);
};


//================================================================================================
// return an object consisting of dessert types and how many of each.
// exampleOutput: { dessertType: 3, dessertType2: 1 }
var dessertCategories = function (desserts) {
  var categorize = function (count, dessert) {
    count[dessert.type] = (count[dessert.type] || 0) + 1;
    return count;
  }
  return _.reduce(desserts, categorize, {});
};


//================================================================================================
// return an object with the proper count of all user messages
/*
 example output:
  var tweetCountPerUser = countMessagesPerUser(tweets);
  {
    "douglascalhoun": 5,
    "mracus": 6,
    "shawndrost": 5,
    "sharksforcheap": 3
  }
*/
var countMessagesPerUser = function(tweets) {
  var categorize = function (tweetCounter, currentTweeter) {
    tweetCounter[currentTweeter.user] = (tweetCounter[currentTweeter.user] || 0) + 1;
    return tweetCounter;
  }
  return _.reduce(tweets, categorize, {});
};


//================================================================================================
// given an array of movie data objects,return an array containing
// movies that came out between 1990 and 2000.
// TIP: use an array as your accumulator - don't push to an external array!
var ninetiesKid = function (movies) {
  var categorize = function (counter, currentMovie) {
    if (currentMovie.releaseYear >= 1990 && currentMovie.releaseYear <= 2000) {
      counter.push(currentMovie.title);
    }
    return counter;
  }
  return _.reduce(movies, categorize, []);
};


//================================================================================================
// return an boolean stating if there exists a movie with a shorter
// runtime than your time limit.
// timeLimit is an integer representing a number of minutes.
var movieNight = function (movies, timeLimit) {
  var checkTime = function (counter, minutes) {
    if (minutes.runtime < timeLimit) {
      counter = true;
    }
    return counter;
  }
  return _.reduce(movies, checkTime, false);
};
