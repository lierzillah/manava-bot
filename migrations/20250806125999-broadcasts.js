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

    await queryInterface.createTable('broadcasts', {
      broadcast_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: Sequelize.STRING,
      scheduled_at: Sequelize.STRING,
      interval_count: { type: Sequelize.INTEGER, defaultValue: 0 },
      interval_delay_minutes: { type: Sequelize.INTEGER, defaultValue: 0 },
      status: {
        type: Sequelize.ENUM('scheduled', 'sending', 'done', 'failed'),
        defaultValue: 'scheduled',
      },
      repeat_interval_days: { type: Sequelize.INTEGER, defaultValue: 0 },
      error_msg: { type: Sequelize.TEXT },
      author_id: { type: Sequelize.INTEGER },
      ...dateFields,
    });

    await queryInterface.createTable('broadcast_contents', {
      broadcast_contents_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      broadcast_id: {
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
      buttons: Sequelize.JSONB,
      ...dateFields,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('broadcasts');
    await queryInterface.dropTable('broadcast_contents');
  },
};
