# Easy React App

This repo provides the starting block to create a new modular and easy to mantain react App.

Despite being a simple App, it presents some powerful features.

### Functional programming
This App has been created with multiple functional programming patterns in mind. In particular, it makes use of `Maybe` monad for anything done asynchronously and the redux store is an `immutable` data structure. This will allow us to write beautifully declerative code.

To combine these powerful patterns, the store has a *custom middleware* that manages the async actions and returns the correct monad.

### Why using monads instead of other patterns like `redux-saga`?
Libraries like `redux-saga` make writing actions more imperative, with the use of generators, that in turn require a different action type for every case: `LOAD_TODO_LOADING`, `LOAD_TODO_SUCCESS`, etc. complicating the code even more.

By using a monad, the action type is *always the same* and it is only the payload do change. The result, is components that, even when depending on async calls, still look easy to understand.

For example:

```javascript
const people = props => {
  const renderPeople = () => props.people.get('loadPeopleResult').matchWith({
    Empty: () => 'Loading',
    Loading: () => 'Loading',
    Success: ({data}) => data.toJS().map(p => <Person key={p.url} {...p} />),
    Failure: ({error}) => `Something went wrong: ${error.message}`
  });
  
 return (
    <div>
        Here is our people:
        {renderPeople()}
    </div>
 )
}
```

### Reusable connections
The most common way of connecting components is by creating the `connect()` function directly inside the component. While this works fine, it creates a lot of repetition, as multiple components can require the same state/actions. For this reason, the connections live in a separate folder `/bridge` where they can be shared among multiple components, reducing redundancy.

### Other notes
In the codebase, there is a lot of code borrowed from other previous projects I worked on. In particular, the `common/fn.js` file is a collection of utils I used with time (mainly for FP). As your projects grows, always check if there is anything you can use from there!
