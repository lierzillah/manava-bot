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
    ]);

    await queryInterface.bulkInsert('content_translations', [
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
      },
      {
        order: 2,
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 1,
        label: 'Alliance',
      },
      {
        order: 3,
        type: 'callback',
        keyboard_type: 'reply',
        is_full_width: false,
        row_order: 1,
        label: 'Info',
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
        order: 0,
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
        button_id: 18,
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
    ]);

    await queryInterface.bulkInsert('button_translations', [
      { button_id: 1, label: '🎮 Play and Earn', language: 'ru' },
      { button_id: 1, label: '🎮 Play and Earn', language: 'ua' },
      { button_id: 1, label: '🎮 Play and Earn', language: 'en' },
      { button_id: 1, label: '🎮 Juega y Gana', language: 'es' },
      { button_id: 1, label: '🎮 Oyna ve Kazan', language: 'tr' },
      { button_id: 1, label: '🎮 Spielen und Verdienen', language: 'de' },
      { button_id: 2, label: '💳 Карта Visa от Manava', language: 'ru' },
      { button_id: 2, label: '💳 Карта Visa від Manava', language: 'ua' },
      { button_id: 2, label: '💳 Manava Visa Card', language: 'en' },
      { button_id: 2, label: '💳 Tarjeta Visa de Manava', language: 'es' },
      { button_id: 2, label: "💳 Manava'dan Visa kart", language: 'tr' },
      { button_id: 2, label: '💳 Manava Visa-Karte', language: 'de' },
      { button_id: 3, label: '🛡️ Альянс', language: 'ru' },
      { button_id: 3, label: '🛡️ Альянс', language: 'ua' },
      { button_id: 3, label: '🛡️ Alliance', language: 'en' },
      { button_id: 3, label: '🛡️ Alianza', language: 'es' },
      { button_id: 3, label: '🛡️ İttifak', language: 'tr' },
      { button_id: 3, label: '🛡️ Allianz', language: 'de' },
      { button_id: 4, label: 'ℹ️ Информация', language: 'ru' },
      { button_id: 4, label: 'ℹ️ Інформація', language: 'ua' },
      { button_id: 4, label: 'ℹ️ Info', language: 'en' },
      { button_id: 4, label: 'ℹ️ Información', language: 'es' },
      { button_id: 4, label: 'ℹ️ Bilgi', language: 'tr' },
      { button_id: 4, label: 'ℹ️ Info', language: 'de' },
      { button_id: 5, label: '🌍 Сменить язык', language: 'ru' },
      { button_id: 5, label: '🌍 Змінити мову', language: 'ua' },
      { button_id: 5, label: '🌍 Change Language', language: 'en' },
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
