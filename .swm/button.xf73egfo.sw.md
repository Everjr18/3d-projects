---
title: Button
---
# Introduction

This document will walk you through the implementation of the Button feature.

The feature introduces a custom button element with various properties and methods to handle its behavior and appearance.

We will cover:

1. Why we use a custom element.
2. How properties and methods are set up.
3. How the button's DOM is constructed.
4. How event handling is managed.
5. How images and icons are integrated.

# Custom element definition

<SwmSnippet path="/3dprojects/src/components/mambo-js/Button.js" line="1">

---

We define a custom button element by extending <SwmToken path="/3dprojects/src/components/mambo-js/Button.js" pos="1:14:14" line-data="ui.class.Button = class Button extends HTMLElement {">`HTMLElement`</SwmToken>. This allows us to encapsulate the button's behavior and appearance.

```
ui.class.Button = class Button extends HTMLElement {
```

---

</SwmSnippet>

# Constructor and initial properties

<SwmSnippet path="/3dprojects/src/components/mambo-js/Button.js" line="4">

---

In the constructor, we initialize several properties and set up the button's initial state.

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

# Methods and properties

<SwmSnippet path="/3dprojects/src/components/mambo-js/Button.js" line="13">

---

We define various methods and properties to interact with the button. These include methods for enabling/disabling the button, getting configuration, and handling selection.

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

# Setup method

<SwmSnippet path="/3dprojects/src/components/mambo-js/Button.js" line="28">

---

The <SwmToken path="/3dprojects/src/components/mambo-js/Button.js" pos="28:5:5" line-data="		async function setup(props) {">`setup`</SwmToken> method configures the button based on the provided properties. It installs the UI component, sets up the DOM, and marks the setup as complete.

```
		async function setup(props) {
			await configure(props);
			await ui.utils.installUIComponent({ self, m_parentTag, m_props });
			await setupDOM();
			setupComplete();
		}
```

---

</SwmSnippet>

# DOM setup

<SwmSnippet path="/3dprojects/src/components/mambo-js/Button.js" line="34">

---

The <SwmToken path="/3dprojects/src/components/mambo-js/Button.js" pos="31:3:3" line-data="			await setupDOM();">`setupDOM`</SwmToken> function constructs the button's DOM elements based on the configuration. It creates the button tag, adds event listeners, and inserts graphics or icons if specified.

```

		function setupDOM() {
			return new Promise((resolve) => {
				const tagConfig = { ...m_props.tags.button };
				tagConfig.class = m_props.css.button;
				tagConfig.text = m_props.text;
				tagConfig.event = {
					click: handleClick,
					mouseenter: () => {
						mouseEnterOverButton();
						mouseEnterOverImage();
					},
					mouseleave: () => {
						mouseLeaveOverButton();
						mouseLeaveOverImage();
					},
				};
```

---

</SwmSnippet>

# Inserting graphics and icons

<SwmSnippet path="/3dprojects/src/components/mambo-js/Button.js" line="68">

---

The <SwmToken path="/3dprojects/src/components/mambo-js/Button.js" pos="55:1:1" line-data="					insertGraphic();">`insertGraphic`</SwmToken> and <SwmToken path="/3dprojects/src/components/mambo-js/Button.js" pos="59:1:1" line-data="					insertIcon();">`insertIcon`</SwmToken> functions handle the addition of images and icons to the button. They ensure that the correct tags are created and appended to the button.

```

		function insertGraphic() {
			//checking if the img is an array
			if (Array.isArray(m_props.img)) {
				m_props.img.forEach((img) => {
					addImg(img);
				});
			} else {
				addImg(m_props.img);
			}
```

---

</SwmSnippet>

<SwmSnippet path="/3dprojects/src/components/mambo-js/Button.js" line="91">

---

```

		function insertIcon() {
			//checking if the img is an array
			if (Array.isArray(m_props.img)) {
				m_props.img.forEach((img) => {
					addImg(img);
				});
			} else {
				addImg(m_props.img);
			}
```

---

</SwmSnippet>

# Event handling

<SwmSnippet path="/3dprojects/src/components/mambo-js/Button.js" line="114">

---

We handle various events such as clicks, mouse enter, and mouse leave. These events trigger corresponding functions to manage the button's state and appearance.

```

		function getImageTagById(id) {
			return m_imageList.find((img) => img.id === id);
		}

		function handleClick(ev) {
			if (m_enable) {
				if (m_props.preventDefault) {
					ev.preventDefault();
				}
```

---

</SwmSnippet>

<SwmSnippet path="/3dprojects/src/components/mambo-js/Button.js" line="170">

---

```

		function mouseEnterOverButton() {
			if (!ui.d.hasClass(m_buttonTag, m_props.css.selected)) {
				m_buttonTag.classList.add(m_props.css.hover);
			}
		}

		function mouseLeaveOverButton() {
			m_buttonTag.classList.remove(m_props.css.hover);
		}
```

---

</SwmSnippet>

# Final setup and configuration

<SwmSnippet path="/3dprojects/src/components/mambo-js/Button.js" line="226">

---

The <SwmToken path="/3dprojects/src/components/mambo-js/Button.js" pos="29:3:3" line-data="			await configure(props);">`configure`</SwmToken> function sets up the initial properties and configuration for the button. It merges custom properties with default values and resolves the setup process.

```

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					text: "Mambo Button",
					enable: true,
					preventDefault: true,
					stopPropagation: true,
					tag: "default",
					theme: "default",
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "button" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "button" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				m_text = m_props.text;
				m_enable = m_props.enable;
				resolve();
			});
		}
	}
```

---

</SwmSnippet>

# Button instantiation

<SwmSnippet path="/3dprojects/src/components/mambo-js/Button.js" line="251">

---

Finally, we instantiate the button and define it as a custom element.

```
ui.button = (props) => new ui.class.Button(props);
customElements.define("mambo-button", ui.class.Button);

```

---

</SwmSnippet>

This concludes the walkthrough of the Button feature implementation. Each section highlights the key design decisions and how they fit into the overall functionality of the custom button element.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBM2QtcHJvamVjdHMlM0ElM0FFdmVyanIxOA==" repo-name="3d-projects"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
