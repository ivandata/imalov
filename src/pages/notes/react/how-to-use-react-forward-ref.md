---
layout: ../../../layouts/note.astro
title: "How to use React forwardRef"
description: "A small snippet of how to use React forwardRef technique with TypeScript"
keywords: "TypeScript, React, Technique"
lang: "react"
date: 2022-05-02
---

Ref forwarding is a technique for automatically passing a ref through a component to one of its children. This is typically not necessary for most components in the application. However, it can be useful for some kinds of components, especially in reusable component libraries. The most common scenarios are described below.


```tsx
import React, { createRef, forwardRef, ChangeEventHandler } from 'react';

type InputComponentProps = {
  value?: string;
  onChange?: ChangeEventHandler;
};

type InputRefType = HTMLInputElement;

const InputComponent = forwardRef<InputRefType, InputComponentProps>(
  ({ value, onChange }, ref) => (
    <input ref={ref} value={value} onChange={onChange} />
  ),
);

const SmallForm = (): JSX.Element => {
  const inputRef = createRef<InputRefType>();

  const onButtonClick = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <button type="button" onClick={onButtonClick}>
        Focus to input
      </button>
      <InputComponent ref={inputRef} />
    </>
  );
};

```

Here is a step-by-step explanation of what happens in the above example:

1. We create a React ref by calling `createRef` and assign it to a `ref` variable with `InputRefType` type.
2. We pass our `ref` down to `<InputComponent ref={ref}>` by specifying it as a JSX attribute.
3. React passes the `ref` to the `(props, ref) => ...` function inside `forwardRef` as a second argument.
4. We forward this `ref` argument down to `<input ref={ref}>` by specifying it as a JSX attribute.
5. When the `ref` is attached, `ref.current` will point to the `<input>` DOM node.
