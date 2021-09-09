const mongoose = require("mongoose");
const Article = require("../models/article.model");
const Meditation = require("../models/meditation.model");
const User = require("../models/user.model");
const faker = require("faker");

require("../config/db.config");

const keyWordsObj = {
  1: ["meditation", "mindfullnes"],
  2: ["stress", "breath"],
  3: ["yoga", "pilates"],
};

const articleTypes = ["Meditation", "Mindfulness", "Sleep", "Stress"];
const meditationTypes = [
  "Meditation for beginners",
  "Short meditation",
  "Meditation for sleep",
  "Morning meditation",
  "Gratitude meditation",
  "Anxiety relief meditation",
];

mongoose.connection.once("open", () => {
  mongoose.connection
    .dropDatabase()
    .then(() => console.info("Database dropped"))
    .then(() => {
      const users = [];
      for (let i = 0; i < 100; i++) {
        const user = new User({
          name: faker.name.findName(),
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: "123GHNs1!23",
          avatar: faker.image.avatar(),
        });
        users.push(user.save());
      }
      return Promise.all(users);
    })
    .then((users) => console.info(`Successfully created ${users.length} users`))
    .then(() => {
      const authors = [];
      for (let i = 0; i < 5; i++) {
        const author = new User({
          name: faker.name.findName(),
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: "123GHNs1!23",
          avatar: faker.image.avatar(),
          role: "Author",
        });
        authors.push(author.save());
      }
      return Promise.all(authors);
    })
    .then((authors) => {
      console.info(`Successfully created ${authors.length} authors`);
      const articles = [];
      for (let i = 0; i < 10; i++) {
        const article = new Article({
          title: faker.lorem.sentence(),
          summary: faker.lorem.paragraph(),
          content: faker.lorem.paragraphs(),
          author: authors[Math.floor(Math.random() * authors.length)].id,
          views: Math.floor(Math.random() * 200),
          type: articleTypes[Math.floor(Math.random() * articleTypes.length)],
          keyWords: keyWordsObj[Math.floor(Math.random() * 3) + 1],
          date: faker.date.past(),
        });
        articles.push(article.save());
      }
      return Promise.all(articles)
      .then((articles) => {
          const meditations = [];
          for (let i = 0; i < 10; i++) {
            const meditation = new Meditation({
              title: faker.lorem.sentence(),
              summary: faker.lorem.paragraph(),
              image: faker.image.abstract(),
              duration: Math.floor(Math.random() * 60) + 1,
              type: meditationTypes[
                Math.floor(Math.random() * meditationTypes.length)
              ],
              keyWords: keyWordsObj[Math.floor(Math.random() * 3) + 1],
              views: Math.floor(Math.random() * 200),
              author: authors[Math.floor(Math.random() * authors.length)].id,
              date: faker.date.past(),
            });
            meditations.push(meditation.save());
          }
          return Promise.all(meditations).then(meditationData => {
            console.info(
              `Successfully created ${meditationData.length} meditations`
            );
          });
      });
    })
    .catch((error) => console.error("An error ocurred running seeds", error))
    .then(() => mongoose.disconnect());
});
