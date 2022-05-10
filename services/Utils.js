/* eslint-disable no-useless-escape */
import _ from 'lodash';
import store from '../redux';
import iso639 from 'iso639';

class Utils {}

Utils.SECTION_ADMIN     = 'admin';
Utils.SECTION_OPERATION = 'operation';
Utils.SECTION_ANALYSIS  = 'analysis';

Utils.MODULE_PLANNING       = 'planning';
Utils.MODULE_SHOP           = 'shop';
Utils.MODULE_RESOURCES      = 'resources';
Utils.MODULE_COMMUNICATIONS = 'communications';
Utils.MODULE_PUBLISHING     = 'publishing';

Utils.EVENT_TYPE_MOVIE       = "movie";
Utils.EVENT_TYPE_MUSIC_GROUP = "music_group";
Utils.EVENT_TYPE_DRAMA       = "drama";
Utils.EVENT_TYPE_SERVICE     = "service";

Utils.IMAGE_TYPE_DEFAULT          = "default";
Utils.IMAGE_TYPE_LOGO             = "logo";
Utils.IMAGE_TYPE_BANNIERE         = "banner";
Utils.IMAGE_TYPE_POSTER           = "poster";
Utils.IMAGE_TYPE_LOGO_A4          = 'logo-a4';
Utils.IMAGE_TYPE_LOGO_THERMAL     = 'logo-thermal';
Utils.IMAGE_TYPE_FAVICON          = 'favicon';
Utils.IMAGE_TYPE_APPICON          = 'appicon';
Utils.IMAGE_TYPE_PARTNERS         = 'partners';
Utils.IMAGE_TYPE_PARTNERS_A4      = 'partners-a4';
Utils.IMAGE_TYPE_PARTNERS_THERMAL = 'partners-thermal';


Utils.LINK_TYPE_CATEGORY  = "category";
Utils.LINK_TYPE_ARTICLE   = "article";
Utils.LINK_TYPE_URL       = "url";
Utils.LINK_TYPE_MOVIE     = "movie";
Utils.LINK_TYPE_SCREENING = "screening";

Utils.SERVICE_TYPE_GENERIC       = "service";
Utils.SERVICE_TYPE_KINDERCITY    = "kindercity";
Utils.SERVICE_TYPE_BABY_PARK     = "babypark";
Utils.SERVICE_TYPE_KIDS_PARK     = "kidspark";
Utils.SERVICE_TYPE_KIDS_ATELIER  = "kidsatelier";
Utils.SERVICE_TYPE_KIDS_CAMP     = "kidscamp";
Utils.SERVICE_TYPE_KIDS_GARDEN   = "kidsgarden";
Utils.SERVICE_TYPE_TEENS_STUDIO  = "teenstudio";
Utils.SERVICE_TYPE_TEENS_ATELIER = "teensatelier";
Utils.SERVICE_TYPE_TEENS_CAMP    = "teenscamp";

Utils.ACTIVITY_ACTOR           = "actor";
Utils.ACTIVITY_CAST            = "cast";
Utils.ACTIVITY_DIRECTOR        = "director";
Utils.ACTIVITY_EDITOR          = "editor";
Utils.ACTIVITY_PHOTOGRAPHY     = "photography";
Utils.ACTIVITY_MUSIC           = "music";
Utils.ACTIVITY_PRODUCER        = "producer";
Utils.ACTIVITY_SCREENPLAY      = "screenplay";

Utils.PROGRAMMATION_SUPPORT_DCP        = "dcp";
Utils.PROGRAMMATION_SUPPORT_DVD        = "dvd";
Utils.PROGRAMMATION_SUPPORT_BLU_RAY    = "blu_ray";
Utils.PROGRAMMATION_SUPPORT_VIDEO_FILE = "video_file";
Utils.PROGRAMMATION_SUPPORT_OTHER      = "other";

Utils.MONDAY    = "mo";
Utils.TUESDAY   = "tu";
Utils.WEDNESDAY = "we";
Utils.THURSDAY  = "th";
Utils.FRIDAY    = "fr";
Utils.SATURDAY  = "sa";
Utils.SUNDAY    = "su";

