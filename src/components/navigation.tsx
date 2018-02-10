import * as React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

import * as colors from '../common/colors';

export const ALL_CATEGORIES = Symbol('All categories');

interface NavigationProps {
    onCategoryChanged(newCategory: string | typeof ALL_CATEGORIES): void;
    categories: string[];
}

/**
 * Allows user to select a category from a list of categories
 */
export class Navigation extends React.Component<NavigationProps> {
    private onCategoryClicked = (category: string | symbol) => {
        this.props.onCategoryChanged(category)
    };
    private selectAll = (_: string | symbol) => {
        this.props.onCategoryChanged(ALL_CATEGORIES);
    };
    public render() {
        return (
            <div>
                <Category category={ALL_CATEGORIES} onClick={this.selectAll} />
                {this.props.categories.map((category, i) => (
                    <Category category={category} key={i} onClick={this.onCategoryClicked} />
                ))}
            </div>
        );
    }
}

interface CategoryProps {
    category: string | symbol;
    onClick: (category: string | symbol) => void;
}
const Category: React.StatelessComponent<CategoryProps> = ({ category, onClick }) => (
    <div onClick={() => onClick(category)}>{typeof category === 'symbol' ? 'All' : category}</div>
);
