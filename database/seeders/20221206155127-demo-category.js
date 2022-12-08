'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [{
      title: 'General Knowledge',
      code: 9,
      api_url: 'https://opentdb.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Entertainment: Books',
      code: 10,
      api_url: 'https://opentdb.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Entertainment: Film',
      code: 11,
      api_url: 'https://opentdb.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Entertainment: Music',
      code: 12,
      api_url: 'https://opentdb.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Entertainment: Video Games',
      code: 15,
      api_url: 'https://opentdb.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Science: Computers',
      code: 18,
      api_url: 'https://opentdb.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Science: Mathematics',
      code: 19,
      api_url: 'https://opentdb.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Sports',
      code: 21,
      api_url: 'https://opentdb.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
