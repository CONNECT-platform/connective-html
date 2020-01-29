# Contributing to CONNECTIVE HTML

The project is in its early stages. These are the areas that would require most help:

- Unit-Tests: test coverage is currently pretty low, and this basically blocks the project from reliable changes to the codebase, which makes this priority number one.
- Benchmarking: like any proper front-end framework/library, **CONNECTIVE HTML** should also be subject to standard benchmarks, particularly [this benchmark](https://github.com/krausest/js-framework-benchmark).
- In-code documentation: the main goal here is to guide developers using the package, particularly those using an IDE that displays such documentation in-editor in various situations (such as autocomplete suggestions).

> **NOTE**: ensure that you review and follow our [code of conduct](CODE_OF_CONDUCT.md) before contributing to this project.

## How to Run the Code

1. clone this repo
2. `npm i`
3. `npm start`

### How to Run Tests

`npm test`

### How to Make a Build

`npm run build`

## Under the Hood

The core offering of **CONNECTIVE HTML** is a [simple wrapper class](/src/renderer/renderer.ts) that allows working with DOM APIs in JSX syntax, called [`Renderer`](/src/renderer/renderer.ts). This process is mainly broken into following steps:

- Creating the element (based on given tag)
- Setting its properties (attributes)
- Appending its child nodes
- Rendering it on the document

The `Renderer` class is then extended by [`ExtensibleRenderer`](/src/renderer/extensible-renderer.ts), which allows modifying the behavior of the renderer at each of these steps via [`Plugin`s](src/renderer/plugin/plugin.ts). These plugins can support creation of elements using custom tags (for example giving us support for [custom components](/src/renderer/plugin/component/component.ts)), appending custom objects or setting custom objects as property (attribute) values (such as one that [adds support for Rxjs Observables](/src/renderer/plugin/rxjs/observable.ts)), or be executed after a created `Node` was added to the main document (for example [activating all registered lifecycle hooks](/src/renderer/plugin/life-cycle.ts)).

Plugins can also be unrelated to any of the aforementioned steps of `Node` creation process. In such cases, `ExtensibleRenderer` itself will never invoke these plugins, but they might be used by other plugins, for example [providing additional functionality to custom components to more easily expose their inputs/outputs](/src/renderer/plugin/component/expose.ts).

Finally, a nominal renderer, aptly called [`ConnectiveRenderer`](/src/renderer/index.ts#L23-L42) is defined, which is just an `ExtensibleRenderer` plugged with all the necessary plugins to support [custom components](/src/renderer/plugin/component/), [RxJS](/src/renderer/plugin/rxjs/), [CONNECTIVE](/src/renderer/plugin/connective/), alongside various other convenience plugins, and [is exported as the main renderer](/src/index.ts#L3-L4).

[Some standard custom components](/src/components/) are also provided, for example [`List`](/src/components/list.tsx) adds support for dynamic lists, [`Conditional`](/src/components/conditional.tsx) adds support for elements that are present in the DOM tree conditional on some reactive value, or [`Context`](/src/components/context.tsx) provides a mechanism to pass down some values on the DOM tree implicitly (paired with a plugin [that allows components to access these context values](/src/renderer/plugin/component/context.ts)).

## Further Questions

Feel free to ask any questions you might have [via email from ghanizadeh.eugene@gmail.com](mailto:ghanizadeh.eugene@gmail.com).
