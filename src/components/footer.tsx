import * as React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

import * as colors from '../common/colors';

const FooterWrapper = styled.div`
    background: ${colors.bone};
    padding: 2rem 1rem;
    text-align: center;

    a {
        padding: 0 1rem;
        color: ${colors.slate};
        text-decoration: none;
        font-family: monospace;
    }
`;

export const Footer = () => (
    <FooterWrapper>
        <Link target="_blank" to="https://github.com/lyft/">
            Lyft Github Organization
        </Link>
        <Link target="_blank" to="https://eng.lyft.com/">
            Lyft Engineering Blog
        </Link>
        <Link target="_blank" to="https://www.lyft.com/jobs">
            Come work with us!
        </Link>
        <Link target="_blank" to="https://www.lyft.com/lyft/lyft.github.io">
            Source of this website
        </Link>
    </FooterWrapper>
);
