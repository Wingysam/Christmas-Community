module.exports.momentLocale = 'da'

module.exports.strings = {
  _NOT_LOCALIZED: key => `${key} er ikke blevet oversat til dansk endnu.`,
  ADMIN_CLEAR_WISHLISTS_BUTTON: 'Slet alle ønskelister',
  ADMIN_CLEAR_WISHLISTS_DESCRIPTION: '<b>Advarsel</b>: Dette vil <b>slette alt data</b>! Foretag venligst backup inden du fortsætter.',
  ADMIN_CLEAR_WISHLISTS_HEADER: 'Slet ønskelister',
  ADMIN_SETTINGS_CLEARDB_BUTTON: 'Slet ønskelister',
  ADMIN_SETTINGS_CLEARDB_DESCRIPTION: '<b>Advarsel</b>: Dette vil <b>slette alt data</b>! Foretag venligst backup inden du fortsætter.',
  ADMIN_SETTINGS_CLEARDB_HEADER: 'Slet data',
  ADMIN_SETTINGS_CLEARDB_SUCCESS: 'Slet alle ønskelister',
  ADMIN_SETTINGS_HEADER: 'Administration',
  ADMIN_SETTINGS_USERS_ADD_BUTTON: 'Tilføj bruger',
  ADMIN_SETTINGS_USERS_ADD_HEADER: 'Tilføj bruger',
  ADMIN_SETTINGS_USERS_ADD_PLACEHOLDER: 'john',
  ADMIN_SETTINGS_USERS_ADD_USERNAME: 'Brugernavn',
  ADMIN_SETTINGS_USERS_ADD_ERROR_USERNAME_EMPTY: 'Brugernavn er påkrævet',
  ADMIN_SETTINGS_USERS_EDIT_DELETE_FAIL_ADMIN: 'Brugeren er administrator',
  ADMIN_SETTINGS_USERS_EDIT_DELETE_SUCCESS: name => `Brugeren blev fjernet - ${name}`,
  ADMIN_SETTINGS_USERS_EDIT_DEMOTE_NOT_ADMIN: 'Bruger er ikke administrator',
  ADMIN_SETTINGS_USERS_EDIT_DEMOTE_SELF: 'Du kan ikke degradere dig selv.',
  ADMIN_SETTINGS_USERS_EDIT_DEMOTE_SUCCESS: name => `${name} er ikke længere administrator.`,
  ADMIN_SETTINGS_USERS_EDIT_IMPERSONATE_SUCCESS: name => `Du er nu logget ind som ${name}.`,
  ADMIN_SETTINGS_USERS_EDIT_NO_USERNAME_PROVIDED: 'Brugernavn er påkrævet',
  ADMIN_SETTINGS_USERS_EDIT_PROMOTE_ALREADY_ADMIN: 'Brugeren er allerede administrator',
  ADMIN_SETTINGS_USERS_EDIT_PROMOTE_DEMOTE_NOT_FOUND: 'Brugeren blev ikke fundet',
  ADMIN_SETTINGS_USERS_EDIT_PROMOTE_SUCCESS: name => `${name} er nu administrator.`,
  ADMIN_SETTINGS_USERS_EDIT_RENAMED_USER: 'Omdøb bruger',
  ADMIN_SETTINGS_USERS_EDIT_SAME_NAME: 'Brugernavnet er optaget.',
  ADMIN_SETTINGS_USERS_EDIT: 'Redigér',
  ADMIN_SETTINGS_USERS_HEADER: 'Brugere',
  ADMIN_SETTINGS_VERSION_INFO: 'Version',
  ADMIN_USER_EDIT_ACCOUNT_UNCONFIRMED: 'Kontoen er ikke bekræftet.',
  ADMIN_USER_EDIT_ADMIN_ISADMIN: name => `${name} er administrator.`,
  ADMIN_USER_EDIT_ADMIN_NOTADMIN: name => `${name} er ikke administrator.`,
  ADMIN_USER_EDIT_ADMIN: 'Administrator',
  ADMIN_USER_EDIT_CHANGE_NAME: 'Ændre navn',
  ADMIN_USER_EDIT_CHANGE_USERNAME: 'Ændre brugernavn',
  ADMIN_USER_EDIT_CONFIRMATION_LINK: 'Bekræftelseslink',
  ADMIN_USER_EDIT_DELETE_ADMIN: 'Brugeren er administrator',
  ADMIN_USER_EDIT_DELETE_HEADER: 'Permanent sletning',
  ADMIN_USER_EDIT_DELETE_USER: name => `Slet bruger - ${name}`,
  ADMIN_USER_EDIT_DEMOTE_SELF: 'Du kan ikke degradere dig selv',
  ADMIN_USER_EDIT_DEMOTE: name => `Degradér ${name}`,
  ADMIN_USER_EDIT_EDITING_USER: name => `Rediger bruger - "${name}"`,
  ADMIN_USER_EDIT_GENERATE_NEW_LINK: 'Generér nyt link',
  ADMIN_USER_EDIT_IMPERSONATE_BUTTON: name => `Log ind som ${name}`,
  ADMIN_USER_EDIT_IMPERSONATE_HEADER: 'Log ind som bruger',
  ADMIN_USER_EDIT_LINK_EXPIRY_FUTURE: fromNow => `Linket udløbet ${fromNow}`, // fromNow is localized by moment
  ADMIN_USER_EDIT_LINK_EXPIRY_PAST: fromNow => `Linket udløb ${fromNow}`,
  ADMIN_USER_EDIT_PROMOTE: name => `Forfrem ${name}`,
  ADMIN_USER_EDIT_RESET_PASSWORD_HASLINK_EXPIRY_FUTURE: fromNow => `Udløber ${fromNow}`,
  ADMIN_USER_EDIT_RESET_PASSWORD_HASLINK_EXPIRY_PAST: fromNow => `Udløb ${fromNow}`,
  ADMIN_USER_EDIT_RESET_PASSWORD_HASLINK: 'Der eksistere ikke et gendannelseslink for denne bruger',
  ADMIN_USER_EDIT_RESET_PASSWORD_HEADER: 'Gendan adgangskode',
  ADMIN_USER_EDIT_RESET_PASSWORD_LINK_CANCEL: 'Annullér gendannelseslink',
  ADMIN_USER_EDIT_RESET_PASSWORD_LINK_CREATE: 'Opret gendannelseslink',
  ADMIN_USER_EDIT_RESET_PASSWORD_LINK_REFRESH: 'Opdatér gendannelseslink',
  ADMIN_USER_EDIT_USERNAME: 'Brugernavn',
  BACK_BUTTON: 'Tilbage',
  CONFIRM_ACCOUNT_EXPIRED: 'Dit bekræftelseslink er udløbet. Kontakt venligst administoren for et nyt.',
  CONFIRM_ACCOUNT_HEADER_INVALID: `${_CC.config.siteTitle} | Bekræftelseslink er ugyldigt`,
  CONFIRM_ACCOUNT_HEADER_VALID: `${_CC.config.siteTitle} | Bekræft konto`,
  CONFIRM_ACCOUNT_INVALID: 'Bekræftelseslinket er ikke gyldigt - kontrollér venligst at linket er komplet.',
  CONFIRM_ACCOUNT_SET_PW_BUTTON: 'Opret bruger',
  CONFIRM_ACCOUNT_SET_PW_PLACEHOLDER: 'pa$$word!',
  CONFIRM_ACCOUNT_SET_PW_TEXT: name => `Hej ${name}! Vælg venligst din adgangskode her.`,
  CONFIRM_ACCOUNT_SUCCESS: `Velkommen til ${_CC.config.siteTitle}!`,
  LOGIN_BUTTON: 'Log ind',
  LOGIN_PASSWORD_PLACEHOLDER: 'pa$$word!',
  LOGIN_PASSWORD: 'Adgangskode',
  LOGIN_USERNAME_PLACEHOLDER: 'john',
  LOGIN_USERNAME: 'Brugernavn',
  LOGOUT_BUTTON: 'Log ud',
  NAVBAR_ADMIN: 'Adminstration',
  NAVBAR_LOGIN: 'Log ind',
  NAVBAR_LOGOUT: 'Log ud',
  NAVBAR_PROFILE: 'Profil',
  NAVBAR_WISHLIST: 'Min ønskeliste',
  NOTE_BACK: name => `Tilbage til ${name}'s ønskeliste`,
  NOTE_GET_PRODUCT_DATA: 'Hent produktdata',
  NOTE_GUARD: 'Forkert bruger',
  NOTE_IMAGE_URL: 'Billedlink',
  NOTE_MISSING_PROP: prop => `Mangler feltet ${prop}`, // not really possible to localize this unfortunately
  NOTE_NAME: 'Navn',
  NOTE_NOTE: 'Note',
  NOTE_PRICE: 'Pris',
  NOTE_REFRESH_DATA: 'Genindlæs data',
  NOTE_REMOVE_GUARD: 'Forkert bruger',
  NOTE_REMOVE_MISSING: 'Ingen note er tilføjet',
  NOTE_REMOVE_SUCCESS: 'Noten er slettet',
  NOTE_SAVE_BUTTON: 'Gem note',
  NOTE_SUCCESS: 'Noten er gemt',
  NOTE_URL: 'Link',
  PROFILE_HEADER: 'Profil',
  PROFILE_PASSWORD_BUTTON: 'Gem',
  PROFILE_PASSWORD_NEW: 'Ny adgangskode',
  PROFILE_PASSWORD_OLD_MISMATCH: 'Nuværende adgangskode er forkert',
  PROFILE_PASSWORD_OLD: 'Nuværende adgangskode',
  PROFILE_PASSWORD_PLACEHOLDER: 'pa$$word!',
  PROFILE_PASSWORD_REQUIRED_NEW: 'Ny adgangskode er påkrævet',
  PROFILE_PASSWORD_REQUIRED_OLD: 'Nuværende adgangskode er påkrævet',
  PROFILE_PASSWORD_SUCCESS: 'Ændringerne er gemt.',
  PROFILE_PASSWORD_TITLE: name => `Profilindstillinger - Adgangskode - ${name}`,
  PROFILE_PFP_IMAGE_URL: 'Billedlink',
  PROFILE_SAVE_PFP_DISABLED: 'Profilbilleder er deaktiveret',
  PROFILE_SAVE_PFP_SUCCESS: 'Profilbilledet er gemt.',
  PROFILE_SECURITY_CHANGE_PASSWORD: 'Ændre adgangskode',
  PROFILE_SECURITY: 'Sikkerhedsindstillinger',
  PROFILE_TITLE: name => `Kontoindstillinger - ${name}`,
  RESET_PASSWORD_BUTTON: 'Gendan adgangskode',
  RESET_PASSWORD_GREETING_EXPIRED: 'Gendannelseslinket er udløbet. Kontakt administrator for at få et nyt.',
  RESET_PASSWORD_GREETING_INVALID: 'Ugyldigt gendannelseslink - kontrollér venligst at linket er komplet.',
  RESET_PASSWORD_GREETING_VALID: name => `Hej ${name}! Vælg din nye adgangskode her.`,
  RESET_PASSWORD_HEADER_INVALID: `${_CC.config.siteTitle} | Ugyldigt link`,
  RESET_PASSWORD_HEADER_VALID: `${_CC.config.siteTitle} | Gendan adgangskode`,
  RESET_PASSWORD_PASSWORD_PLACEHOLDER: 'pa$$word!',
  RESET_PASSWORD_PASSWORD: 'Adgangskode',
  RESET_PASSWORD_SUCCESS: 'Adgangskoden er blevet ændret',
  SETUP_ADMIN_USER: 'Admin bruger',
  SETUP_BUTTON: 'Installér',
  SETUP_HEADER: 'Installation',
  SETUP_PASSWORD_PLACEHOLDER: 'pa$$word!',
  SETUP_PASSWORD: 'Adgangskode',
  SETUP_USERNAME_PLACEHOLDER: 'john',
  SETUP_USERNAME: 'Brugernavn',
  SUPPORTED_SITES_HEADER: 'Supporterede hjemmesider',
  SUPPORTED_SITES_TEXT: 'Is a site missing or broken? Open an issue <a href="https://github.com/Wingysam/get-product-data/issues/new">here</a>! :)',
  UPDATE_NOTICE: (current, latest) => `
    <span class="has-text-danger is-size-4 has-text-weight-bold">
      Christmas Community is out of date. There may be new features or bug fixes. Consider updating! :)
    </span>
    <br>
    <span>(you can turn this off with <code>UPDATE_CHECK=false</code>)</span>
    <br><br>
    <span>Current: ${current}</span>
    <br>
    <span>Latest: ${latest}</span>
    <span class="has-text-info" style="float: right;">This message is only visible to admins</span>`,
  WISHLIST_ADD: 'Tilføj ønske',
  WISHLIST_ADDED_BY_USER: addedBy => `Tilføjet af: ${addedBy}`,
  WISHLIST_ADDED_BY: 'Tilføjet af',
  WISHLIST_ADDED_ITEM_TO_OWN_WISHLIST: 'Ønsket er tilføjet.',
  WISHLIST_CONFLICT: 'Gaver tilføjet for hurtigt. Prøv igen om lidt.',
  WISHLIST_DELETE: 'Slet',
  WISHLIST_EDIT_ITEM: 'Ændre ønske',
  WISHLIST_FETCH_FAIL: 'Ønskelisten blev ikke fundet',
  WISHLIST_IMAGE: 'Billede',
  WISHLIST_ITEM_MISSING: 'Gaven blev ikke fundet',
  WISHLIST_MOVE_DOWN: 'Flyt ned',
  WISHLIST_MOVE_GUARD: 'Forkert bruger',
  WISHLIST_MOVE_INVALID: 'Ukendt retning',
  WISHLIST_MOVE_ITEM_DOWN: 'Flyt ned',
  WISHLIST_MOVE_ITEM_TOP: 'Flyt til toppen',
  WISHLIST_MOVE_ITEM_UP: 'Flyt op',
  WISHLIST_MOVE_SUCCESS: 'Gaven er flyttet',
  WISHLIST_MOVE_TOP: 'Flyt til toppen',
  WISHLIST_MOVE_UNKNOWN_DIRECTION: 'Ukendt retning',
  WISHLIST_MOVE_UP: 'Flyt op',
  WISHLIST_NAME: 'Titel',
  WISHLIST_NOTE: 'Beskrivelse',
  WISHLIST_OPTIONAL: 'Frivilligt',
  WISHLIST_PLEDGE_DUPLICATE: 'Gaven er allerede reserveret',
  WISHLIST_PLEDGE_ITEM: 'Reservér gave',
  WISHLIST_PLEDGE_SUCCESS: 'Gaven er nu reserveret',
  WISHLIST_PLEDGE: 'Reservér',
  WISHLIST_PLEDGED: pledgedBy => `Reserveret af ${pledgedBy}`,
  WISHLIST_PLEDGED_GUEST: 'Reserveret af en gæst',
  WISHLIST_PLEDGED_ITEM_FOR_USER: user => `Reserveret gave for ${user}.`,
  WISHLIST_PRICE: 'Pris',
  WISHLIST_REFRESH_GUARD: 'Forkert bruger',
  WISHLIST_REFRESH_NO_URL: 'Mangler link',
  WISHLIST_REFRESH_SUCCESS: 'Gavedata er genindlæst',
  WISHLIST_REMOVE_GUARD: 'Forkert bruger',
  WISHLIST_REMOVE_SUCCESS: 'Gaven er fjernet fra ønskelisten',
  WISHLIST_SUGGEST: 'Foreslå gave',
  WISHLIST_TITLE: name => `Ønskeliste - ${name}`,
  WISHLIST_UNPLEDGE_GUARD: 'Fejl - du har ikke reserveret denne gave', // should never happen unless someone makes their own http requests
  WISHLIST_UNPLEDGE_SUCCESS: 'Reservationen er nu fjernet',
  WISHLIST_UNPLEDGE: 'Fjern reservation',
  WISHLIST_URL_LABEL: `Link eller titel (<a href="${_CC.config.base}supported-sites">Supporterede hjemmesider</a>)`,
  WISHLIST_URL_PLACEHOLDER: 'https://www.amazon.com/dp/B00ZV9RDKK',
  WISHLIST_URL_REQUIRED: 'Link eller titel er påkrævet',
  WISHLISTS_COUNTS: (name, pledged, total) => `${name}: ${pledged}/${total}`,
  WISHLISTS_TITLE: 'Ønskelister'
}
