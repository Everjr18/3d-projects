---
title: Button
---
# Introduction

This document will walk you through the implementation of the Button feature in the <SwmPath>[3dprojects/src/components/mambo-js/Button.js](/3dprojects/src/components/mambo-js/Button.js)</SwmPath> file.

The feature introduces a custom button element with various properties and methods to manage its state and behavior.

We will cover:

1. Why we use a custom HTML element.
2. How properties and methods are defined and used.
3. The setup process for initializing the button.

# Custom HTML element

<SwmSnippet path="3dprojects/src/components/mambo-js/Button.js" line="1">

---

We define a custom HTML element by extending the <SwmToken path="/3dprojects/src/components/mambo-js/Button.js" pos="1:14:14" line-data="ui.class.Button = class Button extends HTMLElement {">`HTMLElement`</SwmToken> class. This allows us to encapsulate the button's behavior and properties within a single class.

```
ui.class.Button = class Button extends HTMLElement {
```

---

</SwmSnippet>

<SwmSnippet path="/3dprojects/src/components/mambo-js/Button.js" line="2">

---

This code snippet initializes variables and sets their initial values. It declares variables `m_imageList`, `m_parentTag`, `m_props`, `m_buttonTag`, `m_text`, and `m_enable` and assigns them empty arrays, undefined, undefined, undefined, an empty string, and `true`, respectively.

```javascript
	constructor(props) {
		super();
		const self = this;
		const m_imageList = [];

		let m_parentTag;
		let m_props;
		let m_buttonTag;
		let m_text = "";
		let m_enable = true;
```

---

</SwmSnippet>

# Properties and methods

<SwmSnippet path="3dprojects/src/components/mambo-js/Button.js" line="13">

---

We define several properties and methods to manage the button's state and behavior. These include enabling/disabling the button, getting configuration, and handling selection.

```
		this.deselect = deselectBtn;
		this.enable = enable;
		this.getConfig = () => m_props;
		this.getId = () => m_props.id;
		this.getImageTagById = getImageTagById;
		this.getParentTag = () => m_parentTag;
		this.getTag = () => m_buttonTag;
		this.text = text;
		this.select = handleExternalSelect;
		this.setup = setup;
```

---

</SwmSnippet>

# Setup process

<SwmSnippet path="/3dprojects/src/components/mambo-js/Button.js" line="23">

---

We initialize the button with properties passed to the constructor. If properties are provided, the <SwmToken path="/3dprojects/src/components/mambo-js/Button.js" pos="28:5:5" line-data="		async function setup(props) {">`setup`</SwmToken> function is called to configure the button.

```

		if (props) {
			setup(props);
		}

```

---

</SwmSnippet>

# Properties table

| Variable                                                                                                                                                            | Type                                                                                                                                                                   | Initial Value | Description                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------------------- |
| <SwmToken path="/3dprojects/src/components/mambo-js/Button.js" pos="5:3:3" line-data="		const m_imageList = [];">`m_imageList`</SwmToken>                             | Array                                                                                                                                                                  | \[\]          | Stores images associated with the button.       |
| <SwmToken path="/3dprojects/src/components/mambo-js/Input.js" pos="206:1:1" line-data="				m_parentTag = ui.d.getTag(m_props.parentTag);">`m_parentTag`</SwmToken>      | <SwmToken path="/3dprojects/src/components/mambo-js/Button.js" pos="1:14:14" line-data="ui.class.Button = class Button extends HTMLElement {">`HTMLElement`</SwmToken> | undefined     | Stores the parent HTML element of the button.   |
| <SwmToken path="/3dprojects/src/components/mambo-js/Input.js" pos="205:1:1" line-data="				m_props = ui.utils.extend(true, m_props, customProps);">`m_props`</SwmToken> | Object                                                                                                                                                                 | undefined     | Stores the properties passed to the button.     |
| <SwmToken path="/3dprojects/src/components/mambo-js/Button.js" pos="9:3:3" line-data="		let m_buttonTag;">`m_buttonTag`</SwmToken>                                    | <SwmToken path="/3dprojects/src/components/mambo-js/Button.js" pos="1:14:14" line-data="ui.class.Button = class Button extends HTMLElement {">`HTMLElement`</SwmToken> | undefined     | Stores the button's HTML element.               |
| <SwmToken path="/3dprojects/src/components/mambo-js/Button.js" pos="10:3:3" line-data="		let m_text = &quot;&quot;;">`m_text`</SwmToken>                              | String                                                                                                                                                                 | ""            | Stores the text displayed on the button.        |
| <SwmToken path="/3dprojects/src/components/mambo-js/Button.js" pos="11:3:3" line-data="		let m_enable = true;">`m_enable`</SwmToken>                                  | Boolean                                                                                                                                                                | true          | Indicates whether the button is enabled or not. |

This table summarizes the variables used in the Button class, their types, initial values, and descriptions.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBM2QtcHJvamVjdHMlM0ElM0FFdmVyanIxOA==" repo-name="3d-projects"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