Utils.PRICING_ROLE_ESHOP    = "eshop";
Utils.PRICING_ROLE_ON_SITE  = "on-site";
Utils.PRICING_ROLE_PARTNER  = "partner";
Utils.PRICING_ROLE_ACCRED   = "accred";
Utils.PRICING_ROLE_ADMIN    = "admin";
Utils.PRICING_ROLE_MOBILE   = "mobile";
Utils.PRICING_ROLE_CUSTOMER = "customer";

Utils.PERIOD_DAY         = "day";
Utils.PERIOD_WEEK        = "week";
Utils.PERIOD_CINEMA_WEEK = "cinema_week";
Utils.PERIOD_MONTH       = "month";
Utils.PERIOD_YEAR        = "year";

Utils.TASK_STATUS_NEW       = 'new';
Utils.TASK_STATUS_FREE      = 'free';
Utils.TASK_STATUS_ASSIGNED  = 'assigned';
Utils.TASK_STATUS_CLAIMED   = 'claimed';
Utils.TASK_STATUS_RENOUNCED = 'renounced';

Utils.ACTIVITY_NOTIFICATION_NONE  = 'none';
Utils.ACTIVITY_NOTIFICATION_PT10M = 'PT10M';
Utils.ACTIVITY_NOTIFICATION_PT30M = 'PT30M';
Utils.ACTIVITY_NOTIFICATION_PT1H  = 'PT1H';
Utils.ACTIVITY_NOTIFICATION_PT2H  = 'PT2H';
Utils.ACTIVITY_NOTIFICATION_PT6H  = 'PT6H';
Utils.ACTIVITY_NOTIFICATION_P1D   = 'P1D';
Utils.ACTIVITY_NOTIFICATION_P2D   = 'P2D';
Utils.ACTIVITY_NOTIFICATION_P3D   = 'P3D';

Utils.DEFAULT_LANGS = [ 'fr', 'en', 'de' ];
Utils.LOCALES = [ 'fr_CH', 'en_GB', 'de_CH'];

Utils.POS_PAYMENT_METHOD_CASH           = 'cash';
Utils.POS_PAYMENT_METHOD_CASH_COLLECTOR = 'cash_collector';
Utils.POS_PAYMENT_METHOD_EWALLET        = 'ewallet';
Utils.POS_PAYMENT_METHOD_SUMUP          = 'sumup';
Utils.POS_PAYMENT_METHOD_ZVT_EFT        = 'zvt_eft';
Utils.POS_PAYMENT_METHOD_OTHER_EFT      = 'other_eft';
Utils.POS_PAYMENT_METHOD_TWINT          = 'twint';
Utils.POS_PAYMENT_METHOD_POS_TRANSFER   = 'pos_transfer';

Utils.ESHOP_PAYMENT_METHOD_FREE           = 'free';
Utils.ESHOP_PAYMENT_METHOD_PROXYPAY       = 'proxypay';
Utils.ESHOP_PAYMENT_METHOD_LATER          = 'later';
Utils.ESHOP_PAYMENT_METHOD_ESHOP_TRANSFER = 'eshop_transfer';

Utils.USER_FIELD_FIRSTNAME    = 'firstname';
Utils.USER_FIELD_LASTNAME     = 'lastname';
Utils.USER_FIELD_EMAIL        = 'email';
Utils.USER_FIELD_ADDRESS      = 'address';
Utils.USER_FIELD_ZIP          = 'zip';
Utils.USER_FIELD_CITY         = 'city';
Utils.USER_FIELD_COUNTRY      = 'country';
Utils.USER_FIELD_AGE          = 'age';
Utils.USER_FIELD_BIRTHDATE    = 'birthdate';
Utils.USER_FIELD_PHOTO        = 'photo';
Utils.USER_FIELD_SEX          = 'sex';
Utils.USER_FIELD_PHONE        = 'phone';
Utils.USER_FIELD_CELLPHONE    = 'cellphone';
Utils.USER_FIELD_GIFT_MESSAGE = 'gift_message';
Utils.USER_FIELD_TABLE_NUMBER = 'tab';

