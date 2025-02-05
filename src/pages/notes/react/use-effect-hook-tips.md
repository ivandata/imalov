---
title: "React useEffect hook snippet"
description: "A small snippet of how to use useEffect with mount and unmount lifecycle methods"
keywords: "useEffect, Cleanup, unmount, mount, React, Technique"
lang: "react"
date: 2022-10-11
---
The `useEffect` hook gives us the ability to perform side effects in functional components. This hook replaces lifecycle methods `componentDidMount`, `componentDidUpdate` and `componentWillUnmount`

One of the advantage of using `useEffect` hook is avoiding **code duplication**. 
Class React components don't have built-in methods to perform side effects after each render, whether the component has just been mounted or updated.
Therefore, in most cases, it is necessary to duplicate the code between these class methods of the lifecycle `componentDidMount` and `componentDidUpdate`

With `useEffect` hook an application will react faster to user actions, even when the effect is not over yet.
This is because, unlike `componentDidMount` or `componentDidUpdate`, the `useEffect` do not block the browser when trying to refresh the screen.

In most cases, using `useEffect` to update once after updating the DOM is enough. But what if we want to execute additional code after the element has been removed from the DOM? 
For example, we might want to set up a subscription to some external data source. In that case, it is important to clean up so that we don’t introduce a memory leak. 
In the React class, you would typically subscribe to `componentDidMount` and cancel it in `componentWillUnmount`. 
In the `useEffect` hook, to clean up, it is enough to return the function, and React will execute it only when it is time to reset the effect.

```tsx
type Response = {
  data: string[];
};

function getFakeData(): Promise<Response> {
  return new Promise<Response>((resolve) => {
    setTimeout(() => {
      resolve({
        data: ['Banana', 'Orange', 'Apple', 'Mango'],
      });
    }, 1000);
  });
}

const Fruits = (): JSX.Element => {
  const [results, setResults] = useState<string[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let ignore = false;
    console.log('mount stage');
    getFakeData().then(({ data }: Response) => {
      if (!ignore) {
        setResults(data);
      }
    }).finally(() => {
      setIsLoading(false);
    });
    return () => {
      console.log('unmount stage');
      ignore = true;
    };
  }, []);

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <ul>
      {results?.map((i) => (
        <li key={Math.floor(Math.random() * Date.now())}>{i}</li>
      ))}
    </ul>
  );
};

const Example = (): JSX.Element => {
  const [show, setShow] = useState(true);
  return (
    <div>
      {show && <Fruits />}
      <button type="button" onClick={() => setShow((prev) => !prev)}>
        {show ? 'unmount' : 'mount'} component
      </button>
    </div>
  );
};
```

Here is a step-by-step explanation of what happens in the above example:

1. When the `Fruits` component mounts, will be called the `useEffect` hook
2. To avoid [race condition](https://en.wikipedia.org/wiki/Race_condition), and ignore stale responses we use the flag `ignore`
3. At the end of fetching the `isLoading` state will be changed from `true` to `false` and the result will be shown
4. By button click we will unmount the `Fruits` component and the `useEffect` hook will be called again with unmount stage
5. On unmount stage `loading` state will be changed from `true` to `false` and the `ignore` flag will be reseted
