import * as React from 'react';
import Link from 'gatsby-link';

import { Project, ProjectTile } from '../components/project-tile';
import { Banner } from '../components/banner';
import { Navigation, ALL_CATEGORIES } from '../components/navigation';

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

interface IndexPageState {
    selectedCategory?: string
}

export default class extends React.Component<IndexPageProps, IndexPageState> {
    public state = { selectedCategory: undefined };
    public render() {
        return (
            <div>
                <Banner />
                <Navigation categories={this.categories} onCategoryChanged={this.onCategoryChanged} />
                <div>
                    {this.props.data.site.siteMetadata.projects.map((project, i) => (
                        this.shouldRenderProject(project) && <ProjectTile {...project} key={i} />
                    ))}
                </div>
            </div>
        );
    }

    private shouldRenderProject(project: Project) {
        const {selectedCategory} = this.state;
        if (selectedCategory === undefined ) { return true }

        return project.categories.includes(selectedCategory);
    }

    private onCategoryChanged = (category: string | symbol) => {
        if (category === ALL_CATEGORIES) {
            this.setState({selectedCategory: undefined})
        } else {
            this.setState({selectedCategory: category as string})
        }
    };

    private get categories() {
        return Array.from(
            new Set(
                this.props.data.site.siteMetadata.projects
                    .map(project => project.categories)
                    .reduce((result, categories) => [...result, ...categories], []),
            ),
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
