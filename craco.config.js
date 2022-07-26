const path = require('path');
module.exports = {
    webpack: {
        alias: {
            '@components': path.resolve(__dirname, 'src/common/components'),
            '@constants': path.resolve(__dirname, 'src/common/constants'),
            '@modules': path.resolve(__dirname, 'src/modules'),
            '@helpers': path.resolve(__dirname, 'src/common/helpers'),
            '@interfaces': path.resolve(__dirname, 'src/common/interfaces'),
            '@modals': path.resolve(__dirname, 'src/modals'),
            '@redux': path.resolve(__dirname, 'src/redux'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@validation': path.resolve(__dirname, 'src/common/validation'),


        },
    },
};