Utils.ENV_TEST = 'test';
Utils.ENV_PROD = 'prod';

Utils.REGISTRATION_CALLBACK_MODE_EMAIL     = 'email';
Utils.REGISTRATION_CALLBACK_MODE_CALLBACK  = 'callback';
Utils.REGISTRATION_CALLBACK_MODE_URL       = 'url';
Utils.REGISTRATION_CALLBACK_MODE_MAILCHIMP = 'mailchimp';

Utils.DONATION_MODE_CHECKOUT = 'checkout';
Utils.DONATION_MODE_HEADER   = 'header';
Utils.DONATION_MODE_FOOTER   = 'footer';
Utils.DONATION_MODE_EMAIL    = 'email';

Utils.TWINT_METHOD_STICKER = 'sticker';
Utils.TWINT_METHOD_BEACON  = 'beacon';

Utils.DELIVERY_TYPE_ONSITE   = 'onsite';
Utils.DELIVERY_TYPE_TAKEAWAY = 'takeaway';
Utils.DELIVERY_TYPE_PICKUP   = 'pickup';
Utils.DELIVERY_TYPE_SHIPMENT = 'shipment';
Utils.DELIVERY_TYPE_VIRTUAL  = 'virtual';

Utils.BOOKING_MODE_FREE  = 'free';
Utils.BOOKING_MODE_URL   = 'url';
Utils.BOOKING_MODE_EMAIL = 'email';

Utils.appSections = () => {
    return [
        { id: Utils.SECTION_ADMIN, icon: 'fa-cog' },
        { id: Utils.SECTION_OPERATION, icon: 'fa-rocket' },
        { id: Utils.SECTION_ANALYSIS, icon: 'fa-line-chart' },
    ];
};

Utils.roles = (role = null, no_super_admin) => {
    let roles = [
        { "role": "admin", "label": "Administrateur" },
        { "role": "user", "label": "Utilisateur" }
    ];

    !no_super_admin &&
    roles.unshift({ "role": "super_admin", "label": "Super administrateur"});

    return role ? roles.find((r) => r.role === role) : roles;
};

Utils.modules = () => {
    return [
        Utils.MODULE_PLANNING,
        Utils.MODULE_SHOP,
        Utils.MODULE_RESOURCES,
        Utils.MODULE_COMMUNICATIONS,
        Utils.MODULE_PUBLISHING
    ];
};

Utils.event_types = (type = null) => {
    const types = [
        { "type": Utils.EVENT_TYPE_MOVIE, "label": "Film" },
        { "type": Utils.EVENT_TYPE_MUSIC_GROUP, "label": "Artiste/Groupe" },
        { "type": Utils.EVENT_TYPE_DRAMA, "label": "Pièce de théâtre" },
        { "type": Utils.EVENT_TYPE_SERVICE, "label": "Service" },
    ];

    return type ? types.find((r) => r.type === type) : types;
};

Utils.image_types = (type = null) => {
    const types = [
        Utils.IMAGE_TYPE_DEFAULT,
        Utils.IMAGE_TYPE_LOGO,
        Utils.IMAGE_TYPE_BANNIERE,
        Utils.IMAGE_TYPE_POSTER,
        Utils.IMAGE_TYPE_LOGO_A4,
        Utils.IMAGE_TYPE_LOGO_THERMAL,
        Utils.IMAGE_TYPE_FAVICON,
        Utils.IMAGE_TYPE_APPICON,
        Utils.IMAGE_TYPE_PARTNERS,
        Utils.IMAGE_TYPE_PARTNERS_A4,
        Utils.IMAGE_TYPE_PARTNERS_THERMAL
    ];

    return type ? types.find((r) => r === type) : types;
};

Utils.link_types = (type = null) => {
    const types = [
        Utils.LINK_TYPE_ARTICLE,
        Utils.LINK_TYPE_CATEGORY,
        Utils.LINK_TYPE_MOVIE,
        Utils.LINK_TYPE_SCREENING,
        Utils.LINK_TYPE_URL
    ];

    return type ? types.find((r) => r === type) : types;
};

