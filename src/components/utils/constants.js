// Constants.js
const prod = {
     API_URL: 'https://taoke-api.vercel.app/api'
};

const dev = {
     API_URL: 'http://localhost:3000/api'
     //API_URL: 'http://192.168.1.14:3000/api'
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;

export const WITHDRAWAL_ERROR_MESSAGES = [
    'Ooops! We can\'t process withdrawals right now, please try again next month. Remember, it is always better to keep your money on our app!',
    'Mmm. I tried but could not process yur request. Please try again some other day.',
    'Somehow your money doesn\'t want to move. It\'s probably for the better. Please try again later.',
    'Mmm.. that didn\'t work I don\'t know why. May be you should not try to withdraw your money',
    'Mmm.. that didn\'t work.. Our thoughts and prayers are with you.',
    'Mmm.. that didn\'t work.. I wish you healing and peace.',
    'Mmm.. that didn\'t work.. If you fall behind, run faster. Never give up, never surrender, and rise up against the odds.',
    'Mmm.. that didn\'t work.. You should never surrender, never give up!',
    'Mmm.. that didn\'t work.. Life isn’t finding shelter in the storm. It’s about learning to dance in the rain.',
    'Mmm.. that didn\'t work.. When you have a dream, you\'ve got to grab it and never let go.'
];