---
title: Button
---
# Introduction

This document will walk you through the implementation of the "Button" component

The feature introduces a new button component with specific properties and methods to manage its state and behavior.

We will cover:

1. Initialization of variables and their purpose.
2. Methods added to the button component and their roles.
3. How these methods and variables interact to achieve the desired functionality.

# Variable initialization

<SwmSnippet path="/3dprojects/src/components/mambo-js/Button.js" line="4">

---

We start by defining the initial variables for the button component. These variables are crucial for maintaining the state and properties of the button.

```
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

| Variable Name                                                                                                                           | Initial Value | Type    | Description                          |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------- | ------------------------------------ |
| self                                                                                                                                    | this          | Object  | Reference to the current instance    |
| <SwmToken path="/3dprojects/src/components/mambo-js/Button.js" pos="5:3:3" line-data="		const m_imageList = [];">`m_imageList`</SwmToken> | \[\]          | Array   | List to store image tags             |
| <SwmToken path="/3dprojects/src/components/mambo-js/Button.js" pos="7:3:3" line-data="		let m_parentTag;">`m_parentTag`</SwmToken>        | undefined     | Any     | Parent tag of the button             |
| <SwmToken path="/3dprojects/src/components/mambo-js/Button.js" pos="8:3:3" line-data="		let m_props;">`m_props`</SwmToken>                | undefined     | Object  | Properties of the button             |
| <SwmToken path="/3dprojects/src/components/mambo-js/Button.js" pos="9:3:3" line-data="		let m_buttonTag;">`m_buttonTag`</SwmToken>        | undefined     | Any     | Tag representing the button          |
| <SwmToken path="/3dprojects/src/components/mambo-js/Button.js" pos="10:3:3" line-data="		let m_text = &quot;&quot;;">`m_text`</SwmToken>  | ""            | String  | Text displayed on the button         |
| <SwmToken path="/3dprojects/src/components/mambo-js/Button.js" pos="11:3:3" line-data="		let m_enable = true;">`m_enable`</SwmToken>      | true          | Boolean | Flag to enable or disable the button |

# Methods added to the button component

<SwmSnippet path="3dprojects/src/components/mambo-js/Button.js" line="13">

---

Next, we define several methods to interact with the button's properties and state. These methods allow for getting configurations, handling selections, and setting up the button.

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

| Method Name                                                                                                                                                  | Description                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| deselect                                                                                                                                                     | Deselects the button                           |
| enable                                                                                                                                                       | Enables the button                             |
| <SwmToken path="/3dprojects/src/components/mambo-js/Button.js" pos="15:3:3" line-data="		this.getConfig = () =&gt; m_props;">`getConfig`</SwmToken>            | Returns the button's properties                |
| <SwmToken path="/3dprojects/src/components/mambo-js/Button.js" pos="16:3:3" line-data="		this.getId = () =&gt; m_props.id;">`getId`</SwmToken>                 | Returns the button's ID                        |
| <SwmToken path="/3dprojects/src/components/mambo-js/Button.js" pos="17:3:3" line-data="		this.getImageTagById = getImageTagById;">`getImageTagById`</SwmToken> | Retrieves an image tag by its ID               |
| <SwmToken path="/3dprojects/src/components/mambo-js/Calendar.js" pos="28:3:3" line-data="		this.getParentTag = () =&gt; self;">`getParentTag`</SwmToken>       | Returns the parent tag of the button           |
| <SwmToken path="/3dprojects/src/components/mambo-js/Input.js" pos="18:3:3" line-data="		this.getTag = () =&gt; m_inputTag;">`getTag`</SwmToken>                | Returns the button tag                         |
| text                                                                                                                                                         | Sets or gets the text of the button            |
| select                                                                                                                                                       | Handles external selection of the button       |
| setup                                                                                                                                                        | Sets up the button with initial configurations |

# Interaction between variables and methods

The variables and methods defined above work together to manage the button's state and behavior. The variables store the necessary data, while the methods provide the functionality to manipulate and retrieve this data. This design ensures that the button component is flexible and can be easily integrated into different parts of the application.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBM2QtcHJvamVjdHMlM0ElM0FFdmVyanIxOA==" repo-name="3d-projects"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
