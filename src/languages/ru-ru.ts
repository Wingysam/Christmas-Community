export const momentLocale = 'ru' as const

export const notTranslated = englishString => `${englishString} (ещё не переведено на русский язык)`

export const strings = {
  ADMIN_CLEAR_WISHLISTS_BUTTON: 'Очистить все списки желаний',
  ADMIN_CLEAR_WISHLISTS_DESCRIPTION: 'Это мгновенно и <b>безвозвратно удалит все списки желаний!</b> Рекомендуется сделать резервную копию базы данных перед использованием этой функции.',
  ADMIN_CLEAR_WISHLISTS_HEADER: 'Удаление списков желаний',
  ADMIN_SETTINGS_CLEARDB_BUTTON: 'Очистить списки желаний',
  ADMIN_SETTINGS_CLEARDB_DESCRIPTION: '<b>Внимание</b>: Эти опции <b>уничтожают данные</b>! Возможно, вам стоит сделать резервную копию базы данных перед использованием этих опций.',
  ADMIN_SETTINGS_CLEARDB_HEADER: 'Уничтожение данных',
  ADMIN_SETTINGS_CLEARDB_SUCCESS: 'Все списки желаний очищены.',
  ADMIN_SETTINGS_HEADER: 'Настройки администратора',
  ADMIN_SETTINGS_USERS_ADD_BUTTON: 'Добавить пользователя',
  ADMIN_SETTINGS_USERS_ADD_HEADER: 'Добавить пользователя',
  ADMIN_SETTINGS_USERS_ADD_PLACEHOLDER: 'иван',
  ADMIN_SETTINGS_USERS_ADD_USERNAME: 'Имя пользователя',
  ADMIN_SETTINGS_USERS_ADD_ERROR_USERNAME_EMPTY: 'Имя пользователя не может быть пустым.',
  ADMIN_SETTINGS_USERS_EDIT_DELETE_FAIL_ADMIN: 'Не удалось удалить: пользователь является администратором.',
  ADMIN_SETTINGS_USERS_EDIT_DELETE_SUCCESS: name => `Пользователь ${name} успешно удалён`,
  ADMIN_SETTINGS_USERS_EDIT_DEMOTE_NOT_ADMIN: 'Пользователь не является администратором',
  ADMIN_SETTINGS_USERS_EDIT_DEMOTE_SELF: 'Вы не можете понизить свои права.',
  ADMIN_SETTINGS_USERS_EDIT_DEMOTE_SUCCESS: name => `${name} больше не администратор.`,
  ADMIN_SETTINGS_USERS_EDIT_IMPERSONATE_SUCCESS: name => `Вы теперь ${name}.`,
  ADMIN_SETTINGS_USERS_EDIT_NO_USERNAME_PROVIDED: 'Имя пользователя не указано',
  ADMIN_SETTINGS_USERS_EDIT_PROMOTE_ALREADY_ADMIN: 'Пользователь уже является администратором',
  ADMIN_SETTINGS_USERS_EDIT_PROMOTE_DEMOTE_NOT_FOUND: 'Пользователь не найден.',
  ADMIN_SETTINGS_USERS_EDIT_PROMOTE_SUCCESS: name => `${name} теперь администратор.`,
  ADMIN_SETTINGS_USERS_EDIT_RENAMED_USER: 'Пользователь переименован!',
  ADMIN_SETTINGS_USERS_EDIT_SAME_NAME: 'Имя пользователя совпадает с новым именем пользователя.',
  ADMIN_SETTINGS_USERS_EDIT: 'Редактировать',
  ADMIN_SETTINGS_USERS_HEADER: 'Пользователи',
  ADMIN_SETTINGS_VERSION_INFO: 'Информация о версии',
  ADMIN_USER_EDIT_ACCOUNT_UNCONFIRMED: "Этот аккаунт не подтверждён.",
  ADMIN_USER_EDIT_ADMIN_ISADMIN: name => `${name} является администратором.`,
  ADMIN_USER_EDIT_ADMIN_NOTADMIN: name => `${name} не является администратором.`,
  ADMIN_USER_EDIT_ADMIN: 'Администратор',
  ADMIN_USER_EDIT_CHANGE_NAME: 'Изменить имя',
  ADMIN_USER_EDIT_CHANGE_USERNAME: 'Изменить имя пользователя',
  ADMIN_USER_EDIT_CONFIRMATION_LINK: 'Ссылка для подтверждения',
  ADMIN_USER_EDIT_DELETE_ADMIN: 'Пользователь является администратором',
  ADMIN_USER_EDIT_DELETE_HEADER: 'Безвозвратное удаление',
  ADMIN_USER_EDIT_DELETE_USER: name => `Удалить пользователя ${name}`,
  ADMIN_USER_EDIT_DEMOTE_SELF: 'Вы не можете понизить свои права',
  ADMIN_USER_EDIT_DEMOTE: name => `Понизить ${name}`,
  ADMIN_USER_EDIT_EDITING_USER: name => `Редактирование пользователя "${name}"`,
  ADMIN_USER_EDIT_GENERATE_NEW_LINK: 'Сгенерировать новую ссылку',
  ADMIN_USER_EDIT_IMPERSONATE_BUTTON: name => `Войти как ${name}`,
  ADMIN_USER_EDIT_IMPERSONATE_HEADER: 'Войти как пользователь',
  ADMIN_USER_EDIT_LINK_EXPIRY_FUTURE: fromNow => `Следующая ссылка истекает ${fromNow}`,
  ADMIN_USER_EDIT_LINK_EXPIRY_PAST: fromNow => `Следующая ссылка истекла ${fromNow}`,
  ADMIN_USER_EDIT_PROMOTE: name => `Повысить ${name}`,
  ADMIN_USER_EDIT_RESET_PASSWORD_HASLINK_EXPIRY_FUTURE: fromNow => `Она истекает ${fromNow}`,
  ADMIN_USER_EDIT_RESET_PASSWORD_HASLINK_EXPIRY_PAST: fromNow => `Она истекла ${fromNow}`,
  ADMIN_USER_EDIT_RESET_PASSWORD_HASLINK: 'Для этого пользователя есть ссылка для сброса пароля.',
  ADMIN_USER_EDIT_RESET_PASSWORD_HEADER: 'Сброс пароля',
  ADMIN_USER_EDIT_RESET_PASSWORD_LINK_CANCEL: 'Отменить ссылку для сброса пароля',
  ADMIN_USER_EDIT_RESET_PASSWORD_LINK_CREATE: 'Создать ссылку для сброса пароля',
  ADMIN_USER_EDIT_RESET_PASSWORD_LINK_REFRESH: 'Обновить ссылку для сброса пароля',
  ADMIN_USER_EDIT_USERNAME: 'Имя пользователя',
  BACK_BUTTON: 'Назад',
  CONFIRM_ACCOUNT_EXPIRED: 'Ваша ссылка для подтверждения истекла. Пожалуйста, запросите новую.',
  CONFIRM_ACCOUNT_HEADER_INVALID: `${_CC.config.siteTitle} | Ссылка для подтверждения недействительна`,
  CONFIRM_ACCOUNT_HEADER_VALID: `${_CC.config.siteTitle} | Подтверждение аккаунта`,
  CONFIRM_ACCOUNT_INVALID: "Эта ссылка для подтверждения недействительна. Возможно, аккаунт был удалён, или символы в конце ссылки оказались обрезаны?",
  CONFIRM_ACCOUNT_SET_PW_BUTTON: `Присоединиться к ${_CC.config.siteTitle}`,
  CONFIRM_ACCOUNT_SET_PW_PLACEHOLDER: 'п@р0ль!',
  CONFIRM_ACCOUNT_SET_PW_TEXT: name => `Здравствуйте, ${name}! Пожалуйста, установите пароль.`,
  CONFIRM_ACCOUNT_SUCCESS: `Добро пожаловать в ${_CC.config.siteTitle}!`,
  LOGIN_BUTTON: 'Войти',
  LOGIN_OIDC_BUTTON: `Войти через ${_CC.config.oidcProviderName}`,
  LOGIN_PASSWORD_PLACEHOLDER: 'п@р0ль!',
  LOGIN_PASSWORD: 'Пароль',
  LOGIN_USERNAME_PLACEHOLDER: 'иван',
  LOGIN_USERNAME: 'Имя пользователя',
  LOGIN_INCORRECT_USERNAME: 'Неверное имя пользователя',
  LOGIN_INCORRECT_PASSWORD: 'Неверный пароль',
  LOGIN_SSO_UNKNOWN_USER: 'Неизвестный пользователь',
  LOGIN_SSO_LINK_SUCCESS: 'Аккаунт успешно привязан',
  LOGIN_SSO_LINK_FAILURE: 'Не удалось привязать аккаунт',
  LOGIN_SSO_UNLINK_SUCCESS: 'Аккаунт успешно отвязан',
  LOGIN_SSO_UNLINK_FAILURE: 'Не удалось отвязать аккаунт',
  LOGIN_SSO_LINK_FAILURE_ACCOUNT_EXISTS: 'Этот внешний аккаунт уже привязан к другому аккаунту на этом сайте!',
  LOGOUT_BUTTON: 'Выйти',
  NAVBAR_ADMIN: 'Настройки администратора',
  NAVBAR_LOGIN: 'Войти',
  NAVBAR_LOGOUT: 'Выйти',
  NAVBAR_PROFILE: 'Профиль',
  NAVBAR_WISHLIST: 'Мой список желаний',
  NOTE_BACK: name => `Назад к списку желаний ${name}`,
  NOTE_GET_PRODUCT_DATA: 'Получить данные о предмете',
  NOTE_GUARD: 'Неверный пользователь',
  NOTE_IMAGE_URL: 'URL изображения',
  NOTE_MISSING_PROP: prop => `Отсутствует свойство ${prop}`,
  NOTE_NAME: 'Название',
  NOTE_NOTE: 'Примечание',
  NOTE_PRICE: 'Цена',
  NOTE_REFRESH_DATA: 'Обновить данные',
  NOTE_REMOVE_GUARD: 'Неверный пользователь',
  NOTE_REMOVE_MISSING: 'Примечания нет',
  NOTE_REMOVE_SUCCESS: 'Примечание успешно удалено',
  NOTE_SAVE_BUTTON: 'Сохранить предмет',
  NOTE_SUCCESS: 'Успешно сохранено!',
  NOTE_URL: 'URL',
  PROFILE_COAT_SIZE: 'Размер пиджака/пальто',
  PROFILE_DRESS_SIZE: 'Размер платья',
  PROFILE_HAT_SIZE: 'Размер шляпы',
  PROFILE_HEADER: 'Профиль',
  PROFILE_PANTS_SIZE: 'Размер брюк',
  PROFILE_PASSWORD_BUTTON: 'Сохранить',
  PROFILE_PASSWORD_NEW: 'Новый пароль',
  PROFILE_PASSWORD_OLD_MISMATCH: 'Неверный старый пароль',
  PROFILE_PASSWORD_OLD: 'Старый пароль',
  PROFILE_PASSWORD_PLACEHOLDER: 'п@р0ль!',
  PROFILE_PASSWORD_REQUIRED_NEW: 'Требуется новый пароль',
  PROFILE_PASSWORD_REQUIRED_OLD: 'Требуется старый пароль',
  PROFILE_PASSWORD_SUCCESS: 'Изменения успешно сохранены!',
  PROFILE_PASSWORD_TITLE: name => `Настройки профиля - Пароль - ${name}`,
  PROFILE_PHONE_MODEL: 'Модель телефона',
  PROFILE_RING_SIZE: 'Размер кольца',
  PROFILE_SAVE_PFP_DISABLED: 'Изображения профиля отключены.',
  PROFILE_SAVE_PFP_SUCCESS: 'Изображение профиля сохранено!',
  PROFILE_SECURITY_CHANGE_PASSWORD: 'Изменить пароль',
  PROFILE_SECURITY: 'Безопасность',
  PROFILE_SECURITY_LINK_OIDC: `Привязать аккаунт ${_CC.config.oidcProviderName}`,
  PROFILE_SECURITY_UNLINK_OIDC: `Отвязать аккаунт ${_CC.config.oidcProviderName}`,
  PROFILE_SHARED_INFORMATION: 'Общедоступная информация',
  PROFILE_SHIRT_SIZE: 'Размер рубашки',
  PROFILE_SHOE_SIZE: 'Размер обуви',
  PROFILE_SWEATER_SIZE: 'Размер блузки/свитера',
  PROFILE_TITLE: name => `Настройки профиля - ${name}`,
  PROFILE_UPDATE_INFO_SUCCESS: 'Общедоступная информация обновлена!',
  RESET_PASSWORD_BUTTON: 'Сбросить пароль',
  RESET_PASSWORD_GREETING_EXPIRED: 'Ссылка для сброса пароля истекла. Пожалуйста, запросите новую.',
  RESET_PASSWORD_GREETING_INVALID: "Эта ссылка для сброса пароля недействительна. Возможно, ссылка была отменена, или символы в конце ссылки оказались обрезаны?",
  RESET_PASSWORD_GREETING_VALID: name => `Здравствуйте, ${name}! Пожалуйста, установите пароль.`,
  RESET_PASSWORD_HEADER_INVALID: `${_CC.config.siteTitle} | Ссылка для сброса пароля недействительна`,
  RESET_PASSWORD_HEADER_VALID: `${_CC.config.siteTitle} | Сброс пароля`,
  RESET_PASSWORD_PASSWORD_PLACEHOLDER: 'п@р0ль!',
  RESET_PASSWORD_PASSWORD: 'Пароль',
  RESET_PASSWORD_SUCCESS: 'Пароль успешно сброшен!',
  SETUP_ADMIN_USER: 'Администратор',
  SETUP_BUTTON: 'Настроить!',
  SETUP_HEADER: 'Настройка',
  SETUP_PASSWORD_PLACEHOLDER: 'п@р0ль!',
  SETUP_PASSWORD: 'Пароль',
  SETUP_USERNAME_PLACEHOLDER: 'иван',
  SETUP_USERNAME: 'Имя пользователя',
  SUPPORTED_SITES_HEADER: 'Поддерживаемые сайты',
  SUPPORTED_SITES_TEXT: 'Отсутствует или не работает сайт? Откройте запрос <a href="https://github.com/Wingysam/get-product-data/issues/new">здесь</a>! :)',
  UPDATE_NOTICE: (current, latest) => `
    <span class="has-text-danger is-size-4 has-text-weight-bold">
      Christmas Community устарело. Возможно, появились новые функции или исправления ошибок. Рассмотрите возможность обновления! :)
    </span>
    <br>
    <span>(вы можете отключить это сообщение с помощью <code>UPDATE_CHECK=false</code>)</span>
    <br><br>
    <span>Текущая версия: ${current}</span>
    <br>
    <span>Последняя версия: ${latest}</span>
    <span class="has-text-info" style="float: right;">Это сообщение видно только администраторам</span>`,
  WISHLIST_ADD: 'Добавить предмет в список желаний',
  WISHLIST_ADD_NEW: 'Добавить предмет',
  WISHLIST_ADDED_BY_USER: addedBy => `Добавлено: ${addedBy}`,
  WISHLIST_ADDED_BY_GUEST: "Гостевой Пользователь",
  WISHLIST_ADDED_BY: 'Добавлено',
  WISHLIST_ADDED_ITEM_TO_OWN_WISHLIST: 'Предмет добавлен в список желаний.',
  WISHLIST_CONFLICT: 'Предметы добавляются слишком быстро. Попробуйте снова.',
  WISHLIST_DELETE: 'Удалить',
  WISHLIST_EDIT_ITEM: 'Редактировать предмет',
  WISHLIST_FETCH_FAIL: 'Не удалось загрузить список желаний - существует ли данный пользователь?',
  WISHLIST_IMAGE: 'Изображение',
  WISHLIST_ITEM_MISSING: 'Не удалось найти предмет',
  WISHLIST_MOVE_DOWN: 'Переместить ниже',
  WISHLIST_MOVE_BOTTOM: 'Переместить в самый низ',
  WISHLIST_MOVE_GUARD: 'Неверный пользователь',
  WISHLIST_MOVE_INVALID: 'Неверное перемещение',
  WISHLIST_MOVE_ITEM_DOWN: 'Переместить предмет ниже',
  WISHLIST_MOVE_ITEM_BOTTOM: 'Переместить предмет в самый низ',
  WISHLIST_MOVE_ITEM_TOP: 'Переместить предмет на самый верх',
  WISHLIST_MOVE_ITEM_UP: 'Переместить предмет выше',
  WISHLIST_MOVE_SUCCESS: 'Предмет успешно перемещен!',
  WISHLIST_MOVE_TOP: 'Переместить на самый верх',
  WISHLIST_MOVE_UNKNOWN_DIRECTION: 'Неизвестное направление',
  WISHLIST_MOVE_UP: 'Переместить выше',
  WISHLIST_NAME: 'Название',
  WISHLIST_NOTE: 'Примечание',
  WISHLIST_OPTIONAL: 'Необязательно',
  WISHLIST_PLEDGE_DUPLICATE: 'Предмет уже зарезервирован',
  WISHLIST_PLEDGE_ITEM: 'Зарезервировать предмет',
  WISHLIST_PLEDGE_SUCCESS: 'Предмет успешно зарезервирован!',
  WISHLIST_PLEDGE: 'Зарезервировать',
  WISHLIST_PLEDGED: pledgedBy => `Зарезервирован ${pledgedBy}`,
  WISHLIST_PLEDGED_GUEST: 'Зарезервирован незарегистрированным пользователем',
  WISHLIST_PLEDGED_ITEM_FOR_USER: user => `Зарезервирован предмет для ${user}.`,
  WISHLIST_PRICE: 'Цена',
  WISHLIST_REFRESH_GUARD: 'Неверный пользователь',
  WISHLIST_REFRESH_NO_URL: 'У предмета нет URL.',
  WISHLIST_REFRESH_SUCCESS: 'Данные успешно обновлены!',
  WISHLIST_REMOVE_GUARD: 'Неверный пользователь',
  WISHLIST_REMOVE_SUCCESS: 'Успешно удалено из списка желаний',
  WISHLIST_SUGGEST: 'Предложить предмет',
  WISHLIST_TITLE: name => `${_CC.config.siteTitle} - Список желаний - ${name}`,
  WISHLIST_UNPLEDGE_GUARD: 'Вы не зарезервировали этот предмет',
  WISHLIST_UNPLEDGE_SUCCESS: 'Резервация предмета успешно отменена!',
  WISHLIST_UNPLEDGE: 'Отменить резервацию',
  WISHLIST_URL_LABEL: `URL или название предмета (<a href="${_CC.config.base}supported-sites">Поддерживаемые сайты</a>)`,
  WISHLIST_URL_PLACEHOLDER: 'https://www.amazon.com/dp/B00ZV9RDKK',
  WISHLIST_URL_REQUIRED: 'Требуется URL или название предмета',
  WISHLISTS_COUNTS_SELF: name => `${name}: ???/???`,
  WISHLISTS_COUNTS: (name, pledged, total) => `${name}: ${pledged}/${total}`,
  WISHLISTS_TITLE: `${_CC.config.siteTitle} - Списки желаний`
} as const