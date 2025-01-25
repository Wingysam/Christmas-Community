export const momentLocale = 'ro-RO'

export const strings = {
  _NOT_LOCALIZED: (key) => `${key} încă nu a fost tradus în Română.`,
  ADMIN_CLEAR_WISHLISTS_BUTTON: 'Ștergeți toate listele cu dorințe',
  ADMIN_CLEAR_WISHLISTS_DESCRIPTION:
    'Această acțiune va <b>șterge toate listele cu dorințe definitiv!</b> Se recomandă exportarea unei copii de rezervă înainte de a utiliza această opțiune.',
  ADMIN_CLEAR_WISHLISTS_HEADER: 'Ștergeți toate listele cu dorințe',
  ADMIN_SETTINGS_CLEARDB_BUTTON: 'Clear Wishlists',
  ADMIN_SETTINGS_CLEARDB_DESCRIPTION:
    '<b>Atenție</b>: aceste opțiuni vor <b>șterge date</b>! Se recomandă exportarea unei copii de rezervă a bazei de date înainte de a utiliza aceaste opțiuni.',
  ADMIN_SETTINGS_CLEARDB_HEADER: 'Ștergere date',
  ADMIN_SETTINGS_CLEARDB_SUCCESS: 'Toate listele cu dorințe au fost șterse.',
  ADMIN_SETTINGS_HEADER: 'Setări de administrator',
  ADMIN_SETTINGS_USERS_ADD_BUTTON: 'Adăugați un utilizator',
  ADMIN_SETTINGS_USERS_ADD_HEADER: 'Adăugați un utilizator',
  ADMIN_SETTINGS_USERS_ADD_PLACEHOLDER: 'ion',
  ADMIN_SETTINGS_USERS_ADD_USERNAME: 'Nume de utilizator',
  ADMIN_SETTINGS_USERS_ADD_ERROR_USERNAME_EMPTY:
    'Numele de utilizator trebuie completat.',
  ADMIN_SETTINGS_USERS_EDIT_DELETE_FAIL_ADMIN:
    'Nu s-a putut șterge: utilizatorul este administrator.',
  ADMIN_SETTINGS_USERS_EDIT_DELETE_SUCCESS: (name) =>
    `Utilizatorul ${name} șters cu succes!`,
  ADMIN_SETTINGS_USERS_EDIT_DEMOTE_NOT_ADMIN:
    'utilizatorul nu este administrator',
  ADMIN_SETTINGS_USERS_EDIT_DEMOTE_SELF:
    'Nu puteți modifica tipul de acces pe care îl aveți.',
  ADMIN_SETTINGS_USERS_EDIT_DEMOTE_SUCCESS: (name) =>
    `${name} nu mai este administrator.`,
  ADMIN_SETTINGS_USERS_EDIT_IMPERSONATE_SUCCESS: (name) =>
    `Sunteți acum ${name}.`,
  ADMIN_SETTINGS_USERS_EDIT_NO_USERNAME_PROVIDED:
    'Nu a fost completat numele de utilizator.',
  ADMIN_SETTINGS_USERS_EDIT_PROMOTE_ALREADY_ADMIN:
    'utilizatorul este deja administrator',
  ADMIN_SETTINGS_USERS_EDIT_PROMOTE_DEMOTE_NOT_FOUND:
    'Utilizatorul nu a putut fi găsit.',
  ADMIN_SETTINGS_USERS_EDIT_PROMOTE_SUCCESS: (name) =>
    `${name} este acum un administrator.`,
  ADMIN_SETTINGS_USERS_EDIT_RENAMED_USER: 'Utilizator redenumit!',
  ADMIN_SETTINGS_USERS_EDIT_SAME_NAME:
    'Numele de utilizator este același ca cel nou.',
  ADMIN_SETTINGS_USERS_EDIT: 'Modificați',
  ADMIN_SETTINGS_USERS_HEADER: 'Utilizatori',
  ADMIN_SETTINGS_VERSION_INFO: 'Versiune',
  ADMIN_USER_EDIT_ACCOUNT_UNCONFIRMED: 'Acest cont încă nu a fost confirmat.',
  ADMIN_USER_EDIT_ADMIN_ISADMIN: (name) => `${name} este administrator.`,
  ADMIN_USER_EDIT_ADMIN_NOTADMIN: (name) => `${name} nu este administrator.`,
  ADMIN_USER_EDIT_ADMIN: 'Administrator',
  ADMIN_USER_EDIT_CHANGE_NAME: 'Schimbați nume',
  ADMIN_USER_EDIT_CHANGE_USERNAME: 'Schimbați nume de utilizator',
  ADMIN_USER_EDIT_CONFIRMATION_LINK: 'Link de confirmare',
  ADMIN_USER_EDIT_DELETE_ADMIN: 'Utilizatorul este un administrator',
  ADMIN_USER_EDIT_DELETE_HEADER: 'Ștergere ireversibilă',
  ADMIN_USER_EDIT_DELETE_USER: (name) => `Ștergeți utilizatorul ${name}`,
  ADMIN_USER_EDIT_DEMOTE_SELF:
    'Nu puteți modifica tipul de acces pe care îl aveți',
  ADMIN_USER_EDIT_DEMOTE: (name) => `Retrogradați pe ${name}`,
  ADMIN_USER_EDIT_EDITING_USER: (name) => `Editarea utilizatorului "${name}"`,
  ADMIN_USER_EDIT_GENERATE_NEW_LINK: 'Generați un nou Link',
  ADMIN_USER_EDIT_IMPERSONATE_BUTTON: (name) => `Conectați-vă ca ${name}`,
  ADMIN_USER_EDIT_IMPERSONATE_HEADER: 'Mod utilizator',
  ADMIN_USER_EDIT_LINK_EXPIRY_FUTURE: (fromNow) =>
    `Link-ul următor expiră în ${fromNow}`, // fromNow is localized by moment
  ADMIN_USER_EDIT_LINK_EXPIRY_PAST: (fromNow) =>
    `Link-ul următor a expirat acum ${fromNow}`,
  ADMIN_USER_EDIT_PROMOTE: (name) => `Promovați ${name}`,
  ADMIN_USER_EDIT_RESET_PASSWORD_HASLINK_EXPIRY_FUTURE: (fromNow) =>
    `Expiră în ${fromNow}`,
  ADMIN_USER_EDIT_RESET_PASSWORD_HASLINK_EXPIRY_PAST: (fromNow) =>
    `A expirat acum ${fromNow}`,
  ADMIN_USER_EDIT_RESET_PASSWORD_HASLINK:
    'Există un link pentru resetarea parolei acestui utilizator.',
  ADMIN_USER_EDIT_RESET_PASSWORD_HEADER: 'Resetați parola',
  ADMIN_USER_EDIT_RESET_PASSWORD_LINK_CANCEL:
    'Anulați link-ul pentru resetarea parolei',
  ADMIN_USER_EDIT_RESET_PASSWORD_LINK_CREATE:
    'Creați un link pentru resetarea parolei',
  ADMIN_USER_EDIT_RESET_PASSWORD_LINK_REFRESH:
    'Regenerați link-ul de resetare a parolei',
  ADMIN_USER_EDIT_USERNAME: 'Nume de utilizator',
  BACK_BUTTON: 'Înapoi',
  CONFIRM_ACCOUNT_EXPIRED:
    'Link-ul dvs. de confirmare a expirat. Vă rugăm solicitați unul nou.',
  CONFIRM_ACCOUNT_HEADER_INVALID: `${_CC.config.siteTitle} | Link de Confirmare invalid`,
  CONFIRM_ACCOUNT_HEADER_VALID: `${_CC.config.siteTitle} | Confirmați cont`,
  CONFIRM_ACCOUNT_INVALID:
    'Acest link de confirmare nu este valabil, este posibil, contul să fi fost șters sau ca o parte din caractere să nu se fi copiat?',
  CONFIRM_ACCOUNT_SET_PW_BUTTON: `Alăturați-vă ${_CC.config.siteTitle}`,
  CONFIRM_ACCOUNT_SET_PW_PLACEHOLDER: 'parolă!',
  CONFIRM_ACCOUNT_SET_PW_TEXT: (name) =>
    `Bună ziua, ${name}! Vă rugăm, setați-vă parola aici.`,
  CONFIRM_ACCOUNT_SUCCESS: `Bun venit la ${_CC.config.siteTitle}!`,
  LOGIN_BUTTON: 'Conectați-vă',
  LOGIN_PASSWORD_PLACEHOLDER: 'parolă!',
  LOGIN_PASSWORD: 'Parolă',
  LOGIN_USERNAME_PLACEHOLDER: 'ion',
  LOGIN_USERNAME: 'Nume de utilizator',
  LOGOUT_BUTTON: 'Deconectați-vă',
  NAVBAR_ADMIN: 'Admin Settings',
  NAVBAR_LOGIN: 'Conectați-vă',
  NAVBAR_LOGOUT: 'Deconectați-vă',
  NAVBAR_PROFILE: 'Profil',
  NAVBAR_WISHLIST: 'List mea de dorințe',
  NOTE_BACK: (name) => `Înapoi la lista de dorințe a lui ${name}`,
  NOTE_GET_PRODUCT_DATA: 'Obțineți date despre produs',
  NOTE_GUARD: 'Utilizator invalid',
  NOTE_IMAGE_URL: 'URL Imagine',
  NOTE_MISSING_PROP: (prop) => `Proprietatea ${prop} lipsește`, // not really possible to localize this unfortunately
  NOTE_NAME: 'Nume',
  NOTE_NOTE: 'Notă',
  NOTE_PRICE: 'Preț',
  NOTE_REFRESH_DATA: 'Reîmprospătați informațiile',
  NOTE_REMOVE_GUARD: 'Utilizator invalid',
  NOTE_REMOVE_MISSING: 'Nu există notă',
  NOTE_REMOVE_SUCCESS: 'Notă ștearsă cu succes',
  NOTE_SAVE_BUTTON: 'Salvați articol',
  NOTE_SUCCESS: 'Salvat cu succes!',
  NOTE_URL: 'URL',
  PROFILE_HEADER: 'Profil',
  PROFILE_PASSWORD_BUTTON: 'Salvați',
  PROFILE_PASSWORD_NEW: 'Parolă nouă',
  PROFILE_PASSWORD_OLD_MISMATCH: 'Parola veche greșită',
  PROFILE_PASSWORD_OLD: 'Parola veche',
  PROFILE_PASSWORD_PLACEHOLDER: 'parolă!',
  PROFILE_PASSWORD_REQUIRED_NEW: 'Parola nouă trebuie completată',
  PROFILE_PASSWORD_REQUIRED_OLD: 'Parola veche trebuie completată',
  PROFILE_PASSWORD_SUCCESS: 'Modificările au fost salvate cu succes!',
  PROFILE_PASSWORD_TITLE: (name) => `Setări Profil - Parolă - ${name}`,
  PROFILE_SAVE_PFP_DISABLED: 'Imaginile de profil au fost dezactivate.',
  PROFILE_SAVE_PFP_SUCCESS: 'Imagine de profil salvată!',
  PROFILE_SECURITY_CHANGE_PASSWORD: 'Schimbare parolă',
  PROFILE_SECURITY: 'Securitate',
  PROFILE_TITLE: (name) => `Setări Profil - ${name}`,
  RESET_PASSWORD_BUTTON: 'Resetați parola',
  RESET_PASSWORD_GREETING_EXPIRED:
    'Acest link de resetare a expirat. Vă rugăm solicitați unul nou.',
  RESET_PASSWORD_GREETING_INVALID:
    'Acest link de resetare nu este valabil, este posibil ca link-ul să fi fost anulat sau ca o parte din caractere să nu se fi copiat?',
  RESET_PASSWORD_GREETING_VALID: (name) =>
    `Bună ziua, ${name}! Vă rugăm setați-vă parola.`,
  RESET_PASSWORD_HEADER_INVALID: `${_CC.config.siteTitle} | Link de resetare invalid`,
  RESET_PASSWORD_HEADER_VALID: `${_CC.config.siteTitle} | Resetați parola`,
  RESET_PASSWORD_PASSWORD_PLACEHOLDER: 'parolă!',
  RESET_PASSWORD_PASSWORD: 'Parolă',
  RESET_PASSWORD_SUCCESS: 'Parola resetată cu succes!',
  SETUP_ADMIN_USER: 'Utilizator administrator',
  SETUP_BUTTON: 'Configurați!',
  SETUP_HEADER: 'Confgiurare',
  SETUP_PASSWORD_PLACEHOLDER: 'parolă!',
  SETUP_PASSWORD: 'Parolă',
  SETUP_USERNAME_PLACEHOLDER: 'ion',
  SETUP_USERNAME: 'Nume de utilizator',
  SUPPORTED_SITES_HEADER: 'Site-uri suportate',
  SUPPORTED_SITES_TEXT:
    'Este vreun site care lipsește sau nu funcționează corect? Sesizați problema <a href="https://github.com/Wingysam/get-product-data/issues/new">aici</a>! :)',
  UPDATE_NOTICE: (current, latest) => `
    <span class="has-text-danger is-size-4 has-text-weight-bold">
      Folosiți o versiune învechită a Christmas Community. Este posibil să se fi adăugat noi funcții și rezolvat erori. Este recomandată actualizarea! :)
    </span>
    <br>
    <span>(puteți opri acest mesaj cu <code>UPDATE_CHECK=false</code>)</span>
    <br><br>
    <span>Versiune curentă: ${current}</span>
    <br>
    <span>Ultima versiune: ${latest}</span>
    <span class="has-text-info" style="float: right;">Acest mesaj poate fi văzut numai de administratori</span>`,
  WISHLIST_ADD: 'Adăugați articol la lista de dorințe',
  WISHLIST_ADDED_BY_USER: (addedBy) => `Adăugat de: ${addedBy}`,
  WISHLIST_ADDED_BY_GUEST: 'Utilizator Invitat',
  WISHLIST_ADDED_BY: 'Adăugat de',
  WISHLIST_CONFLICT:
    'Prea multe articole sunt adăugate în același timp. Vă rugăm încercați mai târziu.',
  WISHLIST_DELETE: 'Ștergeți',
  WISHLIST_EDIT_ITEM: 'Modificați Articol',
  WISHLIST_IMAGE: 'Imagine',
  WISHLIST_MOVE_DOWN: 'Mutați în jos',
  WISHLIST_MOVE_GUARD: 'Utilizatorul nu este corect',
  WISHLIST_MOVE_INVALID: 'Mutare Invalidă',
  WISHLIST_MOVE_ITEM_DOWN: 'Mutați Articol în Jos',
  WISHLIST_MOVE_ITEM_TOP: 'Mutați Articol pe prima linie',
  WISHLIST_MOVE_ITEM_UP: 'Mutați Articol în sus',
  WISHLIST_MOVE_SUCCESS: 'Articol mutat cu succes!',
  WISHLIST_MOVE_TOP: 'Mutați pe prima linie',
  WISHLIST_MOVE_UP: 'Mutați în sus',
  WISHLIST_NAME: 'Nume',
  WISHLIST_NOTE: 'Notă',
  WISHLIST_OPTIONAL: 'Opțional',
  WISHLIST_PLEDGE_DUPLICATE: 'Cineva a rezervat deja acest produs',
  WISHLIST_PLEDGE_ITEM: 'Rezervați cadoul',
  WISHLIST_PLEDGE_SUCCESS: 'Ați rezervat cadoul!',
  WISHLIST_PLEDGE: 'Rezervați cad',
  WISHLIST_PLEDGED: (pledgedBy) => `Rezervat de către ${pledgedBy}`,
  WISHLIST_PLEDGED_GUEST: 'Rezervat de către un vizitator',
  WISHLIST_PRICE: 'Preț',
  WISHLIST_REFRESH_GUARD: 'Utilizator Invalid',
  WISHLIST_REFRESH_NO_URL: 'Articolul nu are URL.',
  WISHLIST_REFRESH_SUCCESS: 'Date reîmprospătate cu succes!',
  WISHLIST_REMOVE_GUARD: 'Utilizatorul nu este corect',
  WISHLIST_REMOVE_MISSING: 'Aricolul nu a putut fi găsit',
  WISHLIST_REMOVE_SUCCESS: 'Șters cu succes din lista cu dorințe',
  WISHLIST_SUGGEST: 'Sugerați articol',
  WISHLIST_TITLE: (name) =>
    `${_CC.config.siteTitle} - Lista cu Dorințe - ${name}`,
  WISHLIST_UNPLEDGE_GUARD: 'Nu ați rezervat acest produs', // should never happen unless someone makes their own http requests
  WISHLIST_UNPLEDGE_MISSING: 'Nu s-a putut găsi produsul',
  WISHLIST_UNPLEDGE_SUCCESS: 'Ați anulat cu succes rezervarea cadoului!',
  WISHLIST_UNPLEDGE: 'Anulați rezervarea',
  WISHLIST_URL_LABEL: `URL-ul sau numele articolului (<a href="${_CC.config.base}supported-sites">Site-uri Suportate</a>)`,
  WISHLIST_URL_PLACEHOLDER: 'https://www.amazon.com/dp/B00ZV9RDKK',
  WISHLIST_URL_REQUIRED: 'URL-ul sau numele articolului trebuie completat',
  WISHLISTS_COUNTS_SELF: (name) => `${name}: ???/???`,
  WISHLISTS_COUNTS: (name, pledged, total) => `${name}: ${pledged}/${total}`,
  WISHLISTS_TITLE: `${_CC.config.siteTitle} - Liste cu Dorințe`,
} as const
