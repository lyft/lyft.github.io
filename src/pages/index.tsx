import * as React from 'react';
import Link from 'gatsby-link';

import { Project, ProjectTile } from '../components/ProjectTile';
import { Banner } from '../components/banner';
import { Navigation, ALL_CATEGORIES } from '../components/navigation';
import { GithubData, RepositoryNode } from '../interfaces/github';

interface IndexPageProps {
    data: {
        site: {
            siteMetadata: {
                title: string;
                projects: Project[];
            };
        };
        githubData: GithubData;
    };
}

interface IndexPageState {
    selectedCategory?: string;
}

export default class extends React.Component<IndexPageProps, IndexPageState> {
    public state = { selectedCategory: undefined };
    public render() {
        return (
            <div>
                <Banner />
                <Navigation categories={this.categories} onCategoryChanged={this.onCategoryChanged} />
                <div>
                    {this.props.data.site.siteMetadata.projects.map(
                        (project, i) =>
                            this.shouldRenderProject(project) && (
                                <ProjectTile
                                    project={project}
                                    key={i}
                                    repositoryNode={this.getProjectRepositoryNode(project)}
                                />
                            ),
                    )}
                </div>
            </div>
        );
    }

    private shouldRenderProject(project: Project) {
        const { selectedCategory } = this.state;
        if (selectedCategory === undefined) {
            return true;
        }

        return project.categories.includes(selectedCategory);
    }

    private onCategoryChanged = (category: string | symbol) => {
        if (category === ALL_CATEGORIES) {
            this.setState({ selectedCategory: undefined });
        } else {
            this.setState({ selectedCategory: category as string });
        }
    };

    /** Get a flat list of all categories */
    private get categories() {
        return Array.from(
            new Set(
                this.props.data.site.siteMetadata.projects
                    .map(project => project.categories)
                    .reduce((result, categories) => [...result, ...categories], []),
            ),
        );
    }

    private get repositoriesNodes() {
        return this.props.data.githubData.data.organization.repositories.edges.map(edge => edge.node);
    }

    private getProjectRepositoryNode(project: Project) {
        return this.repositoriesNodes.find(
            repositoriesNode => repositoriesNode.name.toLocaleLowerCase() === project.name.toLowerCase(),
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
