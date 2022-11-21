# Function组件的更新

入口在beginWork中, 当判断workInProgress.tag为0时, 代表为FunctionComponent

```javascript
switch (workInProgress.tag) {
    // ...
    case FunctionComponent: {
      const Component = workInProgress.type;
      const unresolvedProps = workInProgress.pendingProps;
      const resolvedProps =
        workInProgress.elementType === Component
          ? unresolvedProps
          : resolveDefaultProps(Component, unresolvedProps);
      return updateFunctionComponent(
        current,
        workInProgress,
        Component,
        resolvedProps,
        renderExpirationTime,
      );
    }
    // ...
}
```