# HostComponent组件的更新


入口在beginWork中, 当判断workInProgress.tag为5时, 代表为HostComponent

```javascript
switch (workInProgress.tag) {
    // ...
    case HostComponent:
          return updateHostComponent(current, workInProgress, renderExpirationTime);
    // ...
}
```

直接进入updateHostComponent函数内处理

```javascript
function updateHostComponent(current, workInProgress, renderExpirationTime) {
  // Context处理
  pushHostContext(workInProgress);

  if (current === null) {
    tryToClaimNextHydratableInstance(workInProgress);
  }

  const type = workInProgress.type;
  const nextProps = workInProgress.pendingProps;
  const prevProps = current !== null ? current.memoizedProps : null;

  let nextChildren = nextProps.children;

  // 判断子节点是否是纯文本, 满足以下条件即可当做纯文本
  // type === 'textarea' || type === 'option' 
  // || type === 'noscript' || typeof props.children === 'string' || typeof props.children === 'number' ||
  //        (typeof props.dangerouslySetInnerHTML === 'object' &&
  //          props.dangerouslySetInnerHTML !== null &&
  //          props.dangerouslySetInnerHTML.__html != null)
  const isDirectTextChild = shouldSetTextContent(type, nextProps);

  if (isDirectTextChild) {
    // We special case a direct text child of a host node. This is a common
    // case. We won't handle it as a reified child. We will instead handle
    // this in the host environment that also has access to this prop. That
    // avoids allocating another HostText fiber and traversing it.
    nextChildren = null;
  } else if (prevProps !== null && shouldSetTextContent(type, prevProps)) {
    // If we're switching from a direct text child to a normal child, or to
    // empty, we need to schedule the text content to be reset.
    workInProgress.effectTag |= ContentReset;
  }

  markRef(current, workInProgress);

  // Check the host config to see if the children are offscreen/hidden.
  if (
    workInProgress.mode & ConcurrentMode &&
    renderExpirationTime !== Never &&
    shouldDeprioritizeSubtree(type, nextProps)
  ) {
    if (enableSchedulerTracing) {
      markSpawnedWork(Never);
    }
    // Schedule this fiber to re-render at offscreen priority. Then bailout.
    workInProgress.expirationTime = workInProgress.childExpirationTime = Never;
    return null;
  }

  reconcileChildren(
    current,
    workInProgress,
    nextChildren,
    renderExpirationTime,
  );
  return workInProgress.child;
}
```