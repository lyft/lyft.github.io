import * as React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

const BannerWrapper = styled.div`
    margin: 5rem 0;
    text-align: center;
`;

export class Banner extends React.Component {
    public render() {
        return (
            <BannerWrapper>
                <h1>Lyft ❤️ Open Source</h1>
                <p>Lyft relies on open-source software and likes to give back to the community.</p>
            </BannerWrapper>
        );
    }
}
