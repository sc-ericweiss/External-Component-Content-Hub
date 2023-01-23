import { Nullable } from "@sitecore/sc-contenthub-webclient-sdk";
import { FieldFilterRequestResource } from "@sitecore/sc-contenthub-webclient-sdk/dist/models/search/field-filter-request-resource";
import { FieldFilterResponseResource } from "@sitecore/sc-contenthub-webclient-sdk/dist/models/search/field-filter-response-resource";
import { FilterOperator } from "@sitecore/sc-contenthub-webclient-sdk/dist/models/search/filter-operator";
import { RequestedFilterType } from "@sitecore/sc-contenthub-webclient-sdk/dist/models/search/requested-filter-type";

import React, { FunctionComponent, useEffect, useState } from "react";

interface SearchInteractionProps {
  /**
   * The identifier of the search component whose filter changes we want to track.
   */
  searchIdentifier: string;

  /**
   * A callback to add filters to the search component.
   */
  addFilters: (
    searchIdentifier: string,
    filters: Array<FieldFilterRequestResource>
  ) => void;

  /**
   * A callback to update the current query (e.g. to remove filters).
   */
  updateQuery: (searchIdentifier: string, query: string) => void;

  /**
   * A callback to update the full text filter.
   */
  updateFullTextFilter: (searchIdentifier: string, text: string) => void;

  /**
   * A callback to clear the full text filter.
   */
  clearFullTextFilter: (searchIdentifier: string) => void;

  /**
   * A function that returns the correct search identifier to check for when listening to the SEARCH_CHANGED event
   */
  getEventSearchIdentifier: (searchIdentifier: string) => string;
}

interface FullTextFilter {
  /**
   * The current full text filter.
   */
  value: string;

  /**
   * The encoded query without the full text filter.
   */
  removeQuery: string;
}

const AddSearchFilters: FunctionComponent<SearchInteractionProps> = ({
  searchIdentifier,
  addFilters,
  updateQuery,
  clearFullTextFilter,
  updateFullTextFilter,
  getEventSearchIdentifier,
}) => {
  const [appliedSearchFilters, setAppliedSearchFilters] = useState<
    Array<FieldFilterResponseResource>
  >([]);

  const [fullTextFilterValue, setFullTextFilterValue] = useState<string>("");

  const addSearchFilter = () => {
    // We setup some filters to add.
    const extraFilters = [
      new FieldFilterRequestResource({
        fieldName: "taxonomy_items.98.*",
        values: [29477],
        nestedValues: [],
        operator: FilterOperator.AnyOf,
        visible: true,
        hidden: true,
        multiSelect: true,
        filterType: RequestedFilterType.InFilter,
      }),
    ];

    // We call the callback function and pass the search identifier and filters to add.
    addFilters(searchIdentifier, extraFilters);
  };

  useEffect(() => {
    // Whe the search has finished we show the updated filters
    const onSearchFinished = (evt: Event): void => {
      const {
        filters,
        searchIdentifier: eventSearchIdentifier, // We rename the property to eventSearchIdentifier.
        fullText,
      } = (
        evt as CustomEvent<{
          searchIdentifier: string;
          fullText: string;
          filters: Array<FieldFilterResponseResource>;
          ids: Array<number>;
        }>
      ).detail;

      // We check if the searchIdentifier on the event is the one we are interested in.
      if (
        eventSearchIdentifier === getEventSearchIdentifier(searchIdentifier)
      ) {
        setAppliedSearchFilters(filters);
        setFullTextFilterValue(fullText);
      }
    };

    window.addEventListener("SEARCH_FINISHED", onSearchFinished);

    return () => {
      window.removeEventListener("SEARCH_FINISHED", onSearchFinished);
    };
  }, []);

  return (
    <>
      <button onClick={addSearchFilter}>Add search filter</button>
      {appliedSearchFilters.map((filter) => (
        <button
          onClick={() => updateQuery(searchIdentifier, filter.removeQuery)}
        >
          Remove {filter.label}
        </button>
      ))}
      {appliedSearchFilters.length > 0 && (
        <>
          <h4>Currently applied filters</h4>
          <pre>{JSON.stringify(appliedSearchFilters, undefined, 4)}</pre>
        </>
      )}

      <>
        <h4>Full text filter</h4>
        <input
          type="text"
          value={fullTextFilterValue}
          onChange={(e) => setFullTextFilterValue(e.target.value)}
        />
        <button
          onClick={() =>
            updateFullTextFilter(searchIdentifier, fullTextFilterValue)
          }
        >
          Update fullText filter
        </button>
        <button onClick={() => clearFullTextFilter(searchIdentifier)}>
          Delete fullText filter
        </button>
      </>
    </>
  );
};

export default AddSearchFilters;