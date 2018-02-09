import * as React from 'react';
import Link from 'gatsby-link';

import {Project, ProjectTile} from '../components/project-tile'

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
        <p>
          Lyft relies on open-source software and likes to give back to the community.
        </p>
        <div>
          {this.props.data.site.siteMetadata.projects.map((project, i) => <ProjectTile {...project} key={i} />)}
        </div>
      </div>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title,
        projects {
          name,
          description,
          language,
          category,
          website
        }
      }
    }
  }
`;
