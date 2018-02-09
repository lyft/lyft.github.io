import * as React from 'react';


export interface Project {
    name: string;
    description: string;
    language: 'C++' | 'JavaScript' | 'TypeScript' | 'Python';
    category: string;
    website: string;
  }


/** A tile for a open source project */
export class ProjectTile extends React.Component<Project> {
    public render() {
        const { language, name, description, category, website } = this.props;
        return (
            <div>
                <a href={website} target="_blank">
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <p><small>{category}</small></p>
                    <LanguageIcon language={language} />
                </a>
            </div>
        );
    }
}


const LanguageIcon: React.StatelessComponent<{language: Project['language']}> = ({ language }) => {
    switch (language) {
        case 'JavaScript':
            return <div>JS</div>;
        case 'TypeScript':
            return <div>TS</div>;
        default:
            return <div>{language}</div>;
    }
}
