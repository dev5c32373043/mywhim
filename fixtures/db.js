/* eslint-disable array-callback-return */

const faker = require('faker');

const db = {};

const data = Symbol('data');

['categories', 'locations', 'products'].map((collection) => {
  db[collection] = {
    find(cond) {
      if (!cond || !Object.keys(cond).length) return this[data];
      let isNeedSort = false;
      const result = this[data].filter((item) => {
        let isValid = true;
        Object.entries(cond).map((arr) => {
          switch (arr[0]) {
            case 'order':
              isNeedSort = true;
              break;
            case 'categories':
              if (!arr[1].includes(item.category)) isValid = false;
              break;
            default:
              if (item[arr[0]] !== arr[1]) {
                isValid = false;
              }
          }
        });
        return isValid;
      });
      return isNeedSort ? this.sort(result, cond) : result;
    },
    sort(res, cond) {
      return res.sort((x, y) => {
        if (cond.order.type === 'asc') {
          return x[cond.order.by] - y[cond.order.by];
        }
        return y[cond.order.by] - x[cond.order.by];
      });
    },
    all() {
      return this[data];
    },
    [data]: [],
  };
});

let categoryId = 0;

db.categories[data] = Array(5)
  .fill()
  .map(() => {
    categoryId += 1;
    return { id: categoryId, name: faker.lorem.word() };
  });

let locationId = 0;

db.locations[data] = Array(5)
  .fill()
  .map(() => {
    locationId += 1;
    return { id: locationId, name: faker.address.city() };
  });

const randomize = arr => arr[Math.floor(Math.random() * arr.length)];

let productId = 0;

db.products[data] = Array(15)
  .fill()
  .map(() => {
    productId += 1;
    return {
      id: productId,
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
      price: Number(faker.commerce.price()),
      image: `https://picsum.photos/300/300/?image=${productId}`,
      location: randomize(db.locations[data]).name,
      category: randomize(db.categories[data]).name,
      createdAt: faker.date.past(),
    };
  });

module.exports = db;
/* eslint-enable array-callback-return */
