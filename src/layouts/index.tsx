import * as React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import * as colors from '../common/colors';
import { Header } from '../components/header';
import './index.css';

interface DefaultLayoutProps extends React.HTMLProps<HTMLDivElement> {
    location: {
        pathname: string;
    };
    children: any;
}

class DefaultLayout extends React.PureComponent<DefaultLayoutProps, void> {
    public render() {
        return (
            <div>
                <Helmet title="Lyft Open Source" meta={[{ name: 'charset', content: 'utf-8' }]} />
                <Header />
                <div
                    style={{
                        margin: '0 auto',
                        maxWidth: 960,
                        padding: '0px 1.0875rem 1.45rem',
                        paddingTop: 0,
                    }}
                >
                    {this.props.children()}
                </div>
            </div>
        );
    }
}

export default DefaultLayout;
