import * as React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

import * as colors from '../common/colors';

export const ALL_CATEGORIES = Symbol('All categories');

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;

    @media (max-width: 500px) {
        flex-direction: column;
        text-align: center;
    }
`;

const SelectedCategoryBakground = styled.div`
    position: absolute;
    border-radius: 2px;
    background: ${colors.dove};
    transition-property: width, height, top, left;
    transition-duration: 200ms;
    transition-timing-function: ease-in;
    transition-delay: 50ms;
    z-index: 0;
`;

interface NavigationProps {
    onCategoryChanged(newCategory: string | symbol): void;
    categories: string[];
}

interface NavigationState {
    selectedCategory: string | symbol;
    selectedCategoryDiv?: {
        width: number;
        height: number;
        left: number;
        top: number;
    };
}

/**
 * Allows user to select a category from a list of categories
 *
 * @todo widnow.resize needs handling
 */
export class Navigation extends React.Component<NavigationProps, NavigationState> {
    constructor(props: NavigationProps) {
        super(props);
        this.state = {
            selectedCategory: ALL_CATEGORIES,
        };
    }

    private onCategoryClicked = (category: string | symbol, element: HTMLAnchorElement) => {
        this.props.onCategoryChanged(category);
        this.setSelectedCategoryDivPositionAndDimentions(element);
        this.setState({ selectedCategory: category });
    };

    private selectAll = (_: string | symbol, element: HTMLAnchorElement) => {
        this.props.onCategoryChanged(ALL_CATEGORIES);
        this.setSelectedCategoryDivPositionAndDimentions(element);
        this.setState({ selectedCategory: ALL_CATEGORIES });
    };

    private setSelectedCategoryDivPositionAndDimentions(element: HTMLAnchorElement) {
        this.setState({
            selectedCategoryDiv: {
                width: element.offsetWidth,
                height: element.offsetHeight,
                left: element.offsetLeft,
                top: element.offsetTop,
            },
        });
    }

    /**
     * Handle the "all" category first time calling the ref function to set
     * SelectedCategoryDiv position and dimentions
     */
    private handleAllCategoryFirstRef = (el: any) => {
        if (this.state.selectedCategoryDiv) {
            return;
        }

        if (el) {
            this.setSelectedCategoryDivPositionAndDimentions(el);
        }
    };

    private isSelected(category: string | symbol) {
        return category === this.state.selectedCategory;
    }

    public render() {
        return (
            <Wrapper>
                <Category
                    selected={this.isSelected(ALL_CATEGORIES)}
                    reference={this.handleAllCategoryFirstRef}
                    category={ALL_CATEGORIES}
                    onClick={this.selectAll}
                />
                {this.props.categories.map((category, i) => (
                    <Category
                        selected={this.isSelected(category)}
                        category={category}
                        key={i}
                        onClick={this.onCategoryClicked}
                    />
                ))}
                <SelectedCategoryBakground style={{ ...this.state.selectedCategoryDiv }} />
            </Wrapper>
        );
    }
}

const CategoryLink = styled.a.attrs({ href: '#' })`
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    position: relative;
    z-index: 1;
    text-decoration: none;
    color: ${(props: { selected?: boolean }) => (props.selected ? colors.white : colors.dove)};
    transition-property: color;
    transition-delay: 150ms;
    transition-timing-function: ease-in;
    transition-duration: 200ms;
`;

interface CategoryProps {
    category: string | symbol;
    onClick: (category: string | symbol, element: HTMLAnchorElement) => void;
    selected?: boolean;
    reference?: (element: any) => void;
}

const Category: React.StatelessComponent<CategoryProps> = ({ category, onClick, reference, selected }) => {
    const text = typeof category === 'symbol' ? 'All' : category;
    const onClickHandler = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onClick(category, e.currentTarget);
    };
    const refHandler = reference || ((_: any) => undefined);
    return (
        <CategoryLink selected={selected} innerRef={refHandler} onClick={onClickHandler}>
            {text}
        </CategoryLink>
    );
};
