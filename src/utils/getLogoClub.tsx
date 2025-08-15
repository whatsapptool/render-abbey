const clubLogoCodeMap: { [key: string]: string } = {
    'RRQ Hoshi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/RRQ_%28Rex_Regum_Qeon%29_Logo_%28SVG%29_-_Vector69Com.svg/1200px-RRQ_%28Rex_Regum_Qeon%29_Logo_%28SVG%29_-_Vector69Com.svg.png',
    'EVOS Esports': 'https://upload.wikimedia.org/wikipedia/en/b/bf/EVOS_Esports_logo.png',
    // 'ONIC': 'https://upload.wikimedia.org/wikipedia/en/f/f1/Logo_of_ONIC_Esports.png',
    'ONIC': 'https://upload.wikimedia.org/wikipedia/id/thumb/4/4f/Onic_Esports_Logo_%28SVG%29_-_Vector69Com.svg/1280px-Onic_Esports_Logo_%28SVG%29_-_Vector69Com.svg.png',
    'Alter Ego': '/player/Alter_Ego_July2021_allmode.png',
    // 'Bigetron': 'https://bigetron.gg/static/images/bigetron_footer_logo.png',
    'Bigetron': '/player/Bigetron_2020_full_allmode.png',
    'Dewa United': '/player/Dewa_United_Esports_allmode.png',
    'Geek Fam ID': '/player/Geek_Fam_2019_allmode.png',
    
};

export const getLogoCode = (clubCode: string): string => {
    return clubLogoCodeMap[clubCode] || ''; // Kode negara tidak valid
};