import * as React from 'react';
import styled from 'styled-components';
import * as languageColorsMap from 'github-language-colors/colors.json';

import * as colors from '../../common/colors';

interface IconProps {
    language: string;
}

export const Icon = styled.div`
    display: inline-block;
    padding: 0.4rem;
    margin: 0 0.2rem;
    line-height: 1;
    border-radius: 2px;
    font-weight: bold;
    font-family: monospace;
    color: ${(props: IconProps) => (isBright(languageColorsMap[props.language]) ? 'black' : 'white')};
    background: ${(props: { language: string }) => languageColorsMap[props.language] || colors.pink};
`;

export class LanguageIcon extends React.Component<{ language: string }> {
    public render() {
        const { language } = this.props;
        switch (language) {
            case 'C++':
                return <Icon language="cpp">C++</Icon>;
            default:
                return <Icon language={language}>{language}</Icon>;
        }
    }
}

/**
 * Detect if a color is bright
 * @param color #RRGGBB format CSS color
 */
function isBright(color?: string) {
    if (!color) {
        return false;
    }
    const [r1, r2, g1, g2, b1, b2] = color.substr(1).split('');
    return (
        Math.round((parseInt(r1 + r2, 16) * 299 + parseInt(g1 + g2, 16) * 587 + parseInt(b1 + b2, 16) * 114) / 1000) >
        170
    );
}
