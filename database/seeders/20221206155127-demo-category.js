'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [{
      title: 'General Knowledge',
      imgUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas facere dignissimos nihil quibusdam illum id assumenda animi a suscipit minus dolorem error molestiae, quasi, autem vitae aspernatur odio magnam facilis.",
      number_of_question: 5,
      code: 9,
      api_url: 'https://opentdb.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Entertainment: Books',
      imgUrl: 'https://images.unsplash.com/photo-1530538987395-032d1800fdd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas facere dignissimos nihil quibusdam illum id assumenda animi a suscipit minus dolorem error molestiae, quasi, autem vitae aspernatur odio magnam facilis.",
      number_of_question: 5,
      code: 10,
      api_url: 'https://opentdb.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Entertainment: Film',
      imgUrl: 'https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas facere dignissimos nihil quibusdam illum id assumenda animi a suscipit minus dolorem error molestiae, quasi, autem vitae aspernatur odio magnam facilis.",
      number_of_question: 5,
      code: 11,
      api_url: 'https://opentdb.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Entertainment: Music',
      imgUrl: 'https://images.unsplash.com/photo-1599912664816-e1726bdee8f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas facere dignissimos nihil quibusdam illum id assumenda animi a suscipit minus dolorem error molestiae, quasi, autem vitae aspernatur odio magnam facilis.",
      number_of_question: 5,
      code: 12,
      api_url: 'https://opentdb.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Entertainment: Video Games',
      imgUrl: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas facere dignissimos nihil quibusdam illum id assumenda animi a suscipit minus dolorem error molestiae, quasi, autem vitae aspernatur odio magnam facilis.",
      number_of_question: 5,
      code: 15,
      api_url: 'https://opentdb.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Science: Computers',
      imgUrl: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas facere dignissimos nihil quibusdam illum id assumenda animi a suscipit minus dolorem error molestiae, quasi, autem vitae aspernatur odio magnam facilis.",
      number_of_question: 5,
      code: 18,
      api_url: 'https://opentdb.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Science: Mathematics',
      imgUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas facere dignissimos nihil quibusdam illum id assumenda animi a suscipit minus dolorem error molestiae, quasi, autem vitae aspernatur odio magnam facilis.",
      number_of_question: 5,
      code: 19,
      api_url: 'https://opentdb.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Sports',
      imgUrl: 'https://images.unsplash.com/photo-1474546652694-a33dd8161d66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1484&q=80',
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas facere dignissimos nihil quibusdam illum id assumenda animi a suscipit minus dolorem error molestiae, quasi, autem vitae aspernatur odio magnam facilis.",
      number_of_question: 5,
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
