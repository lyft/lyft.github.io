import * as React from 'react';
import styled from "styled-components"

import * as colors from '../common/colors'

export interface Project {
    name: string;
    description: string;
    language: 'C++' | 'JavaScript' | 'TypeScript' | 'Python';
    category: string;
    website: string;
  }

// prototype: https://codepen.io/mohsen1/pen/bLdNoJ?editors=0110
const Card = styled.div`
  border: 1px solid ${colors.bone};
  /* background: ${colors.grayLight}; */
  padding: 1rem;
  margin: 1rem 0;
  box-shadow: 0 0 1rem ${colors.grayDark};

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


const Icon = styled.div`
    display: inline-block;
    padding: 0.4rem;
    line-height: 1;
    border-radius: 5px;
    font-family: monospace;
    color: white;
    background: ${colors.pink};
    /* background-color: ${(props) => props.color} */
`;


const LanguageIcon: React.StatelessComponent<{language: Project['language']}> = ({ language }) => {
    switch (language) {
        case 'JavaScript':
            return <Icon>JS</Icon>;
        case 'TypeScript':
            return <Icon>TS</Icon>;
        default:
            return <Icon>{language}</Icon>;
    }
}

/** A tile for a open source project */
export class ProjectTile extends React.Component<Project> {
    public render() {
        const { language, name, description, category, website } = this.props;
        return (
            <Card>
                <a href={website} target="_blank">
                    <Title>{name}</Title>
                    <Description>{description}</Description>
                    <p><small>{category}</small></p>
                    <LanguageIcon language={language} />
                </a>
            </Card>
        );
    }
}
