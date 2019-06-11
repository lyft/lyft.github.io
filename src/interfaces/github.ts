export interface GithubData {
    data: {
        nodes: Organization[];
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
    id: string;
    name: string;
    repositories: Repositories;
}
