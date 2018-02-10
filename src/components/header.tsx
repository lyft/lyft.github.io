import * as React from 'react';
import Link from 'gatsby-link';
import * as styled from 'styled-components';

import logo from './logo@3x.png';


import * as colors from '../common/colors';

export const Header = () => (
    <div
        style={{
            background: colors.purple,
            marginBottom: '1.45rem',
        }}
    >
        <div
            style={{
                margin: '0 auto',
                maxWidth: 960,
                padding: '1.45rem 1.0875rem',
            }}
        >
            <h1 style={{ margin: 0 }}>
                <Link
                    to="/"
                    style={{
                        color: 'white',
                        textDecoration: 'none',
                    }}
                >
                    Lyft Open Source
                </Link>
            </h1>
        </div>
    </div>
);
