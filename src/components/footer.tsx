import * as React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

import * as colors from '../common/colors';

const FooterWrapper = styled.div`
    background: ${colors.grayDark};
    padding: 2rem 1rem;
    text-align: center;

    a {
        padding: 0 1rem;
        line-height: 2;
        color: ${colors.grayLight};
        text-decoration: none;
        font-family: monospace;
        display: inline-block;
    }
`;

export const Footer = () => (
    <FooterWrapper>
        <a target="_blank" href="https://github.com/lyft/">
            Lyft Github Organization
        </a>
        <a target="_blank" href="https://eng.lyft.com/">
            Lyft Engineering Blog
        </a>
        <a target="_blank" href="https://www.lyft.com/jobs">
            Come work with us!
        </a>
        <a target="_blank" href="https://www.github.com/lyft/lyft.github.io">
            Source of this website
        </a>
    </FooterWrapper>
);