Utils.service_types = (type = null) => {
    const types = [
        { "type": Utils.SERVICE_TYPE_GENERIC, "label": "-" },
        { "type": Utils.SERVICE_TYPE_KINDERCITY, "label": "KinderCity" },
        { "type": Utils.SERVICE_TYPE_BABY_PARK, "label": "Baby Park" },
        { "type": Utils.SERVICE_TYPE_KIDS_PARK, "label": "Kids Park" },
        { "type": Utils.SERVICE_TYPE_KIDS_ATELIER, "label": "Kids Atelier" },
        { "type": Utils.SERVICE_TYPE_KIDS_CAMP, "label": "Kids Camp" },
        { "type": Utils.SERVICE_TYPE_KIDS_GARDEN, "label": "Kids Garden" },
        { "type": Utils.SERVICE_TYPE_TEENS_STUDIO, "label": "Teens Studio" },
        { "type": Utils.SERVICE_TYPE_TEENS_ATELIER, "label": "Teens Atelier" },
        { "type": Utils.SERVICE_TYPE_TEENS_CAMP, "label": "Teens Camp" },
    ];

    return type ? types.find((r) => r.type === type) : types;
};

Utils.activities = () => {
    return [
        Utils.ACTIVITY_ACTOR,
        Utils.ACTIVITY_CAST,
        Utils.ACTIVITY_DIRECTOR,
        Utils.ACTIVITY_EDITOR,
        Utils.ACTIVITY_PHOTOGRAPHY,
        Utils.ACTIVITY_MUSIC,
        Utils.ACTIVITY_PRODUCER,
        Utils.ACTIVITY_SCREENPLAY
    ];
};

Utils.programmation_supports = () => {
    return [
        Utils.PROGRAMMATION_SUPPORT_DCP,
        Utils.PROGRAMMATION_SUPPORT_DVD,
        Utils.PROGRAMMATION_SUPPORT_BLU_RAY,
        Utils.PROGRAMMATION_SUPPORT_VIDEO_FILE,
        Utils.PROGRAMMATION_SUPPORT_OTHER
    ];
};

Utils.days = (index) => {
    const days =  [
        { "index": 1, "label": Utils.MONDAY },
        { "index": 2, "label": Utils.TUESDAY },
        { "index": 3, "label": Utils.WEDNESDAY },
        { "index": 4, "label": Utils.THURSDAY },
        { "index": 5, "label": Utils.FRIDAY },
        { "index": 6, "label": Utils.SATURDAY },
        { "index": 0, "label": Utils.SUNDAY }
    ];

    return index >= 0 ? days.find((d) => d.index === index) : days;
};

Utils.pricingRoles = () => {
    return [
        Utils.PRICING_ROLE_ESHOP,
        Utils.PRICING_ROLE_ON_SITE,
        Utils.PRICING_ROLE_PARTNER,
        Utils.PRICING_ROLE_ACCRED,
        Utils.PRICING_ROLE_ADMIN,
        Utils.PRICING_ROLE_MOBILE,
        Utils.PRICING_ROLE_CUSTOMER
    ];
};

Utils.periods = () => {
    return [
        Utils.PERIOD_DAY,
        Utils.PERIOD_WEEK,
        Utils.PERIOD_CINEMA_WEEK,
        Utils.PERIOD_MONTH,
        Utils.PERIOD_YEAR
    ];
};

Utils.taskStatus = () => {
    return [
        Utils.TASK_STATUS_NEW,
        Utils.TASK_STATUS_FREE,
        Utils.TASK_STATUS_ASSIGNED,
        Utils.TASK_STATUS_CLAIMED,
        Utils.TASK_STATUS_RENOUNCED
    ];
};

Utils.notifications = () => {
    return [
        Utils.ACTIVITY_NOTIFICATION_NONE,
        Utils.ACTIVITY_NOTIFICATION_PT10M,
        Utils.ACTIVITY_NOTIFICATION_PT30M,
        Utils.ACTIVITY_NOTIFICATION_PT1H,
        Utils.ACTIVITY_NOTIFICATION_PT2H,
        Utils.ACTIVITY_NOTIFICATION_PT6H,
        Utils.ACTIVITY_NOTIFICATION_P1D,
        Utils.ACTIVITY_NOTIFICATION_P2D,
        Utils.ACTIVITY_NOTIFICATION_P3D
    ];
};

