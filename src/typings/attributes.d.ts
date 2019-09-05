declare module HTML {
  interface Attributes {
    /**Specifies a shortcut key to activate/focus an element*/
    accesskey?: any;
    /**Specifies one or more classnames for an element (refers to a class in a style sheet) */
    class?: any;
    /**Specifies whether the content of an element is editable or not */
    contenteditable?: any;
    /**Used to store custom data private to the page or application */
    'data-'?: {[key: string]: any};
    /**Specifies the text direction for the content in an element */
    dir?: any;
    /**Specifies whether an element is draggable or not */
    draggable?: any;
    /**Specifies whether the dragged data is copied, moved, or linked, when dropped */
    dropzone?: any;
    /**Specifies that an element is not yet, or is no longer, relevant */
    hidden?: any;
    /**Specifies a unique id for an element */
    id?: any;
    /**Specifies the language of the element's content */
    lang?: any;
    /**Specifies whether the element is to have its spelling and grammar checked or not */
    spellcheck?: any;
    /**Specifies an inline CSS style for an element */
    style?: any;
    /**Specifies the tabbing order of an element */
    tabindex?: any;
    /**Specifies extra information about an element */
    title?: any;
    /**Specifies whether the content of an element should be translated or not */
    translate?: any;

    /**Script to be run when the element loses focus */
    onblur?: any;
    /**Script to be run when the value of the element is changed */
    onchange?: any;
    /**Script to be run when the element is being clicked */
    onclick?: any;
    /**Script to be run when a context menu is triggered */
    oncontextmenu?: any;
    /**Script to be run when the content of the element is being copied */
    oncopy?: any;
    /**Script to be run when the content of the element is being cut */
    oncut?: any;
    /**Script to be run when the element is being double-clicked */
    ondblclick?: any;
    /**Script to be run when the element is being dragged */
    ondrag?: any;
    /**Script to be run at the end of a drag operation */
    ondragend?: any;
    /**Script to be run when an element has been dragged to a valid drop target */
    ondragenter?: any;
    /**Script to be run when an element leaves a valid drop target */
    ondragleave?: any;
    /**Script to be run when an element is being dragged over a valid drop target */
    ondragover?: any;
    /**Script to be run at the start of a drag operation */
    ondragstart?: any;
    /**Script to be run when dragged element is being dropped */
    ondrop?: any;
    /**Script to be run when the element gets focus */
    onfocus?: any;
    /**Script to be run when the element gets user input */
    oninput?: any;
    /**Script to be run when the element is invalid */
    oninvalid?: any;
    /**Script to be run when a user is pressing a key */
    onkeydown?: any;
    /**Script to be run when a user presses a key */
    onkeypress?: any;
    /**Script to be run when a user releases a key */
    onkeyup?: any;
    /**Script to be run when a mouse button is pressed down on an element */
    onmousedown?: any;
    /**Script to be run as long as the  mouse pointer is moving over an element */
    onmousemove?: any;
    /**Script to be run when a mouse pointer moves out of an element */
    onmouseout?: any;
    /**Script to be run when a mouse pointer moves over an element */
    onmouseover?: any;
    /**Script to be run when a mouse button is released over an element */
    onmouseup?: any;
    /**Script to be run when a mouse wheel is being scrolled over an element */
    onmousewheel?: any;
    /**Script to be run when the user pastes some content in an element */
    onpaste?: any;
    /**Script to be run when an element's scrollbar is being scrolled */
    onscroll?: any;
    /**Script to be run when the element gets selected */
    onselect?: any;
    /**Script to be run when the mouse wheel rolls up or down over an element */
    onwheel?: any;
  }

  interface ImgAttributes extends Attributes {
    /**Specifies an alternate text when the original element fails to display */
    alt?: any;
    /**Specifies the height of the element */
    height?: any;
    /**Specifies an image as a server-side image-map */
    ismap?: any;
    /**Script to be run on abort */
    onabort?: any;
    /**Script to be run when an error occurs */
    onerror?: any;
    /**Script to be run when the element is finished loading */
    onload?: any;
    /**Specifies the size of the linked resource */
    sizes?: any;
    /**Specifies the URL of the media file */
    src?: any;
    /**Specifies the URL of the image to use in different situations */
    srcset?: any;
    /**Specifies an image as a client-side image-map */
    usemap?: any;
    /**Specifies the width of the element */
    width?: any;
  }

  interface AAttributes extends Attributes {
    /**Specifies that the target will be downloaded when a user clicks on the hyperlink */
    download?: any;
    /**Specifies the URL of the page the link goes to */
    href?: any;
    /**Specifies the language of the linked document */
    hreflang?: any;
    /**Specifies what media/device the linked document is optimized for */
    media?: any;
    /**Specifies the relationship between the current document and the linked document */
    rel?: any;
    /**Specifies the target for where to open the linked document or where to submit the form */
    target?: any;
    /**Specifies the type of element */
    type?: any;
  }

  interface InputAttributes extends Attributes {
    /** Specifies the types of files that the server accepts (only for type="file") */
    accept?: any; 
    /**Specifies an alternate text when the original element fails to display */
    alt?: any;
    /**Specifies whether the <form> or the <input> element should have autocomplete enabled */
    autocomplete?: any;
    /**Specifies that the element should automatically get focus when the page loads */
    autofocus?: any;
    /**Specifies that an <input> element should be pre-selected when the page loads (for type="checkbox" or type="radio") */
    checked?: any;
    /**Specifies that the text direction will be submitted */
    dirname?: any;
    /**Specifies that the specified element/group of elements should be disabled */
    disabled?: any;
    /**Specifies the name of the form the element belongs to */
    form?: any;
    /**Specifies where to send the form-data when a form is submitted. Only for type="submit" */
    formaction?: any;
    /**Specifies the height of the element */
    height?: any;
    /**Refers to a <datalist> element that contains pre-defined options for an <input> element */
    list?: any;
    /**Specifies the maximum value */
    max?: any;
    /**Specifies the maximum number of characters allowed in an element */
    maxlength?: any;
    /**Specifies a minimum value */
    min?: any;
    /**Specifies that a user can enter more than one value */
    multiple?: any;
    /**Specifies the name of the element */
    name?: any;
    /**Script to be run when the element is finished loading */
    onload?: any;
    /**Script to be run when the user writes something in a search field (for <input="search">) */
    onsearch?: any;
    /**Specifies a regular expression that an <input> element's value is checked against */
    pattern?: any;
    /**Specifies a short hint that describes the expected value of the element */
    placeholder?: any;
    /**Specifies that the element is read-only */
    readonly?: any;
    /**Specifies that the element must be filled out before submitting the form */
    required?: any;
    /**Specifies the width, in characters */
    size?: any;
    /**Specifies the URL of the media file */
    src?: any;
    /**Specifies the legal number intervals for an input field */
    step?: any;
    /**Specifies the type of element */
    type?: any;
    /**Specifies the value of the element */
    value?: any;
    /**Specifies the width of the element */
    width?: any;
  }

  interface ButtonAttributes extends Attributes {
    /**Specifies that the element should automatically get focus when the page loads */
    autofocus?: any;
    /**Specifies that the specified element/group of elements should be disabled */
    disabled?: any;
    /**Specifies the name of the form the element belongs to */
    form?: any;
    /**Specifies where to send the form-data when a form is submitted. Only for type="submit" */
    formaction?: any;
    /**Specifies the name of the element */
    name?: any;
    /**Specifies the type of element */
    type?: any;
    /**Specifies the value of the element */
    value?: any;
  }

  interface SelectAttributes extends Attributes {
    /**Specifies that the element should automatically get focus when the page loads */
    autofocus?: any;
    /**Specifies that the specified element/group of elements should be disabled */
    disabled?: any;
    /**Specifies the name of the form the element belongs to */
    form?: any;
    /**Specifies that a user can enter more than one value */
    multiple?: any;
    /**Specifies the name of the element */
    name?: any;
    /**Specifies that the element must be filled out before submitting the form */
    required?: any;
    /**Specifies the number of visible options */
    size?: any;
  }

  interface OptionAttributes extends Attributes {
    /**Specifies that the specified element/group of elements should be disabled */
    disabled?: any;
    /**Specifies the title of the text track */
    label?: any;
    /**Specifies that an option should be pre-selected when the page loads */
    selected?: any;
    /**Specifies the value of the element */
    value?: any;
  }

  interface OptGroupAttributes extends Attributes {
    /**Specifies that the specified element/group of elements should be disabled */
    disabled?: any;
    /**Specifies the title of the text track */
    label?: any;
  }

  interface TextAreaAttributes extends Attributes {
    /**Specifies that the element should automatically get focus when the page loads */
    autofocus?: any;
    /**Specifies the visible width of a text area */
    cols?: any;
    /**Specifies that the text direction will be submitted */
    dirname?: any;
    /**Specifies that the specified element/group of elements should be disabled */
    disabled?: any;
    /**Specifies the name of the form the element belongs to */
    form?: any;
    /**Specifies the maximum number of characters allowed in an element */
    maxlength?: any;
    /**Specifies the name of the element */
    name?: any;
    /**Specifies a short hint that describes the expected value of the element */
    placeholder?: any;
    /**Specifies that the element is read-only */
    readonly?: any;
    /**Specifies that the element must be filled out before submitting the form */
    required?: any;
    /**Specifies the visible number of lines in a text area */
    rows?: any;
    /**Specifies how the text in a text area is to be wrapped when submitted in a form */
    wrap?: any;
  }

  interface LabelAttributes extends Attributes {
    /**Specifies which form element(s) a label/calculation is bound to */
    for?: any;
    /**Specifies the name of the form the element belongs to */
    form?: any;
  }

  interface FieldsetAttributes extends Attributes {
    /**Specifies that the specified element/group of elements should be disabled */
    disabled?: any;
    /**Specifies the name of the form the element belongs to */
    form?: any;
    /**Specifies the name of the element */
    name?: any;
  }

  interface FormAttributes extends Attributes {
    /**Specifies the character encodings that are to be used for the form submission*/ 
    'accept-charset'?: any;
    /**Specifies where to send the form-data when a form is submitted */
    action?: any;
    /**Specifies whether the <form> or the <input> element should have autocomplete enabled */
    autocomplete?: any;
    /**Specifies how the form-data should be encoded when submitting it to the server (only for method="post") */
    enctype?: any;
    /**Specifies the HTTP method to use when sending form-data */
    method?: any;
    /**Specifies the name of the element */
    name?: any;
    /**Specifies that the form should not be validated when submitted */
    novalidate?: any;
    /**Script to be run when a reset button in a form is clicked. */
    onreset?: any;
    /**Script to be run when a form is submitted */
    onsubmit?: any;
    /**Specifies the target for where to open the linked document or where to submit the form */
    target?: any;
  }

  interface OutputAttributes extends Attributes {
    /**Specifies which form element(s) a label/calculation is bound to */
    for?: any;
    /**Specifies the name of the form the element belongs to */
    form?: any;
    /**Specifies the name of the element */
    name?: any;
  }

  interface ObjectAttributes extends Attributes {
    /**Specifies the URL of the resource to be used by the object */
    data?: any;
    /**Specifies the name of the form the element belongs to */
    form?: any;
    /**Specifies the height of the element */
    height?: any;
    /**Specifies the name of the element */
    name?: any;
    /**Script to be run on abort */
    onabort?: any;
    /**Script to be run when a file is ready to start playing (when it has buffered enough to begin) */
    oncanplay?: any;
    /**Script to be run when an error occurs */
    onerror?: any;
    /**Specifies the type of element */
    type?: any;
    /**Specifies an image as a client-side image-map */
    usemap?: any;
    /**Specifies the width of the element */
    width?: any;
  }

  interface ParamAttributes extends Attributes {
    /**Specifies the name of the element */
    name?: any;
    /**Specifies the value of the element */
    value?: any;
  }

  interface OlAttributes extends Attributes {
    /**Specifies that the list order should be descending (9,8,7...) */
    reversed?: any;
    /**Specifies the start value of an ordered list */
    start?: any;
  }

  interface LiAttributes extends Attributes {
    /**Specifies the value of the element */
    value?: any;
  }

  interface MeterAttributes extends Attributes {
    /**Specifies the name of the form the element belongs to */
    form?: any;
    /**Specifies the range that is considered to be a high value */
    high?: any;
    /**Specifies the range that is considered to be a low value */
    low?: any;
    /**Specifies the maximum value */
    max?: any;
    /**Specifies a minimum value */
    min?: any;
    /**Specifies what value is the optimal value for the gauge */
    optimum?: any;
    /**Specifies the value of the element */
    value?: any;
  }

  interface ProgressAttributes extends Attributes {
    /**Specifies the maximum value */
    max?: any;
    /**Specifies the value of the element */
    value?: any;
  }

  interface TdThAttributes extends Attributes {
    /**Specifies the number of columns a table cell should span */
    colspan?: any;
    /**Specifies one or more headers cells a cell is related to */
    headers?: any;
    /**Specifies the number of rows a table cell should span */
    rowspan?: any;
  }

  interface ThAttributes extends TdThAttributes {
    /**Specifies whether a header cell is a header for a column, row, or group of columns or rows */
    scope?: any;
  }

  interface CanvasAttributes extends Attributes {
    /**Specifies the height of the element */
    height?: any;
    /**Specifies the width of the element */
    width?: any;
  }

  interface EmbedAttributes extends Attributes {
    /**Specifies the height of the element */
    height?: any;
    /**Script to be run on abort */
    onabort?: any;
    /**Script to be run when a file is ready to start playing (when it has buffered enough to begin) */
    oncanplay?: any;
    /**Script to be run when an error occurs */
    onerror?: any;
    /**Specifies the URL of the media file */
    src?: any;
    /**Specifies the type of element */
    type?: any;
    /**Specifies the width of the element */
    width?: any;
  }

  interface IFrameAttributes extends Attributes {
    /**Specifies the height of the element */
    height?: any;
    /**Specifies the name of the element */
    name?: any;
    /**Script to be run when the element is finished loading */
    onload?: any;
    /**Enables an extra set of restrictions for the content in an <iframe> */
    sandbox?: any;
    /**Specifies the URL of the media file */
    src?: any;
    /**Specifies the HTML content of the page to show in the <iframe> */
    srcdoc?: any;
    /**Specifies the width of the element */
    width?: any;
  }

  interface AudioVideoAttributes extends Attributes {
    /**Specifies that the audio/video will start playing as soon as it is ready */
    autoplay?: any;
    /**Specifies that audio/video controls should be displayed (such as a play/pause button etc) */
    controls?: any;
    /**Specifies that the audio/video will start over again, every time it is finished */
    loop?: any;
    /**Specifies that the audio output of the video should be muted */
    muted?: any;
    /**Script to be run on abort */
    onabort?: any;
    /**Script to be run when a file is ready to start playing (when it has buffered enough to begin) */
    oncanplay?: any;
    /**Script to be run when a file can be played all the way to the end without pausing for buffering */
    oncanplaythrough?: any;
    /**Script to be run when the length of the media changes */
    ondurationchange?: any;
    /**Script to be run when something bad happens and the file is suddenly unavailable (like unexpectedly disconnects) */
    onemptied?: any;
    /**Script to be run when the media has reach the end (a useful event for messages like "thanks for listening") */
    onended?: any;
    /**Script to be run when an error occurs */
    onerror?: any;
    /**Script to be run when media data is loaded */
    onloadeddata?: any;
    /**Script to be run when meta data (like dimensions and duration) are loaded */
    onloadedmetadata?: any;
    /**Script to be run just as the file begins to load before anything is actually loaded */
    onloadstart?: any;
    /**Script to be run when the media is paused either by the user or programmatically */
    onpause?: any;
    /**Script to be run when the media has started playing */
    onplay?: any;
    /**Script to be run when the media has started playing */
    onplaying?: any;
    /**Script to be run when the browser is in the process of getting the media data */
    onprogress?: any;
    /**Script to be run each time the playback rate changes (like when a user switches to a slow motion or fast forward mode). */
    onratechange?: any;
    /**Script to be run when the seeking attribute is set to false indicating that seeking has ended */
    onseeked?: any;
    /**Script to be run when the seeking attribute is set to true indicating that seeking is active */
    onseeking?: any;
    /**Script to be run when the browser is unable to fetch the media data for whatever reason */
    onstalled?: any;
    /**Script to be run when fetching the media data is stopped before it is completely loaded for whatever reason */
    onsuspend?: any;
    /**Script to be run when the playing position has changed (like when the user fast forwards to a different point in the media) */
    ontimeupdate?: any;
    /**Script to be run each time the volume of a video/audio has been changed */
    onvolumechange?: any;
    /**Script to be run when the media has paused but is expected to resume (like when the media pauses to buffer more data) */
    onwaiting?: any;
    /**Specifies if and how the author thinks the audio/video should be loaded when the page loads */
    preload?: any;
    /**Specifies the URL of the media file */
    src?: any;
  }

  interface VideoAttributes extends AudioVideoAttributes {
    /**Specifies the height of the element */
    height?: any;
    /**Specifies an image to be shown while the video is downloading, or until the user hits the play button */
    poster?: any;
    /**Specifies the width of the element */
    width?: any;
  }

  interface SourceAttributes extends Attributes {
    /**Specifies what media/device the linked document is optimized for */
    media?: any;
    /**Specifies the size of the linked resource */
    sizes?: any;
    /**Specifies the URL of the media file */
    src?: any;
    /**Specifies the URL of the image to use in different situations */
    srcset?: any;
    /**Specifies the type of element */
    type?: any;
  }

  interface TrackAttributes extends Attributes {
    /**Specifies that the track is to be enabled if the user's preferences do not indicate that another track would be more appropriate */
    default?: any;
    /**Specifies the kind of text track */
    kind?: any;
    /**Specifies the title of the text track */
    label?: any;
    /**Script to be run when the cue changes in a <track> element */
    oncuechange?: any;
    /**Specifies the URL of the media file */
    src?: any;
    /**Specifies the language of the track text data (required if kind="subtitles") */
    srclang?: any;
  }

  interface AreaAttributes extends Attributes {
    /**Specifies an alternate text when the original element fails to display */
    alt?: any;
    /**Specifies the coordinates of the area */
    coords?: any;
    /**Specifies that the target will be downloaded when a user clicks on the hyperlink */
    download?: any;
    /**Specifies the URL of the page the link goes to */
    href?: any;
    /**Specifies the language of the linked document */
    hreflang?: any;
    /**Specifies what media/device the linked document is optimized for */
    media?: any;
    /**Specifies the relationship between the current document and the linked document */
    rel?: any;
    /**Specifies the shape of the area */
    shape?: any;
    /**Specifies the target for where to open the linked document or where to submit the form */
    target?: any;
  }

  interface ColAttributes extends Attributes {
    /**Specifies the number of columns to span */
    span?: any;
  }

  interface QAttributes extends Attributes {
    /**Specifies a URL which explains the quote/deleted/inserted text */
    cite?: any;
  }

  interface DetailsAttributes extends Attributes {
    /**Script to be run when the user opens or closes the <details> element */
    ontoggle?: any;
    /**Specifies that the details should be visible (open) to the user */
    open?: any;
  }

  interface DelInsAttributes extends Attributes {
    /**Specifies a URL which explains the quote/deleted/inserted text */
    cite?: any;
    /**Specifies the date and time */
    datetime?: any;
  }

  interface TimeAttributes extends Attributes {
    /**Specifies the date and time */
    datetime?: any;
  }

  interface BaseAttributes extends Attributes {
    /**Specifies the URL of the page the link goes to */
    href?: any;
    /**Specifies the target for where to open the linked document or where to submit the form */
    target?: any;
  }

  interface LinkAttributes extends Attributes {
    /**Specifies the URL of the page the link goes to */
    href?: any;
    /**Specifies the language of the linked document */
    hreflang?: any;
    /**Specifies what media/device the linked document is optimized for */
    media?: any;
    /**Script to be run when the element is finished loading */
    onload?: any;
    /**Specifies the relationship between the current document and the linked document */
    rel?: any;
    /**Specifies the size of the linked resource */
    sizes?: any;
    /**Specifies the type of element */
    type?: any;
  }

  interface MapAttributes extends Attributes {
    /**Specifies the name of the element */
    name?: any;
  }

  interface MenuAttributes extends Attributes {
    /**Specifies the type of element */
    type?: any;
  }

  interface StyleAttributes extends Attributes {
    /**Specifies what media/device the linked document is optimized for */
    media?: any;
    /**Script to be run when an error occurs */
    onerror?: any;
    /**Script to be run when the element is finished loading */
    onload?: any;
    /**Specifies the type of element */
    type?: any;
  }
  
  interface ScriptAttributes extends Attributes {
    /**Specifies that the script is executed asynchronously (only for external scripts) */
    async?: any;
    /**Specifies the character encoding */
    charset?: any;
    /**Specifies that the script is executed when the page has finished parsing (only for external scripts) */
    defer?: any;
    /**Script to be run when an error occurs */
    onerror?: any;
    /**Script to be run when the element is finished loading */
    onload?: any;
    /**Specifies the URL of the media file */
    src?: any;
    /**Specifies the type of element */
    type?: any;
  }

  interface SVGAttributes {
    [name: string]: any;
  }
}