'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [{
      title: 'General Knowledge',
      imgUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: "General knowledge is having information on many different subjects that one collects gradually, from reading, television, newspapers etc., rather than detailed information on subjects that one has studied formally.",
      number_of_question: 5,
      code: 9,
      api_url: 'https://opentdb.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Entertainment: Books',
      imgUrl: 'https://images.unsplash.com/photo-1530538987395-032d1800fdd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: "Books play a significant role in our life, especially for children. Reading books increases the knowledge of students, improves their intellect, makes students aware of the various societies, and civilizations across the globe.",
      number_of_question: 5,
      code: 10,
      api_url: 'https://opentdb.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Entertainment: Film',
      imgUrl: 'https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: "Films are cultural artifacts created by specific cultures, facilitating intercultural dialogue. It is considered to be an important art form that provides entertainment and historical value, often visually documenting a period of time.",
      number_of_question: 5,
      code: 11,
      api_url: 'https://opentdb.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Entertainment: Music',
      imgUrl: 'https://images.unsplash.com/photo-1599912664816-e1726bdee8f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      description: "Music creates social cohesion, it speaks to all when words can fail, and wherever you go in the world, it is understood. Music is a universal gift and its power to connect people is without question. ",
      number_of_question: 5,
      code: 12,
      api_url: 'https://opentdb.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Entertainment: Video Games',
      imgUrl: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: "Gaming is really a workout for your mind disguised as fun. Studies have shown that playing video games regularly may increase gray matter in the brain and boost brain connectivity. ",
      number_of_question: 5,
      code: 15,
      api_url: 'https://opentdb.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Science: Computers',
      imgUrl: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
      description: "Computers have created a very effective information system to help streamline the management of an organization. This makes it a much needed tool for every business, banking, government, entertainment and daily life",
      number_of_question: 5,
      code: 18,
      api_url: 'https://opentdb.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Science: Mathematics',
      imgUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: "Mathematics provides an effective way of building mental discipline and encourages logical reasoning and mental rigor.In addition, mathematical knowledge plays a crucial role in understanding the contents of other subjects such as science.",
      number_of_question: 5,
      code: 19,
      api_url: 'https://opentdb.com/',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Sports',
      imgUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1190&q=80',
      description: "Sport is good for your physical and mental health. They also help develop leadership skills and equip them with the ability to set goals and build character. Participating in sports can lead to higher self-esteem and better social interaction.",
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
