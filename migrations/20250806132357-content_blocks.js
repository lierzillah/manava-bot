module.exports = {
  async up(queryInterface, Sequelize) {
    const dateFields = {
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        defaultValue: Sequelize.literal('NOW()'),
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.literal('NOW()'),
        allowNull: false,
      },
    };

    await queryInterface.createTable('blocks', {
      block_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      parent_id: {
        type: Sequelize.INTEGER,
      },
      code: { type: Sequelize.STRING, unique: true },
      order: Sequelize.INTEGER,
      ...dateFields,
    });

    await queryInterface.createTable('content_translations', {
      content_translations_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      block_id: {
        type: Sequelize.INTEGER,
      },
      language: {
        type: Sequelize.ENUM('ru', 'ua', 'en', 'tr', 'de', 'es'),
        defaultValue: 'en',
      },
      text: Sequelize.TEXT,
      media_url: Sequelize.STRING,
      media_type: {
        type: Sequelize.ENUM('photo', 'video', 'document', 'gif', 'none'),
        defaultValue: 'none',
      },
      ...dateFields,
    });

    await queryInterface.createTable('buttons', {
      button_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      block_id: {
        type: Sequelize.INTEGER,
      },
      order: Sequelize.INTEGER,
      type: {
        type: Sequelize.ENUM('url', 'callback', 'none'),
        defaultValue: 'none',
      },
      url: Sequelize.STRING,
      callback: Sequelize.STRING,
      ...dateFields,
    });

    await queryInterface.createTable('button_translations', {
      button_translations_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      button_id: {
        type: Sequelize.INTEGER,
      },
      language: {
        type: Sequelize.ENUM('ru', 'ua', 'en', 'tr', 'de', 'es'),
        defaultValue: 'en',
      },
      label: Sequelize.STRING,
      ...dateFields,
    });

    await queryInterface.bulkInsert('blocks', [
      {
        code: 'start',
        order: 0,
      },
    ]);

    await queryInterface.bulkInsert('content_translations', [
      {
        block_id: 1,
        text: '🌀 Welcome to the MANAVA multiverse!\nPlay your favorite games and earn real money for every victory. Participate in tournaments and skill matches, develop your account and get access to new opportunities in the new generation gaming industry.\nChoose where to start 👇🏻\,Sign up 👇',
      },
    ]);

    await queryInterface.bulkInsert('buttons', [
      {
        block_id: 1,
        order: 0,
      },
    ]);

    await queryInterface.bulkInsert('button_translations', [
      {
        button_id: 1,
        label: 'MANAVA APP',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('blocks');
    await queryInterface.dropTable('content_translations');
    await queryInterface.dropTable('buttons');
    await queryInterface.dropTable('button_translations');
  },
};
