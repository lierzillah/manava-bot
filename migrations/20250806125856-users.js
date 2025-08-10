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

    await queryInterface.createTable('users', {
      user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      role: {
        type: Sequelize.ENUM(
          'admin',
          'content_manager',
          'marketer',
          'user_bot',
          'user',
        ),
        defaultValue: 'user',
      },
      access_token: Sequelize.STRING,
      refresh_token: Sequelize.STRING,
      active: { type: Sequelize.BOOLEAN, defaultValue: true },
      language: {
        type: Sequelize.ENUM('ru', 'ua', 'en', 'tr', 'de', 'es'),
        defaultValue: 'ua',
      },
      first_start_at: {
        type: Sequelize.DATE,
        field: 'first_start_at',
        defaultValue: Sequelize.literal('NOW()'),
        allowNull: false,
      },
      last_webapp_open_at: {
        type: Sequelize.DATE,
        field: 'last_webapp_open_at',
        defaultValue: Sequelize.literal('NOW()'),
        allowNull: false,
      },
      telegram_id: Sequelize.STRING,
      is_admin_panel_user: { type: Sequelize.BOOLEAN, defaultValue: false },
      ...dateFields,
    });

    await queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        email: 'admin@example.com',
        password:
          'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', //7bGuO46zxocwS7Igz9Ru
        role: 'admin',
        username: 'admin',
        email: 'admin@example.com',
        is_admin_panel_user: true,
      },
    ]);

    await queryInterface.createTable('system_table', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      key: Sequelize.STRING,
      value: Sequelize.STRING,
      ...dateFields,
    });

    await queryInterface.bulkInsert('system_table', [
      {
        key: 'api_token',
        value: 'R3DXeZP0zLNpAeZ8',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.createTable('users_events', {
      users_events_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      users_id: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.ENUM(
          'start',
          'webapp_open',
          'click',
          'content_view',
          'lang_change',
          'screen_enter',
          'broadcast_view',
          'error',
          'unknown',
        ),
        defaultValue: 'unknown',
      },
      metadata: Sequelize.JSONB,
      ...dateFields,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('system_table');
    await queryInterface.dropTable('user_events');
  },
};
