import * as React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

import * as logo from './logo@3x.png';

import * as colors from '../common/colors';

const HeaderWrapper = styled.header`
    position: sticky;
    top: 0;
    z-index: 2;
    background: ${colors.charcoal};
    color: ${colors.white};
    margin-bottom: '1.45rem';
    display: flex;
    justify-content: space-between;
}
`;

const LogoLink = styled(Link)`
    padding: 0.5rem;
    display: block;
`;

const LogoTitle = styled.h1`
    font-size: 1rem;
    font-weight: normal;
    color: ${colors.white};
    margin: 0;
`;
const LogoImage = styled.img.attrs({ src: logo })`
    margin: 0 0.3rem 0 0;
    vertical-align: middle;
    width: 44px;
`;

const RightNav = styled.div`
    padding: 0.5rem;
    display: flex;
    align-items: center;
`;

const RightNavLink = styled.a`
    color: ${colors.white};
    padding: 0 0.5rem;
    font-family: monospace;
    text-decoration: none;
`;

export const Header = () => (
    <HeaderWrapper>
        <LogoLink to="/">
            <LogoTitle>
                <LogoImage />
                Open Source
            </LogoTitle>
        </LogoLink>
        <RightNav>
            <RightNavLink target="_blank" href="https://github.com/lyft/">
                Github
            </RightNavLink>
            <RightNavLink target="_blank" href="https://eng.lyft.com/">
                Blog
            </RightNavLink>
            <RightNavLink target="_blank" href="https://www.lyft.com/jobs">
                Jobs
            </RightNavLink>
        </RightNav>
    </HeaderWrapper>
);
