import * as React from 'react';
import styled from 'styled-components';
import * as colors from '../common/colors';

import { LanguageIcon } from './language-icon';

export interface Project {
    name: string;
    description: string;
    languages: string[];
    category: string;
    website: string;
}

// prototype: https://codepen.io/mohsen1/pen/bLdNoJ?editors=0110
const Card = styled.div`
  border: 1px solid ${colors.brandInfo};
  /* background: ${colors.grayLight}; */
  padding: 1rem;
  margin: 1rem 0;

  * {
    text-decoration: none;
  }
`;

const Title = styled.h3`
    color: ${colors.mulberry};
`;

const Description = styled.p`
    color: ${colors.grayDark};
`;

/** A tile for a open source project */
export class ProjectTile extends React.Component<Project> {
    public render() {
        const { languages, name, description, category, website } = this.props;
        return (
            <Card>
                <a href={website} target="_blank">
                    <Title>{name}</Title>
                    <Description>{description}</Description>
                    <p>
                        <small>{category}</small>
                    </p>
                    {languages.map((language, i) => <LanguageIcon language={language} key={i} />)}
                </a>
            </Card>
        );
    }
}
