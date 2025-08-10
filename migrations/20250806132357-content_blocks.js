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

    await queryInterface.createTable('content_blocks', {
      content_blocks_id: {
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
        defaultValue: 'ua',
      },
      text: Sequelize.TEXT,
      media_url: Sequelize.STRING,
      media_type: {
        type: Sequelize.ENUM('photo', 'video', 'document', 'gif', 'none'),
        defaultValue: 'none',
      },
      ...dateFields,
    });

    await queryInterface.createTable('content_buttons', {
      content_buttons_id: {
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

    await queryInterface.createTable('content_button_translations', {
      content_button_translations_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      button_id: {
        type: Sequelize.INTEGER,
      },
      language: {
        type: Sequelize.ENUM('ru', 'ua', 'en', 'tr', 'de', 'es'),
        defaultValue: 'ua',
      },
      label: Sequelize.STRING,
      ...dateFields,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('content_blocks');
    await queryInterface.dropTable('content_translations');
    await queryInterface.dropTable('content_buttons');
    await queryInterface.dropTable('content_button_translations');
  },
};