Utils.posPaymentMethods = () => {
    return [
        Utils.POS_PAYMENT_METHOD_CASH,
        Utils.POS_PAYMENT_METHOD_CASH_COLLECTOR,
        Utils.POS_PAYMENT_METHOD_EWALLET,
        Utils.POS_PAYMENT_METHOD_SUMUP,
        Utils.POS_PAYMENT_METHOD_ZVT_EFT,
        Utils.POS_PAYMENT_METHOD_OTHER_EFT,
        Utils.POS_PAYMENT_METHOD_TWINT,
        Utils.POS_PAYMENT_METHOD_POS_TRANSFER,
    ];
};

Utils.eshopPaymentMethods = () => {
    return [
        Utils.ESHOP_PAYMENT_METHOD_FREE,
        Utils.ESHOP_PAYMENT_METHOD_PROXYPAY,
        Utils.ESHOP_PAYMENT_METHOD_LATER,
        Utils.ESHOP_PAYMENT_METHOD_ESHOP_TRANSFER,
    ];
};

Utils.passOwnerFields = () => {
    return [
        Utils.USER_FIELD_FIRSTNAME,
        Utils.USER_FIELD_LASTNAME,
        Utils.USER_FIELD_EMAIL,
        Utils.USER_FIELD_ADDRESS,
        Utils.USER_FIELD_ZIP,
        Utils.USER_FIELD_CITY,
        Utils.USER_FIELD_COUNTRY,
        Utils.USER_FIELD_AGE,
        Utils.USER_FIELD_BIRTHDATE,
        Utils.USER_FIELD_PHOTO,
        Utils.USER_FIELD_SEX,
        Utils.USER_FIELD_PHONE,
        Utils.USER_FIELD_CELLPHONE,
        Utils.USER_FIELD_GIFT_MESSAGE,
    ];
};

Utils.userDataFields = () => {
    return [
        Utils.USER_FIELD_FIRSTNAME,
        Utils.USER_FIELD_LASTNAME,
        Utils.USER_FIELD_EMAIL,
        Utils.USER_FIELD_ADDRESS,
        Utils.USER_FIELD_ZIP,
        Utils.USER_FIELD_CITY,
        Utils.USER_FIELD_COUNTRY,
        Utils.USER_FIELD_AGE,
        Utils.USER_FIELD_SEX,
        Utils.USER_FIELD_PHONE,
        Utils.USER_FIELD_CELLPHONE,
        Utils.USER_FIELD_TABLE_NUMBER,
    ];
};

Utils.envs = () => {
    return [
        Utils.ENV_TEST,
        Utils.ENV_PROD,
    ];
};

Utils.registrationCallbackModes = () => {
    return [
        Utils.REGISTRATION_CALLBACK_MODE_EMAIL,
        Utils.REGISTRATION_CALLBACK_MODE_CALLBACK,
        Utils.REGISTRATION_CALLBACK_MODE_URL,
        Utils.REGISTRATION_CALLBACK_MODE_MAILCHIMP,
    ];
};

Utils.donationModes = () => {
    return [
        Utils.DONATION_MODE_CHECKOUT,
        Utils.DONATION_MODE_HEADER,
        Utils.DONATION_MODE_FOOTER,
        Utils.DONATION_MODE_EMAIL,
    ];
};

Utils.twintMethods = () => {
    return [
        Utils.TWINT_METHOD_STICKER,
        Utils.TWINT_METHOD_BEACON,
    ];
};

Utils.deliveryTypes = () => {
    return [
        Utils.DELIVERY_TYPE_ONSITE,
        Utils.DELIVERY_TYPE_TAKEAWAY,
        Utils.DELIVERY_TYPE_PICKUP,
        Utils.DELIVERY_TYPE_SHIPMENT,
        Utils.DELIVERY_TYPE_VIRTUAL
    ];
};

