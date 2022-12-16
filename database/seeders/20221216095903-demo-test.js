'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tests', [{
      UserId: 1,
      CategoryId: 1,
      test_date: new Date("2022-10-25"),
      score:3,
      number_questions:5,
      difficulty:'easy',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      UserId: 1,
      CategoryId: 2,
      test_date: new Date("2022-10-25"),
      score:3,
      number_questions:5,
      difficulty:'easy',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      UserId: 1,
      CategoryId: 1,
      test_date: new Date("2022-09-25"),
      score:2,
      number_questions:5,
      difficulty:'easy',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      UserId: 1,
      CategoryId: 2,
      test_date: new Date("2022-08-25"),
      score:4,
      number_questions:5,
      difficulty:'easy',
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
