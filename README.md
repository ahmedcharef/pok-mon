* Please write a paragraph describing how you would make Apollo Link and Redux coexist in the same app:
* => By default, Apollo Client creates its own internal Redux store to manage queries and their results. but if you need the data got by apollo to be used in redux action, from the component side, we can assign it to redux.
Also we can use RTK Query Overview, so we make tje Apollo for server state and Redux for client state.
