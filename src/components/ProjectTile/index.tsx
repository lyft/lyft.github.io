import * as React from 'react';
import styled from 'styled-components';
import * as colors from '../../common/colors';

import * as tagIcon from './tag.png';
import * as globeIcon from './globe.png';
import * as githubIcon from './github.svg';

import { LanguageIcon } from './language-icon';

export interface Project {
    name: string;
    description: string;
    languages: string[];
    categories: string[];
    website: string;
    source: string;
}

// prototype: https://codepen.io/mohsen1/pen/bLdNoJ?editors=0110
const Card = styled.div`
  /* border: 1px solid ${colors.brandInfo}; */
  background: ${colors.white};
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

const Category = styled.small`
    color: ${colors.blue};
`;

const LinkToWebsite = styled.a.attrs({ target: '_blank' })`
    color: ${colors.blue};
    text-decoration: none;
    margin: 0 1rem;
`;

const LinkToSource = styled.a.attrs({ target: '_blank' })`
    color: ${colors.blue};
    text-decoration: none;
    margin: 0 1rem;
`;

const TagIcon = styled.img.attrs({
    src: tagIcon
})`
    width: 1rem;
    margin: 0;
    opacity: 0.5;
    vertical-align: middle;
`

const GithubIcon = styled.img.attrs({
    src: githubIcon
})`
    opacity: 0.5;
    vertical-align: top;
    width: 1rem;
    margin: 0;
`

const GlobeIcon = styled.img.attrs({
    src: globeIcon
}) `
    opacity: 0.5;
    vertical-align: top;
    width: 1rem;
    margin: 0;
`

const CardFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

/** A tile for a open source project */
export class ProjectTile extends React.Component<Project> {
    public render() {
        const { languages, name, description, categories, website, source } = this.props;
        return (
            <Card>
                <Title>{name}</Title>
                <Description>{description}</Description>
                <p>
                    <TagIcon />
                    {categories.map((category, i) => <Category key={i}>{category}</Category>)}
                </p>
                <CardFooter>
                    <div>
                        {languages.map((language, i) => <LanguageIcon language={language} key={i} />)}
                    </div>
                    <div>
                        <LinkToWebsite href={website}>
                            <GlobeIcon />&nbsp;Website
                        </LinkToWebsite>
                        <LinkToSource href={source}>
                            <GithubIcon />&nbsp;Source Code
                        </LinkToSource>
                    </div>
                </CardFooter>
            </Card>
        );
    }
}
