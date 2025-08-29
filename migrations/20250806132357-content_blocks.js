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
      code: { type: Sequelize.STRING },
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
        type: Sequelize.ENUM('ru', 'ua', 'en', 'tr', 'de', 'es', 'global'),
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
      order: Sequelize.INTEGER,
      label: Sequelize.STRING,
      type: {
        type: Sequelize.ENUM('url', 'callback', 'web_app', 'none'),
        defaultValue: 'none',
      },
      keyboard_type: {
        type: Sequelize.ENUM('inline', 'reply'),
        defaultValue: 'inline',
      },
      is_full_width: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      row_order: {
        type: Sequelize.INTEGER,
      },
      url: Sequelize.STRING,
      callback: Sequelize.STRING,
      next_block_id: { type: Sequelize.INTEGER },
      ...dateFields,
    });

    await queryInterface.createTable('buttons_to_blocks', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      button_id: Sequelize.INTEGER,
      block_id: Sequelize.INTEGER,
      is_full_width: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      row_order: {
        type: Sequelize.INTEGER,
      },
      order: {
        type: Sequelize.INTEGER,
      },
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
        type: Sequelize.ENUM('ru', 'ua', 'en', 'tr', 'de', 'es', 'global'),
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
      {
        code: 'start',
        order: 1,
      },
      {
        code: 'play_and_earn',
        order: 2,
        parent_id: 1,
      },
      {
        code: 'play_and_earn:games',
        order: 3,
        parent_id: 3,
      },
      {
        code: 'play_and_earn:games:swag',
        parent_id: 4,
      },
      {
        code: 'play_and_earn:games:cs2',
        parent_id: 4,
      },
      {
        code: 'play_and_earn:games:jumper',
        parent_id: 4,
      },
      {
        code: 'play_and_earn:skill_match',
        parent_id: 3,
      },
      {
        code: 'play_and_earn:skill_match:subs',
        parent_id: 8,
      },
      {
        code: 'play_and_earn:skill_match:tournaments',
        parent_id: 8,
      },
      {
        code: 'play_and_earn:skill_match:tournaments:how_it_works',
        parent_id: 9,
      },
      {
        code: 'change_lang',
        parent_id: 1,
      },
      {
        code: 'visa_page',
        parent_id: 1,
      },
      {
        code: 'visa_page:how_to_get_card',
        parent_id: 13,
      },
      {
        code: 'alliance',
        parent_id: 1,
      },
      {
        code: 'alliance:alliance_key',
        parent_id: 15,
      },
      {
        code: 'alliance:manav',
        parent_id: 15,
      },
      {
        code: 'alliance:earn_alliance',
        parent_id: 15,
      },
      {
        code: 'alliance:manav:price_formed',
        parent_id: 16,
      },
      {
        code: 'alliance:manav:get_manav',
        parent_id: 16,
      },
      {
        code: 'alliance:manav:sell_manav',
        parent_id: 16,
      },
      {
        code: 'alliance:earn_alliance:wt_is_oracle',
        parent_id: 17,
      },
      {
        code: 'alliance:earn_alliance:core_alliance',
        parent_id: 17,
      },
      {
        code: 'alliance:earn_alliance:top_alliance_members',
        parent_id: 17,
      },
      {
        code: 'info:',
        parent_id: 1,
      },
      {
        code: 'info:manava_social_links',
        parent_id: 25,
      },
      {
        code: 'info:faq',
        parent_id: 25,
      },
      {
        code: 'info:support',
        parent_id: 25,
      },
    ]);

    await queryInterface.bulkInsert('content_translations', [
      {
        block_id: 1,
        text: '<b>🌀 Welcome to the MANAVA multiverse!</b>\n\nPlay your favorite games and earn real money for every victory. Participate in tournaments and skill matches, develop your account and get access to new opportunities in the new generation gaming industry.\n\n<b>Choose where to start 👇🏻</b>',
        language: 'global',
        media_type: 'video',
        media_url: 'uploads/video/en/start_video.mp4',
      },
      {
        block_id: 1,
        text: '<b>🌀 Welcome to the MANAVA multiverse!</b>\n\nPlay your favorite games and earn real money for every victory. Participate in tournaments and skill matches, develop your account and get access to new opportunities in the new generation gaming industry.\n\n<b>Choose where to start 👇🏻</b>',
        language: 'en',
        media_type: 'video',
        media_url: 'uploads/video/en/start_video.mp4',
      },
      {
        block_id: 1,
        text: '<b>🌀 Добро пожаловать в мультивселенную MANAVA!</b>\n\nИграй в любимые игры и зарабатывай реальные деньги за каждую победу. Участвуй в турнирах и скилл-матчах, развивай свой аккаунт и получай доступ к новым возможностям в игровой индустрии нового поколения.\n\n<b>Выбирай с чего начнем 👇🏻</b>',
        language: 'ru',
        media_type: 'video',
        media_url: 'uploads/video/ru/start_video.mp4',
      },
      {
        block_id: 1,
        text: '<b>🌀 Ласкаво просимо у мультивсесвіт MANAVA!</b>\n\nГрайте у улюблені ігри та заробляйте реальні гроші за кожну перемогу. Беріть участь у турнірах та скіл-матчах, розвивайте свій акаунт та отримуйте доступ до нових можливостей у ігровій індустрії нового покоління.\n\n<b>Обирайте з чого почнемо 👇🏻</b>',
        language: 'ua',
        media_type: 'video',
        media_url: 'uploads/video/ru/start_video.mp4',
      },
      {
        block_id: 1,
        text: '<b>🌀 ¡Bienvenido al multiverso MANAVA!</b>\n\nJuega a tus juegos favoritos y gana dinero real por cada victoria. Participa en torneos y partidas de habilidad, desarrolla tu cuenta y obtén acceso a nuevas oportunidades en la industria del gaming de nueva generación.\n\n<b>Elige por dónde empezar 👇🏻</b>',
        language: 'es',
        media_type: 'video',
        media_url: 'uploads/video/es/start_video.mp4',
      },
      {
        block_id: 1,
        text: '<b>🌀 MANAVA çoklu evrenine hoş geldiniz!</b>\n\nEn sevdiğiniz oyunları oynayın ve her zafer için gerçek para kazanın. Turnuvalara ve beceri maçlarına katılın, hesabınızı geliştirin ve yeni nesil oyun endüstrisinde yeni fırsatlara erişim kazanın.\n\n<b>Nereden başlayacağınızı seçin 👇🏻</b>',
        language: 'tr',
        media_type: 'video',
        media_url: 'uploads/video/tr/start_video.mp4',
      },
      {
        block_id: 1,
        text: '<b>🌀 Willkommen im MANAVA-Multiversum!</b>\n\nSpielen Sie Ihre Lieblingsspiele und verdienen Sie echtes Geld für jeden Sieg. Nehmen Sie an Turnieren und Skill-Matches teil, entwickeln Sie Ihr Konto und erhalten Sie Zugang zu neuen Möglichkeiten in der Gaming-Industrie der neuen Generation.\n\n<b>Wählen Sie, womit wir beginnen 👇🏻</b>',
        language: 'de',
        media_type: 'video',
        media_url: 'uploads/video/de/start_video.mp4',
      },
      {
        block_id: 2,
        text: 'Sign up 👇',
        language: 'en',
      },
      {
        block_id: 2,
        text: 'Пройти регистрацию 👇',
        language: 'ru',
      },
      {
        block_id: 2,
        text: 'Пройти реєстрацію',
        language: 'ua',
      },
      {
        block_id: 2,
        text: 'Regístrate 👇',
        language: 'es',
      },
      {
        block_id: 2,
        text: 'Kayıt ol 👇',
        language: 'tr',
      },
      {
        block_id: 2,
        text: 'Registrieren 👇',
        language: 'de',
      },
      {
        block_id: 3,
        text:
          '<b>🎮 Manava — это мультивселенная, где ты зарабатываешь, играя в свои любимые игры.</b>\n' +
          '\n' +
          'Уже сегодня доступны <b>CS2</b> и <b>SWAG</b>, и это только начало — впереди подключение популярных проектов со всего мира.\n' +
          '\n' +
          '💼 <b>Здесь ты можешь зарабатывать больше, чем на обычной работе.</b>\n' +
          'Играй в привычные игры, участвуй в турнирах и скилл-матчах, где твои победы превращаются в мгновенные выплаты.\n' +
          '\n' +
          '🔓 <b>Фри-триал доступен сразу:</b>\n' +
          'Ты можешь зарабатывать до <b>$300 в месяц</b> без подписки и без комиссий.\n' +
          'Подписка открывает расширенный доступ к матчам и турнирам, где возможный доход кратно выше.\n' +
          '\n' +
          '💳 Выигрыши начисляются в <b>$NAVA</b> и доступны к мгновенному выводу на карту ManavaVisa или Crypto\n' +
          'Один логин — полный контроль: счёт, статистика, карта. <b>Победил — вывел — использовал.</b>\n' +
          '\n' +
          '📣 Manava объединяет игроков, бизнес и технологии в одной платформе.\n' +
          '<b>Это не просто игры. Это новая модель, где время в игре — это актив.</b>',
        language: 'ru',
        media_type: 'photo',
        media_url: 'uploads/images/ru/Турниры-1.jpg',
      },
      {
        block_id: 3,
        text:
          '<b>🎮 Manava — це мультивсесвіт, де ти заробляєш, граючи у свої улюблені ігри.</b>\n' +
          '\n' +
          'Вже сьогодні доступні <b>CS2</b> та <b>SWAG</b>, і це лише початок — попереду підключення популярних проектів з усього світу.\n' +
          '\n' +
          '💼 <b>Тут ти можеш заробляти більше, ніж на звичайній роботі.</b>\n' +
          'Грай у знайомі ігри, бери участь у турнірах та скілл-матчах, де твої перемоги перетворюються на миттєві виплати.\n' +
          '\n' +
          '🔓 <b>Фрі-тріал доступний одразу:</b>\n' +
          'Можеш заробляти до <b>$300 на місяць</b> без підписки та без комісій.\n' +
          'Підписка відкриває розширений доступ до матчів і турнірів, де потенційний доход значно вищий.\n' +
          '\n' +
          '💳 Виграші нараховуються в <b>$NAVA</b> і доступні для миттєвого виведення на карту ManavaVisa або криптовалюту\n' +
          'Один логін — повний контроль: рахунок, статистика, карта. <b>Переміг — вивів — використав.</b>\n' +
          '\n' +
          "📣 Manava об'єднує гравців, бізнес і технології в одній платформі.\n" +
          '<b>Це не просто ігри. Це нова модель, де час у грі — це актив.</b>',
        language: 'ua',
        media_type: 'photo',
        media_url: 'uploads/images/ua/Турниры-1.jpg',
      },
      {
        block_id: 3,
        text:
          '<b>🎮 Manava — is a multiverse where you earn by playing your favorite games.</b>\n' +
          '\n' +
          'Today, <b>CS2</b> and <b>SWAG</b> are already available, and this is just the beginning — more popular projects from around the world will be connected soon.\n' +
          '\n' +
          '💼 <b>Here, you can earn more than on a regular job.</b>\n' +
          'Play familiar games, participate in tournaments and skill matches, where your victories turn into instant payouts.\n' +
          '\n' +
          '🔓 <b>Free trial available immediately:</b>\n' +
          'You can earn up to <b>$300 per month</b> without a subscription or commissions.\n' +
          'A subscription unlocks extended access to matches and tournaments, where your potential earnings are significantly higher.\n' +
          '\n' +
          '💳 Winnings are credited in <b>$NAVA</b> and can be instantly withdrawn to a ManavaVisa card or cryptocurrency.\n' +
          'One login — full control: account, statistics, card. <b>Win — withdraw — use.</b>\n' +
          '\n' +
          '📣 Manava unites players, business, and technology on one platform.\n' +
          "<b>This is not just about games. It's a new model where time spent in-game is an asset.</b>",
        language: 'en',
        media_type: 'photo',
        media_url: 'uploads/images/de/Турниры-1.jpg',
      },
      {
        block_id: 3,
        text:
          '<b>🎮 Manava es un multiverso donde ganas dinero jugando a tus juegos favoritos.</b>\n' +
          '\n' +
          '<b>CS2</b> y <b>SWAG</b> ya están disponibles, y esto es solo el comienzo: se avecinan proyectos populares de todo el mundo.\n' +
          '\n' +
          '💼 <b>Aquí puedes ganar más que en un trabajo normal.</b>\n' +
          'Juega a juegos conocidos, participa en torneos y partidas de habilidad, donde tus victorias se convierten en pagos instantáneos.\n' +
          '\n' +
          '🔓 <b>Prueba gratuita disponible de inmediato:</b>\n' +
          'Puedes ganar hasta <b>$300 al mes</b> sin suscripción ni comisiones.\n' +
          'Una suscripción te da acceso a más partidas y torneos, donde el potencial de ingresos es mucho mayor.\n' +
          '\n' +
          '💳 Las ganancias se abonan en <b>$NAVA</b> y se pueden retirar instantáneamente a una tarjeta ManavaVisa o Crypto.\n' +
          'Un solo inicio de sesión: control total: cuenta, estadísticas, tarjeta. <b>Gana, retira y usa.</b>\n' +
          '\n' +
          '📣 Manava une a jugadores, negocios y tecnología en una sola plataforma.\n' +
          '<b>No son solo juegos. Este es un nuevo modelo donde el tiempo en el juego es un activo.</b>',
        language: 'es',
        media_type: 'photo',
        media_url: 'uploads/images/de/Турниры-1.jpg',
      },
      {
        block_id: 3,
        text:
          '<b>🎮 Manava, en sevdiğiniz oyunları oynayarak para kazanabileceğiniz bir çoklu evrendir.</b>\n' +
          '\n' +
          '<b>CS2</b> ve <b>SWAG</b> halihazırda mevcut ve bu sadece bir başlangıç; dünyanın dört bir yanından popüler projeler geliyor.\n' +
          '\n' +
          '💼 <b>Burada normal bir işte kazanabileceğinizden daha fazlasını kazanabilirsiniz.</b>\n' +
          'Bildiğiniz oyunları oynayın, turnuvalara ve beceri maçlarına katılın; zaferleriniz anında ödemelere dönüşsün.\n' +
          '\n' +
          '🔓 <b>Ücretsiz deneme hemen kullanılabilir:</b>\n' +
          'Abonelik ve komisyon olmadan <b>ayda 300 dolara</b> kadar kazanabilirsiniz.\n' +
          'Abonelik, potansiyel gelirin kat kat daha yüksek olduğu maçlara ve turnuvalara genişletilmiş erişim sağlar.\n' +
          '\n' +
          '💳 Kazançlar <b>$NAVA</b> olarak yatırılır ve anında bir ManavaVisa veya Kripto kartına çekilebilir.\n' +
          'Tek giriş - tam kontrol: hesap, istatistikler, kart. <b>Kazan - çek - kullan.</b>\n' +
          '\n' +
          '📣 Manava, oyuncuları, işletmeleri ve teknolojiyi tek bir platformda birleştiriyor.\n' +
          '<b>Bunlar sadece oyun değil. Bu, oyunda geçirilen zamanın önemli olduğu yeni bir model.</b>',
        language: 'tr',
        media_type: 'photo',
        media_url: 'uploads/images/de/Турниры-1.jpg',
      },
      {
        block_id: 3,
        text:
          '<b>🎮 Manava — ist ein Multiversum, in dem du durch das Spielen deiner Lieblingsspiele Geld verdienst.</b>\n' +
          '\n' +
          'Bereits heute sind <b>CS2</b> und <b>SWAG</b> verfügbar, und das ist erst der Anfang — in Kürze folgen beliebte Projekte aus aller Welt.\n' +
          '\n' +
          '💼 <b>Hier kannst du mehr verdienen als bei einem normalen Job.</b>\n' +
          'Spiele bekannte Spiele, nimm an Turnieren und Skill-Matches teil, bei denen deine Siege in sofortige Auszahlungen umgewandelt werden.\n' +
          '\n' +
          '🔓 <b>Das kostenlose Testabo ist sofort verfügbar:</b>\n' +
          'Du kannst bis zu <b>300 $ im Monat</b> verdienen, ohne Abonnement und ohne Gebühren.\n' +
          'Ein Abonnement schaltet erweiterten Zugang zu Matches und Turnieren frei, bei denen dein mögliches Einkommen deutlich höher ist.\n' +
          '\n' +
          '💳 Gewinne werden in <b>$NAVA</b> gutgeschrieben und sind sofort auf die ManavaVisa-Karte oder in Kryptowährung abhebbar.\n' +
          'Ein Login — volle Kontrolle: Konto, Statistiken, Karte. <b>Gewonnen — ausgezahlt — genutzt.</b>\n' +
          '\n' +
          '📣 Manava vereint Spieler, Unternehmen und Technologie auf einer Plattform.\n' +
          '<b>Das ist nicht nur ein Spiel. Es ist ein neues Modell, bei dem die Spielzeit ein Asset ist.</b>',
        language: 'de',
        media_type: 'photo',
        media_url: 'uploads/images/de/Турниры-1.jpg',
      },
      {
        block_id: 4,
        text:
          '<b>Где уже работает MANAVA-экономика?</b>\n' +
          '🔛 В онлайне: <b>SWAG</b>, <b>CS2</b> и <b>Jumper</b>\n' +
          '\n' +
          '🔜 <b>На подходе:</b>\n' +
          'Fortnite, Valorant, UFC, FIFA и другие хиты — мы подключаем самые востребованные игры, чтобы ты мог зарабатывать там, где играешь каждый день.',
        language: 'ru',
        media_type: 'photo',
        media_url: 'uploads/images/ru/Games.jpg',
      },
      {
        block_id: 4,
        text:
          '<b>Де вже працює MANAVA-економіка?</b>\n' +
          '🔛 В онлайні: <b>SWAG</b>, <b>CS2</b> і <b>Jumper</b>\n' +
          '\n' +
          '🔜 <b>На підході:</b>\n' +
          'Fortnite, Valorant, UFC, FIFA та інші хіти — ми підключаємо найпопулярніші ігри, щоб ти міг заробляти там, де граєш щодня.',
        language: 'ua',
        media_type: 'photo',
        media_url: 'uploads/images/ua/Games.jpg',
      },
      {
        block_id: 4,
        text:
          '<b>Where is the MANAVA economy already working?</b>\n' +
          '🔛 Online: <b>SWAG</b>, <b>CS2</b>, and <b>Jumper</b>\n' +
          '\n' +
          '🔜 <b>Coming soon:</b>\n' +
          "Fortnite, Valorant, UFC, FIFA, and other hits — we're connecting the most demanded games so you can earn where you play every day.",
        language: 'en',
        media_type: 'photo',
        media_url: 'uploads/images/en/Games.jpg',
      },
      {
        block_id: 4,
        text:
          '<b>¿Dónde está funcionando la economía de MANAVA?</b>\n' +
          '🔛 Online: <b>SWAG</b>, <b>CS2</b> y <b>Jumper</b>\n' +
          '\n' +
          '🔜 <b>Próximamente:</b>\n' +
          'Fortnite, Valorant, UFC, FIFA y otros éxitos: conectamos los juegos más populares para que puedas ganar dinero donde juegas a diario.',
        language: 'es',
        media_type: 'photo',
        media_url: 'uploads/images/es/Games.jpg',
      },
      {
        block_id: 4,
        text:
          '<b>MANAVA ekonomisi şu anda nerede işliyor?</b>\n' +
          '🔛 Çevrimiçi: <b>SWAG</b>, <b>CS2</b> ve <b>Jumper</b>\n' +
          '\n' +
          '🔜 <b>Yakında:</b>\n' +
          'Fortnite, Valorant, UFC, FIFA ve diğer hit oyunlar - en popüler oyunları bir araya getiriyoruz, böylece her gün oynadığınız yerde para kazanabilirsiniz.',
        language: 'tr',
        media_type: 'photo',
        media_url: 'uploads/images/tr/Games.jpg',
      },
      {
        block_id: 4,
        text:
          '<b>Wo funktioniert die MANAVA-Ökonomie bereits?</b>\n' +
          '🔛 Online: <b>SWAG</b>, <b>CS2</b> und <b>Jumper</b>\n' +
          '\n' +
          '🔜 <b>In Vorbereitung:</b>\n' +
          'Fortnite, Valorant, UFC, FIFA und weitere Top-Titel — wir integrieren die gefragtesten Spiele, damit du dort verdienen kannst, wo du täglich spielst.',
        language: 'de',
        media_type: 'photo',
        media_url: 'uploads/images/de/Games.jpg',
      },

      {
        block_id: 5,
        text:
          '<b>🎮 SWAG — мобильный шутер от MANAVA, в котором ты зарабатываешь реальные деньги</b>\n' +
          '\n' +
          'Это динамичный Sci-Fi шутер, где каждый герой обладает уникальными способностями. Но главное — ты можешь играть из любой точки мира. Всё, что тебе нужно — интернет.\n' +
          '\n' +
          '📱 <b>Зашёл в игру → сыграл Skill матч → победил → вывел $NAVA на карту Visa или криптовалюту.</b>\n' +
          '\n' +
          '🔥 Участвуй в боях, попадай в турниры и получай реальные награды прямо в процессе игры.\n' +
          '\n' +
          '<b>SWAG — это твоя арена, и способ зарабатывать, играя.</b>',
        language: 'ru',
        media_type: 'photo',
        media_url: 'uploads/images/ru/SWAG.jpg',
      },
      {
        block_id: 5,
        text:
          '<b>🎮 SWAG — мобільний шутер від MANAVA, у якому ти заробляєш реальні гроші</b>\n' +
          '\n' +
          'Це динамічний Sci-Fi шутер, де кожен герой має унікальні здібності. Але головне — ти можеш грати з будь-якої точки світу. Все, що потрібно — Інтернет.\n' +
          '\n' +
          '📱 <b>Зайшов у гру → зіграв Skill-матч → переміг → вивів $NAVA на карту Visa або криптовалюту.</b>\n' +
          '\n' +
          '🔥 Бери участь у боях, потрапляй у турніри і отримуй реальні нагороди прямо під час гри.\n' +
          '\n' +
          '<b>SWAG — це твоя арена та спосіб заробляти, граючи.</b>',
        language: 'ua',
        media_type: 'photo',
        media_url: 'uploads/images/ua/SWAG.jpg',
      },
      {
        block_id: 5,
        text:
          '<b>🎮 SWAG — a mobile shooter from MANAVA where you earn real money</b>\n' +
          '\n' +
          'This is a dynamic Sci-Fi shooter where each hero has unique abilities. But the main thing — you can play from anywhere in the world. All you need is the internet.\n' +
          '\n' +
          '📱 <b>Enter the game → play a Skill match → win → withdraw $NAVA to Visa card or cryptocurrency.</b>\n' +
          '\n' +
          '🔥 Participate in battles, join tournaments, and receive real rewards directly during gameplay.\n' +
          '\n' +
          '<b>SWAG is your arena and a way to earn while playing.</b>',
        language: 'en',
        media_type: 'photo',
        media_url: 'uploads/images/en/SWAG.jpg',
      },
      {
        block_id: 5,
        text:
          '<b>🎮 SWAG es un shooter móvil de MANAVA en el que ganas dinero real.</b>\n' +
          '\n' +
          'Este es un shooter dinámico de ciencia ficción, donde cada héroe tiene habilidades únicas. Pero lo más importante es que puedes jugar desde cualquier parte del mundo. Solo necesitas internet.\n' +
          '\n' +
          '📱 <b>Iniciaste sesión en el juego → jugaste una partida de habilidad → ganaste → retiraste $NAVA a una tarjeta Visa o criptomoneda.</b>\n' +
          '\n' +
          '🔥 Participa en batallas, participa en torneos y obtén recompensas reales durante el juego.\n' +
          '\n' +
          '<b>SWAG es tu arena y una forma de ganar dinero jugando.</b>',
        language: 'es',
        media_type: 'photo',
        media_url: 'uploads/images/es/SWAG.jpg',
      },
      {
        block_id: 5,
        text:
          "<b>🎮 SWAG, MANAVA'nın gerçek para kazandığınız mobil bir nişancı oyunudur.</b>\n" +
          '\n' +
          'Bu, her kahramanın kendine özgü yeteneklere sahip olduğu dinamik bir Bilim Kurgu nişancı oyunudur. Ancak asıl önemli olan, dünyanın her yerinden oynayabilmenizdir. Tek ihtiyacınız olan internet.\n' +
          '\n' +
          "📱 <b>Oyuna giriş yapıldı → bir Beceri maçı oynandı → kazanıldı → $NAVA'yı Visa kartına veya kripto para birimine çekildi.</b>\n" +
          '\n' +
          '🔥 Savaşlara katılın, turnuvalara katılın ve oyun sırasında gerçek ödüller kazanın.\n' +
          '\n' +
          '<b>SWAG sizin arenanız ve oynarken para kazanmanın bir yoludur.</b>',
        language: 'tr',
        media_type: 'photo',
        media_url: 'uploads/images/tr/SWAG.jpg',
      },
      {
        block_id: 5,
        text:
          '<b>🎮 SWAG — ein mobiles Shooter-Spiel von MANAVA, bei dem du echtes Geld verdienst</b>\n' +
          '\n' +
          'Dies ist ein dynamischer Sci-Fi-Shooter, bei dem jeder Held einzigartige Fähigkeiten besitzt. Das Wichtigste — du kannst von überall auf der Welt spielen. Alles, was du brauchst — Internet.\n' +
          '\n' +
          '📱 <b>Spiel starten → Skill-Match spielen → gewinnen → $NAVA auf Visa-Karte oder Kryptowährung auszahlen.</b>\n' +
          '\n' +
          '🔥 Kämpfe bestreiten, Turniere gewinnen und echte Belohnungen direkt während des Spiels erhalten.\n' +
          '\n' +
          '<b>SWAG ist deine Arena und eine Möglichkeit, beim Spielen Geld zu verdienen.</b>',
        language: 'de',
        media_type: 'photo',
        media_url: 'uploads/images/de/SWAG.jpg',
      },
      {
        block_id: 6,
        text: "<b>🎯 CS — a legend in esports with a new meaning</b>\n\nIt\'s the same classic: tactics, team play, intense 5v5, and every shot counts. Now, your skill is paid for.\n\n🔥 <b>We have integrated MANAVA protocols into CS:</b>\n\n• Participate in matches and tournaments\n• Earn <b>$NAVA</b> directly during gameplay\n• Climb the leaderboards and receive real rewards\n• Play well — earn even more.",
        language: 'en',
        media_type: 'photo',
        media_url: 'uploads/images/en/КС2.jpg',
      },
      {
        block_id: 7,
        text: '<b>▶️ Jumper — jump, survive, earn</b>\n\nMinimalism in gameplay, maximum adrenaline in every jump.\n\nAvoid traps and pass levels — all you need is the desire to win.',
        language: 'en',
        media_type: 'photo',
        media_url: 'uploads/images/en/Джампер.jpg',
      },

      {
        block_id: 8,
        text:
          '<b>🎯 Skill Матч — модель, где ты зарабатываешь за каждый нанесённый урон.</b>\n' +
          '\n' +
          'Здесь всё просто: <b>твой навык = твой доход.</b> И всё это — без комиссии.\n' +
          '\n' +
          '🧠 Мы считаем не только убийства, а каждый точный выстрел.\n' +
          '<b>100 HP = 1 жизнь.</b> Нанёс урон — заработал. Умер — потерял.\n' +
          '\n' +
          '🔫 <b>Пример:</b>\n' +
          'Ты выбрал цену жизни — <b>1 $NAVA (100 HP).</b>\n' +
          '🎯 В матче 350 урона → заработал <b>3.5 $NAVA</b>\n' +
          '💀 Потерял 100 HP → отдал <b>1 $NAVA</b>\n' +
          '💸 Итог: чистая прибыль — <b>2.5 $NAVA</b>\n' +
          '\n' +
          '📤 <b>Чем точнее играешь — тем больше зарабатываешь.</b>\n' +
          '\n' +
          'Это не просто PvP. Это боевая экономика, которая делает матч динамичным, справедливым и умным — выигрывают не только самые сильные, но и стратегически мыслящие игроки.\n' +
          '\n' +
          '💸 Все заработанные <b>$NAVA</b> доступны для мгновенного вывода — на карту Visa или в криптовалюте.\n' +
          '\n' +
          '🔥 Ты сам выбираешь ставку за 100 HP: от <b>$0.20 до $1000</b> — играй на комфортном уровне и масштабируй по мере роста скилла.\n' +
          '\n' +
          '<b>Skill Матч — формат, где каждое попадание имеет цену.</b>',
        language: 'ru',
        media_type: 'photo',
        media_url: 'uploads/images/ru/Skill 2 earn.jpg',
      },
      {
        block_id: 8,
        text:
          '<b>🎯 Skill Матч — модель, де ти заробляєш за кожен нанесений урон.</b>\n' +
          '\n' +
          'Тут все просто: <b>твій навик = твій дохід.</b> І все це — без комісій.\n' +
          '\n' +
          '🧠 Ми рахуємо не лише вбивства, а кожен точний постріл.\n' +
          '<b>100 HP = 1 життя.</b> Наніс урон — заробив. Помер — втратив.\n' +
          '\n' +
          '🔫 <b>Приклад:</b>\n' +
          'Ти обрав ціну життя — <b>1 $NAVA (100 HP).</b>\n' +
          '🎯 У матчі 350 урону → заробив <b>3.5 $NAVA</b>\n' +
          '💀 Втратив 100 HP → віддав <b>1 $NAVA</b>\n' +
          '💸 Підсумок: чистий прибуток — <b>2.5 $NAVA</b>\n' +
          '\n' +
          '📤 <b>Чим точніше граєш — тим більше заробляєш.</b>\n' +
          '\n' +
          'Це не просто PvP. Це бойова економіка, яка робить матч динамічним, справедливим і розумним — виграють не лише найсильніші, а й стратегічно мислячі гравці.\n' +
          '\n' +
          '💸 Всі зароблені <b>$NAVA</b> доступні для миттєвого виведення — на карту Visa або у криптовалюті.\n' +
          '\n' +
          '🔥 Ти сам обираєш ставку за 100 HP: від <b>$0.20 до $1000</b> — грай на комфортному рівні і масштабуй за ростом скіллу.\n' +
          '\n' +
          '<b>Skill Матч — формат, де кожен постріл має ціну.</b>',
        language: 'ua',
        media_type: 'photo',
        media_url: 'uploads/images/ua/Skill 2 earn.jpg',
      },
      {
        block_id: 8,
        text:
          '<b>🎯 Skill Match — a model where you earn for every damage dealt.</b>\n' +
          '\n' +
          "It's simple: <b>your skill = your income.</b> And all of this — without commissions.\n" +
          '\n' +
          '🧠 We count not only kills but every accurate shot.\n' +
          '<b>100 HP = 1 life.</b> Deal damage — earn. Die — lose.\n' +
          '\n' +
          '🔫 <b>Example:</b>\n' +
          'You chose a price per life — <b>$1 NAVA (100 HP).</b>\n' +
          '🎯 In a match, 350 damage → earned <b>$3.5 NAVA</b>\n' +
          '💀 Lost 100 HP → paid <b>$1 NAVA</b>\n' +
          '💸 Total: net profit — <b>$2.5 NAVA</b>\n' +
          '\n' +
          '📤 <b>The more precise you are — the more you earn.</b>\n' +
          '\n' +
          "This isn't just PvP. It's a combat economy that makes matches dynamic, fair, and intelligent — winners are not just the strongest, but also the most strategic players.\n" +
          '\n' +
          '💸 All earned <b>$NAVA</b> are available for instant withdrawal — to Visa or in cryptocurrency.\n' +
          '\n' +
          '🔥 You choose the bet per 100 HP: from <b>$0.20 to $1000</b> — play comfortably and scale as your skill grows.\n' +
          '\n' +
          '<b>Skill Match — a format where each hit has a price.</b>',
        language: 'en',
        media_type: 'photo',
        media_url: 'uploads/images/en/Skill 2 earn.jpg',
      },
      {
        block_id: 8,
        text:
          '<b>🎯 Skill Match es un modelo en el que ganas por cada daño que infliges.</b>\n' +
          '\n' +
          'Aquí todo es simple: <b>tu habilidad = tus ingresos.</b> Y todo esto sin comisiones.\n' +
          '\n' +
          '🧠 No solo contamos las bajas, sino también cada disparo certero.\n' +
          '<b>100 HP = 1 vida.</b> Infliges daño: ganas. Muere: pierdes.\n' +
          '\n' +
          '🔫 <b>Ejemplo:</b>\n' +
          'Elegiste el precio de la vida: <b>1 $NAVA (100 HP).</b>\n' +
          '🎯 350 de daño en la partida → <b>3,5 $NAVA ganados</b>\n' +
          '💀 100 PS perdidos → <b>1 $NAVA perdidos</b>\n' +
          '💸 Total: beneficio neto: <b>2,5 $NAVA</b>\n' +
          '\n' +
          '📤 <b>Cuanto más preciso juegues, más ganarás.</b>\n' +
          '\n' +
          'Esto no es solo PvP. Es una economía de combate que hace que la partida sea dinámica, justa e inteligente: no solo ganan los jugadores más fuertes, sino también los más estratégicos.\n' +
          '\n' +
          '💸 Todos los <b>$NAVA</b> ganados se pueden retirar al instante: a una tarjeta Visa o en criptomonedas.\n' +
          '\n' +
          '🔥 Tú eliges la apuesta por cada 100 PS: desde <b>$0,20 hasta $1000</b>. Juega a un nivel cómodo y escala a medida que tu habilidad mejora.\n' +
          '\n' +
          '<b>Skill Match es un formato donde cada golpe tiene un precio.</b>',
        language: 'es',
        media_type: 'photo',
        media_url: 'uploads/images/es/Skill 2 earn.jpg',
      },
      {
        block_id: 8,
        text:
          '<b>🎯 Skill Match, verdiğiniz her hasar için kazandığınız bir modeldir.</b>\n' +
          '\n' +
          'Burada her şey basit: <b>beceriniz = geliriniz.</b> Ve tüm bunlar komisyonsuz.\n' +
          '\n' +
          '🧠 Sadece öldürmeleri değil, her isabetli atışı da sayıyoruz.\n' +
          '<b>100 HP = 1 hayat.</b> Hasar ver - kazan. Öl - kaybet.\n' +
          '\n' +
          '🔫 <b>Örnek:</b>\n' +
          'Hayat bedelini seçtiniz - <b>1 $NAVA (100 HP).</b>\n' +
          '🎯 Maçta 350 hasar → <b>3,5 $NAVA kazandınız</b>\n' +
          '💀 100 HP kaybettiniz → <b>1 $NAVA verdiniz</b>\n' +
          '💸 Toplam: net kâr - <b>2,5 $NAVA</b>\n' +
          '\n' +
          '📤 <b>Ne kadar isabetli oynarsanız, o kadar çok kazanırsınız.</b>\n' +
          '\n' +
          'Bu sadece PvP değil. Bu, maçı dinamik, adil ve akıllı hale getiren bir savaş ekonomisidir; sadece en güçlü oyuncular değil, aynı zamanda en stratejik düşünen oyuncular da kazanır.\n' +
          '\n' +
          "💸 Kazanılan tüm <b>$NAVA'lar</b> anında çekilebilir - Visa kartınıza veya kripto para birimine.\n" +
          '\n' +
          "🔥 100 HP başına bahsi siz seçersiniz: <b>0,20$'dan 1000$'a kadar</b> - beceriniz geliştikçe rahat bir seviyede ve ölçekte oynayın.\n" +
          '\n' +
          '<b>Skill Match, her vuruşun bir bedeli olan bir formattır.</b>',
        language: 'tr',
        media_type: 'photo',
        media_url: 'uploads/images/tr/Skill 2 earn.jpg',
      },
      {
        block_id: 8,
        text:
          '<b>🎯 Skill-Match — ein Modell, bei dem du für jeden verursachten Schaden verdienst.</b>\n' +
          '\n' +
          'Hier ist alles einfach: <b>dein Skill = dein Einkommen.</b> Und das alles — ohne Gebühren.\n' +
          '\n' +
          '🧠 Wir zählen nicht nur Kills, sondern jeden präzisen Schuss.\n' +
          '<b>100 HP = 1 Leben.</b> Schaden verursachen — verdienen. Sterben — verlieren.\n' +
          '\n' +
          '🔫 <b>Beispiel:</b>\n' +
          'Du hast den Preis pro Leben gewählt — <b>1 $NAVA (100 HP).</b>\n' +
          '🎯 Im Match 350 Schaden → <b>3,5 $NAVA verdient</b>\n' +
          '💀 100 HP verloren → <b>1 $NAVA bezahlt</b>\n' +
          '💸 Ergebnis: Nettogewinn — <b>2,5 $NAVA</b>\n' +
          '\n' +
          '📤 <b>Je präziser du spielst — desto mehr verdienst du.</b>\n' +
          '\n' +
          'Das ist kein einfaches PvP. Es ist eine Kampf-Ökonomie, die das Match dynamisch, fair und klug macht — gewinnen nicht nur die Stärksten, sondern auch die strategisch Denkenden.\n' +
          '\n' +
          '💸 Alle verdienten <b>$NAVA</b> sind sofort zur Auszahlung bereit — auf Visa oder in Kryptowährung.\n' +
          '\n' +
          '🔥 Du wählst selbst die Wette pro 100 HP: von <b>$0,20 bis $1000</b> — spiele komfortabel und skalier mit wachsendem Skill.\n' +
          '\n' +
          '<b>Skill-Match — ein Format, bei dem jeder Treffer einen Preis hat.</b>',
        language: 'de',
        media_type: 'photo',
        media_url: 'uploads/images/de/Skill 2 earn.jpg',
      },
      {
        block_id: 9,
        text:
          '<b>⚡️Подписка в MANAVA — это буст твоего дохода.</b>\n' +
          '\n' +
          'Free-режим позволяет зарабатывать до <b>300 $NAVA в месяц</b>\n' +
          '\n' +
          'Если хочешь больше — подписка открывает доступ к повышенному доходу в Skill-матчах и турнирах.\n' +
          '\n' +
          '<b>Лимиты по доходу:</b>\n' +
          '▪️ Free — до 300 $NAVA (price 0 $)\n' +
          '▪️ Basic — до 2 000 $NAVA (price 20 $)\n' +
          '▪️ Rookie — до 5 000 $NAVA (price 40 $)\n' +
          '▪️ Pro — до 10 000 $NAVA (price 70 $)\n' +
          '▪️ Elite — до 20 000 $NAVA (price 130 $)\n' +
          '▪️ Legend — до 40 000 $NAVA (price 240 $)\n' +
          '▪️ Master — до 100 000 $NAVA (price 440 $)\n' +
          '\n' +
          '<b>Играй, зарабатывай и почувствуй силу MANAVA на полную!</b>',
        language: 'ru',
        media_type: 'photo',
        media_url: 'uploads/images/ru/Турниры-2.jpg',
      },
      {
        block_id: 9,
        text:
          '<b>⚡️Підписка в MANAVA — це буст твого доходу.</b>\n' +
          '\n' +
          'Режим Free дозволяє заробляти до <b>300 $NAVA на місяць</b>\n' +
          '\n' +
          'Хочеш більше? Підписка відкриває доступ до підвищеного доходу в Skill-матчах і турнірах.\n' +
          '\n' +
          '<b>Ліміти доходу:</b>\n' +
          '▪️ Free — до 300 $NAVA (ціна 0 $)\n' +
          '▪️ Basic — до 2 000 $NAVA (ціна 20 $)\n' +
          '▪️ Rookie — до 5 000 $NAVA (ціна 40 $)\n' +
          '▪️ Pro — до 10 000 $NAVA (ціна 70 $)\n' +
          '▪️ Elite — до 20 000 $NAVA (ціна 130 $)\n' +
          '▪️ Legend — до 40 000 $NAVA (ціна 240 $)\n' +
          '▪️ Master — до 100 000 $NAVA (ціна 440 $)\n' +
          '\n' +
          '<b>Грай, заробляй і відчуй силу MANAVA на повну!</b>',
        language: 'ua',
        media_type: 'photo',
        media_url: 'uploads/images/ua/Турниры-2.jpg',
      },
      {
        block_id: 9,
        text:
          '<b>⚡️A subscription in MANAVA is a boost for your income.</b>\n' +
          '\n' +
          'The free mode allows earning up to <b>300 $NAVA per month</b>\n' +
          '\n' +
          'Want more? A subscription unlocks access to higher earnings in Skill matches and tournaments.\n' +
          '\n' +
          '<b>Income limits:</b>\n' +
          '▪️ Free — up to 300 $NAVA (price $0)\n' +
          '▪️ Basic — up to 2,000 $NAVA (price $20)\n' +
          '▪️ Rookie — up to 5,000 $NAVA (price $40)\n' +
          '▪️ Pro — up to 10,000 $NAVA (price $70)\n' +
          '▪️ Elite — up to 20,000 $NAVA (price $130)\n' +
          '▪️ Legend — up to 40,000 $NAVA (price $240)\n' +
          '▪️ Master — up to 100,000 $NAVA (price $440)\n' +
          '\n' +
          '<b>Play, earn, and feel the full power of MANAVA!</b>',
        language: 'en',
        media_type: 'photo',
        media_url: 'uploads/images/en/Турниры-2.jpg',
      },
      {
        block_id: 9,
        text:
          '<b>⚡️Una suscripción a MANAVA es un impulso para tus ingresos.</b>\n' +
          '\n' +
          'El modo Free te permite ganar hasta <b>300 $NAVA al mes</b>\n' +
          '\n' +
          '¿Quieres más? Una suscripción te da acceso a mayores ingresos en Skill Matches y torneos.\n' +
          '\n' +
          '<b>Límites de ingresos:</b>\n' +
          '▪️ Free — hasta 300 $NAVA (precio $0)\n' +
          '▪️ Basic — hasta 2,000 $NAVA (precio $20)\n' +
          '▪️ Rookie — hasta 5,000 $NAVA (precio $40)\n' +
          '▪️ Pro — hasta 10,000 $NAVA (precio $70)\n' +
          '▪️ Elite — hasta 20,000 $NAVA (precio $130)\n' +
          '▪️ Legend — hasta 40,000 $NAVA (precio $240)\n' +
          '▪️ Master — hasta 100,000 $NAVA (precio $440)\n' +
          '\n' +
          '<b>¡Juega, gana y siente todo el poder de MANAVA!</b>',
        language: 'es',
        media_type: 'photo',
        media_url: 'uploads/images/es/Турниры-2.jpg',
      },
      {
        block_id: 9,
        text:
          '<b>⚡️MANAVA aboneliği, gelirine bir destek sağlar.</b>\n' +
          '\n' +
          'Ücretsiz modda <b>ayda 300 $NAVA’ya kadar</b> kazanabilirsin.\n' +
          '\n' +
          'Daha fazlasını mı istiyorsun? Abonelik, Yetenek Maçları ve turnuvalarda daha yüksek kazançlara erişim sağlar.\n' +
          '\n' +
          '<b>Kazanç limitleri:</b>\n' +
          '▪️ Free — 300 $NAVA’ya kadar (fiyat 0 $)\n' +
          '▪️ Basic — 2.000 $NAVA’ya kadar (fiyat 20 $)\n' +
          '▪️ Rookie — 5.000 $NAVA’ya kadar (fiyat 40 $)\n' +
          '▪️ Pro — 10.000 $NAVA’ya kadar (fiyat 70 $)\n' +
          '▪️ Elite — 20.000 $NAVA’ya kadar (fiyat 130 $)\n' +
          '▪️ Legend — 40.000 $NAVA’ya kadar (fiyat 240 $)\n' +
          '▪️ Master — 100.000 $NAVA’ya kadar (fiyat 440 $)\n' +
          '\n' +
          '<b>Oyna, kazan ve MANAVA’nın tam gücünü hisset!</b>',
        language: 'tr',
        media_type: 'photo',
        media_url: 'uploads/images/tr/Турниры-2.jpg',
      },
      {
        block_id: 9,
        text:
          '<b>⚡️Ein Abonnement bei MANAVA ist ein Boost für dein Einkommen.</b>\n' +
          '\n' +
          'Im Free-Modus kannst du bis zu <b>300 $NAVA pro Monat</b> verdienen.\n' +
          '\n' +
          'Willst du mehr? Ein Abonnement eröffnet dir Zugang zu höheren Einnahmen in Skill-Matches und Turnieren.\n' +
          '\n' +
          '<b>Einkommensgrenzen:</b>\n' +
          '▪️ Free — bis zu 300 $NAVA (Preis 0 $)\n' +
          '▪️ Basic — bis zu 2.000 $NAVA (Preis 20 $)\n' +
          '▪️ Rookie — bis zu 5.000 $NAVA (Preis 40 $)\n' +
          '▪️ Pro — bis zu 10.000 $NAVA (Preis 70 $)\n' +
          '▪️ Elite — bis zu 20.000 $NAVA (Preis 130 $)\n' +
          '▪️ Legend — bis zu 40.000 $NAVA (Preis 240 $)\n' +
          '▪️ Master — bis zu 100.000 $NAVA (Preis 440 $)\n' +
          '\n' +
          '<b>Spiele, verdiene und spüre die volle Kraft von MANAVA!</b>',
        language: 'de',
        media_type: 'photo',
        media_url: 'uploads/images/de/Турниры-2.jpg',
      },
      {
        block_id: 10,
        text:
          '<b>🎯 Каждый час в MANAVA стартует новый турнир.</b>\n' +
          '\n' +
          'Зашёл, сыграл, попал в таблицу — получил реальные <b>$NAVA</b>.\n' +
          '\n' +
          '📌 <b>Как это устроено:</b>\n' +
          '• 👥 10 участников\n' +
          '• 🕐 Длительность — 1 час\n' +
          '• 💸 Вход — от 1 до 30 $NAVA\n' +
          '• 🏆 <b>Топ-5 участников делят весь призовой фонд — без комиссии</b>\n' +
          '\n' +
          '⚙️ Место в таблице определяется по суммарному урону (HP), нанесённому за турнир.\n' +
          '💡 Чем выше вход, тем выше множитель HP — и тем больше твой потенциальный выигрыш.\n' +
          '\n' +
          'Ты также можешь участвовать в <b>бесплатных турнирах</b> и зарабатывать $NAVA без вложений.\n' +
          '\n' +
          '<b>Играй в своём ритме и развивайся как профессиональный игрок.</b>',
        media_type: 'photo',
        media_url: 'uploads/images/ru/Турниры.jpg',
        language: 'ru',
      },
      {
        block_id: 10,
        text:
          '<b>🎯 Щогодини у MANAVA стартує новий турнір.</b>\n' +
          '\n' +
          'Зайшов, зіграв, потрапив у таблицю — отримав реальні <b>$NAVA</b>.\n' +
          '\n' +
          '📌 <b>Як це працює:</b>\n' +
          '• 👥 10 учасників\n' +
          '• 🕐 Тривалість — 1 година\n' +
          '• 💸 Вхід — від 1 до 30 $NAVA\n' +
          '• 🏆 <b>Топ-5 учасників ділять весь призовий фонд — без комісії</b>\n' +
          '\n' +
          '⚙️ Місце у таблиці визначається за сумарним уроном (HP), нанесеним за турнір.\n' +
          '💡 Чим вищий вхід — тим більший множник HP і, відповідно, потенційний виграш.\n' +
          '\n' +
          'Ти можеш також брати участь у <b>безкоштовних турнірах</b> і заробляти $NAVA без вкладень.\n' +
          '\n' +
          '<b>Грай у своєму ритмі і розвивайся як професійний гравець.</b>',
        media_type: 'photo',
        media_url: 'uploads/images/ua/Турниры.jpg',
        language: 'ua',
      },
      {
        block_id: 10,
        text:
          '<b>🎯 Every hour, a new tournament starts in MANAVA.</b>\n' +
          '\n' +
          'Join, play, get on the leaderboard — receive real <b>$NAVA</b>.\n' +
          '\n' +
          '📌 <b>How it works:</b>\n' +
          '• 👥 10 participants\n' +
          '• 🕐 Duration — 1 hour\n' +
          '• 💸 Entry fee — from 1 to 30 $NAVA\n' +
          '• 🏆 <b>Top 5 share the entire prize pool — no commission</b>\n' +
          '\n' +
          '⚙️ Placement in the leaderboard is based on total damage (HP) dealt during the tournament.\n' +
          '💡 The higher the entry fee, the higher the HP multiplier — and the greater your potential winnings.\n' +
          '\n' +
          'You can also participate in <b>free tournaments</b> and earn $NAVA without investments.\n' +
          '\n' +
          '<b>Play at your own pace and develop as a professional player.</b>',
        media_type: 'photo',
        media_url: 'uploads/images/en/Турниры.jpg',
        language: 'en',
      },
      {
        block_id: 10,
        text:
          '<b>🎯 Cada hora comienza un nuevo torneo en MANAVA.</b>\n' +
          '\n' +
          'Inicia sesión, juega, entra a la mesa y gana <b>$NAVA</b> de verdad.\n' +
          '\n' +
          '📌 <b>Cómo funciona:</b>\n' +
          '• 👥 10 participantes\n' +
          '• 🕐 Duración: 1 hora\n' +
          '• 💸 Entrada: de 1 a 30 $NAVA\n' +
          '• 🏆 <b>Los 5 mejores participantes comparten el premio total: sin comisión</b>\n' +
          '\n' +
          '⚙️ El puesto en la tabla se determina por el daño total (HP) infligido durante el torneo.\n' +
          '💡 Cuanto mayor sea la entrada, mayor será el multiplicador de HP y mayores serán tus ganancias potenciales.\n' +
          '\n' +
          'También puedes participar en <b>torneos gratuitos</b> y ganar $NAVA sin invertir.\n' +
          '\n' +
          '<b>Juega a tu propio ritmo y conviértete en un jugador profesional.</b>',
        media_type: 'photo',
        media_url: 'uploads/images/es/Турниры.jpg',
        language: 'es',
      },
      {
        block_id: 10,
        text:
          "<b>🎯 MANAVA'da her saat yeni bir turnuva başlıyor.</b>\n" +
          '\n' +
          'Giriş yapın, oynayın, masaya katılın — gerçek <b>$NAVA</b> kazanın.\n' +
          '\n' +
          '📌 <b>Nasıl çalışır:</b>\n' +
          '• 👥 10 katılımcı\n' +
          '• 🕐 Süre — 1 saat\n' +
          '• 💸 Katılım — 1 ila 30 $NAVA\n' +
          '• 🏆 <b>İlk 5 katılımcı tüm ödül havuzunu paylaşır — komisyon yok</b>\n' +
          '\n' +
          '⚙️ Masadaki yer, turnuva sırasında verilen toplam hasara (HP) göre belirlenir.\n' +
          '💡 Katılım ne kadar yüksekse, HP çarpanı o kadar yüksek olur ve potansiyel kazançlarınız da o kadar yüksek olur.\n' +
          '\n' +
          'Ayrıca <b>ücretsiz turnuvalara</b> katılabilir ve yatırım yapmadan $NAVA kazanabilirsiniz.\n' +
          '\n' +
          '<b>Kendi hızınızda oynayın ve profesyonel bir oyuncu olarak gelişin.</b>',
        media_type: 'photo',
        media_url: 'uploads/images/tr/Турниры.jpg',
        language: 'tr',
      },
      {
        block_id: 10,
        text:
          '<b>🎯 Jede Stunde startet in MANAVA ein neues Turnier.</b>\n' +
          '\n' +
          'Einsteigen, spielen, in der Tabelle landen — echtes <b>$NAVA</b> verdienen.\n' +
          '\n' +
          "📌 <b>So funktioniert's:</b>\n" +
          '• 👥 10 Teilnehmer\n' +
          '• 🕐 Dauer — 1 Stunde\n' +
          '• 💸 Eintritt — von 1 bis 30 $NAVA\n' +
          '• 🏆 <b>Die Top-5 teilen den ganzen Preispool — ohne Gebühren</b>\n' +
          '\n' +
          '⚙️ Platzierung in der Rangliste basiert auf dem Gesamtschaden (HP), der im Turnier verursacht wurde.\n' +
          '💡 Je höher der Einsatz — desto höher der HP-Multiplikator — und desto größer dein potenzieller Gewinn.\n' +
          '\n' +
          'Du kannst auch an <b>kostenlosen Turnieren</b> teilnehmen und ohne Investitionen $NAVA verdienen.\n' +
          '\n' +
          '<b>Spiele in deinem Tempo und entwickle dich zum Profi.</b>',
        media_type: 'photo',
        media_url: 'uploads/images/de/Турниры.jpg',
        language: 'de',
      },
      {
        block_id: 11,
        text:
          '<b>📈 Как это работает</b>\n' +
          '\n' +
          '💡 Ты сам выбираешь сумму входа — от 1 до 30 NAVA.\n' +
          '<b>Чем выше вход, тем больше множитель:</b>\n' +
          '\n' +
          '1 NAVA → ×1\n' +
          '3 NAVA → ×2\n' +
          '7 NAVA → ×3\n' +
          '15 NAVA → ×4\n' +
          '30 NAVA → ×5\n' +
          '\n' +
          '🎯 Все HP, которые ты набираешь в матче, умножаются.\n' +
          'Чем выше множитель — тем быстрее поднимаешься в таблице и тем крупнее твой приз.\n' +
          '\n' +
          '💥 <b>Чем выше вклад — тем мощнее результат.</b>',
        media_type: 'photo',
        media_url: 'uploads/images/ru/Как это работает_.jpg',
        language: 'ru',
      },
      {
        block_id: 11,
        text:
          '<b>📈 Як це працює</b>\n' +
          '\n' +
          '💡 Ти сам обираєш суму вхідних — від 1 до 30 NAVA.\n' +
          '<b>Чим вищий вхід — тим більший множник:</b>\n' +
          '\n' +
          '1 NAVA → ×1\n' +
          '3 NAVA → ×2\n' +
          '7 NAVA → ×3\n' +
          '15 NAVA → ×4\n' +
          '30 NAVA → ×5\n' +
          '\n' +
          '🎯 Всі HP, які ти набираєш у матчі, множаться.\n' +
          'Чим вище множник — тим швидше піднімешся у таблиці і тим більше твій приз.\n' +
          '\n' +
          '💥 <b>Чим вищий вклад — тим потужніший результат.</b>',
        media_type: 'photo',
        media_url: 'uploads/images/ua/Как это работает_.jpg',
        language: 'ua',
      },
      {
        block_id: 11,
        text:
          '<b>📈 How it works</b>\n' +
          '\n' +
          '💡 You choose your entry fee — from 1 to 30 NAVA.\n' +
          '<b>The higher the fee, the higher the multiplier:</b>\n' +
          '\n' +
          '1 NAVA → ×1\n' +
          '3 NAVA → ×2\n' +
          '7 NAVA → ×3\n' +
          '15 NAVA → ×4\n' +
          '30 NAVA → ×5\n' +
          '\n' +
          '🎯 All HP you accumulate in the match are multiplied.\n' +
          'The higher the multiplier — the faster you climb the leaderboard and the bigger your prize.\n' +
          '\n' +
          '💥 <b>The larger your investment — the more powerful your results.</b>',
        media_type: 'photo',
        media_url: 'uploads/images/en/Как это работает_.jpg',
        language: 'en',
      },
      {
        block_id: 11,
        text:
          '<b>📈 Cómo funciona</b>\n' +
          '\n' +
          '💡 Tú eliges el importe de la entrada: de 1 a 30 NAVA.\n' +
          '<b>Cuanto mayor sea la entrada, mayor será el multiplicador:</b>\n' +
          '\n' +
          '1 NAVA → ×1\n' +
          '3 NAVA → ×2\n' +
          '7 NAVA → ×3\n' +
          '15 NAVA → ×4\n' +
          '30 NAVA → ×5\n' +
          '\n' +
          '🎯 Todos los puntos de vida que ganes en una partida se multiplican.\n' +
          'Cuanto mayor sea el multiplicador, más rápido subirás en la tabla y mayor será tu premio.\n' +
          '\n' +
          '💥 <b>Cuanto mayor sea la contribución, más poderoso será el resultado.</b>',
        media_type: 'photo',
        media_url: 'uploads/images/es/Как это работает_.jpg',
        language: 'es',
      },
      {
        block_id: 11,
        text:
          '<b>📈 Nasıl çalışır</b>\n' +
          '\n' +
          '💡 Katılım tutarını kendiniz seçersiniz — 1 ila 30 NAVA.\n' +
          '<b>Giriş ne kadar yüksekse, çarpan da o kadar yüksek olur:</b>\n' +
          '\n' +
          '1 NAVA → ×1\n' +
          '3 NAVA → ×2\n' +
          '7 NAVA → ×3\n' +
          '15 NAVA → ×4\n' +
          '30 NAVA → ×5\n' +
          '\n' +
          "🎯 Bir maçta kazandığınız tüm HP'ler çarpılır.\n" +
          'Çarpan ne kadar yüksekse, masada o kadar hızlı yükselirsiniz ve ödülünüz de o kadar büyük olur.\n' +
          '\n' +
          '💥 <b>Katkı ne kadar yüksekse, sonuç o kadar güçlü olur.</b>',
        media_type: 'photo',
        media_url: 'uploads/images/tr/Как это работает_.jpg',
        language: 'tr',
      },
      {
        block_id: 11,
        text:
          '<b>📈 Wie es funktioniert</b>\n' +
          '\n' +
          '💡 Du wählst deinen Einsatz — von 1 bis 30 NAVA.\n' +
          '<b>Je höher der Einsatz — desto größer der Multiplikator:</b>\n' +
          '\n' +
          '1 NAVA → ×1\n' +
          '3 NAVA → ×2\n' +
          '7 NAVA → ×3\n' +
          '15 NAVA → ×4\n' +
          '30 NAVA → ×5\n' +
          '\n' +
          '🎯 Alle HP, die du im Match sammelst, werden multipliziert.\n' +
          'Der höhere Multiplikator — desto schneller steigst du in der Rangliste auf und desto größer dein Gewinn.\n' +
          '\n' +
          '💥 <b>Höherer Einsatz — stärkere Ergebnisse.</b>',
        media_type: 'photo',
        media_url: 'uploads/images/de/Как это работает_.jpg',
        language: 'de',
      },
      { language: 'ru', block_id: 12, text: 'Выберите язык:' },
      { language: 'ua', block_id: 12, text: 'Оберіть мову:' },
      { language: 'en', block_id: 12, text: 'Choose language:' },
      { language: 'es', block_id: 12, text: 'Elige idioma:' },
      { language: 'tr', block_id: 12, text: 'Dil seçin:' },
      { language: 'de', block_id: 12, text: 'Sprache wählen:' },

      { language: 'ru', block_id: 12, text: 'Выберите язык:' },
      { language: 'ua', block_id: 12, text: 'Оберіть мову:' },
      { language: 'en', block_id: 12, text: 'Choose language:' },
      { language: 'es', block_id: 12, text: 'Elige idioma:' },
      { language: 'tr', block_id: 12, text: 'Dil seçin:' },
      { language: 'de', block_id: 12, text: 'Sprache wählen:' },

      {
        language: 'ru',
        block_id: 13,
        text:
          '<b>💳 Manava Visa — трать $NAVA как обычные деньги</b>\n' +
          '\n' +
          'Используй свои игровые заработки в <b>180+ странах мира:</b> онлайн, офлайн, через Apple Pay / Google Pay — удобно, быстро, привычно.\n' +
          '\n' +
          '<b>Что ты получаешь:</b>\n' +
          '✅ Виртуальная и физическая карта\n' +
          '✅ Пополнение напрямую через $NAVA\n' +
          '✅ Комиссия на пополнение — всего 3%\n' +
          '✅ Без скрытых сборов\n' +
          '✅ Безлимит на платежи\n' +
          '✅ Снятие наличных в 3+ млн банкоматов по всему миру\n' +
          '\n' +
          '🔐 <b>Подписка — 30 $NAVA / месяц</b>\n' +
          'Включает выпуск, обслуживание и доступ ко всем функциям.\n' +
          '\n' +
          '💡 <b>Играй. Зарабатывай. Трать. Всё в одной экосистеме.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/ru/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'ua',
        block_id: 13,
        text:
          '<b>💳 Manava Visa — витрачай $NAVA як звичайні гроші</b>\n' +
          '\n' +
          'Використовуй свої ігрові доходи у <b>180+ країнах світу:</b> онлайн, офлайн, через Apple Pay / Google Pay — зручно, швидко, звично.\n' +
          '\n' +
          '<b>Що ти отримуєш:</b>\n' +
          '✅ Віртуальну і фізичну карту\n' +
          '✅ Поповнення напряму через $NAVA\n' +
          '✅ Комісія за поповнення — всього 3%\n' +
          '✅ Без прихованих зборів\n' +
          '✅ Необмежена кількість платежів\n' +
          '✅ Виведення готівки у 3+ мільйонах банкоматів по всьому світу\n' +
          '\n' +
          '🔐 <b>Підписка — 30 $NAVA / місяць</b>\n' +
          'Включає випуск, обслуговування і доступ до усіх функцій.\n' +
          '\n' +
          '💡 <b>Грай. Заробляй. Витрачай. Все в одній екосистемі.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/ua/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'en',
        block_id: 13,
        text:
          '<b>💳 Manava Visa — spend $NAVA like regular money</b>\n' +
          '\n' +
          'Use your in-game earnings in <b>over 180 countries worldwide:</b> online, offline, via Apple Pay / Google Pay — convenient, fast, familiar.\n' +
          '\n' +
          '<b>What you get:</b>\n' +
          '✅ Virtual and physical card\n' +
          '✅ Top-up directly with $NAVA\n' +
          '✅ Only 3% fee on top-up\n' +
          '✅ No hidden fees\n' +
          '✅ Unlimited payments\n' +
          '✅ Cash withdrawals at 3+ million ATMs worldwide\n' +
          '\n' +
          '🔐 <b>Subscription — 30 $NAVA / month</b>\n' +
          'Includes issuance, maintenance, and access to all features.\n' +
          '\n' +
          '💡 <b>Play. Earn. Spend. All in one ecosystem.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/en/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'es',
        block_id: 13,
        text:
          '<b>💳 Manava Visa: gasta $NAVA como si fuera dinero real</b>\n' +
          '\n' +
          'Usa tus ganancias de juego en <b>más de 180 países:</b> online, offline, a través de Apple Pay/Google Pay: cómodo, rápido y familiar.\n' +
          '\n' +
          '<b>Qué obtienes:</b>\n' +
          '✅ Tarjeta virtual y física\n' +
          '✅ Recarga directamente a través de $NAVA\n' +
          '✅ Comisión por recarga: solo el 3%\n' +
          '✅ Sin cargos ocultos\n' +
          '✅ Pagos ilimitados\n' +
          '✅ Retiro de efectivo en más de 3 millones de cajeros automáticos en todo el mundo\n' +
          '\n' +
          '🔐 <b>Suscripción: $30 NAVA al mes</b>\n' +
          'Incluye emisión, mantenimiento y acceso a todas las funciones.\n' +
          '\n' +
          '💡 <b>Juega. Gana. Gasta. Todo en un mismo ecosistema.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/es/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'tr',
        block_id: 13,
        text:
          "<b>💳 Manava Visa - $NAVA'yı normal para gibi harcayın</b>\n" +
          '\n' +
          "Oyun kazançlarınızı <b>dünya çapında 180'den fazla ülkede</b> kullanın: çevrimiçi, çevrimdışı, Apple Pay / Google Pay üzerinden - kullanışlı, hızlı, tanıdık.\n" +
          '\n' +
          '<b>Neler elde edersiniz:</b>\n' +
          '✅ Sanal ve fiziksel kart\n' +
          '✅ Doğrudan $NAVA üzerinden para yatırma\n' +
          '✅ Para yatırma komisyonu - sadece %3\n' +
          '✅ Gizli ücret yok\n' +
          '✅ Sınırsız ödeme\n' +
          "✅ Dünya çapında 3 milyondan fazla ATM'den nakit çekme\n" +
          '\n' +
          '🔐 <b>Abonelik - Aylık 30 $NAVA</b>\n' +
          'Vergi düzenleme, bakım ve tüm işlevlere erişim dahildir.\n' +
          '\n' +
          '💡 <b>Oyna. Kazan. Harca. Hepsi tek bir ekosistemde.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/tr/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'de',
        block_id: 13,
        text:
          '<b>💳 Manava Visa — verwende $NAVA wie normales Geld</b>\n' +
          '\n' +
          'Nutze deine Spiel-Einnahmen in <b>über 180 Ländern weltweit:</b> online, offline, via Apple Pay / Google Pay — bequem, schnell, vertraut.\n' +
          '\n' +
          '<b>Was du bekommst:</b>\n' +
          '✅ Virtuelle und physische Karte\n' +
          '✅ Top-up direkt mit $NAVA\n' +
          '✅ Nur 3% Gebühr beim Aufladen\n' +
          '✅ Keine versteckten Gebühren\n' +
          '✅ Unbegrenzte Zahlungen\n' +
          '✅ Bargeldabhebung an über 3 Millionen Geldautomaten weltweit\n' +
          '\n' +
          '🔐 <b>Abonnement — 30 $NAVA/Monat</b>\n' +
          'Enthält Ausgabe, Wartung und Zugriff auf alle Funktionen.\n' +
          '\n' +
          '💡 <b>Spielen. Verdienen. Ausgeben. Alles in einem Ökosystem.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/de/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },

      {
        language: 'ru',
        block_id: 14,
        text:
          '<b>💳 Как оформить карту MANAVA</b>\n' +
          '\n' +
          '1️⃣ Зарегистрируйся на сайте <b>manava.io</b>\n' +
          '2️⃣ Перейди в меню: <b>Финансы → Мои карты</b>\n' +
          '3️⃣ Нажми <b>«Заказать карту»</b>\n' +
          '4️⃣ Пройди простую верификацию\n' +
          '5️⃣ Оплати активацию — <b>30 $NAVA</b>\n' +
          '\n' +
          '✅ <b>Готово! Твоя карта отправляется к тебе.</b>\n' +
          '\n' +
          'Подключай к Apple Pay / Google Pay, используй по всему миру и наслаждайся полной свободой платежей.',
        media_type: 'photo',
        media_url:
          'uploads/images/ru/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'ua',
        block_id: 14,
        text:
          '<b>💳 Як оформити карту MANAVA</b>\n' +
          '\n' +
          '1️⃣ Зареєструйся на сайті <b>manava.io</b>\n' +
          '2️⃣ Перейди в меню: <b>Фінанси → Мої карти</b>\n' +
          '3️⃣ Натисни <b>«Замовити карту»</b>\n' +
          '4️⃣ Пройди просту верифікацію\n' +
          '5️⃣ Сплати активацію — <b>30 $NAVA</b>\n' +
          '\n' +
          '✅ <b>Готово! Твоя карта відправляється до тебе.</b>\n' +
          '\n' +
          'Підключай до Apple Pay / Google Pay, використовуй по всьому світу та насолоджуйся повною свободою платежів.',
        media_type: 'photo',
        media_url:
          'uploads/images/ua/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'en',
        block_id: 14,
        text:
          '<b>💳 How to get a MANAVA card</b>\n' +
          '\n' +
          '1️⃣ Register on the <b>manava.io</b> website\n' +
          '2️⃣ Go to the menu: <b>Finance → My Cards</b>\n' +
          '3️⃣ Click <b>"Order Card"</b>\n' +
          '4️⃣ Complete simple verification\n' +
          '5️⃣ Pay activation fee — <b>30 $NAVA</b>\n' +
          '\n' +
          '✅ <b>Done! Your card is on its way to you.</b>\n' +
          '\n' +
          'Connect it to Apple Pay / Google Pay, use it worldwide and enjoy complete payment freedom.',
        media_type: 'photo',
        media_url:
          'uploads/images/en/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'es',
        block_id: 14,
        text:
          '<b>💳 Cómo solicitar una tarjeta MANAVA</b>\n' +
          '\n' +
          '1️⃣ Regístrate en la web de <b>manava.io</b>\n' +
          '2️⃣ Ve al menú: <b>Finanzas → Mis tarjetas</b>\n' +
          '3️⃣ Haz clic en <b>"Solicitar una tarjeta"</b>\n' +
          '4️⃣ Completa una verificación sencilla\n' +
          '5️⃣ Paga la activación: <b>$30 NAVA</b>\n' +
          '\n' +
          '✅ <b>¡Listo! Tu tarjeta está en camino.</b>\n' +
          '\n' +
          'Conéctate a Apple Pay/Google Pay, úsala en todo el mundo y disfruta de total libertad de pago.',
        media_type: 'photo',
        media_url:
          'uploads/images/es/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'tr',
        block_id: 14,
        text:
          '<b>💳 MANAVA kartına nasıl başvurulur</b>\n' +
          '\n' +
          '1️⃣ <b>manava.io</b> web sitesine kaydolun\n' +
          '2️⃣ Menüye gidin: <b>Finans → Kartlarım</b>\n' +
          '3️⃣ <b>"Kart sipariş et"</b>e tıklayın\n' +
          '4️⃣ Basit bir doğrulama işlemi tamamlayın\n' +
          '5️⃣ Aktivasyon için ödeme yapın - <b>30$ NAVA</b>\n' +
          '\n' +
          '✅ <b>Tamamdır! Kartınız size doğru yolda.</b>\n' +
          '\n' +
          "Apple Pay / Google Pay'e bağlanın, dünya çapında kullanın ve ödeme özgürlüğünün tadını çıkarın.",
        media_type: 'photo',
        media_url:
          'uploads/images/tr/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'de',
        block_id: 14,
        text:
          '<b>💳 Wie man eine MANAVA-Karte erhält</b>\n' +
          '\n' +
          '1️⃣ Registriere dich auf der Website <b>manava.io</b>\n' +
          '2️⃣ Gehe zum Menü: <b>Finanzen → Meine Karten</b>\n' +
          '3️⃣ Klicke auf <b>"Karte bestellen"</b>\n' +
          '4️⃣ Durchlaufe eine einfache Verifizierung\n' +
          '5️⃣ Bezahle die Aktivierung — <b>30 $NAVA</b>\n' +
          '\n' +
          '✅ <b>Fertig! Deine Karte ist unterwegs zu dir.</b>\n' +
          '\n' +
          'Verbinde sie mit Apple Pay / Google Pay, nutze sie weltweit und genieße vollständige Zahlungsfreiheit.',
        media_type: 'photo',
        media_url:
          'uploads/images/de/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },

      {
        language: 'ru',
        block_id: 15,
        text:
          '<b>🌐 Альянс MANAVA — будь частью роста мультивселенной</b>\n' +
          '\n' +
          'Альянс — это способ стать соучастником развития MANAVA и получать долю от общего оборота платформы.\n' +
          '\n' +
          '🔹 <b>Что это даёт:</b>\n' +
          '• <b>48% дохода MANAVA</b> распределяется между участниками Альянса\n' +
          '• 🌐 <b>Alliance Key</b> — доступ к уникальному токену MANAV\n' +
          '\n' +
          'Покупка Alliance Key доступна через USDT / USDC / Visa / MasterCard\n' +
          'Хранение — только у тебя. Контроль — в твоих руках.\n' +
          '\n' +
          '<b>Ты создаёшь ценность — MANAVA делится прибылью. Присоединяйся к Альянсу и зарабатывай вместе с экосистемой.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/ru/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'ua',
        block_id: 15,
        text:
          '<b>🌐 Альянс MANAVA — будь частиною зростання мультивсесвіту</b>\n' +
          '\n' +
          'Альянс — це шлях стати співучасником розвитку MANAVA та отримувати частку від загального обороту платформи.\n' +
          '\n' +
          '🔹 <b>Що це дає:</b>\n' +
          '• <b>48% доходу MANAVA</b> розподіляється між учасниками Альянса\n' +
          '• 🌐 <b>Alliance Key</b> — доступ до унікального токена MANAV\n' +
          '\n' +
          'Покупка Alliance Key доступна через USDT / USDC / Visa / MasterCard\n' +
          'Зберігання — тільки у тебе. Контроль — у твоїх руках.\n' +
          '\n' +
          '<b>Ти створюєш цінність — MANAVA ділиться прибутком. Приєднуйся до Альянсу і заробляй разом з екосистемою.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/ua/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'en',
        block_id: 15,
        text:
          "<b>🌐 MANAVA Alliance — be part of the multiverse's growth</b>\n" +
          '\n' +
          "An alliance is a way to become a co-participant in MANAVA's development and receive a share of the platform's total turnover.\n" +
          '\n' +
          '🔹 <b>What it provides:</b>\n' +
          "• <b>48% of MANAVA's income</b> is distributed among alliance members\n" +
          '• 🌐 <b>Alliance Key</b> — access to a unique MANAV token\n' +
          '\n' +
          'Purchase of Alliance Key is available via USDT / USDC / Visa / MasterCard\n' +
          'Storage — only in your control. Control — in your hands.\n' +
          '\n' +
          '<b>You create value — MANAVA shares the profit. Join the alliance and earn together with the ecosystem.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/en/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'es',
        block_id: 15,
        text:
          '<b>🌐 Alianza MANAVA: forma parte del crecimiento del multiverso</b>\n' +
          '\n' +
          'La alianza es una forma de participar en el desarrollo de MANAVA y recibir una parte de la facturación total de la plataforma.\n' +
          '\n' +
          '🔹 <b>¿Qué ofrece?</b>\n' +
          '• El <b>48% de los ingresos de MANAVA</b> se distribuye entre los miembros de la alianza\n' +
          '• 🌐 <b>Clave de la Alianza</b>: acceso al token único MANAV\n' +
          '\n' +
          'La clave de la alianza se puede comprar con USDT/USDC/Visa/MasterCard\n' +
          'El almacenamiento es solo tuyo. El control está en tus manos.\n' +
          '\n' +
          '<b>Tú creas valor: MANAVA comparte las ganancias. Únete a la Alianza y gana dinero con el ecosistema.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/es/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'tr',
        block_id: 15,
        text:
          '<b>🌐 MANAVA İttifakı — çoklu evrenin büyümesinin bir parçası olun</b>\n' +
          '\n' +
          "İttifak, MANAVA'nın gelişimine katılımcı olmanın ve platformun toplam cirosundan pay almanın bir yoludur.\n" +
          '\n' +
          '🔹 <b>Ne sağlar:</b>\n' +
          "• <b>MANAVA'nın gelirinin %48'i</b> İttifak üyeleri arasında dağıtılır\n" +
          '• 🌐 <b>İttifak Anahtarı</b> — benzersiz MANAV tokenına erişim\n' +
          '\n' +
          'İttifak Anahtarı USDT / USDC / Visa / MasterCard ile satın alınabilir\n' +
          'Depolama sadece sizde. Kontrol sizin elinizde.\n' +
          '\n' +
          "<b>Siz değer yaratın — MANAVA kârı paylaşır. İttifak'a katılın ve ekosistemle birlikte kazanın.</b>",
        media_type: 'photo',
        media_url:
          'uploads/images/tr/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'de',
        block_id: 15,
        text:
          '<b>🌐 MANAVA Alliance — werde Teil des Wachstums des Multiversums</b>\n' +
          '\n' +
          'Eine Alliance ist eine Möglichkeit, an der Entwicklung von MANAVA teilzuhaben und einen Anteil am Gesamtumsatz der Plattform zu erhalten.\n' +
          '\n' +
          '🔹 <b>Was das bringt:</b>\n' +
          '• <b>48% des Einkommens von MANAVA</b> werden an die Mitglieder der Alliance verteilt\n' +
          '• 🌐 <b>Alliance Key</b> — Zugriff auf den einzigartigen MANAV-Token\n' +
          '\n' +
          'Der Kauf des Alliance Key ist über USDT / USDC / Visa / MasterCard möglich\n' +
          'Aufbewahrung — nur bei dir. Kontrolle — in deinen Händen.\n' +
          '\n' +
          '<b>Du schaffst Wert — MANAVA teilt den Gewinn. Tritt der Alliance bei und verdiene gemeinsam mit dem Ökosystem.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/de/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },

      {
        language: 'ru',
        block_id: 16,
        text:
          '<b>🔑 Alliance Key — твой доступ к росту MANAVA</b>\n' +
          '\n' +
          'Alliance Key — это билет в экономику MANAVA и шанс войти в проект на старте, когда условия самые выгодные.\n' +
          '\n' +
          '<b>Покупаешь один раз — и получаешь $MANAV токены по фиксированной цене в течение двух лет:</b>\n' +
          '\n' +
          '🔹 <b>4 месяца фриз</b> — после этого токены начинают поступать\n' +
          '🔹 <b>20 месяцев</b> — $MANAV капает тебе каждый час\n' +
          '🔹 Можно выводить и продавать в любой момент\n' +
          '🔹 Только <b>1 000 000 $MANAV</b> будет доступно через Alliance Key\n' +
          '🔹 <b>10% всей выручки MANAVA</b> уходит в ликвидность: чем больше покупателей, тем выше цена\n' +
          '\n' +
          '💡 <b>Хочешь быть внутри экосистемы, а не просто наблюдать? На старте — самые выгодные условия.</b>\n' +
          '\n' +
          'MANAVA строится теми, кто уже внутри.',
        media_type: 'photo',
        media_url:
          'uploads/images/ru/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'ua',
        block_id: 16,
        text:
          '<b>🔑 Alliance Key — твій доступ до зростання MANAVA</b>\n' +
          '\n' +
          'Alliance Key — це квиток у економіку MANAVA і шанс увійти у проект на старті, коли умови найвигідніші.\n' +
          '\n' +
          '<b>Купуєш один раз — і отримуєш $MANAV токени за фіксованою ціною протягом двох років:</b>\n' +
          '\n' +
          '🔹 <b>4 місяці фріз</b> — після цього токени починають надходити\n' +
          '🔹 <b>20 місяців</b> — $MANAV капає тобі щогодини\n' +
          '🔹 Можна виводити і продавати у будь-який момент\n' +
          '🔹 Тільки <b>1 000 000 $MANAV</b> буде доступно через Alliance Key\n' +
          '🔹 <b>10% всієї виручки MANAVA</b> йде в ліквідність: чим більше покупців, тим вища ціна\n' +
          '\n' +
          '💡 <b>Хочеш бути у серці екосистеми, а не просто спостерігати? На старті — найвигідніші умови.</b>\n' +
          '\n' +
          'MANAVA створюється тими, хто вже всередині.',
        media_type: 'photo',
        media_url:
          'uploads/images/ua/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'en',
        block_id: 16,
        text:
          '<b>🔑 Alliance Key — your access to MANAVA growth</b>\n' +
          '\n' +
          "Alliance Key is a ticket into MANAVA's economy and a chance to enter the project at the start, when conditions are the most favorable.\n" +
          '\n' +
          '<b>Buy once — and receive $MANAV tokens at a fixed price for two years:</b>\n' +
          '\n' +
          '🔹 <b>4 months freeze</b> — after which tokens start to accrue\n' +
          '🔹 <b>20 months</b> — $MANAV accumulates hourly\n' +
          '🔹 Can be withdrawn and sold at any time\n' +
          '🔹 Only <b>1,000,000 $MANAV</b> will be available through Alliance Key\n' +
          '🔹 <b>10% of all MANAVA revenue</b> goes into liquidity: the more buyers — the higher the price\n' +
          '\n' +
          '💡 <b>Want to be inside the ecosystem rather than just observing? The best conditions are at the start.</b>\n' +
          '\n' +
          'MANAVA is built by those already inside.',
        media_type: 'photo',
        media_url:
          'uploads/images/en/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'es',
        block_id: 16,
        text:
          '<b>🔑 Clave de Alianza: tu acceso al crecimiento de MANAVA</b>\n' +
          '\n' +
          'La Clave de Alianza es tu pase a la economía de MANAVA y la oportunidad de entrar al proyecto desde el principio, cuando las condiciones son las más favorables.\n' +
          '\n' +
          '<b>Compra una vez y obtén tokens $MANAV a un precio fijo durante dos años:</b>\n' +
          '\n' +
          '🔹 <b>4 meses de congelación</b>: después, los tokens empiezan a llegar\n' +
          '🔹 <b>20 meses</b>: $MANAV te llega cada hora\n' +
          '🔹 Puedes retirar y vender en cualquier momento\n' +
          '🔹 Solo <b>1,000,000 $MANAV</b> estarán disponibles a través de la Clave de Alianza\n' +
          '🔹 El <b>10% de todos los ingresos de MANAVA</b> se destina a liquidez: cuantos más compradores, mayor será el precio\n' +
          '\n' +
          '💡 <b>¿Quieres estar dentro del ecosistema y no solo observar? Las condiciones son las más favorables al principio.</b>\n' +
          '\n' +
          'MANAVA es construida por quienes ya están dentro.',
        media_type: 'photo',
        media_url:
          'uploads/images/es/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'tr',
        block_id: 16,
        text:
          '<b>🔑 İttifak Anahtarı — MANAVA büyümesine erişiminiz</b>\n' +
          '\n' +
          'İttifak Anahtarı, MANAVA ekonomisine bir giriş bileti ve koşullar en uygun olduğunda projeye başlangıçta katılma şansıdır.\n' +
          '\n' +
          '<b>Bir kez satın alın ve iki yıl boyunca sabit fiyattan $MANAV tokenları edinin:</b>\n' +
          '\n' +
          '🔹 <b>4 ay dondurma</b> — sonrasında tokenlar gelmeye başlar\n' +
          '🔹 <b>20 ay</b> — $MANAV her saat size damlar\n' +
          '🔹 İstediğiniz zaman çekebilir ve satabilirsiniz\n' +
          '🔹 İttifak Anahtarı aracılığıyla yalnızca <b>1.000.000 $MANAV</b> kullanılabilir\n' +
          "🔹 <b>Tüm MANAVA gelirinin %10'u</b> likiditeye gider: ne kadar çok alıcı olursa, fiyat o kadar yüksek olur\n" +
          '\n' +
          '💡 <b>Sadece izlemekle kalmayıp ekosistemin içinde olmak ister misiniz? Koşullar başlangıçta en uygun seviyededir.</b>\n' +
          '\n' +
          'MANAVA, halihazırda içinde olanlar tarafından inşa edilmiştir.',
        media_type: 'photo',
        media_url:
          'uploads/images/tr/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'de',
        block_id: 16,
        text:
          '<b>🔑 Alliance Key — dein Zugang zum Wachstum von MANAVA</b>\n' +
          '\n' +
          'Der Alliance Key ist dein Ticket in die MANAVA-Ökonomie und eine Chance, bei den besten Konditionen zu starten.\n' +
          '\n' +
          '<b>Einmal kaufen — und du erhältst $MANAV Token zu einem festen Kurs über zwei Jahre:</b>\n' +
          '\n' +
          '🔹 <b>4 Monate Freeze</b> — danach beginnen die Token zu fließen\n' +
          '🔹 <b>20 Monate</b> — $MANAV werden dir stündlich gutgeschrieben\n' +
          '🔹 Kann jederzeit ausgezahlt und verkauft werden\n' +
          '🔹 Nur <b>1.000.000 $MANAV</b> werden über den Alliance Key verfügbar sein\n' +
          '🔹 <b>10% des gesamten MANAVA-Umsatzes</b> fließt in die Liquidität: Je mehr Käufer — desto höher der Preis\n' +
          '\n' +
          '💡 <b>Willst du Teil des Systems sein, anstatt nur zuzusehen? Zum Start die besten Bedingungen.</b>\n' +
          '\n' +
          'MANAVA wird von denjenigen aufgebaut, die bereits drin sind.',
        media_type: 'photo',
        media_url:
          'uploads/images/de/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },

      {
        language: 'ru',
        block_id: 17,
        text:
          '<b>🧠 MANAV — токен, созданный для участников, а не инвесторов</b>\n' +
          '\n' +
          'Токеномика MANAV — это не просто цифры. Это основа новой, честной экономики, где главный выгодополучатель — ты.\n' +
          '\n' +
          '🔹 <b>MANAV не принадлежит компании</b> — он создан Альянсом и распределяется через участие, а не через фонды\n' +
          '🔹 <b>Компания не управляет токеном</b> — 100% контроля у сообщества\n' +
          '🔹 <b>10% всей выручки MANAVA</b> уходит в ликвидность — ты можешь продать токен в любой момент\n' +
          '🔹 Ценность токена растёт при любой активности: покупках, подписках, даже продажах\n' +
          '🔹 <b>Никакой инфляции</b> — выпуск ограничен, правила прозрачны\n' +
          '🔹 Каждый MANAV обеспечен системой и растёт вместе с ней\n' +
          '\n' +
          '💡 <b>Ты не просто владеешь токеном — ты владеешь частью экосистемы, которая растёт вместе с тобой.</b>\n' +
          '\n' +
          'Это не спекуляция. Это новая модель владения.',
        media_type: 'photo',
        media_url:
          'uploads/images/ru/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'ua',
        block_id: 17,
        text:
          '<b>🧠 MANAV — токен, створений для учасників, а не інвесторів</b>\n' +
          '\n' +
          'Токеноміка MANAV — це не просто цифри. Це основа нової, чесної економіки, де головний вигодонабувач — ти.\n' +
          '\n' +
          '🔹 <b>MANAV не належить компанії</b> — він створений Альянсом і розподіляється через участь, а не через фонди\n' +
          '🔹 <b>Компанія не керує токеном</b> — 100% контроль у спільноти\n' +
          '🔹 <b>10% всієї виручки MANAVA</b> йде в ліквідність — ти можеш продати токен у будь-який момент\n' +
          '🔹 Цінність токена зростає при будь-якій активності: покупках, підписках, навіть продажах\n' +
          '🔹 <b>Ніякої інфляції</b> — випуск обмежений, правила прозорі\n' +
          '🔹 Кожен MANAV забезпечений системою і зростає разом із нею\n' +
          '\n' +
          '💡 <b>Ти не просто володієш токеном — ти володієш частиною екосистеми, яка зростає разом з тобою.</b>\n' +
          '\n' +
          'Це не спекуляція. Це нова модель володіння.',
        media_type: 'photo',
        media_url:
          'uploads/images/ua/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'en',
        block_id: 17,
        text:
          '<b>🧠 MANAV — a token created for participants, not investors</b>\n' +
          '\n' +
          "MANAV's tokenomics is more than just numbers. It's the foundation of a new, fair economy where you are the main beneficiary.\n" +
          '\n' +
          '🔹 <b>MANAV does not belong to a company</b> — it is created by the alliance and distributed via participation, not through funds\n' +
          "🔹 <b>The company does not control the token</b> — 100% control is in the community's hands\n" +
          '🔹 <b>10% of all MANAVA revenue</b> goes into liquidity — you can sell your token at any moment\n' +
          '🔹 The value of the token grows with activity: purchases, subscriptions, even sales\n' +
          '🔹 <b>No inflation</b> — issuance is limited, rules are transparent\n' +
          '🔹 Every MANAV is supported by the system and grows with it\n' +
          '\n' +
          "💡 <b>You don't just own a token — you own a part of the ecosystem that grows with you.</b>\n" +
          '\n' +
          "This isn't speculation. It's a new ownership model.",
        media_type: 'photo',
        media_url:
          'uploads/images/en/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'es',
        block_id: 17,
        text:
          '<b>🧠 MANAV es un token creado para participantes, no para inversores.</b>\n' +
          '\n' +
          'La tokenómica de MANAV no se trata solo de números. Es la base de una nueva economía honesta, donde el principal beneficiario eres tú.\n' +
          '\n' +
          '🔹 <b>MANAV no es propiedad de la empresa</b>: es creado por la Alianza y se distribuye mediante la participación, no a través de fondos\n' +
          '🔹 <b>La empresa no gestiona el token</b>: el 100% del control reside en la comunidad\n' +
          '🔹 El <b>10% de todos los ingresos de MANAV</b> se destina a liquidez: puedes vender el token en cualquier momento\n' +
          '🔹 El valor del token crece con cualquier actividad: compras, suscripciones e incluso ventas\n' +
          '🔹 <b>Sin inflación</b>: la emisión es limitada y las reglas son transparentes\n' +
          '🔹 Cada MANAV es proporcionado por el sistema y crece con él\n' +
          '\n' +
          '💡 <b>No solo posees un token, sino una parte del ecosistema que crece contigo.</b>\n' +
          '\n' +
          'Esto no es especulación. Es un nuevo modelo de propiedad.',
        media_type: 'photo',
        media_url:
          'uploads/images/es/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'tr',
        block_id: 17,
        text:
          '<b>🧠 MANAV, yatırımcılar için değil, katılımcılar için oluşturulmuş bir tokendır.</b>\n' +
          '\n' +
          'MANAV token ekonomisi sadece sayılardan ibaret değildir. Asıl faydalanıcının siz olduğu yeni ve dürüst bir ekonominin temelidir.\n' +
          '\n' +
          '🔹 <b>MANAV şirkete ait değildir</b> — İttifak tarafından oluşturulur ve fonlar aracılığıyla değil, katılım yoluyla dağıtılır\n' +
          '🔹 <b>Şirket tokeni yönetmez</b> — %100 kontrol topluluktadır\n' +
          "🔹 <b>Tüm MANAVA gelirinin %10'u</b> likiditeye gider — tokeni istediğiniz zaman satabilirsiniz\n" +
          '🔹 Tokenın değeri, satın almalar, abonelikler ve hatta satışlar gibi her türlü aktiviteyle artar\n' +
          '🔹 <b>Enflasyon yok</b> — emisyon sınırlıdır, kurallar şeffaftır\n' +
          '🔹 Her MANAV sistem tarafından sağlanır ve sistemle birlikte büyür\n' +
          '\n' +
          '💡 <b>Sadece bir tokena sahip olmazsınız — sizinle birlikte büyüyen ekosistemin bir parçasına sahip olursunuz.</b>\n' +
          '\n' +
          'Bu bir spekülasyon değil. Bu yeni bir sahiplik modeli.',
        media_type: 'photo',
        media_url:
          'uploads/images/tr/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'de',
        block_id: 17,
        text:
          '<b>🧠 MANAV — ein Token, geschaffen für Teilnehmer, nicht für Investoren</b>\n' +
          '\n' +
          'Die Tokenomics von MANAV ist mehr als nur Zahlen. Es ist die Grundlage einer neuen, fairen Wirtschaft, bei der du der Hauptprofitierende bist.\n' +
          '\n' +
          '🔹 <b>MANAV gehört nicht zu einem Unternehmen</b> — es wurde von der Alliance geschaffen und wird durch Teilnahme verteilt, nicht durch Fonds\n' +
          '🔹 <b>Das Unternehmen kontrolliert den Token nicht</b> — 100% Kontrolle liegt bei der Community\n' +
          '🔹 <b>10% des gesamten Einkommens von MANAVA</b> fließt in die Liquidität — du kannst deinen Token jederzeit verkaufen\n' +
          '🔹 Der Wert des Tokens wächst mit Aktivität: Käufe, Abonnements, sogar Verkäufe\n' +
          '🔹 <b>Keine Inflation</b> — die Ausgabe ist begrenzt, die Regeln transparent\n' +
          '🔹 Jeder MANAV ist durch das System abgesichert und wächst mit ihm\n' +
          '\n' +
          '💡 <b>Du besitzt nicht nur einen Token — du besitzt einen Teil des Systems, das mit dir wächst.</b>\n' +
          '\n' +
          'Das ist keine Spekulation. Es ist ein neues Eigentumsmodell.',
        media_type: 'photo',
        media_url:
          'uploads/images/de/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },

      {
        language: 'ru',
        block_id: 18,
        text:
          '<b>⚙️ EARN ALLIANCE — твоя доля в доходах MANAVA</b>\n' +
          '\n' +
          'MANAVA — экосистема, которая делится прибылью с теми, кто двигает её вперёд.\n' +
          '\n' +
          '💸 <b>38% всей экономики</b> уходит в EARN Alliance — пул для активных участников.\n' +
          'Ты можешь забирать % с каждой подписки, покупки и активации в системе.\n' +
          '\n' +
          '💡 <b>Узнай, как подключиться к EARN Alliance и начать получать свою долю с оборота.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/ru/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'ua',
        block_id: 18,
        text:
          '<b>⚙️ EARN ALLIANCE — твоя частка в доходах MANAVA</b>\n' +
          '\n' +
          'MANAVA — екосистема, яка ділиться прибутком із тими, хто рухає її вперед.\n' +
          '\n' +
          '💸 <b>38% всієї економіки</b> йде в EARN Alliance — пул для активних учасників.\n' +
          'Ти можеш забирати % з кожної підписки, покупки та активації в системі.\n' +
          '\n' +
          '💡 <b>Дізнайся, як підключитися до EARN Alliance та почати отримувати свою частку з обороту.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/ua/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'en',
        block_id: 18,
        text:
          '<b>⚙️ EARN ALLIANCE — your share of MANAVA income</b>\n' +
          '\n' +
          'MANAVA is an ecosystem that shares profits with those who move it forward.\n' +
          '\n' +
          '💸 <b>38% of the entire economy</b> goes to the EARN Alliance — a pool for active participants.\n' +
          'You can take % from each subscription, purchase and activation in the system.\n' +
          '\n' +
          '💡 <b>Find out how to connect to the EARN Alliance and start receiving your share of the turnover.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/en/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'es',
        block_id: 18,
        text:
          '<b>⚙️ EARN ALLIANCE: tu parte de los ingresos de MANAVA</b>\n' +
          '\n' +
          'MANAVA es un ecosistema que comparte las ganancias con quienes lo impulsan.\n' +
          '\n' +
          '💸 El <b>38% de la economía total</b> se destina a la Alianza EARN, un fondo común para participantes activos.\n' +
          'Puedes obtener un porcentaje de cada suscripción, compra y activación en el sistema.\n' +
          '\n' +
          '💡 <b>Descubre cómo conectarte a la Alianza EARN y empieza a recibir tu parte de los ingresos.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/es/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'tr',
        block_id: 18,
        text:
          '<b>⚙️ EARN ALLIANCE — MANAVA gelirinizden aldığınız pay</b>\n' +
          '\n' +
          'MANAVA, kârını onu ileriye taşıyanlarla paylaşan bir ekosistemdir.\n' +
          '\n' +
          "💸 <b>Tüm ekonominin %38'i</b>, aktif katılımcılar için bir havuz olan EARN İttifakı'na gider.\n" +
          'Sistemdeki her abonelikten, satın alma işleminden ve aktivasyondan % alabilirsiniz.\n' +
          '\n' +
          "💡 <b>EARN İttifakı'na nasıl bağlanacağınızı ve cirodan payınızı almaya nasıl başlayacağınızı öğrenin.</b>",
        media_type: 'photo',
        media_url:
          'uploads/images/tr/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'de',
        block_id: 18,
        text:
          '<b>⚙️ ALLIANCE VERDIENEN — dein Anteil an den MANAVA-Einnahmen</b>\n' +
          '\n' +
          'MANAVA ist ein Ökosystem, das Gewinne mit denen teilt, die es voranbringen.\n' +
          '\n' +
          '💸 <b>38% des gesamten Umsatzes</b> gehen an die EARN Alliance — einen Pool für aktive Teilnehmer.\n' +
          'Du erhältst einen Prozentsatz von jedem Abonnement, Kauf und jeder Aktivierung im System.\n' +
          '\n' +
          '💡 <b>Erfahre, wie du dich der EARN Alliance anschließt und deinen Umsatzanteil erhältst.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/de/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'ru',
        block_id: 19,
        text:
          '<b>💰 Как формируется цена токена MANAV?</b>\n' +
          '\n' +
          'MANAV — это не просто цифра на графике. Его цена отражает реальный спрос и живые деньги, поступающие в экосистему.\n' +
          'На цену также влияет объём токенов в обороте — сколько MANAV сейчас у участников.\n' +
          '\n' +
          '🔄 <b>Как работает механизм?</b>\n' +
          'Каждый раз, когда кто-то покупает подписку, карту или активирует Oracle:\n' +
          '\n' +
          '→ <b>20% от суммы</b> уходит в ликвидный пул — это общий фонд, обеспеченный реальными деньгами\n' +
          '→ <b>Текущая цена MANAV = сумма пула ÷ количество токенов в обороте</b>\n' +
          '\n' +
          '📈 Чем больше денег поступает — тем выше цена\n' +
          '📉 Чем больше токенов без новых покупок — тем ниже цена\n' +
          '\n' +
          '<b>Прозрачно. Честно. Без манипуляций.</b>\n' +
          '\n' +
          'Цена MANAV растёт вместе с доверием и активностью сообщества.',
        media_type: 'photo',
        media_url:
          'uploads/images/ru/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'ua',
        block_id: 19,
        text:
          '<b>💰 Як формується ціна токена MANAV?</b>\n' +
          '\n' +
          'MANAV — це не просто цифра на графіку. Його ціна відображає реальний попит і живі гроші, що надходять в екосистему.\n' +
          'На ціну також впливає обсяг токенів у обігу — скільки MANAV зараз у учасників.\n' +
          '\n' +
          '🔄 <b>Як працює механізм?</b>\n' +
          'Кожного разу, коли хтось купує підписку, карту або активує Oracle:\n' +
          '\n' +
          '→ <b>20% від суми</b> йде у ліквідний пул — це загальний фонд, забезпечений реальними грошима\n' +
          '→ <b>Поточна ціна MANAV = сума пула ÷ кількість токенів у обігу</b>\n' +
          '\n' +
          '📈 Чим більше грошей надходить — тим вища ціна\n' +
          '📉 Чим більше токенів без нових покупок — тим нижча ціна\n' +
          '\n' +
          '<b>Прозоро. Чесно. Без маніпуляцій.</b>\n' +
          '\n' +
          'Ціна MANAV зростає разом із довірою і активністю спільноти.',
        media_type: 'photo',
        media_url:
          'uploads/images/ua/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'en',
        block_id: 19,
        text:
          "<b>💰 How is the MANAV token's price determined?</b>\n" +
          '\n' +
          'MANAV is not just a number on a chart. Its price reflects real demand and actual money flowing into the ecosystem.\n' +
          'The volume of tokens in circulation — how many MANAV are currently held by participants — also influences the price.\n' +
          '\n' +
          '🔄 <b>How does the mechanism work?</b>\n' +
          'Every time someone buys a subscription, card, or activates Oracle:\n' +
          '\n' +
          '→ <b>20% of the amount</b> goes into the liquidity pool — a common fund backed by real money\n' +
          '→ <b>Current MANAV price = pool amount ÷ number of tokens in circulation</b>\n' +
          '\n' +
          '📈 The more money coming in — the higher the price\n' +
          '📉 The more tokens without new purchases — the lower the price\n' +
          '\n' +
          '<b>Transparent and fair. No manipulation.</b>\n' +
          '\n' +
          'The price of MANAV grows with trust and activity within the community.',
        media_type: 'photo',
        media_url:
          'uploads/images/en/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'es',
        block_id: 19,
        text:
          '<b>💰 ¿Cómo se forma el precio del token MANAV?</b>\n' +
          '\n' +
          'MANAV no es solo un número en un gráfico. Su precio refleja la demanda real y el dinero real que entra en el ecosistema.\n' +
          'El precio también se ve afectado por el volumen de tokens en circulación: ¿cuántos MANAV tienen actualmente los participantes?\n' +
          '\n' +
          '🔄 <b>¿Cómo funciona el mecanismo?</b>\n' +
          'Cada vez que alguien compra una suscripción, una tarjeta o activa Oracle:\n' +
          '\n' +
          '→ El <b>20% del importe</b> se destina al fondo común: un fondo común respaldado por dinero real\n' +
          '→ <b>Precio actual de MANAV = importe del fondo ÷ número de tokens en circulación</b>\n' +
          '\n' +
          '📈 Cuanto más dinero entre, mayor será el precio\n' +
          '📉 Cuantos más tokens no se compren, menor será el precio\n' +
          '\n' +
          '<b>Transparente. Honesto. Sin manipulación.</b>\n' +
          '\n' +
          'El precio de MANAV crece junto con la confianza y la actividad de la comunidad.',
        media_type: 'photo',
        media_url:
          'uploads/images/es/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'tr',
        block_id: 19,
        text:
          '<b>💰 MANAV token fiyatı nasıl oluşur?</b>\n' +
          '\n' +
          'MANAV, grafikteki bir sayı değildir. Fiyatı, gerçek talebi ve ekosisteme giren gerçek parayı yansıtır.\n' +
          "Fiyat, dolaşımdaki token hacminden de etkilenir — katılımcıların şu anda kaç MANAV'ı var?\n" +
          '\n' +
          '🔄 <b>Mekanizma nasıl çalışıyor?</b>\n' +
          'Her abonelik, kart satın alındığında veya Oracle etkinleştirildiğinde:\n' +
          '\n' +
          "→ <b>Tutarın %20'si</b> likit havuza gider — bu, gerçek parayla desteklenen ortak bir fondur\n" +
          '→ <b>Mevcut MANAV fiyatı = havuz miktarı ÷ dolaşımdaki token sayısı</b>\n' +
          '\n' +
          '📈 Ne kadar çok para gelirse, fiyat o kadar yüksek olur\n' +
          '📉 Yeni satın alım yapılmayan token sayısı ne kadar çok olursa, fiyat o kadar düşük olur\n' +
          '\n' +
          '<b>Şeffaf. Dürüst. Manipülasyonsuz.</b>\n' +
          '\n' +
          "MANAV'ın fiyatı, topluluğun güveni ve etkinliğiyle birlikte artar.",
        media_type: 'photo',
        media_url:
          'uploads/images/tr/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'de',
        block_id: 19,
        text:
          '<b>💰 Wie wird der Token-Preis von MANAV gebildet?</b>\n' +
          '\n' +
          'MANAV ist nicht nur eine Zahl auf einem Chart. Sein Preis spiegelt die tatsächliche Nachfrage und echtes Geld wider, das in das Ökosystem fließt.\n' +
          'Das Volumen der im Umlauf befindlichen Token — wie viele MANAV aktuell bei den Teilnehmern sind — beeinflusst ebenfalls den Preis.\n' +
          '\n' +
          '🔄 <b>Wie funktioniert der Mechanismus?</b>\n' +
          'Jedes Mal, wenn jemand ein Abonnement, eine Karte kauft oder Oracle aktiviert:\n' +
          '\n' +
          '→ <b>20% des Betrags</b> fließen in den Liquiditätspool — einen gemeinsamen Fonds, der durch echtes Geld gedeckt ist\n' +
          '→ <b>Der aktuelle MANAV-Preis = Poolbetrag ÷ Anzahl der im Umlauf befindlichen Token</b>\n' +
          '\n' +
          '📈 Mehr Geld — höherer Preis\n' +
          '📉 Weniger Token ohne neue Käufe — niedrigerer Preis\n' +
          '\n' +
          '<b>Transparent und fair, ohne Manipulationen.</b>\n' +
          '\n' +
          'Der Preis von MANAV wächst mit Vertrauen und Aktivität der Community.',
        media_type: 'photo',
        media_url:
          'uploads/images/de/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'ru',
        block_id: 20,
        text:
          '<b>🎯 Как получить токен MANAV?</b>\n' +
          '\n' +
          'Есть два способа:\n' +
          '\n' +
          '<b>1️⃣ Alliance Key</b> — покупаешь условия, фиксируешь цену, получаешь токены равномерно в течение 20 месяцев после заморозки.\n' +
          '\n' +
          '<b>2️⃣ EARN-программа Альянса</b> — зарабатываешь MANAV через бонусную программу, часть выводимых средств автоматически конвертируется в токен.\n' +
          '\n' +
          'Все награды начисляются в <b>Alliance Balance.</b>\n' +
          'Когда ты делаешь вывод, до <b>40% от суммы</b> автоматически конвертируется в MANAV — по текущей цене.\n' +
          '\n' +
          '🔥 <b>MANAV — держи или продавай в любой момент. Это твоя доля в экосистеме MANAVA.</b>\n' +
          '\n' +
          '💡 <b>Пример:</b>\n' +
          'Ты выводишь $1000 → $400 уходит в ликвидность →\n' +
          'На эти $400 создаётся объём MANAV по текущему курсу →\n' +
          'Ты получаешь токен и можешь продать его в любой момент',
        media_type: 'photo',
        media_url:
          'uploads/images/ru/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'ua',
        block_id: 20,
        text:
          '<b>🎯 Як отримати токен MANAV?</b>\n' +
          '\n' +
          'Є два способи:\n' +
          '\n' +
          '<b>1️⃣ Alliance Key</b> — купуєш умови, фіксуєш ціну, отримуєш токени рівномірно протягом 20 місяців після заморозки.\n' +
          '\n' +
          '<b>2️⃣ EARN-програма Альянсу</b> — заробляєш MANAV через бонусну програму, частина виведених коштів автоматично конвертується у токен.\n' +
          '\n' +
          'Всі нагороди нараховуються в <b>Alliance Balance.</b>\n' +
          'Коли ти робиш виведення, до <b>40% від суми</b> автоматично конвертується у MANAV — за поточною ціною.\n' +
          '\n' +
          '🔥 <b>MANAV — тримай або продавай у будь-який момент. Це твоя частка в екосистемі MANAVA.</b>\n' +
          '\n' +
          '💡 <b>Приклад:</b>\n' +
          'Ти виводиш $1000 → $400 йде у ліквідність →\n' +
          'На ці $400 створюється обсяг MANAV за поточним курсом →\n' +
          'Ти отримуєш токен і можеш продати його у будь-який момент',
        media_type: 'photo',
        media_url:
          'uploads/images/ua/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'en',
        block_id: 20,
        text:
          '<b>🎯 How to get MANAV tokens?</b>\n' +
          '\n' +
          'There are two ways:\n' +
          '\n' +
          '<b>1️⃣ Alliance Key</b> — buy under the conditions, lock in the price, and receive tokens evenly over 20 months after freezing.\n' +
          '\n' +
          '<b>2️⃣ Alliance EARN program</b> — earn MANAV through a bonus system, part of the withdrawal is automatically converted into tokens.\n' +
          '\n' +
          'All rewards are credited to <b>Alliance Balance.</b>\n' +
          'When you withdraw, up to <b>40% of the amount</b> is automatically converted into MANAV at the current rate.\n' +
          '\n' +
          "🔥 <b>MANAV — hold or sell at any moment. It's your share in the MANAVA ecosystem.</b>\n" +
          '\n' +
          '💡 <b>Example:</b>\n' +
          'You withdraw $1000 → $400 goes into liquidity →\n' +
          'This creates a MANAV volume at the current rate →\n' +
          'You receive tokens and can sell them anytime',
        media_type: 'photo',
        media_url:
          'uploads/images/en/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'es',
        block_id: 20,
        text:
          '<b>🎯 ¿Cómo obtener un token MANAV?</b>\n' +
          '\n' +
          'Hay dos maneras:\n' +
          '\n' +
          '<b>1️⃣ Clave de Alianza</b>: compra condiciones, fija el precio y recibe tokens de forma equitativa durante 20 meses tras la congelación.\n' +
          '\n' +
          '<b>2️⃣ Programa EARN de Alianza</b>: gana MANAV a través del programa de bonificación. Parte de los fondos retirados se convierte automáticamente en tokens.\n' +
          '\n' +
          'Todas las recompensas se abonan al <b>Saldo de Alianza.</b>\n' +
          'Al retirar, hasta el <b>40% del importe</b> se convierte automáticamente en MANAV al precio actual.\n' +
          '\n' +
          '🔥 <b>MANAV: puedes conservar o vender en cualquier momento. Esta es tu participación en el ecosistema MANAV.</b>\n' +
          '\n' +
          '💡 <b>Ejemplo:</b>\n' +
          'Retiras $1000 → $400 van a liquidez →\n' +
          'Estos $400 se utilizan para crear volumen de MANAV al tipo de cambio actual →\n' +
          'Recibes un token y puedes venderlo en cualquier momento',
        media_type: 'photo',
        media_url:
          'uploads/images/es/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'tr',
        block_id: 20,
        text:
          '<b>🎯 MANAV tokenı nasıl alınır?</b>\n' +
          '\n' +
          'İki yol vardır:\n' +
          '\n' +
          '<b>1️⃣ İttifak Anahtarı</b> — satın alma koşulları, fiyatı sabitleme, dondurulduktan sonra 20 ay boyunca tokenları eşit olarak alma.\n' +
          '\n' +
          '<b>2️⃣ İttifak EARN programı</b> — bonus programı aracılığıyla MANAV kazanın, çekilen fonların bir kısmı otomatik olarak tokena dönüştürülür.\n' +
          '\n' +
          'Tüm ödüller <b>İttifak Bakiyesine</b> yatırılır.\n' +
          "Çekim yaptığınızda, tutarın <b>%40'ına kadarı</b> otomatik olarak mevcut fiyattan MANAV'a dönüştürülür.\n" +
          '\n' +
          '🔥 <b>MANAV — istediğiniz zaman tutun veya satın. Bu, MANAVA ekosistemindeki payınızdır.</b>\n' +
          '\n' +
          '💡 <b>Örnek:</b>\n' +
          '1.000$ çekersiniz → 400$ likiditeye gider →\n' +
          'Bu 400$, mevcut kurdan MANAV hacmi oluşturmak için kullanılır →\n' +
          'Bir token alırsınız ve istediğiniz zaman satabilirsiniz',
        media_type: 'photo',
        media_url:
          'uploads/images/tr/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'de',
        block_id: 20,
        text:
          '<b>🎯 Wie erhält man MANAV-Token?</b>\n' +
          '\n' +
          'Es gibt zwei Wege:\n' +
          '\n' +
          '<b>1️⃣ Alliance Key</b> — kaufe unter den Bedingungen, sichere dir den Preis, und erhalte die Token gleichmäßig über 20 Monate nach der Sperrzeit.\n' +
          '\n' +
          '<b>2️⃣ EARN-Programm der Alliance</b> — verdiene MANAV durch ein Bonus-System, ein Teil der Auszahlungen wird automatisch in Token umgewandelt.\n' +
          '\n' +
          'Alle Belohnungen werden auf das <b>Alliance-Guthaben</b> gutgeschrieben.\n' +
          'Beim Auszahlen werden bis zu <b>40% des Betrags</b> automatisch zum aktuellen Kurs in MANAV umgewandelt.\n' +
          '\n' +
          '🔥 <b>MANAV — halte sie oder verkaufe sie jederzeit. Es ist dein Anteil am MANAVA-Ökosystem.</b>\n' +
          '\n' +
          '💡 <b>Beispiel:</b>\n' +
          'Du ziehst $1000 ab → $400 fließen in die Liquidität →\n' +
          'Dies schafft ein Volumen an MANAV zum aktuellen Kurs →\n' +
          'Du erhältst Token und kannst sie jederzeit verkaufen',
        media_type: 'photo',
        media_url:
          'uploads/images/de/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },

      {
        language: 'ru',
        block_id: 21,
        text:
          '<b>🔄 Как продать токен MANAV?</b>\n' +
          '\n' +
          'Хочешь продать свои MANAV — без проблем. Сделать это можно в два клика через встроенный пул ликвидности.\n' +
          '\n' +
          '📌 <b>Как проходит продажа:</b>\n' +
          '• Ты отправляешь токены в ликвидный пул\n' +
          '• Получаешь обратно деньги (в USDT/USDC) — за вычетом <b>20% комиссии</b>\n' +
          '• Эти 20% остаются в пуле — тем самым повышают цену для остальных\n' +
          '\n' +
          '💡 <b>Комиссия 20% — это не штраф, а умный механизм.</b>\n' +
          '\n' +
          'Этот механизм защищает цену MANAV и усиливает стабильность всей экосистемы.\n' +
          '\n' +
          '<b>Ты выходишь с прибылью — остальные держатели с ростом. Все выигрывают.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/ru/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'ua',
        block_id: 21,
        text:
          '<b>🔄 Як продати токен MANAV?</b>\n' +
          '\n' +
          'Хочеш продати свої MANAV — без проблем. Зробити це можна в два кліки через вбудований пул ліквідності.\n' +
          '\n' +
          '📌 <b>Як проходить продаж:</b>\n' +
          '• Ти відправляєш токени у ліквідний пул\n' +
          '• Отримуєш назад гроші (в USDT/USDC) — за вирахуванням <b>20% комісії</b>\n' +
          '• Ці 20% залишаються в пулі — тим самим підвищуючи ціну для інших\n' +
          '\n' +
          '💡 <b>Комісія 20% — це не штраф, а розумний механізм.</b>\n' +
          '\n' +
          'Цей механізм захищає ціну MANAV і посилює стабільність усієї екосистеми.\n' +
          '\n' +
          '<b>Ти виходиш з прибутком — інші власники з ростом. Всі виграють.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/ua/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'en',
        block_id: 21,
        text:
          '<b>🔄 How to sell a MANAV token?</b>\n' +
          '\n' +
          'Want to sell your MANAV — no problem. You can do it in two clicks through the built-in liquidity pool.\n' +
          '\n' +
          '📌 <b>How the sale works:</b>\n' +
          '• You send tokens to the liquid pool\n' +
          '• You get your money back (in USDT/USDC) — minus a <b>20% commission</b>\n' +
          '• These 20% remain in the pool — thereby increasing the price for others\n' +
          '\n' +
          '💡 <b>The 20% commission is not a penalty, but a smart mechanism.</b>\n' +
          '\n' +
          'This mechanism protects the MANAV price and increases the stability of the entire ecosystem.\n' +
          '\n' +
          '<b>You leave with a profit — other holders with growth. Everyone wins.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/en/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'es',
        block_id: 21,
        text:
          '<b>🔄 ¿Cómo vender un token MANAV?</b>\n' +
          '\n' +
          '¿Quieres vender tus MANAV? No hay problema. Puedes hacerlo en dos clics a través del fondo de liquidez integrado.\n' +
          '\n' +
          '📌 <b>Cómo funciona la venta:</b>\n' +
          '• Envías tokens al fondo de liquidez\n' +
          '• Recuperas tu dinero (en USDT/USDC), menos una <b>comisión del 20%</b>\n' +
          '• Este 20% permanece en el fondo, lo que aumenta el precio del resto\n' +
          '\n' +
          '💡 <b>La comisión del 20% no es una penalización, sino un mecanismo inteligente.</b>\n' +
          '\n' +
          'Este mecanismo protege el precio de MANAV y mejora la estabilidad de todo el ecosistema.\n' +
          '\n' +
          '<b>Tú obtienes una ganancia y los demás titulares, un crecimiento. Todos ganan.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/es/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'tr',
        block_id: 21,
        text:
          '<b>🔄 MANAV tokenı nasıl satılır?</b>\n' +
          '\n' +
          "MANAV'ınızı satmak mı istiyorsunuz? Hiç sorun değil. Dahili likidite havuzunu kullanarak iki tıklamayla bunu yapabilirsiniz.\n" +
          '\n' +
          '📌 <b>Satış nasıl çalışır:</b>\n' +
          '• Tokenları likit havuza gönderirsiniz\n' +
          '• Paranızı geri alırsınız (USDT/USDC cinsinden) - <b>%20 komisyon</b> düşülür\n' +
          '• Bu 20% havuzda kalır ve böylece geri kalanının fiyatı artar\n' +
          '\n' +
          '💡 <b>%20 komisyon bir ceza değil, akıllı bir mekanizmadır.</b>\n' +
          '\n' +
          "Bu mekanizma MANAV'ın fiyatını korur ve tüm ekosistemin istikrarını artırır.\n" +
          '\n' +
          '<b>Siz kârla, diğer sahipler ise büyümeyle ayrılır. Herkes kazanır.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/tr/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'de',
        block_id: 21,
        text:
          '<b>🔄 Wie verkaufe ich einen MANAV-Token?</b>\n' +
          '\n' +
          'Möchtest du deine MANAV verkaufen? Kein Problem. Mit nur zwei Klicks über den integrierten Liquiditätspool.\n' +
          '\n' +
          '📌 <b>So funktioniert der Verkauf:</b>\n' +
          '• Du sendest Token in den Liquiditätspool\n' +
          '• Du erhältst dein Geld zurück (in USDT/USDC) — abzüglich einer <b>Provision von 20%</b>\n' +
          '• Diese 20% verbleiben im Pool und erhöhen so den Preis für andere\n' +
          '\n' +
          '💡 <b>Die Provision von 20% ist keine Strafe, sondern ein intelligenter Mechanismus.</b>\n' +
          '\n' +
          'Dieser Mechanismus schützt den MANAV-Preis und erhöht die Stabilität des gesamten Ökosystems.\n' +
          '\n' +
          '<b>Du gehst mit einem Gewinn — andere Inhaber mit Wachstum. Alle gewinnen.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/de/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },

      {
        language: 'ru',
        block_id: 22,
        text:
          '<b>🔑 Oracle — ключ к EARN Alliance</b>\n' +
          '\n' +
          'Oracle — это подписка, которая открывает тебе доступ к <b>38% экономики MANAVA,</b> распределяемой через систему EARN.\n' +
          '\n' +
          '<b>Что даёт Oracle:</b>\n' +
          '\n' +
          '🔹 <b>Доступ к 21-уровневой бонусной системе</b>\n' +
          'Ты зарабатываешь вместе с каждым участником в своей цепочке.\n' +
          '\n' +
          '🔹 <b>Профессиональная аналитика и инструменты роста</b>\n' +
          'Отслеживай свою структуру, эффективность и масштабируй доход.\n' +
          '\n' +
          '🔹 <b>Участие в глобальной модели распределения</b>\n' +
          'Только с Oracle ты получаешь % от всей выручки MANAVA.\n' +
          '\n' +
          '💰 <b>Стоимость подписки:</b>\n' +
          '• 10 NAVA / месяц\n' +
          '• или 100 NAVA / год (выгода — 20%)\n' +
          '\n' +
          '<b>Хочешь зарабатывать на росте всей системы? Начни с активации Oracle.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/ru/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'ua',
        block_id: 22,
        text:
          '<b>🔑 Oracle — ключ до EARN Alliance</b>\n' +
          '\n' +
          'Oracle — це підписка, яка відкриває тобі доступ до <b>38% економіки MANAVA,</b> що розподіляється через систему EARN.\n' +
          '\n' +
          '<b>Що дає Oracle:</b>\n' +
          '\n' +
          '🔹 <b>Доступ до 21-рівневої бонусної системи</b>\n' +
          'Ти заробляєш разом із кожним учасником у своєму ланцюжку.\n' +
          '\n' +
          '🔹 <b>Професійна аналітика та інструменти зростання</b>\n' +
          'Відслідковуй свою структуру, ефективність та масштабуй дохід.\n' +
          '\n' +
          '🔹 <b>Участь у глобальній моделі розподілу</b>\n' +
          'Тільки з Oracle ти отримуєш % від усієї виручки MANAVA.\n' +
          '\n' +
          '💰 <b>Вартість підписки:</b>\n' +
          '• 10 NAVA / місяць\n' +
          '• або 100 NAVA / рік (вигода — 20%)\n' +
          '\n' +
          '<b>Хочеш заробляти на зростанні всієї системи? Почни з активації Oracle.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/ua/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'en',
        block_id: 22,
        text:
          '<b>🔑 Oracle — the key to EARN Alliance</b>\n' +
          '\n' +
          'Oracle is a subscription that gives you access to <b>38% of the MANAVA economy</b> distributed through the EARN system.\n' +
          '\n' +
          '<b>What Oracle gives:</b>\n' +
          '\n' +
          '🔹 <b>Access to a 21-level bonus system</b>\n' +
          'You earn together with each participant in your chain.\n' +
          '\n' +
          '🔹 <b>Professional analytics and growth tools</b>\n' +
          'Track your structure, efficiency and scale your income.\n' +
          '\n' +
          '🔹 <b>Participation in the global distribution model</b>\n' +
          'Only with Oracle you receive % of all MANAVA revenue.\n' +
          '\n' +
          '💰 <b>Subscription cost:</b>\n' +
          '• 10 NAVA / month\n' +
          '• or 100 NAVA / year (20% savings)\n' +
          '\n' +
          '<b>Want to earn on the growth of the entire system? Start by activating Oracle.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/en/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'es',
        block_id: 22,
        text:
          '<b>🔑 Oracle: la clave para la Alianza EARN</b>\n' +
          '\n' +
          'Oracle es una suscripción que te da acceso al <b>38% de la economía de MANAVA,</b> distribuida a través del sistema EARN.\n' +
          '\n' +
          '<b>Lo que Oracle ofrece:</b>\n' +
          '\n' +
          '🔹 <b>Acceso a un sistema de bonificación de 21 niveles</b>\n' +
          'Gana junto con cada participante de tu cadena.\n' +
          '\n' +
          '🔹 <b>Herramientas profesionales de análisis y crecimiento</b>\n' +
          'Monitorea tu estructura, eficiencia y escala tus ingresos.\n' +
          '\n' +
          '🔹 <b>Participación en el modelo de distribución global</b>\n' +
          'Solo con Oracle recibes el % de todos los ingresos de MANAVA.\n' +
          '\n' +
          '💰 <b>Costo de la suscripción:</b>\n' +
          '• 10 NAVA al mes\n' +
          '• o 100 NAVA al año (beneficio - 20%)\n' +
          '\n' +
          '<b>¿Quieres ganar con el crecimiento de todo el sistema? Empieza por activar Oracle.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/es/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'tr',
        block_id: 22,
        text:
          "<b>🔑 Oracle — EARN İttifakı'nın anahtarı</b>\n" +
          '\n' +
          "Oracle, EARN sistemi aracılığıyla dağıtılan <b>MANAVA ekonomisinin %38'ine</b> erişmenizi sağlayan bir aboneliktir.\n" +
          '\n' +
          "<b>Oracle'ın sundukları:</b>\n" +
          '\n' +
          '🔹 <b>21 seviyeli bir bonus sistemine erişim</b>\n' +
          'Zincirinizdeki her katılımcıyla birlikte kazanırsınız.\n' +
          '\n' +
          '🔹 <b>Profesyonel analiz ve büyüme araçları</b>\n' +
          'Yapınızı, verimliliğinizi takip edin ve gelirinizi ölçeklendirin.\n' +
          '\n' +
          '🔹 <b>Küresel dağıtım modeline katılım</b>\n' +
          "Yalnızca Oracle ile tüm MANAVA gelirinin %'sini alırsınız.\n" +
          '\n' +
          '💰 <b>Abonelik ücreti:</b>\n' +
          '• 10 NAVA / ay\n' +
          '• veya 100 NAVA / yıl (fayda - %20)\n' +
          '\n' +
          "<b>Tüm sistemin büyümesinden kazanmak ister misiniz? Oracle'ı etkinleştirerek başlayın.</b>",
        media_type: 'photo',
        media_url:
          'uploads/images/tr/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'de',
        block_id: 22,
        text:
          '<b>🔑 Oracle — der Schlüssel zur EARN Alliance</b>\n' +
          '\n' +
          'Oracle ist ein Abonnement, das dir Zugang zu <b>38% des MANAVA-Umsatzes</b> gewährt, der über das EARN-System verteilt wird.\n' +
          '\n' +
          '<b>Was Oracle bietet:</b>\n' +
          '\n' +
          '🔹 <b>Zugang zu einem 21-stufigen Bonussystem</b>\n' +
          'Du verdienst gemeinsam mit jedem Teilnehmer in deiner Kette.\n' +
          '\n' +
          '🔹 <b>Professionelle Analyse- und Wachstumstools</b>\n' +
          'Verfolge deine Struktur, Effizienz und skaliere deine Einnahmen.\n' +
          '\n' +
          '🔹 <b>Teilnahme am globalen Vertriebsmodell</b>\n' +
          'Nur mit Oracle erhältst du einen Prozentsatz des gesamten MANAVA-Umsatzes.\n' +
          '\n' +
          '💰 <b>Abonnementkosten:</b>\n' +
          '• 10 NAVA / Monat\n' +
          '• oder 100 NAVA / Jahr (Vorteil: 20%)\n' +
          '\n' +
          '<b>Möchtest du am Wachstum des gesamten Systems verdienen? Aktiviere Oracle.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/de/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },

      {
        language: 'ru',
        block_id: 23,
        text:
          '<b>📊 Core Alliance — твой % в MANAVA навсегда</b>\n' +
          '\n' +
          'Core Alliance — это система пожизненного дохода для тех, кто помогает развивать MANAVA.\n' +
          '<b>7 пулов, каждый получает 1% от всей выручки проекта.</b>\n' +
          '\n' +
          '<b>Только при активированном Oracle начинается баланс в Core Alliance!</b>\n' +
          '\n' +
          '🔍 <b>Как это работает:</b>\n' +
          '🔹 <b>7 пулов = 7%</b> от общего оборота\n' +
          '🔹 Каждый пул — это <b>1% дохода</b> всей MANAVA\n' +
          '🔹 Выполняешь условия активности — заходишь в один из пулов\n' +
          '🔹 Доход делится поровну между всеми участниками пула\n' +
          '🔹 <b>Твои достижения накапливаются</b> — новые входы не обнуляют предыдущие\n' +
          '\n' +
          '💡 <b>Ты в пуле — значит, ты получаешь долю, пока активен.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/ru/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'ua',
        block_id: 23,
        text:
          '<b>📊 Core Alliance — твій % у MANAVA назавжди</b>\n' +
          '\n' +
          'Core Alliance — це система довічного доходу для тих, хто допомагає розвивати MANAVA.\n' +
          '<b>7 пулів, кожен отримує 1% від усієї виручки проекту.</b>\n' +
          '\n' +
          '<b>Тільки при активованому Oracle починається баланс у Core Alliance!</b>\n' +
          '\n' +
          '🔍 <b>Як це працює:</b>\n' +
          '🔹 <b>7 пулів = 7%</b> від загального обороту\n' +
          '🔹 Кожен пул — це <b>1% доходу</b> всієї MANAVA\n' +
          '🔹 Виконуєш умови активності — заходиш в один із пулів\n' +
          '🔹 Дохід ділиться порівну між усіма учасниками пулу\n' +
          '🔹 <b>Твої досягнення накопичуються</b> — нові входи не обнулюють попередні\n' +
          '\n' +
          '💡 <b>Ти в пулі — значить, ти отримуєш частку, поки активний.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/ua/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'en',
        block_id: 23,
        text:
          '<b>📊 Core Alliance — your % in MANAVA forever</b>\n' +
          '\n' +
          'Core Alliance is a system of lifetime income for those who help develop MANAVA.\n' +
          "<b>7 pools, each receiving 1% of the project's total revenue.</b>\n" +
          '\n' +
          '<b>Only with activated Oracle does the balance in Core Alliance begin!</b>\n' +
          '\n' +
          '🔍 <b>How it works:</b>\n' +
          '🔹 <b>7 pools = 7%</b> of the total turnover\n' +
          '🔹 Each pool is <b>1% of the income</b> of the entire MANAVA\n' +
          '🔹 Fulfill the activity conditions — enter one of the pools\n' +
          '🔹 The income is divided equally between all pool participants\n' +
          '🔹 <b>Your achievements accumulate</b> — new entries do not reset the previous ones\n' +
          '\n' +
          '💡 <b>You are in the pool — this means you get a share while you are active.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/en/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'es',
        block_id: 23,
        text:
          '<b>📊 Core Alliance: tu % en MANAVA para siempre</b>\n' +
          '\n' +
          'Core Alliance es un sistema de ingresos de por vida para quienes ayudan a desarrollar MANAVA.\n' +
          '<b>7 fondos, cada uno recibe el 1% de los ingresos totales del proyecto.</b>\n' +
          '\n' +
          '<b>¡Solo cuando se activa Oracle, comienza el saldo en Core Alliance!</b>\n' +
          '\n' +
          '🔍 <b>Cómo funciona:</b>\n' +
          '🔹 <b>7 grupos = 7%</b> de la facturación total\n' +
          '🔹 Cada grupo representa el <b>1% de los ingresos</b> de todo el MANAVA\n' +
          '🔹 Cumple las condiciones de la actividad: participa en uno de los grupos\n' +
          '🔹 Los ingresos se dividen equitativamente entre todos los miembros del grupo\n' +
          '🔹 <b>Tus logros se acumulan</b>: las nuevas participaciones no reinician las anteriores\n' +
          '\n' +
          '💡 <b>Estás en el grupo, lo que significa que recibes una parte mientras estás activo.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/es/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'tr',
        block_id: 23,
        text:
          "<b>📊 Core Alliance — MANAVA'daki %'niz sonsuza dek</b>\n" +
          '\n' +
          "Core Alliance, MANAVA'nın geliştirilmesine yardımcı olanlar için ömür boyu gelir sağlayan bir sistemdir.\n" +
          "<b>Her biri projenin toplam gelirinin %1'ini alan 7 havuz.</b>\n" +
          '\n' +
          "<b>Oracle etkinleştirildiğinde Core Alliance'daki bakiye başlar!</b>\n" +
          '\n' +
          '🔍 <b>Nasıl çalışır:</b>\n' +
          "🔹 <b>7 havuz = toplam cironun %7'si</b>\n" +
          "🔹 Her havuz, tüm MANAVA'nın <b>gelirinin %1'idir</b>\n" +
          '🔹 Etkinlik koşullarını yerine getirin — havuzlardan birine girin\n' +
          '🔹 Gelir, tüm havuz üyeleri arasında eşit olarak bölünür\n' +
          '🔹 <b>Başarılarınız birikir</b> — yeni katılımlar öncekileri sıfırlamaz\n' +
          '\n' +
          '💡 <b>Havuzdasınız — bu, aktif olduğunuz sürece bir pay alacağınız anlamına gelir.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/tr/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'de',
        block_id: 23,
        text:
          '<b>📊 Core Alliance — dein MANAVA-Anteil für immer</b>\n' +
          '\n' +
          'Core Alliance ist ein System mit lebenslangem Einkommen für alle, die MANAVA entwickeln.\n' +
          '<b>7 Pools, die jeweils 1% des Gesamtumsatzes des Projekts erhalten.</b>\n' +
          '\n' +
          '<b>Erst mit aktiviertem Oracle beginnt das Guthaben in der Core Alliance!</b>\n' +
          '\n' +
          '🔍 <b>So funktioniert es:</b>\n' +
          '🔹 <b>7 Pools = 7%</b> des Gesamtumsatzes\n' +
          '🔹 Jeder Pool entspricht <b>1% des gesamten MANAVA-Ertrags</b>\n' +
          '🔹 Erfülle die Aktivitätsbedingungen — trete einem der Pools bei\n' +
          '🔹 Der Ertrag wird gleichmäßig unter allen Pool-Teilnehmern aufgeteilt\n' +
          '🔹 <b>Deine Erfolge werden akkumuliert</b> — neue Einträge setzen die vorherigen nicht zurück\n' +
          '\n' +
          '💡 <b>Du bist im Pool — das heißt, du erhältst einen Anteil, solange du aktiv bist.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/de/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },

      {
        language: 'ru',
        block_id: 24,
        text:
          '<b>🏆 Топ участники Альянса</b>\n' +
          '\n' +
          'Это не просто таблица с рандомными юзерами. Это список тех, кто вовремя принял решение и теперь видит результат.\n' +
          '\n' +
          'Они активировали Oracle, включились в процесс и начали зарабатывать.\n' +
          '\n' +
          '💸 <b>Общий заработок: 667,157+ NAVA</b>\n' +
          'И с каждым днём он продолжает расти.\n' +
          '\n' +
          '👊 <b>Здесь нет начальников, нет границ.</b>\n' +
          'Есть только ты, твоя команда и действия, которые приносят результат.\n' +
          '\n' +
          '<b>Мы создаём новое пространство, где ценится вклад. Присоединяйся и забери своё.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/ru/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'ua',
        block_id: 24,
        text:
          '<b>🏆 Топ учасники Альянсу</b>\n' +
          '\n' +
          'Це не просто таблиця з рандомними користувачами. Це перелік тих, хто вчасно прийняв рішення і тепер бачить результат.\n' +
          '\n' +
          'Вони активували Oracle, включилися в процес і почали заробляти.\n' +
          '\n' +
          '💸 <b>Загальний заробіток: 667,157+ NAVA</b>\n' +
          'І з кожним днем він продовжує зростати.\n' +
          '\n' +
          '👊 <b>Тут немає начальників, немає кордонів.</b>\n' +
          'Є тільки ти, твоя команда та дії, які приносять результат.\n' +
          '\n' +
          '<b>Ми створюємо новий простір, де цінується внесок. Приєднуйся і забери своє.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/ua/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'en',
        block_id: 24,
        text:
          '<b>🏆 Top Alliance participants</b>\n' +
          '\n' +
          'This is not just a table with random users. This is a list of those who made a decision in time and now see the result.\n' +
          '\n' +
          'They activated Oracle, joined the process and started earning.\n' +
          '\n' +
          '💸 <b>Total earnings: 667,157+ NAVA</b>\n' +
          'And it continues to grow every day.\n' +
          '\n' +
          '👊 <b>There are no bosses, no boundaries.</b>\n' +
          'There is only you, your team and actions that bring results.\n' +
          '\n' +
          '<b>We are creating a new space where contribution is valued. Join and take yours.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/en/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'es',
        block_id: 24,
        text:
          '<b>🏆 Miembros principales de la Alianza</b>\n' +
          '\n' +
          'Esta no es solo una tabla con usuarios aleatorios. Es una lista de quienes tomaron una decisión a tiempo y ahora ven el resultado.\n' +
          '\n' +
          'Activaron Oracle, se involucraron en el proceso y comenzaron a ganar.\n' +
          '\n' +
          '💸 <b>Ganancias totales: +667,157 NAVA</b>\n' +
          'Y sigue creciendo cada día.\n' +
          '\n' +
          '👊 <b>No hay jefes ni límites.</b>\n' +
          'Solo estás tú, tu equipo y tus acciones que dan resultados.\n' +
          '\n' +
          '<b>Estamos creando un nuevo espacio donde se valora la contribución. ¡Únete y hazte con la tuya!</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/es/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'tr',
        block_id: 24,
        text:
          '<b>🏆 En İyi İttifak üyeleri</b>\n' +
          '\n' +
          'Bu, rastgele kullanıcıların bulunduğu bir tablo değil. Bu, zamanında karar veren ve şimdi sonucu görenlerin bir listesi.\n' +
          '\n' +
          "Oracle'ı etkinleştirdiler, sürece dahil oldular ve kazanmaya başladılar.\n" +
          '\n' +
          '💸 <b>Toplam kazanç: 667.157+ NAVA</b>\n' +
          'Ve her geçen gün büyümeye devam ediyor.\n' +
          '\n' +
          '👊 <b>Patron yok, sınır yok.</b>\n' +
          'Sadece siz, ekibiniz ve sonuç getiren eylemler var.\n' +
          '\n' +
          '<b>Katkıların değer gördüğü yeni bir alan yaratıyoruz. Bize katılın ve siz de katkınızı yapın!</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/tr/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'de',
        block_id: 24,
        text:
          '<b>🏆 Top-Allianz-Teilnehmer</b>\n' +
          '\n' +
          'Dies ist nicht nur eine Tabelle mit zufällig ausgewählten Benutzern. Dies ist eine Liste derjenigen, die rechtzeitig eine Entscheidung getroffen haben und nun das Ergebnis sehen.\n' +
          '\n' +
          'Sie haben Oracle aktiviert, sich dem Prozess angeschlossen und angefangen zu verdienen.\n' +
          '\n' +
          '💸 <b>Gesamtertrag: 667.157+ NAVA</b>\n' +
          'Und er wächst täglich weiter.\n' +
          '\n' +
          '👊 <b>Es gibt keine Chefs, keine Grenzen.</b>\n' +
          'Es gibt nur dich, dein Team und Aktionen, die Ergebnisse bringen.\n' +
          '\n' +
          '<b>Wir schaffen einen neuen Raum, in dem jeder Beitrag geschätzt wird. Mach mit und leiste deinen Beitrag!</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/de/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },

      {
        language: 'ru',
        block_id: 25,
        text:
          '<b>🎮 MANAVA — не просто игры, а платформа, где ты зарабатываешь скиллом</b>\n' +
          '\n' +
          '<b>С первых минут ты получаешь:</b>\n' +
          '\n' +
          '💸 <b>Скилл-матчи и турниры</b>\n' +
          'Играй, побеждай и сразу получай деньги на свой баланс — без ожидания, без лишних действий.\n' +
          '\n' +
          '🔥 <b>Первые топовые игры уже здесь</b>\n' +
          'CS2, SWAG — просто заходи под своим аккаунтом и играй как обычно, но теперь с возможностью зарабатывать.\n' +
          'Честная система без читов и мошенничества — всё под контролем!\n' +
          '\n' +
          '💳 <b>Игровой аккаунт и кошелёк — в одном месте</b>\n' +
          'Один логин — всё как на ладони: статистика, баланс и твоя ManavaVisa карта, с которой можно тратить по всему миру.\n' +
          '<b>Победил — вывел — потратил.</b>\n' +
          '\n' +
          '👾 <b>Комьюнити, которое помогает</b>\n' +
          'Живое сообщество игроков, с которым легко найти команду, прокачаться и быть в курсе всего самого важного.\n' +
          '\n' +
          '🚀 <b>MANAVA — это мультивселенная, где твой скилл приносит реальные деньги.</b>\n' +
          '<b>Играй. Зарабатывай. Получай.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/ru/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'ua',
        block_id: 25,
        text:
          '<b>🎮 MANAVA — не просто ігри, а платформа, де ти заробляєш скілом</b>\n' +
          '\n' +
          '<b>З перших хвилин ти отримуєш:</b>\n' +
          '\n' +
          '💸 <b>Скілл-матчі та турніри</b>\n' +
          'Грай, перемагай і одразу отримуй гроші на свій баланс — без очікування, без зайвих дій.\n' +
          '\n' +
          '🔥 <b>Перші топові ігри вже тут</b>\n' +
          'CS2, SWAG — просто заходь під своїм обліковим записом і грай як завжди, але тепер з можливістю заробляти.\n' +
          'Чесна система без читів та шахрайства — все під контролем!\n' +
          '\n' +
          '💳 <b>Ігровий аккаунт і гаманець — в одному місці</b>\n' +
          'Один логін — все як на долоні: статистика, баланс і твоя ManavaVisa карта, з якої можна витрачати по всьому світу.\n' +
          '<b>Переміг — вивів — витратив.</b>\n' +
          '\n' +
          "👾 <b>Ком'юніті, яке допомагає</b>\n" +
          'Жива спільнота гравців, з якою легко знайти команду, прокачатися і бути в курсі всього найважливішого.\n' +
          '\n' +
          '🚀 <b>MANAVA — це мультивсесвіт, де твій скіл приносить реальні гроші.</b>\n' +
          '<b>Грай. Заробляй. Отримуй.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/ua/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'en',
        block_id: 25,
        text:
          '<b>🎮 MANAVA — not just games, but a platform where you earn with skill</b>\n' +
          '\n' +
          '<b>From the first minutes you get:</b>\n' +
          '\n' +
          '💸 <b>Skill matches and tournaments</b>\n' +
          'Play, win and immediately receive money on your balance — without waiting, without unnecessary actions.\n' +
          '\n' +
          '🔥 <b>The first top games are already here</b>\n' +
          'CS2, SWAG — just log in with your account and play as usual, but now with the opportunity to earn.\n' +
          'An honest system without cheats and fraud — everything is under control!\n' +
          '\n' +
          '💳 <b>Game account and wallet — in one place</b>\n' +
          'One login — everything at a glance: statistics, balance and your ManavaVisa card, with which you can spend all over the world.\n' +
          '<b>Win — withdraw — spend.</b>\n' +
          '\n' +
          '👾 <b>Community that helps</b>\n' +
          'A lively community of players, with which it is easy to find a team, level up and stay up to date with everything important.\n' +
          '\n' +
          '🚀 <b>MANAVA is a multiverse where your skill brings real money.</b>\n' +
          '<b>Play. Earn. Get.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/en/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'es',
        block_id: 25,
        text:
          '<b>🎮 MANAVA no es solo un juego, sino una plataforma donde ganas con tu habilidad.</b>\n' +
          '\n' +
          '<b>Desde el primer minuto obtienes:</b>\n' +
          '\n' +
          '💸 <b>Partidas de habilidad y torneos</b>\n' +
          'Juega, gana y recibe dinero al instante en tu saldo, sin esperas ni acciones innecesarias.\n' +
          '\n' +
          '🔥 <b>Los primeros juegos top ya están aquí</b>\n' +
          'CS2, SWAG: solo inicia sesión con tu cuenta y juega como siempre, pero ahora con la posibilidad de ganar.\n' +
          '¡Sistema honesto sin trampas ni fraudes: todo bajo control!\n' +
          '\n' +
          '💳 <b>Cuenta de juego y monedero: en un solo lugar</b>\n' +
          'Un solo inicio de sesión: todo de un vistazo: estadísticas, saldo y tu tarjeta ManavaVisa, con la que puedes gastar en todo el mundo.\n' +
          '<b>Gana, retira y gasta.</b>\n' +
          '\n' +
          '👾 <b>Comunidad que ayuda</b>\n' +
          'Una comunidad activa de jugadores con la que es fácil encontrar equipo, subir de nivel y mantenerse al día de todo lo importante.\n' +
          '\n' +
          '🚀 <b>MANAVA es un multiverso, donde tu habilidad genera dinero real.</b>\n' +
          '<b>Juega. Gana. Consigue.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/es/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'tr',
        block_id: 25,
        text:
          '<b>🎮 MANAVA sadece bir oyun değil, beceriyle kazandığınız bir platformdur.</b>\n' +
          '\n' +
          '<b>İlk dakikalardan itibaren şunları elde edersiniz:</b>\n' +
          '\n' +
          '💸 <b>Skill maçları ve turnuvalar</b>\n' +
          'Oynayın, kazanın ve bakiyenize anında para ekleyin - beklemeden, gereksiz eylemler olmadan.\n' +
          '\n' +
          '🔥 <b>İlk en iyi oyunlar burada</b>\n' +
          'CS2, SWAG - hesabınızla giriş yapın ve her zamanki gibi oynayın, ancak artık kazanma olanağıyla.\n' +
          'Hile ve dolandırıcılık içermeyen dürüst bir sistem - her şey kontrol altında!\n' +
          '\n' +
          '💳 <b>Oyun hesabı ve cüzdan - tek bir yerde</b>\n' +
          'Tek giriş - her şey tek bakışta: istatistikler, bakiye ve dünyanın her yerinde harcama yapabileceğiniz ManavaVisa kartınız.\n' +
          '<b>Kazan - çek - harca.</b>\n' +
          '\n' +
          '👾 <b>Yardımsever Topluluk</b>\n' +
          'Bir takım bulmanın, seviye atlamanın ve önemli her şeyden haberdar olmanın kolay olduğu canlı bir oyuncu topluluğu.\n' +
          '\n' +
          '🚀 <b>MANAVA, becerilerinizin gerçek para kazandırdığı bir çoklu evrendir.</b>\n' +
          '<b>Oyna. Kazan. Kazan.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/tr/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'de',
        block_id: 25,
        text:
          '<b>🎮 MANAVA ist nicht nur ein Spiel, sondern eine Plattform, auf der du mit Geschick Geld verdienst.</b>\n' +
          '\n' +
          '<b>Von den ersten Minuten an erhältst du:</b>\n' +
          '\n' +
          '💸 <b>Geschicklichkeitsspiele und Turniere</b>\n' +
          'Spielen, gewinnen und sofort Geld auf dein Guthaben erhalten — ohne Wartezeit, ohne unnötige Aktionen.\n' +
          '\n' +
          '🔥 <b>Die ersten Top-Spiele sind bereits da</b>\n' +
          'CS2, SWAG — einfach mit deinem Konto anmelden und wie gewohnt spielen, jetzt aber mit der Möglichkeit, Geld zu verdienen.\n' +
          'Ein ehrliches System ohne Cheats und Betrug — alles unter Kontrolle!\n' +
          '\n' +
          '💳 <b>Spielkonto und Wallet — an einem Ort</b>\n' +
          'Ein Login — alles auf einen Blick: Statistiken, Guthaben und deine ManavaVisa-Karte, mit der du weltweit Geld ausgeben kannst.\n' +
          '<b>Gewinnen — abheben — ausgeben.</b>\n' +
          '\n' +
          '👾 <b>Community, die hilft</b>\n' +
          'Eine lebendige Spieler-Community, mit der du ganz einfach ein Team findest, aufsteigst und über alles Wichtige auf dem Laufenden bleibst.\n' +
          '\n' +
          '🚀 MANAVA ist ein Multiversum, in dem dein Können echtes Geld einbringt\n' +
          '<b>Spielen. Gewinnen. Erhalten.</b>',
        media_type: 'photo',
        media_url:
          'uploads/images/de/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'ru',
        block_id: 26,
        text: 'MANAVA Социальные сети',
        media_type: 'photo',
        media_url:
          'uploads/images/ru/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'ua',
        block_id: 26,
        text: 'MANAVA Соціальні мережі',
        media_type: 'photo',
        media_url:
          'uploads/images/ua/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'en',
        block_id: 26,
        text: 'MANAVA Social Networks',
        media_type: 'photo',
        media_url:
          'uploads/images/en/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'es',
        block_id: 26,
        text: 'Redes sociales de MANAVA',
        media_type: 'photo',
        media_url:
          'uploads/images/es/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'tr',
        block_id: 26,
        text: 'MANAVA sosyal ağları',
        media_type: 'photo',
        media_url:
          'uploads/images/tr/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'de',
        block_id: 26,
        text: 'MANAVA Soziale Netzwerke',
        media_type: 'photo',
        media_url:
          'uploads/images/de/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'ru',
        block_id: 27,
        text: 'Выберите интересующий вас раздел:',
        media_type: 'photo',
        media_url:
          'uploads/images/ru/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'ua',
        block_id: 27,
        text: 'Виберіть розділ, який вас цікавить:',
        media_type: 'photo',
        media_url:
          'uploads/images/ua/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'en',
        block_id: 27,
        text: 'Select the section you are interested in:',
        media_type: 'photo',
        media_url:
          'uploads/images/en/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'es',
        block_id: 27,
        text: 'Selecciona la sección que te interesa:',
        media_type: 'photo',
        media_url:
          'uploads/images/es/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'tr',
        block_id: 27,
        text: 'İlgilendiğiniz bölümü seçin:',
        media_type: 'photo',
        media_url:
          'uploads/images/tr/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'de',
        block_id: 27,
        text: 'Wählen Sie den Bereich, der Sie interessiert:',
        media_type: 'photo',
        media_url:
          'uploads/images/de/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'ru',
        block_id: 28,
        text:
          '<b>Если вам нужна помощь или у вас есть вопросы по платформе MANAVA, обращайтесь к нашей команде поддержки 👇</b>\n' +
          '\n' +
          '📩 <b>@manava_support</b> — официальный аккаунт нашей команды поддержки.\n' +
          '\n' +
          'Мы оперативно ответим, поможем найти решение и разберемся с любой возникшей проблемой 💬',
        media_type: 'photo',
        media_url:
          'uploads/images/ru/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'ua',
        block_id: 28,
        text:
          '<b>Якщо вам потрібна допомога або виникли питання щодо платформи MANAVA, звертайтесь до нашої служби підтримки 👇</b>\n' +
          '\n' +
          '📩 <b>@manava_support</b> — офіційний обліковий запис нашої служби підтримки.\n' +
          '\n' +
          'Ми оперативно відповімо, допоможемо знайти рішення і розберемося з будь-якою проблемою 💬',
        media_type: 'photo',
        media_url:
          'uploads/images/ua/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'en',
        block_id: 28,
        text:
          '<b>If you need help or have questions regarding the MANAVA platform, please contact our support team 👇</b>\n' +
          '\n' +
          '📩 <b>@manava_support</b> — the official account of our support team.\n' +
          '\n' +
          'We will promptly respond, help you figure it out and solve any problems that arise 💬',
        media_type: 'photo',
        media_url:
          'uploads/images/en/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'es',
        block_id: 28,
        text:
          '<b>Si necesitas ayuda o tienes preguntas sobre la plataforma MANAVA, contacta con nuestro equipo de soporte 👇</b>\n' +
          '\n' +
          '📩 <b>@manava_support</b> es la cuenta oficial de nuestro equipo de soporte.\n' +
          '\n' +
          'Responderemos con prontitud, te ayudaremos a encontrar la solución y resolveremos cualquier problema que surja 💬',
        media_type: 'photo',
        media_url:
          'uploads/images/es/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'tr',
        block_id: 28,
        text:
          '<b>MANAVA platformuyla ilgili yardıma ihtiyacınız varsa veya sorularınız varsa, lütfen destek ekibimizle iletişime geçin 👇</b>\n' +
          '\n' +
          '📩 <b>@manava_support</b>, destek ekibimizin resmi hesabıdır.\n' +
          '\n' +
          'En kısa sürede yanıt vereceğiz, sorununuzu çözmenize yardımcı olacak ve ortaya çıkan sorunları çözeceğiz 💬',
        media_type: 'photo',
        media_url:
          'uploads/images/tr/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
      {
        language: 'de',
        block_id: 28,
        text:
          '<b>Wenn Sie Hilfe benötigen oder Fragen zur MANAVA-Plattform haben, wenden Sie sich bitte an unser Support-Team 👇</b>\n' +
          '\n' +
          '📩 <b>@manava_support</b> ist der offizielle Account unseres Support-Teams.\n' +
          '\n' +
          'Wir antworten Ihnen umgehend, helfen Ihnen bei der Lösung Ihrer Probleme und helfen Ihnen, diese zu lösen 💬',
        media_type: 'photo',
        media_url:
          'uploads/images/de/Visa-карта от Manava  — трать крипту как обычные деньги.jpg',
      },
    ]);

    await queryInterface.bulkInsert('buttons', [
      {
        order: 0,
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: true,
        row_order: 0,
        next_block_id: 3,
        label: '🎮 Play and Earn',
      },
      {
        order: 1,
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 1,
        label: 'Manava Visa Card',
        next_block_id: 13,
      },
      {
        order: 2,
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 1,
        label: 'Alliance',
        next_block_id: 15,
      },
      {
        order: 3,
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 1,
        label: 'Info',
        next_block_id: 25,
      },
      {
        order: 5,
        type: 'callback',
        label: 'Change language',
        keyboard_type: 'reply',
        is_full_width: true,
        row_order: 3,
        next_block_id: 12,
      },
      {
        order: 0,
        label: 'MANAVA APP',
        url: 'https://app.manava.io',
        type: 'web_app',
      },
      {
        order: 0,
        label: 'Games',
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: true,
        row_order: 1,
        next_block_id: 4,
      },
      {
        order: 0,
        type: 'callback',
        label: 'Skill Match',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 2,
        next_block_id: 8,
      },
      {
        order: 0,
        label: 'Tournaments',
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 2,
        next_block_id: 10,
      },
      {
        order: 1,
        label: 'Back to main menu',
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: true,
        row_order: 3,
        next_block_id: 1,
      },
      {
        order: 1,
        label: 'Back to Play and Earn',
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: true,
        row_order: 3,
        next_block_id: 3,
      },
      {
        order: 0,
        label: 'SWAG',
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 1,
        next_block_id: 5,
      },
      {
        order: 1,
        label: 'CS2',
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 1,
        next_block_id: 6,
      },
      {
        order: 2,
        label: 'Jumper',
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 1,
        next_block_id: 7,
      },
      {
        order: 0,
        label: 'Back to Games',
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 3,
        next_block_id: 4,
      },
      {
        order: 0,
        label: 'MANAVA APP',
        url: 'https://app.manava.io',
        type: 'web_app',
        keyboard_type: 'reply',
        is_full_width: true,
        row_order: 3,
      },
      {
        order: 0,
        label: 'Subscription',
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: true,
        row_order: 0,
        next_block_id: 9,
      },
      {
        order: 0,
        label: 'Back to Skill Match',
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: true,
        row_order: 0,
        next_block_id: 8,
      },
      {
        order: 0,
        label: 'How it works?',
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: true,
        row_order: 0,
        next_block_id: 11,
      },
      {
        order: 0,
        label: 'Back to tournaments',
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: true,
        row_order: 0,
        next_block_id: 10,
      },
      {
        order: 0,
        label: 'ENGLISH',
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 0,
        next_block_id: 1,
      },
      {
        order: 0,
        label: 'DE',
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 0,
        next_block_id: 1,
      },
      {
        order: 0,
        label: 'TUR',
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 0,
        next_block_id: 1,
      },
      {
        order: 0,
        label: 'ES',
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 1,
        next_block_id: 1,
      },
      {
        order: 0,
        label: 'RU',
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 1,
        next_block_id: 1,
      },
      {
        order: 0,
        label: 'UA',
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 1,
        next_block_id: 1,
      },
      {
        order: 0,
        label: 'Как получить карту?',
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: true,
        next_block_id: 14,
      },
      {
        order: 0,
        label: 'Назад к MANAVA VISA',
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: true,
        next_block_id: 13,
      },
      {
        order: 1,
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 1,
        label: 'Alliance Key',
        next_block_id: 16,
      },
      {
        order: 1,
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 1,
        label: 'MANAV',
        next_block_id: 17,
      },
      {
        order: 2,
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: true,
        label: 'Earn Alliance',
        next_block_id: 18,
      },
      {
        order: 2,
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 2,
        label: 'Back to Alliance',
        next_block_id: 15,
      },
      {
        order: 1,
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: true,
        row_order: 1,
        label: 'how alliance form',
        next_block_id: 19,
      },
      {
        order: 2,
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: true,
        row_order: 1,
        label: 'how to get manav',
        next_block_id: 20,
      },
      {
        order: 3,
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: true,
        row_order: 1,
        label: 'how to set manav',
        next_block_id: 21,
      },
      {
        order: 2,
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 1,
        label: 'What is oracle',
        next_block_id: 22,
      },
      {
        order: 2,
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 1,
        label: 'Core Alliance',
        next_block_id: 23,
      },
      {
        order: 2,
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 1,
        label: 'Top Alliance',
        next_block_id: 24,
      },
      {
        order: 2,
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 1,
        label: 'Back to EARN Alliance',
        next_block_id: 18,
      },
      {
        order: 2,
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 1,
        label: 'Back to MANAV',
        next_block_id: 17,
      },

      {
        order: 0,
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: true,
        label: 'Manava Social Networks',
        next_block_id: 26,
      },
      {
        order: 1,
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 2,
        label: 'Presentetions',
      },
      {
        order: 1,
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 2,
        label: 'FAQ',
      },
      {
        order: 2,
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: true,
        label: 'Support',
        next_block_id: 28,
      },
      {
        order: 3,
        is_full_width: false,
        label: 'DiscordCommunity',
        url: 'https://app.manava.io',
        type: 'web_app',
      },

      {
        order: 0,
        is_full_width: true,
        label: 'Basic Questions for begginers',
        type: 'callback',
        keyboard_type: 'inline',
      },
      {
        order: 1,
        is_full_width: true,
        label: 'General Questions',
        type: 'callback',
        keyboard_type: 'inline',
      },
      {
        order: 2,
        is_full_width: true,
        label: 'Questions SWAG',
        type: 'callback',
        keyboard_type: 'inline',
      },
      {
        order: 3,
        is_full_width: true,
        label: 'Questions about income and monetization',
        type: 'callback',
        keyboard_type: 'inline',
      },
      {
        order: 4,
        is_full_width: true,
        label: 'Question about wallet and security',
        type: 'callback',
        keyboard_type: 'inline',
      },
    ]);

    await queryInterface.bulkInsert('buttons_to_blocks', [
      {
        block_id: 1,
        button_id: 1,
      },
      {
        block_id: 1,
        button_id: 2,
      },
      {
        block_id: 1,
        button_id: 3,
      },
      {
        block_id: 1,
        button_id: 4,
      },
      {
        block_id: 1,
        button_id: 5,
      },
      {
        block_id: 2,
        button_id: 6,
      },
      {
        block_id: 3,
        button_id: 7,
      },
      {
        block_id: 3,
        button_id: 8,
      },
      {
        block_id: 3,
        button_id: 9,
      },
      {
        block_id: 3,
        button_id: 10,
      },
      {
        block_id: 3,
        button_id: 16,
        row_order: 2,
        is_full_width: true,
      },
      {
        block_id: 4,
        button_id: 14,
      },
      {
        block_id: 4,
        button_id: 12,
      },
      {
        block_id: 4,
        button_id: 13,
      },
      {
        block_id: 4,
        button_id: 16,
        row_order: 2,
        is_full_width: true,
      },
      {
        block_id: 5,
        button_id: 16,
        row_order: 2,
        is_full_width: true,
      },
      {
        block_id: 6,
        button_id: 16,
        row_order: 2,
        is_full_width: true,
      },
      {
        block_id: 7,
        button_id: 16,
        row_order: 2,
        is_full_width: true,
      },
      {
        block_id: 4,
        button_id: 11,
        row_order: 3,
        is_full_width: false,
      },
      {
        block_id: 4,
        button_id: 10,
        row_order: 3,
        is_full_width: false,
      },

      {
        block_id: 5,
        button_id: 14,
      },
      {
        block_id: 5,
        button_id: 13,
      },
      {
        block_id: 5,
        button_id: 15,
        row_order: 3,
        is_full_width: false,
      },
      {
        block_id: 5,
        button_id: 10,
        row_order: 3,
        is_full_width: false,
      },

      {
        block_id: 6,
        button_id: 14,
      },
      {
        block_id: 6,
        button_id: 12,
      },
      {
        block_id: 6,
        button_id: 15,
        row_order: 3,
        is_full_width: false,
      },
      {
        block_id: 6,
        button_id: 10,
        row_order: 3,
        is_full_width: false,
      },

      {
        block_id: 7,
        button_id: 13,
      },
      {
        block_id: 7,
        button_id: 12,
      },
      {
        block_id: 7,
        button_id: 15,
        row_order: 3,
        is_full_width: false,
      },
      {
        block_id: 7,
        button_id: 10,
        row_order: 3,
        is_full_width: false,
      },
      {
        block_id: 8,
        button_id: 17,
        row_order: 0,
        is_full_width: true,
      },
      {
        block_id: 8,
        button_id: 16,
        row_order: 1,
        is_full_width: true,
      },
      {
        order: 0,
        block_id: 8,
        button_id: 11,
        row_order: 2,
        is_full_width: false,
      },
      {
        order: 1,
        block_id: 8,
        button_id: 10,
        row_order: 2,
        is_full_width: false,
      },

      {
        block_id: 9,
        button_id: 16,
        row_order: 1,
        is_full_width: true,
      },
      {
        order: 0,
        block_id: 9,
        button_id: 18,
        row_order: 2,
        is_full_width: false,
      },
      {
        order: 1,
        block_id: 9,
        button_id: 10,
        row_order: 2,
        is_full_width: false,
      },

      {
        block_id: 10,
        button_id: 19,
        row_order: 1,
        is_full_width: true,
      },
      {
        block_id: 10,
        button_id: 16,
        row_order: 1,
        is_full_width: true,
      },
      {
        order: 0,
        block_id: 10,
        button_id: 11,
        row_order: 2,
        is_full_width: false,
      },
      {
        order: 1,
        block_id: 10,
        button_id: 10,
        row_order: 2,
        is_full_width: false,
      },

      {
        block_id: 11,
        button_id: 16,
        row_order: 1,
        is_full_width: true,
      },
      {
        order: 0,
        block_id: 11,
        button_id: 20,
        row_order: 2,
        is_full_width: false,
      },
      {
        order: 1,
        block_id: 11,
        button_id: 10,
        row_order: 2,
        is_full_width: false,
      },

      {
        button_id: 21,
        block_id: 12,
      },
      {
        button_id: 22,
        block_id: 12,
      },
      {
        button_id: 23,
        block_id: 12,
      },
      {
        button_id: 24,
        block_id: 12,
      },
      {
        button_id: 25,
        block_id: 12,
      },
      {
        button_id: 26,
        block_id: 12,
      },

      {
        block_id: 13,
        button_id: 27,
        row_order: 1,
        is_full_width: true,
      },
      {
        block_id: 13,
        button_id: 16,
        row_order: 1,
        is_full_width: true,
      },
      {
        order: 1,
        block_id: 13,
        button_id: 10,
        is_full_width: true,
      },
      {
        block_id: 14,
        button_id: 16,
        is_full_width: true,
      },
      {
        order: 1,
        block_id: 14,
        button_id: 28,
        row_order: 0,
        is_full_width: false,
      },
      {
        order: 1,
        block_id: 14,
        button_id: 10,
        row_order: 1,
        is_full_width: false,
      },
      {
        order: 0,
        block_id: 15,
        button_id: 29,
        row_order: 1,
        is_full_width: false,
      },
      {
        order: 0,
        block_id: 15,
        button_id: 30,
        row_order: 1,
        is_full_width: false,
      },
      {
        order: 1,
        block_id: 15,
        button_id: 31,
        is_full_width: true,
      },
      {
        order: 1,
        block_id: 15,
        button_id: 10,
        is_full_width: true,
      },

      //
      {
        order: 1,
        block_id: 16,
        button_id: 16,
        is_full_width: true,
      },
      {
        order: 1,
        block_id: 16,
        button_id: 32,
        row_order: 1,
        is_full_width: false,
      },
      {
        order: 1,
        block_id: 16,
        button_id: 10,
        row_order: 1,
        is_full_width: false,
      },

      {
        order: 0,
        block_id: 17,
        button_id: 33,
        is_full_width: true,
      },
      {
        order: 1,
        block_id: 17,
        button_id: 34,
        is_full_width: true,
      },
      {
        order: 2,
        block_id: 17,
        button_id: 35,
        is_full_width: true,
      },
      {
        order: 3,
        block_id: 17,
        button_id: 16,
        is_full_width: true,
      },

      {
        order: 1,
        block_id: 17,
        button_id: 32,
        row_order: 4,
        is_full_width: false,
      },
      {
        order: 2,
        row_order: 4,
        block_id: 17,
        button_id: 10,
        is_full_width: false,
      },

      {
        order: 0,
        block_id: 18,
        button_id: 36,
        is_full_width: true,
      },
      {
        order: 1,
        block_id: 18,
        button_id: 37,
        is_full_width: true,
      },
      {
        order: 2,
        block_id: 18,
        button_id: 38,
        is_full_width: true,
      },
      {
        order: 3,
        block_id: 18,
        button_id: 16,
        is_full_width: true,
      },

      {
        order: 1,
        block_id: 18,
        button_id: 32,
        row_order: 4,
        is_full_width: false,
      },
      {
        order: 2,
        row_order: 4,
        block_id: 18,
        button_id: 10,
        is_full_width: false,
      },
    ]);

    await queryInterface.bulkInsert('button_translations', [
      { button_id: 1, label: '🎮 Play and Earn', language: 'global' },
      { button_id: 1, label: '🎮 Play and Earn', language: 'ru' },
      { button_id: 1, label: '🎮 Play and Earn', language: 'ua' },
      { button_id: 1, label: '🎮 Play and Earn', language: 'en' },
      { button_id: 1, label: '🎮 Juega y Gana', language: 'es' },
      { button_id: 1, label: '🎮 Oyna ve Kazan', language: 'tr' },
      { button_id: 1, label: '🎮 Spielen und Verdienen', language: 'de' },
      { button_id: 2, label: '💳 Карта Visa от Manava', language: 'ru' },
      { button_id: 2, label: '💳 Карта Visa від Manava', language: 'ua' },
      { button_id: 2, label: '💳 Manava Visa Card', language: 'en' },
      { button_id: 2, label: '💳 Manava Visa Card', language: 'global' },
      { button_id: 2, label: '💳 Tarjeta Visa de Manava', language: 'es' },
      { button_id: 2, label: "💳 Manava'dan Visa kart", language: 'tr' },
      { button_id: 2, label: '💳 Manava Visa-Karte', language: 'de' },
      { button_id: 3, label: '🛡️ Альянс', language: 'ru' },
      { button_id: 3, label: '🛡️ Альянс', language: 'ua' },
      { button_id: 3, label: '🛡️ Alliance', language: 'en' },
      { button_id: 3, label: '🛡️ Alliance', language: 'global' },
      { button_id: 3, label: '🛡️ Alianza', language: 'es' },
      { button_id: 3, label: '🛡️ İttifak', language: 'tr' },
      { button_id: 3, label: '🛡️ Allianz', language: 'de' },
      { button_id: 4, label: 'ℹ️ Информация', language: 'ru' },
      { button_id: 4, label: 'ℹ️ Інформація', language: 'ua' },
      { button_id: 4, label: 'ℹ️ Info', language: 'en' },
      { button_id: 4, label: 'ℹ️ Info', language: 'global' },
      { button_id: 4, label: 'ℹ️ Información', language: 'es' },
      { button_id: 4, label: 'ℹ️ Bilgi', language: 'tr' },
      { button_id: 4, label: 'ℹ️ Info', language: 'de' },
      { button_id: 5, label: '🌍 Сменить язык', language: 'ru' },
      { button_id: 5, label: '🌍 Змінити мову', language: 'ua' },
      { button_id: 5, label: '🌍 Change Language', language: 'en' },
      { button_id: 5, label: '🌍 Change Language', language: 'global' },
      { button_id: 5, label: '🌍 Cambiar Idioma', language: 'es' },
      { button_id: 5, label: '🌍 Dil Değiştir', language: 'tr' },
      { button_id: 5, label: '🌍 Sprache Ändern', language: 'de' },
      {
        button_id: 6,
        label: '→ MANAVA APP ←',
        language: 'en',
      },
      {
        button_id: 6,
        label: '→ MANAVA APP ←',
        language: 'global',
      },
      {
        button_id: 6,
        label: '→ MANAVA APP ←',
        language: 'ru',
      },
      {
        button_id: 6,
        label: '→ MANAVA APP ←',
        language: 'ua',
      },
      {
        button_id: 6,
        label: '→ MANAVA APP ←',
        language: 'tr',
      },
      {
        button_id: 6,
        label: '→ MANAVA APP ←',
        language: 'es',
      },
      {
        button_id: 6,
        label: '→ MANAVA APP ←',
        language: 'de',
      },

      {
        button_id: 16,
        label: '→ MANAVA APP ←',
        language: 'en',
      },
      {
        button_id: 16,
        label: '→ MANAVA APP ←',
        language: 'ru',
      },
      {
        button_id: 16,
        label: '→ MANAVA APP ←',
        language: 'ua',
      },
      {
        button_id: 16,
        label: '→ MANAVA APP ←',
        language: 'tr',
      },
      {
        button_id: 16,
        label: '→ MANAVA APP ←',
        language: 'es',
      },
      {
        button_id: 16,
        label: '→ MANAVA APP ←',
        language: 'de',
      },

      { button_id: 7, label: '👾 Игры', language: 'ru' },
      { button_id: 7, label: '👾 Ігри', language: 'ua' },
      { button_id: 7, label: 'Games', language: 'en' },
      { button_id: 7, label: 'Juegos', language: 'es' },
      { button_id: 7, label: 'Oyunlar', language: 'tr' },
      { button_id: 7, label: 'Spiele', language: 'de' },
      { button_id: 8, label: '🧠 Skill Матч', language: 'ru' },
      { button_id: 8, label: '🧠 Skill Матч', language: 'ua' },
      { button_id: 8, label: '🧠 Skill Match', language: 'en' },
      { button_id: 8, label: '🧠 Skill Match', language: 'es' },
      { button_id: 8, label: '🧠 Skill Match', language: 'tr' },
      { button_id: 8, label: '🧠 Skill Match', language: 'de' },
      { button_id: 9, label: '🏆 Турниры', language: 'ru' },
      { button_id: 9, label: '🏆 Турніри', language: 'ua' },
      { button_id: 9, label: 'Tournaments', language: 'en' },
      { button_id: 9, label: 'Torneos', language: 'es' },
      { button_id: 9, label: 'Turnuvalar', language: 'tr' },
      { button_id: 9, label: 'Turniere', language: 'de' },
      { button_id: 10, label: '🔙 В главное меню', language: 'ru' },
      { button_id: 10, label: '🔙 У головне меню', language: 'ua' },
      { button_id: 10, label: '🔙 Back to Main Menu', language: 'en' },
      { button_id: 10, label: '🔙 Ir al menú principal', language: 'es' },
      { button_id: 10, label: '🔙 Ana menüye', language: 'tr' },
      { button_id: 10, label: '🔙 Zum Hauptmenü', language: 'de' },
      {
        button_id: 11,
        label: '🔙 Вернуться в Play and Earn',
        language: 'ru',
      },
      {
        button_id: 11,
        label: '🔙 Повернутися у Play and Earn',
        language: 'ua',
      },
      { button_id: 11, label: '🔙 Back to Play and Earn', language: 'en' },
      { button_id: 11, label: '🔙 Regresa a Jugar y Gana', language: 'es' },
      { button_id: 11, label: '🔙 Oynamaya Dön ve Kazan', language: 'tr' },
      {
        button_id: 11,
        label: '🔙 Zurück zu Spielen und Verdienen',
        language: 'de',
      },
      { button_id: 12, label: 'SWAG', language: 'ru' },
      { button_id: 12, label: 'SWAG', language: 'ua' },
      { button_id: 12, label: 'SWAG', language: 'en' },
      { button_id: 12, label: 'SWAG', language: 'es' },
      { button_id: 12, label: 'SWAG', language: 'tr' },
      { button_id: 12, label: 'SWAG', language: 'de' },
      { button_id: 13, label: 'CS2', language: 'ru' },
      { button_id: 13, label: 'CS2', language: 'ua' },
      { button_id: 13, label: 'CS2', language: 'en' },
      { button_id: 13, label: 'CS2', language: 'es' },
      { button_id: 13, label: 'CS2', language: 'tr' },
      { button_id: 13, label: 'CS2', language: 'de' },
      { button_id: 14, label: 'Jumper', language: 'ru' },
      { button_id: 14, label: 'Jumper', language: 'ua' },
      { button_id: 14, label: 'Jumper', language: 'en' },
      { button_id: 14, label: 'Jumper', language: 'es' },
      { button_id: 14, label: 'Jumper', language: 'tr' },
      { button_id: 14, label: 'Jumper', language: 'de' },
      { button_id: 15, label: '🔙 Вернуться к играм', language: 'ru' },
      { button_id: 15, label: '🔙 Повернутися до ігор', language: 'ua' },
      { button_id: 15, label: '🔙 Back to Games', language: 'en' },
      { button_id: 15, label: '🔙 Volver a los juegos', language: 'es' },
      { button_id: 15, label: '🔙 Oyunlara dön', language: 'tr' },
      { button_id: 15, label: '🔙 Zurück zu den Spielen', language: 'de' },
      { button_id: 17, label: 'Подписки', language: 'ru' },
      { button_id: 17, label: 'Підписки', language: 'ua' },
      { button_id: 17, label: 'Subscriptions', language: 'en' },
      { button_id: 17, label: 'Suscripciones', language: 'es' },
      { button_id: 17, label: 'Abonelikler', language: 'tr' },
      { button_id: 17, label: 'Abonnements', language: 'de' },
      { button_id: 18, label: '🔙 Вернуться в Skill Матч', language: 'ru' },
      {
        button_id: 18,
        label: '🔙 Повернутися у Skill Матч',
        language: 'ua',
      },
      { button_id: 18, label: '🔙 Back to Skill Match', language: 'en' },
      { button_id: 18, label: '🔙 Volver a Skill Match', language: 'es' },
      { button_id: 18, label: "🔙 Skill Match'e dön", language: 'tr' },
      { button_id: 18, label: '🔙 Zurück zu Skill Match', language: 'de' },
      { language: 'ru', button_id: 19, label: 'Как это работает?' },
      { language: 'ua', button_id: 19, label: 'Як це працює?' },
      { language: 'en', button_id: 19, label: 'How It Works?' },
      { language: 'es', button_id: 19, label: 'Cómo funciona?' },
      { language: 'tr', button_id: 19, label: 'Nasıl çalışır?' },
      { language: 'de', button_id: 19, label: 'Wie es funktioniert?' },
      { language: 'ru', button_id: 20, label: '🔙 Назад к турнирам' },
      { language: 'ua', button_id: 20, label: '🔙 Назад до турнірів' },
      { language: 'en', button_id: 20, label: '🔙 Back to Tournaments' },
      { language: 'es', button_id: 20, label: '🔙 Volver a los torneos' },
      { language: 'tr', button_id: 20, label: '🔙 Turnuvalara dön' },
      { language: 'de', button_id: 20, label: '🔙 Zurück zu Turnieren' },

      { language: 'ru', button_id: 21, label: 'АНГЛИЙСКИЙ' },
      { language: 'ua', button_id: 21, label: 'АНГЛІЙСЬКА' },
      { language: 'en', button_id: 21, label: 'ENGLISH' },
      { language: 'es', button_id: 21, label: 'INGLÉS' },
      { language: 'tr', button_id: 21, label: 'İNGİLİZCE' },
      { language: 'de', button_id: 21, label: 'ENGLISCH' },
      { language: 'ru', button_id: 22, label: 'НЕМЕЦКИЙ' },
      { language: 'ua', button_id: 22, label: 'НІМЕЦЬКА' },
      { language: 'en', button_id: 22, label: 'GERMAN' },
      { language: 'es', button_id: 22, label: 'ALEMÁN' },
      { language: 'tr', button_id: 22, label: 'ALMANCA' },
      { language: 'de', button_id: 22, label: 'DEUTSCH' },
      { language: 'ru', button_id: 23, label: 'ТУРЕЦКИЙ' },
      { language: 'ua', button_id: 23, label: 'ТУРЕЦЬКА' },
      { language: 'en', button_id: 23, label: 'TURKISH' },
      { language: 'es', button_id: 23, label: 'TURCO' },
      { language: 'tr', button_id: 23, label: 'TÜRKÇE' },
      { language: 'de', button_id: 23, label: 'TÜRKISCH' },
      { language: 'ru', button_id: 24, label: 'ИСПАНСКИЙ' },
      { language: 'ua', button_id: 24, label: 'ІСПАНСЬКА' },
      { language: 'en', button_id: 24, label: 'SPANISH' },
      { language: 'es', button_id: 24, label: 'ESPAÑOL' },
      { language: 'tr', button_id: 24, label: 'İSPANYOLCA' },
      { language: 'de', button_id: 24, label: 'SPANISCH' },
      { language: 'ru', button_id: 25, label: 'РУССКИЙ' },
      { language: 'ua', button_id: 25, label: 'РОСІЙСЬКА' },
      { language: 'en', button_id: 25, label: 'RUSSIAN' },
      { language: 'es', button_id: 25, label: 'RUSO' },
      { language: 'tr', button_id: 25, label: 'RUSÇA' },
      { language: 'de', button_id: 25, label: 'RUSSISCH' },
      { language: 'ru', button_id: 26, label: 'УКРАИНСКИЙ' },
      { language: 'ua', button_id: 26, label: 'УКРАЇНСЬКА' },
      { language: 'en', button_id: 26, label: 'UKRAINIAN' },
      { language: 'es', button_id: 26, label: 'UCRANIANO' },
      { language: 'tr', button_id: 26, label: 'UKRAYNACA' },
      { language: 'de', button_id: 26, label: 'UKRAINISCH' },

      { language: 'ru', button_id: 27, label: 'Как получить карту' },
      { language: 'ua', button_id: 27, label: 'Як отримати карту' },
      { language: 'en', button_id: 27, label: 'How to Get Card' },
      { language: 'es', button_id: 27, label: 'Cómo obtener una tarjeta' },
      { language: 'tr', button_id: 27, label: 'Kart nasıl alınır' },
      {
        language: 'de',
        button_id: 27,
      },

      { language: 'ru', button_id: 28, label: '🔙 Назад к MANAVA VISA' },
      { language: 'ua', button_id: 28, label: '🔙 Назад до MANAVA VISA' },
      { language: 'en', button_id: 28, label: '🔙 Back to MANAVA VISA' },
      { language: 'es', button_id: 28, label: '🔙 Volver to MANAVA VISA' },
      {
        language: 'tr',
        button_id: 28,
        label: "🔙 MANAVA VİZE'ye geri dön",
      },
      { language: 'de', button_id: 28, label: '🔙 Zurück zu MANAVA VISA' },

      { language: 'ru', button_id: 29, label: 'Alliance Key' },
      { language: 'ua', button_id: 29, label: 'Alliance Key' },
      { language: 'en', button_id: 29, label: 'Alliance Key' },
      { language: 'es', button_id: 29, label: 'Clave de Alianza' },
      { language: 'tr', button_id: 29, label: 'İttifak Anahtarı' },
      { language: 'de', button_id: 29, label: 'Allianz-Schlüssel' },

      { language: 'ru', button_id: 30, label: 'MANAV' },
      { language: 'ua', button_id: 30, label: 'MANAV' },
      { language: 'en', button_id: 30, label: 'MANAV' },
      { language: 'es', button_id: 30, label: 'MANAV' },
      { language: 'tr', button_id: 30, label: 'MANAV' },
      { language: 'de', button_id: 30, label: 'MANAV' },

      { language: 'ru', button_id: 31, label: 'EARN ALLIANCE' },
      { language: 'ua', button_id: 31, label: 'EARN ALLIANCE' },
      { language: 'en', button_id: 31, label: 'EARN ALLIANCE' },
      { language: 'es', button_id: 31, label: 'GANAR ALIANZA' },
      { language: 'tr', button_id: 31, label: 'İTTİFAK KAZAN' },
      { language: 'de', button_id: 31, label: 'ALLIANZ VERDIENEN' },

      { language: 'ru', button_id: 32, label: '🔙 Назад к ALLIANCE' },
      { language: 'ua', button_id: 32, label: '🔙 Назад до ALLIANCE' },
      { language: 'en', button_id: 32, label: '🔙 Back to ALLIANCE' },
      { language: 'es', button_id: 32, label: '🔙 Volver a ALLIANCE' },
      { language: 'tr', button_id: 32, label: "🔙 İTTİFAK'a geri dön" },
      { language: 'de', button_id: 32, label: '🔙 Zurück zu ALLIANCE' },

      {
        language: 'ru',
        button_id: 33,
        label: 'Как формируется цена MANAV?',
      },
      { language: 'ua', button_id: 33, label: 'Як формується ціна MANAV?' },
      {
        language: 'en',
        button_id: 33,
        label: 'How MANAV price is formed?',
      },
      {
        language: 'es',
        button_id: 33,
        label: 'Cómo se forma el precio de MANAV?',
      },
      {
        language: 'tr',
        button_id: 33,
        label: 'MANAV fiyatı nasıl oluşur?',
      },
      {
        language: 'de',
        button_id: 33,
        label: 'Wie der MANAV-Preis entsteht?',
      },

      { language: 'ru', button_id: 34, label: 'Как получить MANAV?' },
      { language: 'ua', button_id: 34, label: 'Як отримати MANAV?' },
      { language: 'en', button_id: 34, label: 'How to get MANAV?' },
      { language: 'es', button_id: 34, label: 'Cómo obtener MANAV?' },
      { language: 'tr', button_id: 34, label: 'MANAV nasıl alınır?' },
      { language: 'de', button_id: 34, label: 'Wie man MANAV erhält?' },

      { language: 'ru', button_id: 35, label: 'Как продать MANAV?' },
      { language: 'ua', button_id: 35, label: 'Як продати MANAV?' },
      { language: 'en', button_id: 35, label: 'How to sell MANAV?' },
      { language: 'es', button_id: 35, label: 'Cómo vender MANAV?' },
      { language: 'tr', button_id: 35, label: 'MANAV nasıl satılır?' },
      { language: 'de', button_id: 35, label: 'Wie man MANAV verkauft?' },

      { language: 'ru', button_id: 36, label: 'Что такое Oracle?' },
      { language: 'ua', button_id: 36, label: 'Що таке Oracle?' },
      { language: 'en', button_id: 36, label: 'What is Oracle?' },
      { language: 'es', button_id: 36, label: '¿Qué es Oracle?' },
      { language: 'tr', button_id: 36, label: 'Oracle nedir?' },
      { language: 'de', button_id: 36, label: 'Was ist Oracle?' },

      { language: 'ru', button_id: 37, label: 'Core Alliance' },
      { language: 'ua', button_id: 37, label: 'Core Alliance' },
      { language: 'en', button_id: 37, label: 'Core Alliance' },
      { language: 'es', button_id: 37, label: 'Core Alliance' },
      { language: 'tr', button_id: 37, label: 'Çekirdek İttifak' },
      { language: 'de', button_id: 37, label: 'Core Alliance' },

      { language: 'ru', button_id: 38, label: 'Топ участников Альянса' },
      { language: 'ua', button_id: 38, label: 'Топ учасників Альянсу' },
      { language: 'en', button_id: 38, label: 'Top Alliance Members' },
      {
        language: 'es',
        button_id: 38,
        label: 'Miembros principales de la Alianza',
      },
      { language: 'tr', button_id: 38, label: 'En İyi İttifak üyeleri' },
      { language: 'de', button_id: 38, label: 'Top Allianz-Mitglieder' },

      { language: 'ru', button_id: 39, label: '🔙 Назад к EARN ALLIANCE' },
      { language: 'ua', button_id: 39, label: '🔙 Назад до EARN ALLIANCE' },
      { language: 'en', button_id: 39, label: '🔙 Back to EARN ALLIANCE' },
      {
        language: 'es',
        button_id: 39,
        label: '🔙 Volver to EARN ALLIANCE',
      },
      {
        language: 'tr',
        button_id: 39,
        label: "🔙 EARN ALLIANCE'a geri dön",
      },
      {
        language: 'de',
        button_id: 39,
        label: '🔙 Zurück zu EARN ALLIANCE',
      },

      { language: 'ru', button_id: 40, label: '🔙 Назад к MANAV' },
      { language: 'ua', button_id: 40, label: '🔙 Назад до MANAV' },
      { language: 'en', button_id: 40, label: '🔙 Back to MANAV' },
      { language: 'es', button_id: 40, label: '🔙 Volver a MANAV' },
      { language: 'tr', button_id: 40, label: "🔙 MANAV'a geri dön" },
      { language: 'de', button_id: 40, label: '🔙 Zurück zu MANAV' },

      { language: 'ru', button_id: 41, label: 'MANAVA Социальные сети' },
      { language: 'ua', button_id: 41, label: 'MANAVA Соціальні мережі' },
      { language: 'en', button_id: 41, label: 'MANAVA Social Networks' },
      { language: 'es', button_id: 41, label: 'Redes sociales de MANAVA' },
      { language: 'tr', button_id: 41, label: 'MANAVA sosyal ağları' },
      { language: 'de', button_id: 41, label: 'MANAVA Soziale Netzwerke' },

      { language: 'ru', button_id: 42, label: 'Презентации (linktr)' },
      { language: 'ua', button_id: 42, label: 'Презентації (linktr)' },
      { language: 'en', button_id: 42, label: 'Presentations (linktr)' },
      { language: 'es', button_id: 42, label: 'Presentaciones (linktr)' },
      { language: 'tr', button_id: 42, label: 'Sunumlar (linktr)' },
      { language: 'de', button_id: 42, label: 'Präsentationen (linktr)' },

      { language: 'ru', button_id: 43, label: 'FAQ' },
      { language: 'ua', button_id: 43, label: 'FAQ' },
      { language: 'en', button_id: 43, label: 'FAQ' },
      { language: 'es', button_id: 43, label: 'Preguntas frecuentes' },
      {
        language: 'tr',
        button_id: 43,
        label: 'SSS / Sıkça Sorulan Sorular',
      },
      {
        language: 'de',
        button_id: 43,
        label: 'FAQ / Häufig gestellte Fragen',
      },

      { language: 'ru', button_id: 44, label: 'Поддержка' },
      { language: 'ua', button_id: 44, label: 'Підтримка' },
      { language: 'en', button_id: 44, label: 'Support' },
      { language: 'es', button_id: 44, label: 'Soporte' },
      { language: 'tr', button_id: 44, label: 'Destek' },
      { language: 'de', button_id: 44, label: 'Support' },

      { language: 'ru', button_id: 45, label: 'Discord / Community' },
      { language: 'ua', button_id: 45, label: 'Discord / Community' },
      { language: 'en', button_id: 45, label: 'Discord / Community' },
      { language: 'es', button_id: 45, label: 'Discord / Community' },
      { language: 'tr', button_id: 45, label: 'Discord / Community' },
      { language: 'de', button_id: 45, label: 'Discord / Community' },

      {
        language: 'ru',
        button_id: 46,
        label: 'Базовые вопросы для новичков',
      },
      {
        language: 'ua',
        button_id: 46,
        label: 'Базові питання для новачків',
      },
      {
        language: 'en',
        button_id: 46,
        label: 'Basic questions for beginners',
      },
      {
        language: 'es',
        button_id: 46,
        label: 'Preguntas básicas para principiantes',
      },
      {
        language: 'tr',
        button_id: 46,
        label: 'Yeni başlayanlar için temel sorular',
      },
      {
        language: 'de',
        button_id: 46,
      },

      {
        language: 'ru',
        button_id: 47,
        label: 'Общие вопросы о MANAVA Multiverse',
      },
      {
        language: 'ua',
        button_id: 47,
        label: 'Загальні питання про MANAVA Multiverse',
      },
      {
        language: 'en',
        button_id: 47,
        label: 'General questions about MANAVA Multiverse',
      },
      {
        language: 'es',
        button_id: 47,
        label: 'Preguntas generales sobre MANAVA Multiverse',
      },
      {
        language: 'tr',
        button_id: 47,
        label: 'MANAVA Multiverse hakkında genel sorular',
      },
      {
        language: 'de',
        button_id: 47,
        label: 'Allgemeine Fragen über MANAVA Multiverse',
      },

      { language: 'ru', button_id: 48, label: 'Вопросы по игре SWAG' },
      { language: 'ua', button_id: 48, label: 'Питання по грі SWAG' },
      { language: 'en', button_id: 48, label: 'Questions about SWAG game' },
      {
        language: 'es',
        button_id: 48,
        label: 'Preguntas sobre el juego SWAG',
      },
      {
        language: 'tr',
        button_id: 48,
        label: 'SWAG oyunu hakkında sorular',
      },
      { language: 'de', button_id: 48, label: 'Fragen zum SWAG-Spiel' },

      {
        language: 'ru',
        button_id: 49,
        label: 'Вопросы по доходу и монетизации',
      },
      {
        language: 'ua',
        button_id: 49,
        label: 'Питання по доходах і монетизації',
      },
      {
        language: 'en',
        button_id: 49,
        label: 'Questions about income and monetization',
      },
      {
        language: 'es',
        button_id: 49,
        label: 'Preguntas sobre ingresos y monetización',
      },
      {
        language: 'tr',
        button_id: 49,
        label: 'Gelir ve parayla ilgili sorular',
      },
      {
        language: 'de',
        button_id: 49,
        label: 'Fragen zu Einkommen und Monetarisierung',
      },

      {
        language: 'ru',
        button_id: 50,
        label: 'Вопросы по кошельку и безопасности',
      },
      {
        language: 'ua',
        button_id: 50,
        label: 'Питання по гаманцях і безпеці',
      },
      {
        language: 'en',
        button_id: 50,
        label: 'Questions about wallet and security',
      },
      {
        language: 'es',
        button_id: 50,
        label: 'Preguntas sobre billetera y seguridad',
      },
      {
        language: 'tr',
        button_id: 50,
        label: 'Cüzdan ve güvenlik soruları',
      },
      {
        language: 'de',
        button_id: 50,
        label: 'Fragen zu Wallet und Sicherheit',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DO $$
      DECLARE
          r RECORD;
      BEGIN
          FOR r IN (SELECT t.typname FROM pg_type t WHERE t.typtype = 'e') LOOP
              EXECUTE 'DROP TYPE IF EXISTS "' || r.typname || '" CASCADE';
          END LOOP;
      END$$;
    `);
    await queryInterface.dropTable('blocks');
    await queryInterface.dropTable('content_translations');
    await queryInterface.dropTable('buttons');
    await queryInterface.dropTable('button_translations');
    await queryInterface.dropTable('buttons_to_blocks');
  },
};
