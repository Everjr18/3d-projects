---
title: Input
---
# Introduction

This document will walk you through the implementation of the Input feature in the <SwmPath>[3dprojects/src/components/mambo-js/Input.js](/3dprojects/src/components/mambo-js/Input.js)</SwmPath> file.

The feature introduces a new input component with several public methods and internal variables.

We will cover:

1. The purpose and types of internal variables.
2. The public methods provided by the component.
3. The rationale behind the design decisions.

# Internal variables

The component defines several internal variables to manage its state and behavior.

<SwmSnippet path="/3dprojects/src/components/mambo-js/Input.js" line="6" collapsed>

---

| Variable                                                                                                                             | Type                                                                                                                                            | Description                                    |
| ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| <SwmToken path="/3dprojects/src/components/mambo-js/Input.js" pos="7:3:3" line-data="		let m_parentTag;">`m_parentTag`</SwmToken>      | `HTMLTag`                                                                                                                                       | Stores the parent HTML tag.                    |
| <SwmToken path="/3dprojects/src/components/mambo-js/Input.js" pos="8:3:3" line-data="		let m_inputTag;">`m_inputTag`</SwmToken>        | `HTMLTag`                                                                                                                                       | Stores the input HTML tag.                     |
| <SwmToken path="/3dprojects/src/components/mambo-js/Input.js" pos="9:3:3" line-data="		let m_labelTag;">`m_labelTag`</SwmToken>        | `HTMLTag`                                                                                                                                       | Stores the label HTML tag.                     |
| <SwmToken path="/3dprojects/src/components/mambo-js/Input.js" pos="10:3:3" line-data="		let m_button;">`m_button`</SwmToken>           | `HTMLTag`                                                                                                                                       | Stores the button HTML tag.                    |
| <SwmToken path="/3dprojects/src/components/mambo-js/Input.js" pos="11:3:3" line-data="		let m_props;">`m_props`</SwmToken>             | <SwmToken path="/3dprojects/src/components/mambo-js/Input.js" pos="147:7:7" line-data="					const keys = Object.keys(validate);">`Object`</SwmToken> | Stores the properties passed to the component. |
| <SwmToken path="/3dprojects/src/components/mambo-js/Input.js" pos="12:3:3" line-data="		let m_dataChanged;">`m_dataChanged`</SwmToken> | `Boolean`                                                                                                                                       | Tracks if the data has changed.                |

```
		// HTML tag variables
		let m_parentTag;
		let m_inputTag;
		let m_labelTag;
		let m_button;
		let m_props;
		let m_dataChanged;

		// Configure public methods
		this.clear = clearInput;
		this.commitDataChange = () => (m_dataChanged = null);
		this.dataChanged = () => m_dataChanged;
		this.getTag = () => m_inputTag;
		this.setup = setup;
		this.value = value;
```

---

</SwmSnippet>

# Public methods

The component exposes several public methods to interact with its internal state.

| Method                                                                                                                                                                        | Return Type | Description                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <SwmToken path="/3dprojects/src/components/mambo-js/Input.js" pos="15:3:3" line-data="		this.clear = clearInput;">`clear`</SwmToken>                                            | `void`      | Clears the input value.                                                                                                                                                                                                                                                                                                      |
| <SwmToken path="/3dprojects/src/components/mambo-js/Input.js" pos="16:3:3" line-data="		this.commitDataChange = () =&gt; (m_dataChanged = null);">`commitDataChange`</SwmToken> | `void`      | Resets the <SwmToken path="/3dprojects/src/components/mambo-js/Input.js" pos="12:3:3" line-data="		let m_dataChanged;">`m_dataChanged`</SwmToken> flag to <SwmToken path="/3dprojects/src/components/mambo-js/Input.js" pos="16:17:17" line-data="		this.commitDataChange = () =&gt; (m_dataChanged = null);">`null`</SwmToken>. |
| <SwmToken path="/3dprojects/src/components/mambo-js/Input.js" pos="17:3:3" line-data="		this.dataChanged = () =&gt; m_dataChanged;">`dataChanged`</SwmToken>                    | `Boolean`   | Returns the current state of the <SwmToken path="/3dprojects/src/components/mambo-js/Input.js" pos="12:3:3" line-data="		let m_dataChanged;">`m_dataChanged`</SwmToken> flag.                                                                                                                                                  |
| <SwmToken path="/3dprojects/src/components/mambo-js/Input.js" pos="18:3:3" line-data="		this.getTag = () =&gt; m_inputTag;">`getTag`</SwmToken>                                 | `HTMLTag`   | Returns the input HTML tag (<SwmToken path="/3dprojects/src/components/mambo-js/Input.js" pos="8:3:3" line-data="		let m_inputTag;">`m_inputTag`</SwmToken>).                                                                                                                                                                  |
| <SwmToken path="/3dprojects/src/components/mambo-js/Input.js" pos="19:3:3" line-data="		this.setup = setup;">`setup`</SwmToken>                                                 | `void`      | Sets up the component with initial configurations.                                                                                                                                                                                                                                                                           |
| <SwmToken path="/3dprojects/src/components/mambo-js/Input.js" pos="20:3:3" line-data="		this.value = value;">`value`</SwmToken>                                                 | `any`       | Gets or sets the value of the input, depending on the context of the call.                                                                                                                                                                                                                                                   |

<SwmSnippet path="3dprojects/src/components/mambo-js/Input.js" line="198">

---

This code snippet initializes an object `m_props` with default values. It sets the `tag` property to 'default', `theme` property to 'default', `name` property to a random string generated using `Math.random()` and `toString(36)`, and `button` property to an object with an empty `text` property.

```
				m_props = {
					tag: "default",
					theme: "default",
					name: Math.random().toString(36).slice(2),
					button: { text: "" },
				};
```

---

</SwmSnippet>

&nbsp;

&nbsp;

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBM2QtcHJvamVjdHMlM0ElM0FFdmVyanIxOA==" repo-name="3d-projects"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
