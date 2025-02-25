import { useSearchParams } from "react-router-dom";

const paramToBool = (paramName, paramDefinition, searchParams) => {
  const paramValue = searchParams.get(paramName);
  // The only presence of a boolean param (value === '') is considered true
  if (paramValue === "true" || paramValue === "1" || paramValue === "")
    return true;
  if (paramValue === "false" || paramValue === "0") return false;

  return paramDefinition.default;
};

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