*Note: both are editable comboboxes = AutoComplete that supports text input.

## AutoComplete*

This implementation is an ASSISTED INPUT, with a list of SUGGESTED values.
The input value is not restricted to an item value

The suggested values may or may not updates depending on the input value.
Ex:
- Search Input: the suggestions changes as the user types.
- Recent Searches: the suggestions remains the same.

### Features:
- [OPT-IN] openOnFocus
- [OPT-IN] minChars = open only if minimum amount of chars typed (ex: 3) and has suggestions.
- [OPT-IN] filering="none" disabled automatic filtering (for example to implement your own logic, or simply no filtering)
- [OPT-IN] autoSelectMatches 
    - The first suggestion is automatically highlighted as selected. The automatically selected suggestion becomes the value of the autocomplete when the autocomplete loses focus unless the user chooses a different suggestion or changes the character string in the autocomplete.
    - The portion of the selected suggestion that has not been typed by the user, a completion string, appears inline after the input cursor in the autocomplete. The inline completion string is visually highlighted and has a selected state.

autocomplete={{
    onBlurAutoSelect: true,
    trailingCharacters: true
    highlightFirstMatch: true
}}

---

## AutoComplete*

Popup presents:
- ALLOWED VALUES ONLY
- text input is just a filtering help (Ex: Search field, Recent Searches)

Features:
- [OPT-IN] open on focus
- [OPT-IN] open only if minimum amount of chars typed (ex: 3) and has suggestions.
- [OPT-IN] disabled automatic filtering (for example to implement your own logic, or simply no filtering)
- [OPT-IN] autoSelectMatches 
    - The first suggestion is automatically highlighted as selected. The automatically selected suggestion becomes the value of the autocomplete when the autocomplete loses focus unless the user chooses a different suggestion or changes the character string in the autocomplete.
    - The portion of the selected suggestion that has not been typed by the user, a completion string, appears inline after the input cursor in the autocomplete. The inline completion string is visually highlighted and has a selected state.


---
## Keyboard Interaction (for both)

### When focus is in the autocomplete:
- `Down Arrow`: If the popup is available, moves focus into the popup:
    - If the autocomplete behavior automatically selected a suggestion before `Down Arrow` was pressed, focus is placed on the suggestion following the automatically selected suggestion.
    - Otherwise, places focus on the first focusable element in the popup.
- `Up Arrow` (Optional): If the popup is available, places focus on the last focusable element in the popup.
- `Escape`: Dismisses the popup if it is visible. Optionally, if the popup is hidden before `Escape` is pressed, clears the autocomplete.
- `Enter`: If the autocomplete is editable and an autocomplete suggestion is selected in the popup, accepts the suggestion either by placing the input cursor at the end of the accepted value in the autocomplete or by performing a default action on the value. For example, in a messaging application, the default action may be to add the accepted value to a list of message recipients and then clear the autocomplete so the user can add another recipient.
- Printable Characters:
    - Type characters in the autocomplete. Note that some implementations may regard certain characters as invalid and prevent their input.
- If the autocomplete is editable, it supports standard single line text editing keys appropriate for the device platform (see note below).
- `Alt` + `Down Arrow` (Optional): If the popup is available but not displayed, displays the popup without moving focus.
- `Alt` + `Up Arrow` (Optional): If the popup is displayed:
    - If the popup contains focus, returns focus to the autocomplete.
    - Closes the popup.

### When focus is in the popup:

- `Enter`: Accepts the focused option in the listbox by closing the popup, placing the accepted value in the autocomplete, and if the autocomplete is editable, placing the input cursor at the end of the value.
- `Escape`: Closes the popup and returns focus to the autocomplete. Optionally, if the autocomplete is editable, clears the contents of the autocomplete.
- `Down Arrow`: Moves focus to and selects the next option. If focus is on the last option, either returns focus to the autocomplete or does nothing.
- `Up Arrow`: Moves focus to and selects the previous option. If focus is on the first option, either returns focus to the autocomplete or does nothing.
- `Right Arrow`: If the autocomplete is editable, returns focus to the autocomplete without closing the popup and moves the input cursor one character to the right. If the input cursor is on the right-most character, the cursor does not move.
- `Left Arrow`: If the autocomplete is editable, returns focus to the autocomplete without closing the popup and moves the input cursor one character to the left. If the input cursor is on the left-most character, the cursor does not move.
- `Home` (Optional): Either moves focus to and selects the first option or, if the autocomplete is editable, returns focus to the autocomplete and places the cursor on the first character.
- `End` (Optional): Either moves focus to the last option or, if the autocomplete is editable, returns focus to the autocomplete and places the cursor after the last character.
- Any printable character:
    - returns the focus to the autocomplete without closing the popup and types the character.
- `Backspace` (Optional): If the autocomplete is editable, returns focus to the autocomplete and deletes the character prior to the cursor.
- `Delete` (Optional): If the autocomplete is editable, returns focus to the autocomplete, removes the selected state if a suggestion was selected, and removes the inline autocomplete string if present.

### When the focus is on a "selected item chip" (AutoComplete + multiple selection ONLY):

TODO

> [WARNING]  
> - DOM Focus is maintained on the autocomplete and the assistive technology focus is moved within the listbox using aria-activedescendant as described in Managing Focus in Composites Using aria-activedescendant.
> - Selection follows focus in the listbox; the listbox allows only one suggested value to be selected at a time for the autocomplete value.
> - The popup indicator icon or button (if present), the popup, and the popup descendants are excluded from the page Tab sequence.



IDEA: 
- multiple selection: make itemIndicator look like checkboxes
- use disclosure to display a spinner in loading state



Trigger (contains the input + clear button + disclosure + optional icons.):
- click anywhere: preserve focus in input.
- `Tab` + `autoSelect` enabled:
    - select the highlighted option (if any) AND update the input value to match the selected option. 
    - reset the highlighted option.
- `click` outside the component + `autoSelect` enabled:
    - do NOT select the highlighted option.
    - reset the highlighted option.
- `Escape` while menu is opened:
    - closes the menu.
    - reset highlighted option.
- `Enter` while menu is opened + an option is highlighted:
    - selects the option
    - closes the menu
- `Enter` while menu is closed or no option is higlighted:
    - submits the form.
- `ArrowDown` while menu is opened + there are interactive options:
    - Moves the outline to the next interactive option.
    - Set the outlined option as highlighted.
- `ArrowUp` while menu is opened + there are interactive options:
    - Moves the outline to the next interactive option.
    - Set the outlined option as highlighted.


Disclosure (inside Trigger):

- keyboard focus is disabled.
- clicking forwards the focus to the input.
- clicking toggles (open/close) the menu.
- clicking resets the highlighted option.

ClearButton (inside Trigger):

- keyboard focus is disabled.
- clicking forwards the focus to the input.
- clicking neither open nor close the menu (menu should remain open if it was open).
- clicking clears the input value.
- clicking resets the highlighted option.

Input (inside Trigger):

- if `autoHighlight` and input is not empty, highlight the matching option (if any)
- if `autoHighlight` and input is empty, clears highlighted option.

TODO
click outside = do not autoselect AND restore previous selected value


DONE

- tab while hovering an option = auto select
- tab after selecting with arrowDown/arrowUp = auto select
- tab after typing to higlight an option = auto select


UAT:

- pressing Enter while on an option:
- clicking on an option: 
    - should select the option (bold text)
    - the input value should reflect the option display value
    - the menu should close
- clicking outside the combobox while closed
