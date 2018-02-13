import * as React from 'react';
import Link from 'gatsby-link';

import { ProjectTile } from '../components/ProjectTile';
import { Banner } from '../components/banner';
import { Navigation, ALL_CATEGORIES } from '../components/navigation';
import { GithubData, RepositoryNode } from '../interfaces/github';

interface IndexPageProps {
    data: {
        site: {
            siteMetadata: {
                title: string;
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
        const repositories = this.props.data.githubData.data.organization.repositories;
        return (
            <div>
                <Banner />
                {/* <Navigation categories={this.categories} onCategoryChanged={this.onCategoryChanged} /> */}
                <div>
                    {this.repositories.map((repo, i) => <ProjectTile key={i} {...repo} />)}
                    {/* {this.props.data.site.siteMetadata.projects.map(
                        (project, i) =>
                            this.shouldRenderProject(project) && <ProjectTile {...project} key={i} />,
                    )} */}
                </div>
            </div>
        );
    }

    private shouldRenderProject(project: RepositoryNode) {
        const { selectedCategory } = this.state;
        if (selectedCategory === undefined) {
            return true;
        }
        return true;
        // return project.categories.includes(selectedCategory);
    }

    private onCategoryChanged = (category: string | symbol) => {
        if (category === ALL_CATEGORIES) {
            this.setState({ selectedCategory: undefined });
        } else {
            this.setState({ selectedCategory: category as string });
        }
    };

    private get repositories() {
        return this.props.data.githubData.data.organization.repositories.edges.map(edge => edge.node);
    }

    /** Get a flat list of all categories */
    // private get categories() {
    // return Array.from(
    //     new Set(
    //         this.props.data.site.siteMetadata.projects
    //             .map(project => project.categories)
    //             .reduce((result, categories) => [...result, ...categories], []),
    //     ),
    // );
    // }
}

export const pageQuery = graphql`
    query IndexQuery {
        site {
            siteMetadata {
                title
            }
        }
        githubData {
            data {
                organization {
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
                                repositoryTopics {
                                    edges {
                                        node {
                                            topic {
                                                name
                                            }
                                        }
                                    }
                                }
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