Utils.bookingModes = () => {
    return [
        Utils.BOOKING_MODE_FREE,
        Utils.BOOKING_MODE_URL,
        Utils.BOOKING_MODE_EMAIL
    ];
};

Utils.dotify = (obj) => {
    var res = {};
    function recurse(obj, current) {
        for (var key in obj) {
            var value = obj[key];
            var newKey = (current ? current + '.' + key : key);  // joined key with dot
            if (value && typeof value === 'object') {
                recurse(value, newKey);  // it's a nested object, so do it again
            } else {
                res[newKey] = value;  // it's not an object, so set the property
            }
        }
    }

    recurse(obj);
    return res;
};

Utils.getDotified = (obj, dotifiedNotation) => {
    if (!obj)
        return null;

    return dotifiedNotation.split('.').reduce((a, b) => a ? a[b] : null, obj);
}

Utils.assignDotified = (obj, prop, value) => {
    if (typeof prop === "string")
        prop = prop.split(".");

    if (prop.length > 1) {
        var e = prop.shift();
        Utils.assignDotified(
            obj[e] = Object.prototype.toString.call(obj[e]) === "[object Object]" ? obj[e] : {},
            prop,
            value
        );
    } else {
        obj[prop[0]] = value;
    }
}

Utils.normalizeBoolean = (value) => {
    if (value === "true") {
        return true;
    }

    if (value === "false") {
        return false;
    }

    return value;
};

Utils.normalizeInt = (value) => {
    return parseInt(value, 10);
};

Utils.ucfirst = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
Utils.langs = () => {
    if(store === undefined)
        return Utils.DEFAULT_LANGS;

    let langs;
    try {
        langs = store.getState().settings.setting?.l10n?.locales?.all || Utils.DEFAULT_LANGS;
    } catch(e) {
        console.error(e);
        langs = Utils.DEFAULT_LANGS;
    }
    return langs.map((lang) => {
        return lang.split("_")[0]
    })
}

Utils.locales = () => {
    return Utils.LOCALES;
}

Utils.default_lang = () => {
    if (Utils.langs().length) {
        return Utils.langs()[0];
    }

    return 'fr';
}

Utils.currency = () => store.getState().settings.setting?.l10n?.currency || 'CHF';

Utils.localized_or_fallback = (obj, lang) => {
    if (obj[lang]) {
        return obj[lang];
    }

    const fallback = [...Utils.langs(), ...Object.keys(obj)].map(lang => {
        if (obj[lang]) {
            return `${obj[lang]}`;
        }
        return ''
    }).filter(Boolean);

    return fallback ? fallback[0] : null;
}

Utils.default_translatable_fields = () => {
    const fields = {};

    Utils.langs().map(lang => fields[lang] = '');

    return fields;
}

Utils.sortAndIndentCats = (cats, idField = '_id', parentField = 'parent') => {
    const _cats = _.cloneDeep(cats);
    let map = {};
    _cats.map((c) => {
        c.children = [];
        map[c[idField]] = c;
    });
    _cats.map((c) => {
        if (c[parentField]) {
            if (map[c[parentField]])
                map[c[parentField]].children.push(c);
            else
                c[parentField] = null;
        }
    });
    Object.keys(map).map((id) => { map[id][parentField] && delete map[id]; });

    let enhanced = [];
    const _indent_and_sort = (root, level) => {
        const default_lang = Utils.default_lang();
        const cats = _.sortBy(root, (c) => c.name[default_lang]);
        cats.forEach((c) => {
            Utils.langs().forEach((lang) => {
                for(let i = 0; i < level; i++) {
                    c.name[lang] && (c.name[lang] = ' - ' + c.name[lang]);
                }
            });
            enhanced.push(c);
            _indent_and_sort(c.children, level + 1);
        });
    };
    _indent_and_sort(_.values(map), 0);

    return _.map(enhanced, (c) => {
        delete c.children;
        return c;
    });
};

