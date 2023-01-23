import ReactDOM from "react-dom";
import React from "react";
import AddSearchFilters from "./AddSearchFilters";
import { FieldFilterRequestResource } from "@sitecore/sc-contenthub-webclient-sdk/dist/models/search/field-filter-request-resource";

interface Context {
  config: {
    searchIdentifier: string;
  };
  options: {
    entityId?: number;
  };
  api: {
    search: {
      addFilters: (
        searchIdentifier: string,
        filters: Array<FieldFilterRequestResource>
      ) => void;
      updateQuery: (searchIdentifier: string, query: string) => void;
      updateFullTextFilter: (searchIdentifier: string, text: string) => void;
      clearFullTextFilter: (searchIdentifier: string) => void;
      getEventSearchIdentifier: (searchIdentifier: string) => string;
    };
  };
}

export default function createExternalRoot(container: HTMLElement) {
  return {
    
    render(context: Context) {
      console.log(context)
      const {
        addFilters,
        updateQuery,
        clearFullTextFilter,
        updateFullTextFilter,
        getEventSearchIdentifier,
      } = context.api.search;
      
      ReactDOM.render(
        <AddSearchFilters
          searchIdentifier={context.config.searchIdentifier}
          addFilters={addFilters}
          updateQuery={updateQuery}
          clearFullTextFilter={clearFullTextFilter}
          updateFullTextFilter={updateFullTextFilter}
          getEventSearchIdentifier={getEventSearchIdentifier}
        />,
        container
      );
    },
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    },
  };
}