export const momentLocale = 'pt' as const

export const notTranslated = (englishString) =>
  `${englishString} (não foi possivel traduzir para Português)`

export const strings = {
  ADMIN_CLEAR_WISHLISTS_BUTTON: 'Eliminar todas as listas',
  ADMIN_CLEAR_WISHLISTS_DESCRIPTION:
    'Esta operação vai eliminar <b>de forma IRREVERSIVEL todas as listas!</b> Por favor considere fazer um backup da base de dados antes de prosseguir.',
  ADMIN_CLEAR_WISHLISTS_HEADER: 'Eliminar listas',
  ADMIN_SETTINGS_CLEARDB_BUTTON: 'Eliminar Listas',
  ADMIN_SETTINGS_CLEARDB_DESCRIPTION:
    '<b>ATENÇÃO</b>: Estas opções <b>eliminam dados</b>! Provavelmente deve efectuar um backup da base de dados antes de usar estas opções.',
  ADMIN_SETTINGS_CLEARDB_HEADER: 'Destruir dados',
  ADMIN_SETTINGS_CLEARDB_SUCCESS: 'Eliminar todas as listas.',
  ADMIN_SETTINGS_HEADER: 'Opções de Admin',
  ADMIN_SETTINGS_USERS_ADD_BUTTON: 'Adicionar Utilizador',
  ADMIN_SETTINGS_USERS_ADD_HEADER: 'Adicionar Utilizador',
  ADMIN_SETTINGS_USERS_ADD_PLACEHOLDER: 'João',
  ADMIN_SETTINGS_USERS_ADD_USERNAME: 'Nome de utilizador',
  ADMIN_SETTINGS_USERS_ADD_ERROR_USERNAME_EMPTY:
    'Nome de utilizador não pode ficar em branco.',
  ADMIN_SETTINGS_USERS_EDIT_DELETE_FAIL_ADMIN:
    'Erro ao remover: utilizador é admin.',
  ADMIN_SETTINGS_USERS_EDIT_DELETE_SUCCESS: (name) =>
    `Removido utilizador ${name}`,
  ADMIN_SETTINGS_USERS_EDIT_DEMOTE_NOT_ADMIN: 'utilizador não é administrador',
  ADMIN_SETTINGS_USERS_EDIT_DEMOTE_SELF:
    'Não é possivel retirar permissões à própria conta.',
  ADMIN_SETTINGS_USERS_EDIT_DEMOTE_SUCCESS: (name) =>
    `${name} não é mais administrador.`,
  ADMIN_SETTINGS_USERS_EDIT_IMPERSONATE_SUCCESS: (name) =>
    `Agora a sua conta é ${name}.`,
  ADMIN_SETTINGS_USERS_EDIT_NO_USERNAME_PROVIDED: 'Não foi indicado username',
  ADMIN_SETTINGS_USERS_EDIT_PROMOTE_ALREADY_ADMIN:
    'utilizador já é administrador',
  ADMIN_SETTINGS_USERS_EDIT_PROMOTE_DEMOTE_NOT_FOUND:
    'utilizador não encontrado.',
  ADMIN_SETTINGS_USERS_EDIT_PROMOTE_SUCCESS: (name) =>
    `${name} é administrador.`,
  ADMIN_SETTINGS_USERS_EDIT_RENAMED_USER: 'Utilizador renomeado!',
  ADMIN_SETTINGS_USERS_EDIT_SAME_NAME:
    'Nome de utilizador é igual ao novo nome de utilizador.',
  ADMIN_SETTINGS_USERS_EDIT: 'Editar',
  ADMIN_SETTINGS_USERS_HEADER: 'Utilizadores',
  ADMIN_SETTINGS_VERSION_INFO: 'Info da Versão',
  ADMIN_USER_EDIT_ACCOUNT_UNCONFIRMED: 'Esta conta ainda não foi confirmada.',
  ADMIN_USER_EDIT_ADMIN_ISADMIN: (name) => `${name} é um administrador.`,
  ADMIN_USER_EDIT_ADMIN_NOTADMIN: (name) => `${name} não é um administrador.`,
  ADMIN_USER_EDIT_ADMIN: 'Administrador',
  ADMIN_USER_EDIT_CHANGE_NAME: 'Alterar o nome',
  ADMIN_USER_EDIT_CHANGE_USERNAME: 'Alterar o nome de Utilizador',
  ADMIN_USER_EDIT_CONFIRMATION_LINK: 'Link de confirmação',
  ADMIN_USER_EDIT_DELETE_ADMIN: 'Utilizador é administrador',
  ADMIN_USER_EDIT_DELETE_HEADER: 'Eliminação Irreversivel',
  ADMIN_USER_EDIT_DELETE_USER: (name) => `Remover utilizador ${name}`,
  ADMIN_USER_EDIT_DEMOTE_SELF:
    'Não é possivel retirar permissões à própria conta',
  ADMIN_USER_EDIT_DEMOTE: (name) => `Retirar permissões a ${name}`,
  ADMIN_USER_EDIT_EDITING_USER: (name) => `Editar utilizador "${name}"`,
  ADMIN_USER_EDIT_GENERATE_NEW_LINK: 'Gerar novo Link',
  ADMIN_USER_EDIT_IMPERSONATE_BUTTON: (name) => `Log in como ${name}`,
  ADMIN_USER_EDIT_IMPERSONATE_HEADER: 'Simular utilizador',
  ADMIN_USER_EDIT_LINK_EXPIRY_FUTURE: (fromNow) =>
    `O seguinte link expira ${fromNow}`, // fromNow is localized by moment
  ADMIN_USER_EDIT_LINK_EXPIRY_PAST: (fromNow) =>
    `O seguinte link expirou ${fromNow}`,
  ADMIN_USER_EDIT_PROMOTE: (name) => `Dar permissões ${name}`,
  ADMIN_USER_EDIT_RESET_PASSWORD_HASLINK_EXPIRY_FUTURE: (fromNow) =>
    `Expira em ${fromNow}`,
  ADMIN_USER_EDIT_RESET_PASSWORD_HASLINK_EXPIRY_PAST: (fromNow) =>
    `Expirou ${fromNow}`,
  ADMIN_USER_EDIT_RESET_PASSWORD_HASLINK:
    'Existe um link para efectuar um reset da  password para este utilizador.',
  ADMIN_USER_EDIT_RESET_PASSWORD_HEADER: 'Reset da Password',
  ADMIN_USER_EDIT_RESET_PASSWORD_LINK_CANCEL:
    'Link para Cancelar Reset da Password',
  ADMIN_USER_EDIT_RESET_PASSWORD_LINK_CREATE:
    'Criar Link para Efectuar Reset da Password',
  ADMIN_USER_EDIT_RESET_PASSWORD_LINK_REFRESH:
    'Actualizar Link para Reset da Password',
  ADMIN_USER_EDIT_USERNAME: 'Utilizador',
  BACK_BUTTON: 'Retroceder',
  CONFIRM_ACCOUNT_EXPIRED:
    'O seu link de confirmação expirou. Por favor peça um novo link.',
  CONFIRM_ACCOUNT_HEADER_INVALID: `${_CC.config.siteTitle} | Link de confirmação Inválido.`,
  CONFIRM_ACCOUNT_HEADER_VALID: `${_CC.config.siteTitle} | Confirmar Conta`,
  CONFIRM_ACCOUNT_INVALID:
    'Este link de confirmação não é válido, talvez a conta tenha sido eliminada, ou alguns caracteres do link estão em falta?',
  CONFIRM_ACCOUNT_SET_PW_BUTTON: `Aderir ${_CC.config.siteTitle}`,
  CONFIRM_ACCOUNT_SET_PW_PLACEHOLDER: 'pa$$word!',
  CONFIRM_ACCOUNT_SET_PW_TEXT: (name) =>
    `Olá ${name}! Por favor introduza a sua password aqui.`,
  CONFIRM_ACCOUNT_SUCCESS: `Bem-vindo(a) a ${_CC.config.siteTitle}!`,
  LOGIN_BUTTON: 'Entrar',
  LOGIN_GOOGLE_BUTTON: 'Entrar com conta Google',
  LOGIN_PASSWORD_PLACEHOLDER: 'pa$$word!',
  LOGIN_PASSWORD: 'Password',
  LOGIN_USERNAME_PLACEHOLDER: 'João',
  LOGIN_USERNAME: 'Utilizador',
  LOGIN_INCORRECT_USERNAME: 'Utilizador incorrecto',
  LOGIN_INCORRECT_PASSWORD: 'Password incorrecta',
  LOGIN_SSO_UNKNOWN_USER: 'Utilizador desconhecido',
  LOGIN_SSO_LINK_SUCCESS: 'Conta ligada com sucesso',
  LOGIN_SSO_LINK_FAILURE: 'Não foi possivel ligar à conta',
  LOGIN_SSO_UNLINK_SUCCESS: 'Conta desligada com sucesso',
  LOGIN_SSO_UNLINK_FAILURE: 'Falhou desligamento da conta',
  LOGIN_SSO_LINK_FAILURE_ACCOUNT_EXISTS:
    'Esta conta externa já está ligada a outra conta neste site!',
  LOGOUT_BUTTON: 'Sair',
  NAVBAR_ADMIN: 'Opções de Administrador',
  NAVBAR_LOGIN: 'Entrar',
  NAVBAR_LOGOUT: 'Sair',
  NAVBAR_PROFILE: 'Perfil',
  NAVBAR_WISHLIST: 'A minha lista',
  NOTE_BACK: (name) => `Retroceder para lista de ${name}`,
  NOTE_GET_PRODUCT_DATA: 'Obter dados do produto',
  NOTE_GUARD: 'Utilizador inválido',
  NOTE_IMAGE_URL: 'URL da imagem',
  NOTE_MISSING_PROP: (prop) => `Propriedade em falta ${prop}`, // not really possible to localize this unfortunately
  NOTE_NAME: 'Nome',
  NOTE_NOTE: 'Nota',
  NOTE_PRICE: 'Preço',
  NOTE_REFRESH_DATA: 'Actualizar Dados',
  NOTE_REMOVE_GUARD: 'Utilizador inválido',
  NOTE_REMOVE_MISSING: 'Sem notas',
  NOTE_REMOVE_SUCCESS: 'Nota removida com sucesso',
  NOTE_SAVE_BUTTON: 'Guardar item',
  NOTE_SUCCESS: 'Gravado com sucesso!',
  NOTE_URL: 'URL',
  PROFILE_COAT_SIZE: 'Tamanho de Fato/Blazer/Casaco',
  PROFILE_DRESS_SIZE: 'Tamanho de Vestido',
  PROFILE_HAT_SIZE: 'Tamanho de chapeu',
  PROFILE_HEADER: 'Perfil',
  PROFILE_PANTS_SIZE: 'Tamanho de calças',
  PROFILE_PASSWORD_BUTTON: 'Guardar',
  PROFILE_PASSWORD_NEW: 'Nova Password',
  PROFILE_PASSWORD_OLD_MISMATCH: 'Password anterior errada',
  PROFILE_PASSWORD_OLD: 'Password anterior',
  PROFILE_PASSWORD_PLACEHOLDER: 'pa$$word!',
  PROFILE_PASSWORD_REQUIRED_NEW: 'Password Nova é necessária',
  PROFILE_PASSWORD_REQUIRED_OLD: 'Password Anterior é necessária',
  PROFILE_PASSWORD_SUCCESS: 'Alterações gravadas com sucesso successfully!',
  PROFILE_PASSWORD_TITLE: (name) => `Opções de perfil - Password - ${name}`,
  PROFILE_PHONE_MODEL: 'Modelo de telefone/telemóvel',
  PROFILE_RING_SIZE: 'Tamanho de anel',
  PROFILE_SAVE_PFP_DISABLED: 'Imagens de perfil estão desactivadas.',
  PROFILE_SAVE_PFP_SUCCESS: 'Imagem de perfil guardada!',
  PROFILE_SECURITY_CHANGE_PASSWORD: 'Alterar Password',
  PROFILE_SECURITY: 'Segurança',
  PROFILE_SECURITY_LINK_GOOGLE: 'Ligar a conta Google',
  PROFILE_SECURITY_UNLINK_GOOGLE: 'Desligar de conta Google',
  PROFILE_SHARED_INFORMATION: 'Informação Partilhada',
  PROFILE_SHIRT_SIZE: 'Tamanho de T-Shirt',
  PROFILE_SHOE_SIZE: 'Tamanho de Sapatos',
  PROFILE_SWEATER_SIZE: 'Tamanho de Blusa/Camisola',
  PROFILE_TITLE: (name) => `Opções de Perfil - ${name}`,
  PROFILE_UPDATE_INFO_SUCCESS: 'Dados partilhados actualizados!',
  RESET_PASSWORD_BUTTON: 'Reset de Password',
  RESET_PASSWORD_GREETING_EXPIRED:
    'O seu link para reset expirou. Por favor peça um link novo.',
  RESET_PASSWORD_GREETING_INVALID:
    'Este link de confirmação não é válido, talvez a conta tenha sido eliminada, ou alguns caracteres do link estão em falta?',
  RESET_PASSWORD_GREETING_VALID: (name) =>
    `Olá ${name}! Por favor introduza a sua password aqui.`,
  RESET_PASSWORD_HEADER_INVALID: `${_CC.config.siteTitle} | Link de Reset Inválido`,
  RESET_PASSWORD_HEADER_VALID: `${_CC.config.siteTitle} | Reset de Password`,
  RESET_PASSWORD_PASSWORD_PLACEHOLDER: 'pa$$word!',
  RESET_PASSWORD_PASSWORD: 'Password',
  RESET_PASSWORD_SUCCESS: 'Reset de Password efectuado com sucesso!',
  SETUP_ADMIN_USER: 'Administrador',
  SETUP_BUTTON: 'Configurar!',
  SETUP_HEADER: 'Configurar',
  SETUP_PASSWORD_PLACEHOLDER: 'pa$$word!',
  SETUP_PASSWORD: 'Password',
  SETUP_USERNAME_PLACEHOLDER: 'João',
  SETUP_USERNAME: 'Utilizador',
  SUPPORTED_SITES_HEADER: 'Sites suportados',
  SUPPORTED_SITES_TEXT:
    'Algum site em falta ou com erros? Utilize o seguinte link para reportar <a href="https://github.com/Wingysam/get-product-data/issues/new">here</a>! :)',
  UPDATE_NOTICE: (current, latest) => `
    <span class="has-text-danger is-size-4 has-text-weight-bold">
      Christmas Community está desactualizado. Poderão existir novas funções ou correcções de erros. Por favor actualize! :)
    </span>
    <br>
    <span>(pode desactivar este aviso com <code>UPDATE_CHECK=false</code>)</span>
    <br><br>
    <span>Current: ${current}</span>
    <br>
    <span>Latest: ${latest}</span>
    <span class="has-text-info" style="float: right;">Esta mensagem é apenas visivel para admins</span>`,
  WISHLIST_ADD: 'Adicionar item á lista',
  WISHLIST_ADDED_BY_USER: (addedBy) => `Adicionado por: ${addedBy}`,
  WISHLIST_ADDED_BY_GUEST: 'Utilizador Convidado',
  WISHLIST_ADDED_BY: 'Adicionado por',
  WISHLIST_ADDED_ITEM_TO_OWN_WISHLIST: 'Adicionado item à lista.',
  WISHLIST_CONFLICT:
    'Items estão a ser adicionados demasiado rápido. Por favor tente novamente.',
  WISHLIST_DELETE: 'Apagar',
  WISHLIST_EDIT_ITEM: 'Editar Item',
  WISHLIST_FETCH_FAIL: 'Erro na pesquisa da lista -- este utilizador existe?',
  WISHLIST_IMAGE: 'Imagem',
  WISHLIST_ITEM_MISSING: 'Erro a encontrar item',
  WISHLIST_MOVE_DOWN: 'Mover para baixo',
  WISHLIST_MOVE_BOTTOM: 'Mover para o fim',
  WISHLIST_MOVE_GUARD: 'Utilizador incorrecto',
  WISHLIST_MOVE_INVALID: 'Movimento inválido',
  WISHLIST_MOVE_ITEM_DOWN: 'Mover Item para Baixo',
  WISHLIST_MOVE_ITEM_BOTTOM: 'Mover Item para o Fim',
  WISHLIST_MOVE_ITEM_TOP: 'Mover Item para o Topo',
  WISHLIST_MOVE_ITEM_UP: 'Mover Item para cima',
  WISHLIST_MOVE_SUCCESS: 'Item movido com Sucesso!',
  WISHLIST_MOVE_TOP: 'Mover para o Topo',
  WISHLIST_MOVE_UNKNOWN_DIRECTION: 'Direcção desconhecida',
  WISHLIST_MOVE_UP: 'Mover para cima',
  WISHLIST_NAME: 'Nome',
  WISHLIST_NOTE: 'Nota',
  WISHLIST_OPTIONAL: 'Opcional',
  WISHLIST_PLEDGE_DUPLICATE: 'Item ja reservado por alguém',
  WISHLIST_PLEDGE_ITEM: 'Reservar item',
  WISHLIST_PLEDGE_SUCCESS: 'Item reservado com sucesso!',
  WISHLIST_PLEDGE: 'Reservar',
  WISHLIST_PLEDGED: (pledgedBy) => `Reservado por ${pledgedBy}`,
  WISHLIST_PLEDGED_GUEST: 'Reservado por convidado',
  WISHLIST_PLEDGED_ITEM_FOR_USER: (user) => `Item reservado para ${user}.`,
  WISHLIST_PRICE: 'Preço',
  WISHLIST_REFRESH_GUARD: 'Utilizador Inválido',
  WISHLIST_REFRESH_NO_URL: 'Item não tem URL.',
  WISHLIST_REFRESH_SUCCESS: 'Dados actualizados com sucesso!',
  WISHLIST_REMOVE_GUARD: 'Utilizador incorrecto',
  WISHLIST_REMOVE_SUCCESS: 'Removido da lista com sucesso',
  WISHLIST_SUGGEST: 'Item sugerido',
  WISHLIST_TITLE: (name) => `${_CC.config.siteTitle} - Lista - ${name}`,
  WISHLIST_UNPLEDGE_GUARD: 'Não reservou este item', // should never happen unless someone makes their own http requests
  WISHLIST_UNPLEDGE_SUCCESS: 'Reserva removida com sucesso!',
  WISHLIST_UNPLEDGE: 'Remover reserva',
  WISHLIST_URL_LABEL: `URL ou Nome do Item (<a href="${_CC.config.base}supported-sites">Supported Sites</a>)`,
  WISHLIST_URL_PLACEHOLDER: 'https://www.amazon.com/dp/B00ZV9RDKK',
  WISHLIST_URL_REQUIRED: 'URL ou Nome do item necessário!',
  WISHLISTS_COUNTS_SELF: (name) => `${name}: ???/???`,
  WISHLISTS_COUNTS: (name, pledged, total) => `${name}: ${pledged}/${total}`,
  WISHLISTS_TITLE: `${_CC.config.siteTitle} - Listas`,
} as const
