import { useSearchParams } from "react-router-dom";

/**
 * @typedef {Object} ParamDefinition
 * @property {"string" | "number" | "boolean"} type - The type of the parameter
 * @property {any} default - Default value when parameter is not present
 * @property {boolean} [multiple] - Whether the parameter can have multiple values
 */

/**
 * Converts URL parameter to boolean value
 * @param {string} paramName - Name of the parameter
 * @param {ParamDefinition} paramDefinition - Definition of the parameter
 * @param {URLSearchParams} searchParams - Current search parameters
 * @returns {boolean} Converted boolean value
 */
const paramToBool = (paramName, paramDefinition, searchParams) => {
  const paramValue = searchParams.get(paramName);
  // The only presence of a boolean param (value === '') is considered true
  if (paramValue === "true" || paramValue === "1" || paramValue === "")
    return true;
  if (paramValue === "false" || paramValue === "0") return false;

  return paramDefinition.default;
};

/**
 * Converts URL parameter to appropriate type based on definition
 * @param {string} paramName - Name of the parameter
 * @param {ParamDefinition} paramDefinition - Definition of the parameter
 * @param {URLSearchParams} searchParams - Current search parameters
 * @returns {any} Converted value
 */
const paramToValue = (paramName, paramDefinition, searchParams) => {
  if (paramDefinition.multiple) {
    const paramValue = searchParams.getAll(paramName);
    if (paramValue.length > 0) {
      return paramDefinition.type === "number"
        ? paramValue.map((value) => Number(value))
        : paramValue;
    }
  } else {
    const paramValue = searchParams.get(paramName);
    if (paramValue) {
      return paramDefinition.type === "number"
        ? Number(paramValue)
        : paramValue;
    }
  }
  return paramDefinition.default;
};

/**
 * Extracts values from search parameters based on definitions
 * @param {Object.<string, ParamDefinition>} paramsDefinition - Definitions for all parameters
 * @param {URLSearchParams} searchParams - Current search parameters
 * @returns {Object.<string, any>} Extracted values
 */
const getValues = (paramsDefinition, searchParams) => {
  const values = {};
  for (const [paramName, paramDefinition] of Object.entries(paramsDefinition)) {
    if (paramDefinition.type === "boolean") {
      values[paramName] = paramToBool(paramName, paramDefinition, searchParams);
    } else {
      values[paramName] = paramToValue(
        paramName,
        paramDefinition,
        searchParams
      );
    }
  }
  return values;
};

/**
 * Gets all current URL parameters
 * @param {URLSearchParams} searchParams - Current search parameters
 * @returns {Object.<string, string|string[]>} Current parameter values
 */
const getAllCurrentParams = (searchParams) => {
  const allUrlParams = {};
  searchParams.forEach((value, key) => {
    if (allUrlParams[key]) {
      if (Array.isArray(allUrlParams[key])) {
        allUrlParams[key].push(value);
      } else {
        allUrlParams[key] = [allUrlParams[key], value];
      }
    } else {
      allUrlParams[key] = value;
    }
  });
  return allUrlParams;
};

/**
 * Custom hook for managing URL search parameters with type safety
 * @param {Object.<string, ParamDefinition>} paramsDefinition - Definitions for all parameters
 * @returns {[Object.<string, any>, (newValues: Object.<string, any>) => void]} Tuple containing values and setter
 */
const useSearchParamsState = (paramsDefinition) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const values = getValues(paramsDefinition, searchParams);

  const setValues = (newValues) => {
    const currentParams = getAllCurrentParams(searchParams);
    for (const key in newValues) {
      if (Object.prototype.hasOwnProperty.call(newValues, key)) {
        const value = newValues[key];
        if (
          value === "" ||
          (Array.isArray(value) && value.length === 0) ||
          paramsDefinition[key].default === value
        ) {
          delete currentParams[key];
          delete newValues[key];
        }
      }
    }
    setSearchParams({ ...currentParams, ...newValues });
  };

  return [values, setValues];
};

export default useSearchParamsState;

/* Usage Examples:

1. Basic usage with different parameter types:
```jsx
function SearchPage() {
  const paramsDefinition = {
    query: { type: "string", default: "" },
    page: { type: "number", default: 1 },
    filters: { type: "string", multiple: true, default: [] },
    showAdvanced: { type: "boolean", default: false }
  };

  const [searchState, setSearchState] = useSearchParamsState(paramsDefinition);

  return (
    <div>
      <input
        value={searchState.query}
        onChange={(e) => setSearchState({ ...searchState, query: e.target.value })}
      />
      <select
        multiple
        value={searchState.filters}
        onChange={(e) => {
          const values = Array.from(e.target.selectedOptions, option => option.value);
          setSearchState({ ...searchState, filters: values });
        }}
      >
        <option value="category1">Category 1</option>
        <option value="category2">Category 2</option>
      </select>
      <button
        onClick={() => setSearchState({ 
          ...searchState, 
          showAdvanced: !searchState.showAdvanced 
        })}
      >
        Toggle Advanced
      </button>
      <div>Current Page: {searchState.page}</div>
    </div>
  );
}
```

2. Advanced usage with default values and type conversion:
```jsx
function ProductList() {
  const paramsDefinition = {
    sort: { type: "string", default: "newest" },
    priceRange: { 
      type: "number", 
      multiple: true, 
      default: [0, 1000]
    },
    inStock: { type: "boolean", default: true }
  };

  const [filterState, setFilterState] = useSearchParamsState(paramsDefinition);

  useEffect(() => {
    // URL will automatically update when state changes
    fetchProducts(filterState);
  }, [filterState]);

  return (
    <div>
      <select
        value={filterState.sort}
        onChange={(e) => setFilterState({ ...filterState, sort: e.target.value })}
      >
        <option value="newest">Newest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>

      <div>
        Price Range: {filterState.priceRange[0]} - {filterState.priceRange[1]}
        <button onClick={() => setFilterState({
          ...filterState,
          priceRange: [0, 2000]
        })}>
          Expand Range
        </button>
      </div>

      <label>
        <input
          type="checkbox"
          checked={filterState.inStock}
          onChange={(e) => setFilterState({
            ...filterState,
            inStock: e.target.checked
          })}
        />
        Show Only In Stock
      </label>
    </div>
  );
}
```
*/