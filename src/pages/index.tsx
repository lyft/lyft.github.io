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
    public state = { selectedCategory: (typeof window !== 'undefined' && window.location.hash.substr(1)) || undefined };
    public render() {
        return (
            <div>
                <Banner />
                <Navigation
                    selectedCategory={this.state.selectedCategory}
                    categories={this.categories}
                    onCategoryChanged={this.onCategoryChanged}
                />
                <div>
                    {this.projects.map((project, i) => (
                        <ProjectTile
                            project={project}
                            key={i}
                            repositoryNode={this.getProjectRepositoryNode(project)}
                        />
                    ))}
                </div>
            </div>
        );
    }

    /**
     * Get project that should be rendered sorted by stars
     */
    private get projects() {
        return this.props.data.site.siteMetadata.projects
            .filter(project => this.shouldRenderProject(project))
            .sort((pr1, pr2) => {
                return this.getProjectStarCount(pr2) - this.getProjectStarCount(pr1);
            });
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
        let result: RepositoryNode[] = [];
        for (const organization of this.props.data.githubData.data.nodes) {
            result = [...result, ...organization.repositories.edges.map(edge => edge.node)];
        }

        return result;
    }

    private getProjectRepositoryNode(project: Project) {
        const chars = /[A-z]+/;
        return this.repositoriesNodes.find(
            repositoriesNode =>
                chars.exec(repositoriesNode.name)![0].toLowerCase() === chars.exec(project.name)![0].toLowerCase(),
        );
    }

    /**
     * Get a project's star count
     * @param project Project objet
     */
    private getProjectStarCount(project: Project) {
        const repositoryNode = this.getProjectRepositoryNode(project);
        if (repositoryNode) {
            return repositoryNode.stargazers.totalCount;
        }

        return 0;
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
        githubData {
            data {
                nodes {
                    repositories {
                        edges {
                            node {
                                name
                                url
                                languages {
                                    edges {
                                        node {
                                            name
                                        }
                                    }
                                }
                                description
                                stargazers {
                                    totalCount
                                }
                                forks {
                                    totalCount
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
