1.  React.PureComponent implements `shouldComponentUpdate` by default, unlike React.Component. It means that the PureComponent does the shallow comparison intrinsically. An incorrect way of using both of them is to use React.Component as a child of a React.PureComponent waiting for the default behavior of it, because the rules of the component at the top would be followed.
    
2.  The context overwrite the responsability of propagation to the consumers render, so the shouldComponentUpdate is useless in these situations.
    
3.	 through callback, you pass some data as a parameter and execute the callback, giving to the parent the data of the parameter.
using `Context`, you can update some information in the child that the parent can access if both of them are sharing the same provider.

4. 
* avoid derived states
* memoization strategy

5.  when you need to render two different tags as siblings you must use a fragment element, because the JSX expects just a single element, not a couple as in the example above.
`elements.map(element => (
	<React.Fragment>
		<p>name</p>
		<p>age</p>
    </React.Fragment
))`

6. HOC is use the result of some function as parameter of another one.
`const hockFn = (Component, props) => (
	<Component {...props}
)`

7. promise - every promise have a `catch` block, inside of it you can handle exceptions.
	async/await - using the `try/catch` statement you can handle, when a promise throws an exception, the catch block will be executed for handle it.

8. `setState` can receive the new state or a function with the current state as a parameter, it's async because every time that some state changes a re-render is fired. because of that, when you need to update some state and need to use the current value of the same state you must use the second way.

9. 
* map the state of the components and create them of the respective hook
* understand which lifecycle methods the component is using and rewrite them in the functional way

10. 
* inline styles
* JSS/CSS-in-JS
* traditional CSS

11. put the HTML element in memory an set the innerHTML of  it with the string received.