import * as React from 'react';
import Link from 'gatsby-link';

import { Project, ProjectTile } from '../components/project-tile';
import { Banner } from '../components/banner';

interface IndexPageProps {
    data: {
        site: {
            siteMetadata: {
                title: string;
                projects: Project[];
            };
        };
    };
}

export default class extends React.Component<IndexPageProps> {
    constructor(props: IndexPageProps, context: any) {
        super(props, context);
    }
    public render() {
        return (
            <div>
                <Banner />
                <div>
                    {this.props.data.site.siteMetadata.projects.map((project, i) => (
                        <ProjectTile {...project} key={i} />
                    ))}
                </div>
            </div>
        );
    }
}

export const pageQuery = graphql`
    query IndexQuery {
        site {
            siteMetadata {
                title
                projects {
                    name
                    description
                    languages
                    categories
                    website
                    source
                }
            }
        }
    }
`;
