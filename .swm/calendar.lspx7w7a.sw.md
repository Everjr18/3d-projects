---
title: Calendar
---
# Introduction

This document will walk you through the implementation of the Calendar feature.

The feature introduces a calendar component with various functionalities.

We will cover:

1. Initialization of HTML tag variables.
2. Initialization of calendar properties.
3. Configuration of public methods.

# Initialization of HTML tag variables

<SwmSnippet path="/3dprojects/src/components/mambo-js/Calendar.js" line="4">

---

We start by defining the HTML tag variables. These variables are used to store references to different parts of the calendar's DOM structure.

```
		const self = this;

		// HTML tag variables
		let m_parentTag;
		let m_headerButtonGroup;
		let m_headerButtonsList = [];
		let m_bodyTag;
		let m_bodyHeaderTag;
		let m_bodyContentTag;
		let m_datesHeaderGrid;
		let m_datesButtonGroup;
```

---

</SwmSnippet>

# Initialization of calendar properties

<SwmSnippet path="3dprojects/src/components/mambo-js/Calendar.js" line="16">

---

Next, we initialize the properties of the calendar. These properties include the date format, current value, view date, and depth levels.

```
		let m_props;
		let m_idFormat = "YYYY/M/D";
		let m_value;
		let m_viewDate;
		let m_depths = { month: 0, year: 1, decade: 2, century: 3 };
		let m_depth = 0;
		let m_minDepth = 0;
		let m_minDate;
		let m_maxDate;
```

---

</SwmSnippet>

# Configuration of public methods

<SwmSnippet path="3dprojects/src/components/mambo-js/Calendar.js" line="27">

---

Finally, we configure the public methods of the calendar. These methods allow interaction with the calendar, such as navigating through dates and setting up the calendar.

```
		this.destroy = destroyCalendar;
		this.getParentTag = () => self;
		this.navigateToFuture = navigateToFuture;
		this.navigateToPast = navigateToPast;
		this.navigateUp = navigateUp;
		this.setup = setup;
		this.value = value;
```

---

</SwmSnippet>

# Variables and descriptions

