export interface GithubData {
    data: {
        organization: Organization;
    };
}

export interface LanguageNode {
    name: string;
}

export interface LangugeEdge {
    node: LanguageNode;
}

export interface Languages {
    edges: LangugeEdge[];
}

export interface Topic {
    name: string;
}

export interface RepositoryTopicNode {
    topic: Topic;
}

export interface RepositoryTopicEdge {
    node: RepositoryTopicNode;
}

export interface RepositoryTopics {
    edges: RepositoryTopicEdge[];
}

export interface Stargazers {
    totalCount: number;
}

export interface Forks {
    totalCount: number;
}

export interface RepositoryNode {
    name: string;
    url: string;
    homepageUrl: string;
    languages: Languages;
    description: string;
    descriptionHTML: string;
    repositoryTopics: RepositoryTopics;
    stargazers: Stargazers;
    forks: Forks;
}

export interface Edge {
    node: RepositoryNode;
}

export interface Repositories {
    edges: Edge[];
}

export interface Organization {
    repositories: Repositories;
}
