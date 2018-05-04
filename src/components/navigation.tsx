import * as React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

import * as colors from '../common/colors';
import { sleep } from '../common/utils';

export const ALL_CATEGORIES = Symbol('All categories');

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;

    @media (max-width: 500px) {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        text-align: center;
    }

    @media (max-width: 300px) {
        grid-template-columns: 1fr 1fr;
    }
`;

interface NavigationProps {
    selectedCategory?: string;
    onCategoryChanged(newCategory: string | symbol): void;
    categories: string[];
}

interface NavigationState {
    selectedCategory: string | symbol;
    /** Is transition animation between categories in progress? */
    isTransitioning: boolean;
    selectedCategoryDiv?: {
        width: number;
        height: number;
        left: number;
        top: number;
    };
}

/**
 * Allows user to select a category from a list of categories
 */
export class Navigation extends React.Component<NavigationProps, NavigationState> {
    static TRANSITION_DURATION_MS = 300;
    constructor(props: NavigationProps) {
        super(props);
        this.state = {
            isTransitioning: false,
            selectedCategory: props.selectedCategory || ALL_CATEGORIES,
        };
    }

    private onCategoryClicked = (category: string | symbol, element: HTMLAnchorElement) => {
        this.props.onCategoryChanged(category);
        this.setState({ selectedCategory: category, isTransitioning: true });
        sleep(0)
            .then(() => this.setSelectedCategoryDivPositionAndDimensions(element))
            .then(() => sleep(Navigation.TRANSITION_DURATION_MS))
            .then(() => this.setState({ isTransitioning: false }));
    };

    private setSelectedCategoryDivPositionAndDimensions(element: HTMLAnchorElement) {
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
     * SelectedCategoryDiv position and dimensions
     */
    private handleAllCategoryFirstRef = (el: any) => {
        if (!this.state.selectedCategoryDiv && this.state.selectedCategory === ALL_CATEGORIES) {
            this.setSelectedCategoryDivPositionAndDimensions(el);
        }
    };

    /**
     * Handle the a category first time calling the ref function.
     */
    private handleCategoryRef = (el: any) => {
        if (!this.state.selectedCategoryDiv && el.hash.substr(1) === this.state.selectedCategory) {
            this.setSelectedCategoryDivPositionAndDimensions(el);
        }
    };

    private isSelected(category: string | symbol) {
        if (this.state.isTransitioning) {
            return false;
        }
        return category === this.state.selectedCategory;
    }

    public render() {
        return (
            <Wrapper>
                <Category
                    selected={this.isSelected(ALL_CATEGORIES)}
                    reference={this.handleAllCategoryFirstRef}
                    category={ALL_CATEGORIES}
                    onClick={this.onCategoryClicked}
                />
                {this.props.categories.map((category, i) => (
                    <Category
                        selected={this.isSelected(category)}
                        reference={this.handleCategoryRef}
                        category={category}
                        key={i}
                        onClick={this.onCategoryClicked}
                    />
                ))}
                {this.state.isTransitioning && (
                    <SelectedCategoryBakground style={{ ...this.state.selectedCategoryDiv }} />
                )}
            </Wrapper>
        );
    }
}

const SelectedCategoryBakground = styled.div`
    position: absolute;
    border-radius: 2px;
    background: ${colors.dove};
    transition-property: width, height, top, left;
    transition-duration: ${Navigation.TRANSITION_DURATION_MS}ms;
    transition-timing-function: ease-in;
    transition-delay: 50ms;
    z-index: 0;
`;

interface CategoryLinkProps {
    selected?: boolean;
    anchor?: string;
    innerRef: any;
    onClick: (e: React.SyntheticEvent<HTMLAnchorElement>) => void;
}

const CategoryLink = styled.a.attrs<CategoryLinkProps>({
    href: (props: CategoryLinkProps) => (props.anchor ? `#${props.anchor}` : ''),
})`
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    position: relative;
    z-index: 1;
    border-radius: 2px;
    text-decoration: none;
    color: ${(props: CategoryLinkProps) => (props.selected ? colors.white : colors.dove)};
    background: ${(props: CategoryLinkProps) => (props.selected ? colors.dove : colors.transparent)};
    /* transition-property: color;
    transition-delay: -${Navigation.TRANSITION_DURATION_MS}ms;
    transition-timing-function: ease-in;
    transition-duration: ${Navigation.TRANSITION_DURATION_MS}ms; */
`;

interface CategoryProps {
    category: string | symbol;
    onClick: (category: string | symbol, element: HTMLAnchorElement) => void;
    selected?: boolean;
    reference?: (element: any) => void;
}

const Category: React.StatelessComponent<CategoryProps> = ({ category, onClick, reference, selected }) => {
    const text = typeof category === 'symbol' ? 'All' : category;
    const anchor = typeof category === 'symbol' ? undefined : category;
    const onClickHandler = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
        onClick(category, e.currentTarget);
    };
    const refHandler = reference || ((_: any) => undefined);
    return (
        <CategoryLink selected={selected} anchor={anchor} innerRef={refHandler} onClick={onClickHandler}>
            {text}
        </CategoryLink>
    );
};
