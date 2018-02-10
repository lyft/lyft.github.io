import * as React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import * as colors from '../common/colors';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import './index.css';

interface DefaultLayoutProps extends React.HTMLProps<HTMLDivElement> {
    location: {
        pathname: string;
    };
    children: any;
}

const Wrapper = styled.div`
    background: #f9f9f9;
`;

const Content = styled.div`
    margin: 0 auto;
    max-width: 960;
    padding: 0px 1.0875rem 1.45rem;
    padding-top: 0;
`;

class DefaultLayout extends React.PureComponent<DefaultLayoutProps, void> {
    public render() {
        return (
            <Wrapper>
                <Helmet title="Lyft Open Source" meta={[{ name: 'charset', content: 'utf-8' }]} />
                <Header />
                <Content>{this.props.children()}</Content>
                <Footer />
            </Wrapper>
        );
    }
}

export default DefaultLayout;
