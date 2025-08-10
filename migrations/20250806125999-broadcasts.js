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
      broadcasts_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: Sequelize.STRING,
      scheduled_at: Sequelize.STRING,
      interval_count: { type: Sequelize.INTEGER, defaultValue: 500 },
      interval_delay_minutes: { type: Sequelize.INTEGER, defaultValue: 5 },
      status: {
        type: Sequelize.ENUM('scheduled', 'sending', 'done', 'failed'),
        defaultValue: 'scheduled',
      },
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

    await queryInterface.createTable('broadcast_logs', {
      broadcast_logs_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      broadcast_id: {
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM('sent', 'failed'),
        defaultValue: 'sent',
      },
      error: Sequelize.TEXT,
      sent_at: Sequelize.DATE,
      ...dateFields,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('broadcasts');
    await queryInterface.dropTable('broadcast_contents');
    await queryInterface.dropTable('broadcast_logs');
  },
};
