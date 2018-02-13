const fs = require('fs');
const { projects } = require('./projects.json');

module.exports = {
    siteMetadata: {
        title: `Lyft Open Source Website`,
        projects,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-styled-components`,
        // Add typescript stack into webpack
        `gatsby-plugin-typescript`,
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography`,
            },
        },
        {
            resolve: `gatsby-plugin-favicon`,
            options: {
                logo: './src/common/favicon.png',
                injectHTML: true,
                icons: {
                    android: true,
                    appleIcon: true,
                    appleStartup: true,
                    coast: false,
                    favicons: true,
                    firefox: true,
                    twitter: false,
                    yandex: false,
                    windows: false,
                },
            },
        },

        {
            resolve: `gatsby-source-github-api`,
            options: {
                token: process.env.GITHUB_TOKEN,
                varuables: {},
                graphQLQuery: fs.readFileSync('./github.graphql').toString(),
            },
        },
    ],
};
