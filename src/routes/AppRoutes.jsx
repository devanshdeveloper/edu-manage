import { Route, Routes } from "react-router";
import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import isThis from "@devanshdeveloper/is-this";
import { useAuth } from "../context/AuthContext";
import { ObjectHelper } from "../helpers";

function AppRoutes({ routes }) {
  const { user } = useAuth();

  function renderRoutes(arrayOfProps) {
    return arrayOfProps.map((props, i) => {
      if (isThis.isFunction(props.condition)) {
        if (!props.condition({ user })) {
          return null;
        }
      }
      const passedDownProps = ObjectHelper.omit(
        props,
        "children",
        "title",
        "condition"
      );

      // console.log({title:props.title})
      const elementToRender = passedDownProps.element ? (
        <>
          {props.title && !props.title.includes("Home") && (
            <Helmet>
              <title>{props.title}</title>
            </Helmet>
          )}
          {passedDownProps.element}
        </>
      ) : null;

      if (props.children) {
        return (
          <Fragment key={i}>
            <Route
              {...{
                ...passedDownProps,
                element: elementToRender,
              }}
            >
              {renderRoutes(
                isThis.isFunction(props.children)
                  ? props.children({ user })
                  : props.children
              )}
            </Route>
          </Fragment>
        );
      } else {
        return (
          <Fragment key={i}>
            <Route
              {...{
                ...passedDownProps,
                element: elementToRender,
              }}
            />
          </Fragment>
        );
      }
    });
  }
  return <Routes>{renderRoutes(routes)}</Routes>;
}

export default AppRoutes;
