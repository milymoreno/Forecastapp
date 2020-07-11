import React from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { Link } from "react-router-dom";

export default function Wrapper({
  // Are there more items to load?
  // (This information comes from the most recent API request.)
  hasNextPage,

  // Are we currently loading a page of items?
  // (This may be an in-flight flag in your Redux store for example.)
  isNextPageLoading,

  // Array of items loaded so far.
  items,

  // Callback function responsible for loading the next page of items.
  loadNextPage,
  wrapperClassName,
  getOptionProps,
  groupedOptions,
  listboxProps
}) {
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? items.length + 1 : items.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = index => !hasNextPage || index < items.length;

  // Render an item or a loading indicator.
  const Item = ({ index, style }) => {
    if (!isItemLoaded(index)) {
      return <li style={style}>Loading...</li>;
    } else if (!groupedOptions || index >= groupedOptions.length) {
      return <li style={style} />;
    } else {
      const option = groupedOptions[index];
      const name = option.name || "no name";
      return (
        <Link to={`/detail/${option.id}`}>
          <li style={style} {...getOptionProps({ option, index })}>
            {name}, <small>{option.country}</small>
          </li>
        </Link>
      );
    }
  };

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <div {...listboxProps}>
          <List
            className={wrapperClassName}
            height={150}
            itemCount={itemCount}
            itemSize={30}
            onItemsRendered={onItemsRendered}
            ref={ref}
            width={300}
            innerElementType="ul"
          >
            {Item}
          </List>
        </div>
      )}
    </InfiniteLoader>
  );
}
