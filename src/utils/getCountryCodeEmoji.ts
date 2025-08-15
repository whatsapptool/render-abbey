export const getCountryCode = (flagEmoji: string): string => {
    switch (flagEmoji) {
        case '🇦🇩': return 'ad'; // Andorra
        case '🇦🇪': return 'ae'; // United Arab Emirates
        case '🇦🇫': return 'af'; // Afghanistan
        case '🇦🇬': return 'ag'; // Antigua and Barbuda
        case '🇦🇮': return 'ai'; // Anguilla
        case '🇦🇱': return 'al'; // Albania
        case '🇦🇲': return 'am'; // Armenia
        case '🇦🇴': return 'ao'; // Angola
        case '🇦🇶': return 'aq'; // Antarctica
        case '🇦🇷': return 'ar'; // Argentina
        case '🇦🇸': return 'as'; // American Samoa
        case '🇦🇹': return 'at'; // Austria
        case '🇦🇺': return 'au'; // Australia
        case '🇦🇼': return 'aw'; // Aruba
        case '🇦🇽': return 'ax'; // Åland Islands
        case '🇦🇿': return 'az'; // Azerbaijan
        case '🇧🇦': return 'ba'; // Bosnia and Herzegovina
        case '🇧🇧': return 'bb'; // Barbados
        case '🇧🇩': return 'bd'; // Bangladesh
        case '🇧🇪': return 'be'; // Belgium
        case '🇧🇫': return 'bf'; // Burkina Faso
        case '🇧🇬': return 'bg'; // Bulgaria
        case '🇧🇭': return 'bh'; // Bahrain
        case '🇧🇮': return 'bi'; // Burundi
        case '🇧🇯': return 'bj'; // Benin
        case '🇧🇱': return 'bl'; // Saint Barthélemy
        case '🇧🇲': return 'bm'; // Bermuda
        case '🇧🇳': return 'bn'; // Brunei Darussalam
        case '🇧🇴': return 'bo'; // Bolivia
        case '🇧🇶': return 'bq'; // Bonaire, Sint Eustatius and Saba
        case '🇧🇷': return 'br'; // Brazil
        case '🇧🇸': return 'bs'; // Bahamas
        case '🇧🇹': return 'bt'; // Bhutan
        case '🇧🇻': return 'bv'; // Bouvet Island
        case '🇧🇼': return 'bw'; // Botswana
        case '🇧🇾': return 'by'; // Belarus
        case '🇧🇿': return 'bz'; // Belize
        case '🇨🇦': return 'ca'; // Canada
        case '🇨🇨': return 'cc'; // Cocos (Keeling) Islands
        case '🇨🇩': return 'cd'; // Congo
        case '🇨🇫': return 'cf'; // Central African Republic
        case '🇨🇬': return 'cg'; // Congo
        case '🇨🇭': return 'ch'; // Switzerland
        case '🇨🇮': return 'ci'; // Côte D'Ivoire
        case '🇨🇰': return 'ck'; // Cook Islands
        case '🇨🇱': return 'cl'; // Chile
        case '🇨🇲': return 'cm'; // Cameroon
        case '🇨🇳': return 'cn'; // China
        case '🇨🇴': return 'co'; // Colombia
        case '🇨🇷': return 'cr'; // Costa Rica
        case '🇨🇺': return 'cu'; // Cuba
        case '🇨🇻': return 'cv'; // Cape Verde
        case '🇨🇼': return 'cw'; // Curaçao
        case '🇨🇽': return 'cx'; // Christmas Island
        case '🇨🇾': return 'cy'; // Cyprus
        case '🇨🇿': return 'cz'; // Czech Republic
        case '🇩🇪': return 'de'; // Germany
        case '🇩🇯': return 'dj'; // Djibouti
        case '🇩🇰': return 'dk'; // Denmark
        case '🇩🇲': return 'dm'; // Dominica
        case '🇩🇴': return 'do'; // Dominican Republic
        case '🇩🇿': return 'dz'; // Algeria
        case '🇪🇨': return 'ec'; // Ecuador
        case '🇪🇪': return 'ee'; // Estonia
        case '🇪🇬': return 'eg'; // Egypt
        case '🇪🇭': return 'eh'; // Western Sahara
        case '🇪🇷': return 'er'; // Eritrea
        case '🇪🇸': return 'es'; // Spain
        case '🇪🇹': return 'et'; // Ethiopia
        case '🇫🇮': return 'fi'; // Finland
        case '🇫🇯': return 'fj'; // Fiji
        case '🇫🇰': return 'fk'; // Falkland Islands (Malvinas)
        case '🇫🇲': return 'fm'; // Micronesia
        case '🇫🇴': return 'fo'; // Faroe Islands
        case '🇫🇷': return 'fr'; // France
        case '🇬🇦': return 'ga'; // Gabon
        case '🇬🇧': return 'gb'; // United Kingdom
        case '🇬🇩': return 'gd'; // Grenada
        case '🇬🇪': return 'ge'; // Georgia
        case '🇬🇫': return 'gf'; // French Guiana
        case '🇬🇬': return 'gg'; // Guernsey
        case '🇬🇭': return 'gh'; // Ghana
        case '🇬🇮': return 'gi'; // Gibraltar
        case '🇬🇱': return 'gl'; // Greenland
        case '🇬🇲': return 'gm'; // Gambia
        case '🇬🇳': return 'gn'; // Guinea
        case '🇬🇵': return 'gp'; // Guadeloupe
        case '🇬🇶': return 'gq'; // Equatorial Guinea
        case '🇬🇷': return 'gr'; // Greece
        case '🇬🇸': return 'gs'; // South Georgia
        case '🇬🇹': return 'gt'; // Guatemala
        case '🇬🇺': return 'gu'; // Guam
        case '🇬🇼': return 'gw'; // Guinea-Bissau
        case '🇬🇾': return 'gy'; // Guyana
        case '🇭🇰': return 'hk'; // Hong Kong
        case '🇭🇲': return 'hm'; // Heard Island and Mcdonald Islands
        case '🇭🇳': return 'hn'; // Honduras
        case '🇭🇷': return 'hr'; // Croatia
        case '🇭🇹': return 'ht'; // Haiti
        case '🇭🇺': return 'hu'; // Hungary
        case '🇮🇩': return 'id'; // Indonesia
        case '🇮🇪': return 'ie'; // Ireland
        case '🇮🇱': return 'il'; // Israel
        case '🇮🇲': return 'im'; // Isle of Man
        case '🇮🇳': return 'in'; // India
        case '🇮🇴': return 'io'; // British Indian Ocean Territory
        case '🇮🇶': return 'iq'; // Iraq
        case '🇮🇷': return 'ir'; // Iran
        case '🇮🇸': return 'is'; // Iceland
        case '🇮🇹': return 'it'; // Italy
        case '🇯🇪': return 'je'; // Jersey
        case '🇯🇲': return 'jm'; // Jamaica
        case '🇯🇴': return 'jo'; // Jordan
        case '🇯🇵': return 'jp'; // Japan
        case '🇰🇪': return 'ke'; // Kenya
        case '🇰🇬': return 'kg'; // Kyrgyzstan
        case '🇰🇭': return 'kh'; // Cambodia
        case '🇰🇮': return 'ki'; // Kiribati
        case '🇰🇲': return 'km'; // Comoros
        case '🇰🇳': return 'kn'; // Saint Kitts and Nevis
        case '🇰🇵': return 'kp'; // North Korea
        case '🇰🇷': return 'kr'; // South Korea
        case '🇰🇼': return 'kw'; // Kuwait
        case '🇰🇾': return 'ky'; // Cayman Islands
        case '🇰🇿': return 'kz'; // Kazakhstan
        case '🇱🇦': return 'la'; // Lao People's Democratic Republic
        case '🇱🇧': return 'lb'; // Lebanon
        case '🇱🇨': return 'lc'; // Saint Lucia
        case '🇱🇮': return 'li'; // Liechtenstein
        case '🇱🇰': return 'lk'; // Sri Lanka
        case '🇱🇷': return 'lr'; // Liberia
        case '🇱🇸': return 'ls'; // Lesotho
        case '🇱🇹': return 'lt'; // Lithuania
        case '🇱🇺': return 'lu'; // Luxembourg
        case '🇱🇻': return 'lv'; // Latvia
        case '🇱🇾': return 'ly'; // Libya
        case '🇲🇦': return 'ma'; // Morocco
        case '🇲🇨': return 'mc'; // Monaco
        case '🇲🇩': return 'md'; // Moldova
        case '🇲🇪': return 'me'; // Montenegro
        case '🇲🇫': return 'mf'; // Saint Martin (French Part)
        case '🇲🇬': return 'mg'; // Madagascar
        case '🇲🇭': return 'mh'; // Marshall Islands
        case '🇲🇰': return 'mk'; // Macedonia
        case '🇲🇱': return 'ml'; // Mali
        case '🇲🇲': return 'mm'; // Myanmar
        case '🇲🇳': return 'mn'; // Mongolia
        case '🇲🇴': return 'mo'; // Macao
        case '🇲🇵': return 'mp'; // Northern Mariana Islands
        case '🇲🇶': return 'mq'; // Martinique
        case '🇲🇷': return 'mr'; // Mauritania
        case '🇲🇸': return 'ms'; // Montserrat
        case '🇲🇹': return 'mt'; // Malta
        case '🇲🇺': return 'mu'; // Mauritius
        case '🇲🇻': return 'mv'; // Maldives
        case '🇲🇼': return 'mw'; // Malawi
        case '🇲🇽': return 'mx'; // Mexico
        case '🇲🇾': return 'my'; // Malaysia
        case '🇲🇿': return 'mz'; // Mozambique
        case '🇳🇦': return 'na'; // Namibia
        case '🇳🇨': return 'nc'; // New Caledonia
        case '🇳🇪': return 'ne'; // Niger
        case '🇳🇫': return 'nf'; // Norfolk Island
        case '🇳🇬': return 'ng'; // Nigeria
        case '🇳🇮': return 'ni'; // Nicaragua
        case '🇳🇱': return 'nl'; // Netherlands
        case '🇳🇴': return 'no'; // Norway
        case '🇳🇵': return 'np'; // Nepal
        case '🇳🇷': return 'nr'; // Nauru
        case '🇳🇺': return 'nu'; // Niue
        case '🇳🇿': return 'nz'; // New Zealand
        case '🇴🇲': return 'om'; // Oman
        case '🇵🇦': return 'pa'; // Panama
        case '🇵🇪': return 'pe'; // Peru
        case '🇵🇫': return 'pf'; // French Polynesia
        case '🇵🇬': return 'pg'; // Papua New Guinea
        case '🇵🇭': return 'ph'; // Philippines
        case '🇵🇰': return 'pk'; // Pakistan
        case '🇵🇱': return 'pl'; // Poland
        case '🇵🇲': return 'pm'; // Saint Pierre and Miquelon
        case '🇵🇳': return 'pn'; // Pitcairn
        case '🇵🇷': return 'pr'; // Puerto Rico
        case '🇵🇸': return 'ps'; // Palestinian Territory
        case '🇵🇹': return 'pt'; // Portugal
        case '🇵🇼': return 'pw'; // Palau
        case '🇵🇾': return 'py'; // Paraguay
        case '🇶🇦': return 'qa'; // Qatar
        case '🇷🇪': return 're'; // Réunion
        case '🇷🇴': return 'ro'; // Romania
        case '🇷🇸': return 'rs'; // Serbia
        case '🇷🇺': return 'ru'; // Russia
        case '🇷🇼': return 'rw'; // Rwanda
        case '🇸🇦': return 'sa'; // Saudi Arabia
        case '🇸🇧': return 'sb'; // Solomon Islands
        case '🇸🇨': return 'sc'; // Seychelles
        case '🇸🇩': return 'sd'; // Sudan
        case '🇸🇪': return 'se'; // Sweden
        case '🇸🇬': return 'sg'; // Singapore
        case '🇸🇭': return 'sh'; // Saint Helena, Ascension and Tristan Da Cunha
        case '🇸🇮': return 'si'; // Slovenia
        case '🇸🇯': return 'sj'; // Svalbard and Jan Mayen
        case '🇸🇰': return 'sk'; // Slovakia
        case '🇸🇱': return 'sl'; // Sierra Leone
        case '🇸🇲': return 'sm'; // San Marino
        case '🇸🇳': return 'sn'; // Senegal
        case '🇸🇴': return 'so'; // Somalia
        case '🇸🇷': return 'sr'; // Suriname
        case '🇸🇸': return 'ss'; // South Sudan
        case '🇸🇹': return 'st'; // Sao Tome and Principe
        case '🇸🇻': return 'sv'; // El Salvador
        case '🇸🇽': return 'sx'; // Sint Maarten (Dutch Part)
        case '🇸🇾': return 'sy'; // Syrian Arab Republic
        case '🇸🇿': return 'sz'; // Swaziland
        case '🇹🇨': return 'tc'; // Turks and Caicos Islands
        case '🇹🇩': return 'td'; // Chad
        case '🇹🇫': return 'tf'; // French Southern Territories
        case '🇹🇬': return 'tg'; // Togo
        case '🇹🇭': return 'th'; // Thailand
        case '🇹🇯': return 'tj'; // Tajikistan
        case '🇹🇰': return 'tk'; // Tokelau
        case '🇹🇱': return 'tl'; // Timor-Leste
        case '🇹🇲': return 'tm'; // Turkmenistan
        case '🇹🇳': return 'tn'; // Tunisia
        case '🇹🇴': return 'to'; // Tonga
        case '🇹🇷': return 'tr'; // Turkey
        case '🇹🇹': return 'tt'; // Trinidad and Tobago
        case '🇹🇻': return 'tv'; // Tuvalu
        case '🇹🇼': return 'tw'; // Taiwan
        case '🇹🇿': return 'tz'; // Tanzania
        case '🇺🇦': return 'ua'; // Ukraine
        case '🇺🇬': return 'ug'; // Uganda
        case '🇺🇲': return 'um'; // United States Minor Outlying Islands
        case '🇺🇸': return 'us'; // United States
        case '🇺🇾': return 'uy'; // Uruguay
        case '🇺🇿': return 'uz'; // Uzbekistan
        case '🇻🇦': return 'va'; // Vatican City
        case '🇻🇨': return 'vc'; // Saint Vincent and The Grenadines
        case '🇻🇪': return 've'; // Venezuela
        case '🇻🇬': return 'vg'; // Virgin Islands, British
        case '🇻🇮': return 'vi'; // Virgin Islands, U.S.
        case '🇻🇳': return 'vn'; // Viet Nam
        case '🇻🇺': return 'vu'; // Vanuatu
        case '🇼🇫': return 'wf'; // Wallis and Futuna
        case '🇼🇸': return 'ws'; // Samoa
        case '🇾🇪': return 'ye'; // Yemen
        case '🇾🇹': return 'yt'; // Mayotte
        case '🇿🇦': return 'za'; // South Africa
        case '🇿🇲': return 'zm'; // Zambia
        case '🇿🇼': return 'zw'; // Zimbabwe
        default: return ''; // Kode negara tidak valid
    }
}; 