| Name                                                                                                                                                                         | Description                            | Type     | Props Values                 | Return Values |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | -------- | ---------------------------- | ------------- |
| <SwmToken path="/3dprojects/src/components/mambo-js/Calendar.js" pos="7:3:3" line-data="		let m_parentTag;">`m_parentTag`</SwmToken>                                           | Reference to the parent HTML tag       | Object   | N/A                          | N/A           |
| <SwmToken path="/3dprojects/src/components/mambo-js/Calendar.js" pos="8:3:3" line-data="		let m_headerButtonGroup;">`m_headerButtonGroup`</SwmToken>                           | Reference to the header button group   | Object   | N/A                          | N/A           |
| <SwmToken path="/3dprojects/src/components/mambo-js/Calendar.js" pos="9:3:3" line-data="		let m_headerButtonsList = [];">`m_headerButtonsList`</SwmToken>                      | List of header buttons                 | Array    | N/A                          | N/A           |
| <SwmToken path="/3dprojects/src/components/mambo-js/Calendar.js" pos="10:3:3" line-data="		let m_bodyTag;">`m_bodyTag`</SwmToken>                                              | Reference to the body HTML tag         | Object   | N/A                          | N/A           |
| <SwmToken path="/3dprojects/src/components/mambo-js/Calendar.js" pos="11:3:3" line-data="		let m_bodyHeaderTag;">`m_bodyHeaderTag`</SwmToken>                                  | Reference to the body header HTML tag  | Object   | N/A                          | N/A           |
| <SwmToken path="/3dprojects/src/components/mambo-js/Calendar.js" pos="12:3:3" line-data="		let m_bodyContentTag;">`m_bodyContentTag`</SwmToken>                                | Reference to the body content HTML tag | Object   | N/A                          | N/A           |
| <SwmToken path="/3dprojects/src/components/mambo-js/Calendar.js" pos="13:3:3" line-data="		let m_datesHeaderGrid;">`m_datesHeaderGrid`</SwmToken>                              | Reference to the dates header grid     | Object   | N/A                          | N/A           |
| <SwmToken path="/3dprojects/src/components/mambo-js/Calendar.js" pos="14:3:3" line-data="		let m_datesButtonGroup;">`m_datesButtonGroup`</SwmToken>                            | Reference to the dates button group    | Object   | N/A                          | N/A           |
| <SwmToken path="/3dprojects/src/components/mambo-js/Calendar.js" pos="16:3:3" line-data="		let m_props;">`m_props`</SwmToken>                                                  | Properties of the calendar             | Object   | N/A                          | N/A           |
| <SwmToken path="/3dprojects/src/components/mambo-js/Calendar.js" pos="17:3:3" line-data="		let m_idFormat = &quot;YYYY/M/D&quot;;">`m_idFormat`</SwmToken>                     | Date format identifier                 | String   | N/A                          | N/A           |
| <SwmToken path="/3dprojects/src/components/mambo-js/Calendar.js" pos="18:3:3" line-data="		let m_value;">`m_value`</SwmToken>                                                  | Current value of the calendar          | Date     | N/A                          | N/A           |
| <SwmToken path="/3dprojects/src/components/mambo-js/Calendar.js" pos="19:3:3" line-data="		let m_viewDate;">`m_viewDate`</SwmToken>                                            | Current view date of the calendar      | Date     | N/A                          | N/A           |
| <SwmToken path="/3dprojects/src/components/mambo-js/Calendar.js" pos="20:3:3" line-data="		let m_depths = { month: 0, year: 1, decade: 2, century: 3 };">`m_depths`</SwmToken> | Depth levels for navigation            | Object   | month, year, decade, century | N/A           |
| <SwmToken path="/3dprojects/src/components/mambo-js/Calendar.js" pos="21:3:3" line-data="		let m_depth = 0;">`m_depth`</SwmToken>                                              | Current depth level                    | Number   | N/A                          | N/A           |
| <SwmToken path="/3dprojects/src/components/mambo-js/Calendar.js" pos="22:3:3" line-data="		let m_minDepth = 0;">`m_minDepth`</SwmToken>                                        | Minimum depth level                    | Number   | N/A                          | N/A           |
| <SwmToken path="/3dprojects/src/components/mambo-js/Calendar.js" pos="23:3:3" line-data="		let m_minDate;">`m_minDate`</SwmToken>                                              | Minimum selectable date                | Date     | N/A                          | N/A           |
| <SwmToken path="/3dprojects/src/components/mambo-js/Calendar.js" pos="24:3:3" line-data="		let m_maxDate;">`m_maxDate`</SwmToken>                                              | Maximum selectable date                | Date     | N/A                          | N/A           |
| destroy                                                                                                                                                                      | Method to destroy the calendar         | Function | N/A                          | N/A           |
| <SwmToken path="/3dprojects/src/components/mambo-js/Calendar.js" pos="28:3:3" line-data="		this.getParentTag = () =&gt; self;">`getParentTag`</SwmToken>                       | Method to get the parent tag           | Function | N/A                          | Object        |
| <SwmToken path="/3dprojects/src/components/mambo-js/Calendar.js" pos="29:3:3" line-data="		this.navigateToFuture = navigateToFuture;">`navigateToFuture`</SwmToken>            | Method to navigate to future dates     | Function | N/A                          | N/A           |
| <SwmToken path="/3dprojects/src/components/mambo-js/Calendar.js" pos="30:3:3" line-data="		this.navigateToPast = navigateToPast;">`navigateToPast`</SwmToken>                  | Method to navigate to past dates       | Function | N/A                          | N/A           |
| <SwmToken path="/3dprojects/src/components/mambo-js/Calendar.js" pos="31:3:3" line-data="		this.navigateUp = navigateUp;">`navigateUp`</SwmToken>                              | Method to navigate up in depth         | Function | N/A                          | N/A           |
| setup                                                                                                                                                                        | Method to set up the calendar          | Function | N/A                          | N/A           |
| value                                                                                                                                                                        | Method to get/set the calendar value   | Function | N/A                          | Date          |

This table provides a clear overview of the variables and methods used in the Calendar component, along with their descriptions, types, and relevant values.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBM2QtcHJvamVjdHMlM0ElM0FFdmVyanIxOA==" repo-name="3d-projects"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