Utils._sort_languages = (values, current_lang) => {
    const top_languages = ['fr', 'en', 'de', 'it'];

    const languages = Object.keys(values)
        .sort(
            (a, b) =>
                Utils.localized_or_fallback(iso639.get_languages_for_code(a), current_lang) > Utils.localized_or_fallback(iso639.get_languages_for_code(b), current_lang) ? 1 : -1
        )
        .map(code => { return {code, language: Utils.localized_or_fallback(iso639.get_languages_for_code(code), current_lang)} })

    const top = _.remove(languages, (l) => top_languages.includes(l.code));

    return [...top, ...languages];
};

Utils.sorted_standard_languages = (current_lang) => {
    return Utils._sort_languages(iso639.get_standard(), current_lang);
}

Utils.sorted_all_languages = (current_lang) => {
    return Utils._sort_languages(iso639.get_all(), current_lang);
}

Utils.cleanTranslatableProperty = (object, property) => {
    if (!(property in object))
        return object;

    if (!_.isObject(object[property]))
        return object;

    _.mapKeys(object[property], (value, lang) => {
        if (_.isEmpty(object[property][lang]))
            delete object[property][lang];
    });

    return object;
}

Utils.getSectionFromPath = path => {
    const paths = {
        '^\/admin': Utils.SECTION_ADMIN,
        '^\/programmations': Utils.SECTION_ADMIN,
        '^\/events': Utils.SECTION_ADMIN,
        '^\/sections': Utils.SECTION_ADMIN,
        '^\/distributors': Utils.SECTION_ADMIN,
        '^\/places': Utils.SECTION_ADMIN,
        '^\/articles': Utils.SECTION_ADMIN,
        '^\/articlecategories': Utils.SECTION_ADMIN,
        '^\/tickettypes': Utils.SECTION_ADMIN,
        '^\/pricinglists': Utils.SECTION_ADMIN,
        '^\/salepoints': Utils.SECTION_ADMIN,
        '^\/cashregisters': Utils.SECTION_ADMIN,
        '^\/users': Utils.SECTION_ADMIN,
        '^\/activities': Utils.SECTION_ADMIN,
        '^\/resources': Utils.SECTION_ADMIN,
        '^\/posts': Utils.SECTION_ADMIN,
        '^\/post_categories': Utils.SECTION_ADMIN,
        '^\/channels': Utils.SECTION_ADMIN,
        '^\/operation': Utils.SECTION_OPERATION,
        '^\/saleslist':  Utils.SECTION_OPERATION,
        '^\/bookingstatus':  Utils.SECTION_OPERATION,
        '^\/tickets':  Utils.SECTION_OPERATION,
        '^\/customers':  Utils.SECTION_OPERATION,
        '^\/messages':  Utils.SECTION_OPERATION,
        '^\/tasks': Utils.SECTION_OPERATION,
        '^\/analysis': Utils.SECTION_ANALYSIS,
        '^\/stats': Utils.SECTION_ANALYSIS,
        '^\/bookingsurvey': Utils.SECTION_ANALYSIS,
    };

    let section = Utils.SECTION_OPERATION;
    Object.keys(paths).forEach(pattern => {
        if (path.match(new RegExp(pattern))) {
            section = paths[pattern];
        }
    });

    return section;
};

Utils.getSettingsOverridablePaths = () => {
    return [
        { icon: 'vcard', key: 'customer.name' },
        { icon: 'vcard', key: 'customer.name_short' },
        { icon: 'vcard', key: 'customer.phone' },
        { icon: 'vcard', key: 'customer.address' },
        { icon: 'vcard', key: 'customer.vat' },
        { icon: 'vcard', key: 'customer.assets_path' },
        { icon: 'vcard', key: 'customer.email.mail' },
        { icon: 'vcard', key: 'customer.email.bcc' },
        { icon: 'vcard', key: 'customer.email.errors_to' },
        { icon: 'vcard', key: 'customer.email.override_to' },
        { icon: 'vcard', key: 'customer.email.errors_to' },
        { icon: 'vcard', key: 'customer.email.override_to' },
        { icon: 'photo', key: 'images' },
    ];
}

export default Utils;
