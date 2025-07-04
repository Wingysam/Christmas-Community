export const momentLocale = 'fr'

export const notTranslated = (englishString) =>
  `${englishString} (pas encore traduit en français)`

export const strings = {
  ADMIN_CLEAR_WISHLISTS_BUTTON: "Effacer toutes les listes d'envies",
  ADMIN_CLEAR_WISHLISTS_DESCRIPTION:
    "Cela supprimera instantanément et de manière <b>irréversible toutes les listes d'envies!</b> Pensez à faire une sauvegarde de la base de données avant d'utiliser cette option.",
  ADMIN_CLEAR_WISHLISTS_HEADER: "Suppression de la liste d'envie",
  ADMIN_SETTINGS_CLEARDB_BUTTON: "Videz la liste d'envie",
  ADMIN_SETTINGS_CLEARDB_DESCRIPTION:
    "<b>Attention</b>: Ces options <b>supprime les données</b>! Pensez à faire une sauvegarde avant d'utiliser cette option.",
  ADMIN_SETTINGS_CLEARDB_HEADER: 'Suppression des données',
  ADMIN_SETTINGS_CLEARDB_SUCCESS: "Suppression de toutes les listes d'envies.",
  ADMIN_SETTINGS_HEADER: 'Paramètres Administrateurs',
  ADMIN_SETTINGS_USERS_ADD_BUTTON: 'Ajouter un Utilisateur',
  ADMIN_SETTINGS_USERS_ADD_HEADER: 'Ajouter un utilisateur',
  ADMIN_SETTINGS_USERS_ADD_PLACEHOLDER: 'jean',
  ADMIN_SETTINGS_USERS_ADD_USERNAME: "Nom d'utilisateur",
  ADMIN_SETTINGS_USERS_ADD_ERROR_USERNAME_EMPTY:
    "Le nom d'utilisateur ne peut pas être vide.",
  ADMIN_SETTINGS_USERS_EDIT_DELETE_FAIL_ADMIN:
    "Échec de la suppression : l'utilisateur est un administrateur.",
  ADMIN_SETTINGS_USERS_EDIT_DELETE_SUCCESS: (name) =>
    `Utilisateur supprimé avec succès ${name}`,
  ADMIN_SETTINGS_USERS_EDIT_DEMOTE_NOT_ADMIN:
    "l'utilisateur n'est pas un administrateur",
  ADMIN_SETTINGS_USERS_EDIT_DEMOTE_SELF:
    'Vous ne pouvez pas vous supprimer vous même.',
  ADMIN_SETTINGS_USERS_EDIT_DEMOTE_SUCCESS: (name) =>
    `${name} n'est plus un administrateur.`,
  ADMIN_SETTINGS_USERS_EDIT_IMPERSONATE_SUCCESS: (name) =>
    `Vous êtes maintenant ${name}.`,
  ADMIN_SETTINGS_USERS_EDIT_NO_USERNAME_PROVIDED:
    "Aucun nom d'utilisateur fourni",
  ADMIN_SETTINGS_USERS_EDIT_PROMOTE_ALREADY_ADMIN:
    'cet utilisateur est déjà administrateur',
  ADMIN_SETTINGS_USERS_EDIT_PROMOTE_DEMOTE_NOT_FOUND: 'Utilisateur non trouvé.',
  ADMIN_SETTINGS_USERS_EDIT_PROMOTE_SUCCESS: (name) =>
    `${name} est maintenant un administrateur.`,
  ADMIN_SETTINGS_USERS_EDIT_RENAMED_USER: 'Utilisateur renommé!',
  ADMIN_SETTINGS_USERS_EDIT_SAME_NAME:
    "L'ancien nom d'utilisateur est le même que le nouveau nom d'utilisateur.",
  ADMIN_SETTINGS_USERS_EDIT: 'Modifier',
  ADMIN_SETTINGS_USERS_HEADER: 'Utilisateurs',
  ADMIN_SETTINGS_VERSION_INFO: 'Informations sur la version',
  ADMIN_SETTINGS_TABLE_USERNAME: 'Nom d’utilisateur',
  ADMIN_SETTINGS_TABLE_ADMIN_USER: 'Administrateur',
  ADMIN_SETTINGS_TABLE_WISHLIST_COUNT: 'Articles dans la liste de souhaits',
  ADMIN_SETTINGS_TABLE_EDIT: 'Modifier',
  ADMIN_USER_EDIT_ACCOUNT_UNCONFIRMED: "Ce compte n'a pas été confirmé.",
  ADMIN_USER_EDIT_ADMIN_ISADMIN: (name) => `${name} est un administrateur.`,
  ADMIN_USER_EDIT_ADMIN_NOTADMIN: (name) =>
    `${name} n'est pas un administrateur.`,
  ADMIN_USER_EDIT_ADMIN: 'Admin',
  ADMIN_USER_EDIT_CHANGE_NAME: 'Changer de nom',
  ADMIN_USER_EDIT_CHANGE_USERNAME: "Changer de nom d'utilisateur",
  ADMIN_USER_EDIT_CONFIRMATION_LINK: 'Lien de confirmation',
  ADMIN_USER_EDIT_DELETE_ADMIN: "L'utilisateur est administrateur",
  ADMIN_USER_EDIT_DELETE_HEADER: 'Suppression irréversible',
  ADMIN_USER_EDIT_DELETE_USER: (name) => `Supprimer l'utilisateur ${name}`,
  ADMIN_USER_EDIT_DEMOTE_SELF: 'Vous ne pouvez pas vous rétrograder',
  ADMIN_USER_EDIT_DEMOTE: (name) => `Rétrograder ${name}`,
  ADMIN_USER_EDIT_EDITING_USER: (name) =>
    `Modification de l'utilisateur "${name}"`,
  ADMIN_USER_EDIT_GENERATE_NEW_LINK: 'Générer un nouveau lien',
  ADMIN_USER_EDIT_IMPERSONATE_BUTTON: (name) =>
    `Se connecter en tant que ${name}`,
  ADMIN_USER_EDIT_IMPERSONATE_HEADER: 'se faire passer pour',
  ADMIN_USER_EDIT_LINK_EXPIRY_FUTURE: (fromNow) =>
    `Le lien suivant expire le ${fromNow}`, // fromNow is localized by moment
  ADMIN_USER_EDIT_LINK_EXPIRY_PAST: (fromNow) =>
    `Le lien suivant a expiré le ${fromNow}`,
  ADMIN_USER_EDIT_PROMOTE: (name) => `Promouvoir ${name}`,
  ADMIN_USER_EDIT_RESET_PASSWORD_HASLINK_EXPIRY_FUTURE: (fromNow) =>
    `expire le ${fromNow}`,
  ADMIN_USER_EDIT_RESET_PASSWORD_HASLINK_EXPIRY_PAST: (fromNow) =>
    `a expiré le ${fromNow}`,
  ADMIN_USER_EDIT_RESET_PASSWORD_HASLINK:
    'Il y a un lien de réinitialisation de mot de passe pour cet utilisateur.',
  ADMIN_USER_EDIT_RESET_PASSWORD_HEADER: 'Réinitialiser le mot de passe',
  ADMIN_USER_EDIT_RESET_PASSWORD_LINK_CANCEL:
    'Supprimer le lien de réinitialisation du mot de passe',
  ADMIN_USER_EDIT_RESET_PASSWORD_LINK_CREATE:
    'Créer un lien de réinitialisation de mot de passe',
  ADMIN_USER_EDIT_RESET_PASSWORD_LINK_REFRESH:
    'Actualiser le lien de réinitialisation du mot de passe',
  ADMIN_USER_EDIT_USERNAME: "Nom d'utilisateur",
  BACK_BUTTON: 'Retour',
  CONFIRM_ACCOUNT_EXPIRED:
    'Votre lien de confirmation a expiré. Veuillez en demander un nouveau.',
  CONFIRM_ACCOUNT_HEADER_INVALID: `${_CC.config.siteTitle} | Lien de confirmation invalide`,
  CONFIRM_ACCOUNT_HEADER_VALID: `${_CC.config.siteTitle} | Confirmer le compte`,
  CONFIRM_ACCOUNT_INVALID:
    "Ce lien de confirmation n'est pas valide, peut-être que le compte a été supprimé ou que certains caractères à la fin ont été enlevés?",
  CONFIRM_ACCOUNT_SET_PW_BUTTON: `Rejoindre ${_CC.config.siteTitle}`,
  CONFIRM_ACCOUNT_SET_PW_PLACEHOLDER: 'pa$$word!',
  CONFIRM_ACCOUNT_SET_PW_TEXT: (name) =>
    `Bonjour ${name}! Veuillez taper votre mot de passe ici.`,
  CONFIRM_ACCOUNT_SUCCESS: `Bienvenue à ${_CC.config.siteTitle}!`,
  LOGIN_BUTTON: 'Connexion',
  LOGIN_OIDC_BUTTON: `Se connecter avec ${_CC.config.oidcProviderName}`,
  LOGIN_PASSWORD_PLACEHOLDER: 'pa$$word!',
  LOGIN_PASSWORD: 'Password',
  LOGIN_USERNAME_PLACEHOLDER: 'jean',
  LOGIN_USERNAME: "Nom d'utilisateur",
  LOGIN_INCORRECT_USERNAME: 'Nom d’utilisateur incorrect',
  LOGIN_INCORRECT_PASSWORD: 'Mot de passe incorrect',
  LOGIN_SSO_UNKNOWN_USER: 'Utilisateur inconnu',
  LOGIN_SSO_LINK_SUCCESS: 'Compte associé avec succès',
  LOGIN_SSO_LINK_FAILURE: 'Impossible d’associer le compte',
  LOGIN_SSO_UNLINK_SUCCESS: 'Compte dissocié avec succès',
  LOGIN_SSO_UNLINK_FAILURE: 'Impossible de dissocier le compte',
  LOGIN_SSO_LINK_FAILURE_ACCOUNT_EXISTS:
    'Ce compte externe est déjà associé à un autre compte sur ce site !',
  LOGOUT_BUTTON: 'Deconnexion',
  NAVBAR_ADMIN: 'Paramètres Administrateur',
  NAVBAR_LOGIN: 'Connexion',
  NAVBAR_LOGOUT: 'Deconnexion',
  NAVBAR_PROFILE: 'Profil',
  NAVBAR_WISHLIST: "Ma liste d'envies",
  NOTE_BACK: (name) => `Retour à la liste d'envie de ${name}`,
  NOTE_GET_PRODUCT_DATA: 'Obtenir des données sur le produit',
  NOTE_GUARD: 'Utilisateur invalide',
  NOTE_IMAGE_URL: "URL de l'Image",
  NOTE_MISSING_PROP: (prop) => `Propriété manquante ${prop}`, // not really possible to localize this unfortunately
  NOTE_NAME: 'Nom',
  NOTE_NOTE: 'Note',
  NOTE_PRICE: 'Prix',
  NOTE_REFRESH_DATA: 'Actualiser les données',
  NOTE_REMOVE_GUARD: 'Utilisateur invalide',
  NOTE_REMOVE_MISSING: "N'a pas de note",
  NOTE_REMOVE_SUCCESS: 'Note supprimée avec succès',
  NOTE_SAVE_BUTTON: "Enregistrer l'article",
  NOTE_SUCCESS: 'Enregistré avec succès!',
  NOTE_URL: 'URL',
  PROFILE_COAT_SIZE: 'Taille de costume/blazer/manteau',
  PROFILE_DRESS_SIZE: 'Taille de robe',
  PROFILE_HAT_SIZE: 'Taille de chapeau',
  PROFILE_HEADER: 'Profil',
  PROFILE_PANTS_SIZE: 'Taille de pantalon',
  PROFILE_PASSWORD_BUTTON: 'Sauvegarder',
  PROFILE_PASSWORD_NEW: 'Nouveau Mot de Passe',
  PROFILE_PASSWORD_OLD_MISMATCH: 'Ancien mot de passe incorrect',
  PROFILE_PASSWORD_OLD: 'Ancien mot de passe',
  PROFILE_PASSWORD_PLACEHOLDER: 'pa$$word!',
  PROFILE_PASSWORD_REQUIRED_NEW: 'Un nouveau mot de passe est requis',
  PROFILE_PASSWORD_REQUIRED_OLD: "L'ancien mot de passe est requis",
  PROFILE_PASSWORD_SUCCESS: 'Les modifications on été enregistré avec succès!',
  PROFILE_PASSWORD_TITLE: (name) =>
    `Paramètres de profil - Mot de passe - ${name}`,
  PROFILE_PHONE_MODEL: 'Modèle de téléphone',
  PROFILE_RING_SIZE: 'Taille de bague',
  PROFILE_SAVE_PFP_DISABLED: 'Les photos de profil sont désactivées.',
  PROFILE_SAVE_PFP_SUCCESS: 'Photo de profil enregistrée !',
  PROFILE_SECURITY_CHANGE_PASSWORD: 'Changer le mot de passe',
  PROFILE_SECURITY: 'Sécurité',
  PROFILE_SECURITY_LINK_OIDC: `Compte ${_CC.config.oidcProviderName} associé`,
  PROFILE_SECURITY_UNLINK_OIDC: `Compte ${_CC.config.oidcProviderName} dissocié`,
  PROFILE_SHARED_INFORMATION: 'Informations partagées',
  PROFILE_SHIRT_SIZE: 'Taille de chemise',
  PROFILE_SHOE_SIZE: 'Taille de chaussure',
  PROFILE_SWEATER_SIZE: 'Taille de chemisier/pull',
  PROFILE_TITLE: (name) => `Paramètres de profil - ${name}`,
  PROFILE_UPDATE_INFO_SUCCESS: 'Informations partagées mises à jour !',
  PROFILE_PFP_UPLOAD: 'Téléverser une photo de profil',
  PROFILE_PFP_UPLOAD_NO_FILE: 'Aucun fichier sélectionné',
  PROFILE_PFP_UPLOAD_FILE_TYPE:
    'Seulement les formats .png, .jpg, and .jpeg sont autorisés',
  PROFILE_PFP_UPLOAD_FILE_SIZE: `L'image excède la taille maximum autorisée de ${_CC.config.maxUploadPfpSize} MB`,
  PROFILE_PFP_UPLOAD_SUCCESS: 'Photo de profil mise à jour',
  PROFILE_PFP_UPLOAD_ERROR: 'Echec du téléversement de la photo de profil',
  RESET_PASSWORD_BUTTON: 'Réinitialiser le mot de passe',
  RESET_PASSWORD_GREETING_EXPIRED:
    'Votre lien de réinitialisation a expiré. Veuillez en demander un nouveau.',
  RESET_PASSWORD_GREETING_INVALID:
    "Ce lien de réinitialisation n'est pas valide, peut-être le lien a-t-il expriré ou certains caractères à la fin ont-ils été enlevés?",
  RESET_PASSWORD_GREETING_VALID: (name) =>
    `Bonjour ${name}! Veuillez définir votre mot de passe ici.`,
  RESET_PASSWORD_HEADER_INVALID: `${_CC.config.siteTitle} | Lien de réinitialisation invalide`,
  RESET_PASSWORD_HEADER_VALID: `${_CC.config.siteTitle} | Réinitialiser le mot de passe`,
  RESET_PASSWORD_PASSWORD_PLACEHOLDER: 'pa$$word!',
  RESET_PASSWORD_PASSWORD: 'Password',
  RESET_PASSWORD_SUCCESS: 'Réinitialisation du mot de passe avec succès!',
  SETUP_ADMIN_USER: 'Utilisateur administrateur',
  SETUP_BUTTON: 'Configurer!',
  SETUP_HEADER: 'Configurer',
  SETUP_PASSWORD_PLACEHOLDER: 'pa$$word!',
  SETUP_PASSWORD: 'Password',
  SETUP_USERNAME_PLACEHOLDER: 'jean',
  SETUP_USERNAME: "Nom d'utilisateur",
  SUPPORTED_SITES_HEADER: 'Sites supportés',
  SUPPORTED_SITES_TEXT:
    'Un site est-il manquant ou cassé? Ouvrir une issue <a href="https://github.com/Wingysam/get-product-data/issues/new">here</a>! :)',
  UPDATE_NOTICE: (current, latest) => `
    <span class="has-text-danger is-size-4 has-text-weight-bold">
      Christmas Community est obsolète. Il peut y avoir de nouvelles fonctionnalités ou des corrections de bugs. Pensez à mettre à jour! :)
    </span>
    <br>
    <span>(vous pouvez le désactiver avec <code>UPDATE_CHECK=false</code>)</span>
    <br><br>
    <span>Current: ${current}</span>
    <br>
    <span>Latest: ${latest}</span>
    <span class="has-text-info" style="float: right;">Ce message n'est visible que par les administrateurs</span>`,
  WISHLIST_ADD: "Ajouter un article à la liste d'envies",
  WISHLIST_ADD_NEW: 'Ajouter un article',
  WISHLIST_ADDED_BY_USER: (addedBy) => `Ajouté par: ${addedBy}`,
  WISHLIST_ADDED_BY_GUEST: 'Utilisateur Invité',
  WISHLIST_ADDED_BY: 'Ajouté par',
  WISHLIST_ADDED_ITEM_TO_OWN_WISHLIST: "Article ajouté à la listes d'envies.",
  WISHLIST_CONFLICT:
    'Les éléments ont été ajoutés trop rapidement. Veuillez réessayer.',
  WISHLIST_DELETE: 'Supprimer',
  WISHLIST_EDIT_ITEM: "Modifier l'article",
  WISHLIST_FETCH_FAIL:
    "Échec de la récupération de la liste de souhaits : l'utilisateur existe-t-il ?",
  WISHLIST_IMAGE: 'Image',
  WISHLIST_ITEM_MISSING: "Impossible de trouver l'article",
  WISHLIST_MOVE_DOWN: 'Descendre',
  WISHLIST_MOVE_BOTTOM: 'Descendre tout en bas',
  WISHLIST_MOVE_GUARD: 'Utilisateur incorrect',
  WISHLIST_MOVE_INVALID: 'Déplacement Invalide',
  WISHLIST_MOVE_ITEM_DOWN: "Déplacer l'élément tout en bas",
  WISHLIST_MOVE_ITEM_BOTTOM: "Descendre l'élément",
  WISHLIST_MOVE_ITEM_TOP: "Déplacer l'élément tout en haut",
  WISHLIST_MOVE_ITEM_UP: "Déplacer l'élément en haut",
  WISHLIST_MOVE_SUCCESS: 'Article déplacé avec succès!',
  WISHLIST_MOVE_TOP: 'Déplacer tout en haut',
  WISHLIST_MOVE_UNKNOWN_DIRECTION: 'Direction inconnue',
  WISHLIST_MOVE_UP: 'Déplacer en haut',
  WISHLIST_NAME: 'Nom',
  WISHLIST_NOTE: 'Note',
  WISHLIST_OPTIONAL: 'Optionnel',
  WISHLIST_PLEDGE_DUPLICATE: 'Article déjà promis pour',
  WISHLIST_PLEDGE_ITEM: "Je l'offre",
  WISHLIST_PLEDGE_SUCCESS: "L'article a été promis avec succès!",
  WISHLIST_PLEDGE: "Je l'offre",
  WISHLIST_PLEDGED: (pledgedBy) => `Promis par ${pledgedBy}`,
  WISHLIST_PLEDGED_GUEST: 'Promis par un invité',
  WISHLIST_PLEDGED_ITEM_FOR_USER: (user) => `Article proposé pour ${user}.`,
  WISHLIST_PRICE: 'Prix',
  WISHLIST_REFRESH_GUARD: 'Utilisateur invalide',
  WISHLIST_REFRESH_NO_URL: "L'article n'a pas d'URL.",
  WISHLIST_REFRESH_SUCCESS: 'Données actualisées avec succès!',
  WISHLIST_REMOVE_GUARD: 'Utilisateur incorrect',
  WISHLIST_REMOVE_SUCCESS: 'Supprimé avec succès de la liste de souhaits',
  WISHLIST_SUGGEST: 'Suggérer un cadeau',
  WISHLIST_TITLE: (name) => `${_CC.config.siteTitle} - Liste d'envie - ${name}`,
  WISHLIST_UNPLEDGE_GUARD: 'Vous ne vous êtes pas engagé pour cela', // should never happen unless someone makes their own http requests
  WISHLIST_UNPLEDGE_SUCCESS: "L'article a été annulé avec succès !",
  WISHLIST_UNPLEDGE: 'Se désengager',
  WISHLIST_URL_LABEL: `URL ou nom de l\`article (<a href="${_CC.config.base}supported-sites">Sites supportés</a>)`,
  WISHLIST_URL_PLACEHOLDER: 'https://www.amazon.com/dp/B00ZV9RDKK',
  WISHLIST_URL_REQUIRED: "L'URL ou le nom de l'article est requis",
  WISHLISTS_COUNTS_SELF: (name) => `${name}: ???/???`,
  WISHLISTS_COUNTS: (name, pledged, total) => `${name}: ${pledged}/${total}`,
  WISHLISTS_TITLE: `${_CC.config.siteTitle} - Listes d'envies`,
  YES: 'Oui',
  NO: 'Non',
} as const
