const monacoConfig = { paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs' }};
const themeRules = [
    { token: 'keyword', foreground: '4959b0' },
    { token: 'identifier', foreground: '8185a1' },
    { token: 'string', foreground: '4959b0' },
    { token: 'number', foreground: '4959b0' },
    { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
    { background: '#1b1a1d' },
];
const themeColors = {
    'editor.foreground': '#ffffff',
    'editor.background': '#1b1a1d', 
    'editorCursor.foreground': '#A7A7A7',
    'editor.lineHighlightBackground': '#2D2D30',
    'editorLineNumber.foreground': '#858585',
    'editor.selectionBackground': '#3A3D41',
    'editor.inactiveSelectionBackground': '#2b2d30',
};

let editors = {}, tabCount = 0, menu = document.querySelector('.menu'), currentEditorId = null;
const buttons = document.querySelectorAll('.icon-buttons button');
const viewers = document.querySelectorAll('.home, .script, .settings');
const menuButtons = document.querySelectorAll('.menu-button');
const executeButton = document.getElementById('execute');
const attachButton = document.getElementById('attach');
const clearButton = document.getElementById('clear');
const modal = document.getElementById("wigetModal");
const btn = document.getElementById("widgetModalOpen");
const span = document.getElementsByClassName("close")[0];
const form = document.getElementById("widgetForm");


require.config(monacoConfig);
require(['vs/editor/editor.main'], function() {
    monaco.editor.defineTheme('vision', {
        base: 'vs-dark',
        inherit: true,
        rules: themeRules,
        language: 'lua',
        colors: themeColors
    });

    monaco.languages.registerCompletionItemProvider('lua', {
        triggerCharacters: [':' ],
        provideCompletionItems: function(model, position) {
            var textUntilPosition = model.getValueInRange({startLineNumber: 1, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column});
            var match = textUntilPosition.match(/\:\s*$/);
            if (!match) return { suggestions: [] };
    
            var word = model.getWordUntilPosition(position);
            var range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn
            };
            var suggestions = [
                    {
                        label: ':GetDescendants',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Returns an array containing all descendants of the instance',
                        insertText: 'GetDescendants()',
                        range: range
                    },
                    {
                        label: ':FindFirstChild',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Returns the first child of the Instance found with the given name.',
                        insertText: 'FindFirstChild()',
                        range: range
                    },
                    {
                        label: ':FindFirstAncestor',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Returns the first ancestor of the Instance whose Name is equal to the given name.',
                        insertText: 'FindFirstAncestor()',
                        range: range
                    },
                    {
                        label: ':GetChildren',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Returns an array containing all of the Instance\'s children.',
                        insertText: 'GetChildren()',
                        range: range
                    },
                    {
                        label: ':GetFullName',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Returns a string describing the Instance\'s ancestry.',
                        insertText: 'GetFullName()',
                        range: range
                    },
                    {
                        label: ':GetPropertyChangedSignal',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Returns an event that fires when a given property of an object changes.',
                        insertText: 'GetPropertyChangedSignal()',
                        range: range
                    },
                    {
                        label: ':IsDescendantOf',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Returns true if an Instance is a descendant of the given ancestor.',
                        insertText: 'IsDescendantOf()',
                        range: range
                    },
                    {
                        label: ':SetPrimaryPartCFrame',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Sets the PrimaryPart of a Model to the given CFrame.',
                        insertText: 'SetPrimaryPartCFrame()',
                        range: range
                    },
                    {
                        label: ':WaitForChild',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Returns the child of the Instance with the given name. If the child does not exist, it will yield the current thread until it does.',
                        insertText: 'WaitForChild()',
                        range: range
                    },
                    {
                        label: ':ClearAllChildren',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Removes all of an Instance\'s children.',
                        insertText: 'ClearAllChildren()',
                        range: range
                    },
                    {
                        label: ':FindFirstAncestorOfClass',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Returns the first ancestor of the Instance whose ClassName is equal to the given className.',
                        insertText: 'FindFirstAncestorOfClass()',
                        range: range
                    },
                    {
                        label: ':FindFirstAncestorWhichIsA',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Returns the first ancestor of the Instance for whom IsA returns true for the given className.',
                        insertText: 'FindFirstAncestorWhichIsA()',
                        range: range
                    },
                    {
                        label: ':FindFirstChildOfClass',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Returns the first child of the Instance whose ClassName is equal to the given className.',
                        insertText: 'FindFirstChildOfClass()',
                        range: range
                    },
                    {
                        label: ':FindFirstChildWhichIsA',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Returns the first child of the Instance for whom IsA returns true for the given className.',
                        insertText: 'FindFirstChildWhichIsA()',
                        range: range
                    },
                    {
                        label: ':GetAttribute',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Returns the attribute which has been assigned to the given name.',
                        insertText: 'GetAttribute()',
                        range: range
                    },
                    {
                        label: ':GetAttributes',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Returns a dictionary of string → variant pairs for each of the Instance\'s attributes.',
                        insertText: 'GetAttributes()',
                        range: range
                    },
                    {
                        label: ':GetDebugId',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Returns an coded string of the Instance\'s DebugId used internally by Roblox.',
                        insertText: 'GetDebugId()',
                        range: range
                    },
                    {
                        label: ':GetPrimaryPartCFrame',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Returns a CFrame that describes the PrimaryPart’s position and orientation in world space.',
                        insertText: 'GetPrimaryPartCFrame()',
                        range: range
                    },
                    {
                        label: ':IsAncestorOf',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Returns true if an Instance is an ancestor of the given descendant.',
                        insertText: 'IsAncestorOf()',
                        range: range
                    },
                    {
                        label: ':IsA',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Returns true if an Instance\'s class matches or inherits from a given class.',
                        insertText: 'IsA()',
                        range: range
                    },
                    {
                        label: ':MoveTo',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Sets the object’s Position to the given Vector3.',
                        insertText: 'MoveTo()',
                        range: range
                    },
                    {
                        label: ':Remove',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'This function destroys all of an Instance\'s children.',
                        insertText: 'Remove()',
                        range: range
                    },
                    {
                        label: ':SetAttribute',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Sets the attribute with the given name to the given value.',
                        insertText: 'SetAttribute()',
                        range: range
                    },
                    {
                        label: ':TranslateBy',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Applies a Vector3 displacement to the Position of a Part.',
                        insertText: 'TranslateBy()',
                        range: range
                    },
                    {
                        label: ':GetMass',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Returns the mass of the Part in kilograms.',
                        insertText: 'GetMass()',
                        range: range
                    },
                    {
                        label: ':CanCollideWith',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Returns true if the part can collide with another part.',
                        insertText: 'CanCollideWith()',
                        range: range
                    },
                    {
                        label: ':GetConnectedParts',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Returns a table of the parts connected to this part.',
                        insertText: 'GetConnectedParts()',
                        range: range
                    },
                    {
                        label: ':GetJoints',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Returns a table of the joints connected to this part.',
                        insertText: 'GetJoints()',
                        range: range
                    },
                    {
                        label: ':BreakJoints',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Breaks all joints connected to this part.',
                        insertText: 'BreakJoints()',
                        range: range
                    },
                    {
                        label: ':MakeJoints',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Creates joints between this part and its touching parts.',
                        insertText: 'MakeJoints()',
                        range: range
                    },
                    {
                        label: ':SetNetworkOwner',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'Sets the network owner of a part, which is the player who has authority over the physical state of the part.',
                        insertText: 'SetNetworkOwner()',
                        range: range
                    },
                ]
            return { suggestions: suggestions };
        }
    });
    addTab();
    switchEditor('container1');
});

function createSwitchFunction(id) {
    return function() { switchEditor(id); };
}

function addTab() {
    tabCount++;
    let id = `container${tabCount}`;
    let tabId = `tab${id}`;

    let newTab = document.createElement('div');
    newTab.className = 'tab';
    newTab.id = tabId;

    let tabButton = document.createElement('button');
    tabButton.className = 'tab-button';
    tabButton.onclick = createSwitchFunction(id);
    tabButton.textContent = `Tab ${tabCount}`;

    if (tabCount > 1) {
        let closeBtn = document.createElement('button');
        closeBtn.textContent = 'x';
        closeBtn.className = 'close-tab';
        closeBtn.onclick = function() { removeTab(tabId, id); };
        newTab.appendChild(closeBtn);
    }

    newTab.appendChild(tabButton);
    document.getElementById('tabList').appendChild(newTab);

    let newContainer = document.createElement('div');
    newContainer.id = id;
    newContainer.className = 'editor';
    newContainer.style.display = 'none';
    document.getElementById('editor-container').appendChild(newContainer);

    let editor = monaco.editor.create(newContainer, {
        value: 'print("Hello, World!")',
        language: 'lua',
        theme: 'vision'
    });

    newTab.addEventListener('contextmenu', function(e) {
        e.preventDefault();

        menu.style.display = 'block';
        menu.style.left = e.pageX + 'px'; 
        menu.style.top = e.pageY + 'px';
    });

    editors[id] = editor;
}

function switchEditor(id) {
    Object.keys(editors).forEach(editorId => {
        document.getElementById(editorId).style.display = 'none';
    });

    let tabs = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }

    let currentTab = document.querySelector(`#tab${id} .tab-button`);
    if (currentTab) {
        currentTab.classList.add('active');
    }

    let container = document.getElementById(id);
    container.style.display = 'block';
    editors[id].layout();
    currentEditorId = id;
}

function removeTab(tabId, containerId) {   
    tabCount--;
    let tab = document.getElementById(tabId);
    tab.parentNode.removeChild(tab);
    let container = document.getElementById(containerId);
    container.parentNode.removeChild(container);
    delete editors[containerId];

    if (Object.keys(editors).length > 0) {
        switchEditor(Object.keys(editors)[0]);
    }
}

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        viewers.forEach(viewer => viewer.style.display = 'none');
        buttons.forEach(button => button.style.backgroundColor = 'transparent');

        viewers[index].style.display = 'block';
        button.style.backgroundColor = '#161518';
        button.style.animation = 'bounce 0.6s';

        ['home-container', 'editor-container', 'settings-container', 'action-buttons'].forEach(id => {
            document.getElementById(id).style.display = 'none';

        });

        let containerId = ['home-container', 'editor-container', 'settings-container'][index];
        document.getElementById(containerId).style.display = 'block';

        if (index === 1) {
            Object.values(editors).forEach(editor => editor.layout());
            document.getElementById('action-buttons').style.display = 'flex';
        }

        createOverlap(button, index);
    });

    button.addEventListener('animationend', function() {
        button.style.animation = '';
    });
});

function createOverlap(button, index) {
    document.querySelectorAll('#temp-div').forEach(el => el.remove());

    let overlap = createDiv(button.offsetLeft + button.offsetWidth, button.getBoundingClientRect().top, '23px', '65px', '#161518', 'bounce 0.5s', '-3');
    let corner = createDiv(button.offsetLeft + button.offsetWidth - 15, button.getBoundingClientRect().top + 65, '30px', '30px', '#161518', 'bounce 0.5s', '-3', 'radial-gradient(circle 30px at bottom left, transparent 0, transparent 30px, black 21px)');
    document.body.appendChild(corner);
    document.body.appendChild(overlap);

    if (index != 0) {
        let corner2 = createDiv(button.offsetLeft + button.offsetWidth - 15, button.getBoundingClientRect().top - 30, '30px', '30px', '#161518', 'bounce 0.5s', '-3', 'radial-gradient(circle 30px at top left, transparent 0, transparent 30px, black 21px)');
        document.body.appendChild(corner2);

    }
}

function createDiv(left, top, width, height, backgroundColor, animation, zIndex, maskImage = null) {
    let div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.left = left + 'px';
    div.id = 'temp-div';    
    div.style.top = top + 'px';
    div.style.width = width;
    div.style.height = height;
    div.style.backgroundColor = backgroundColor;
    div.style.animation = animation;
    div.style.zIndex = zIndex;
    if (maskImage) {
        div.style.WebkitMaskImage = maskImage;
    }
    return div;

}
document.addEventListener('click', function(e) {
    if (e.target !== menu && !menu.contains(e.target)) {
        menu.style.display = 'none';
    }
});

function handleButtonClick(event) {
    const buttonId = event.target.id;
    const tabId = `tabcontainer${tabCount}`;
    const containerId = `container${tabCount}`;

    switch (buttonId) {
        case 'close-button':
            console.log(tabId)
                removeTab(tabId, containerId);
            break;
        case 'rename-button':

            break;
        case 'duplicate-button':

            break;
        case 'save-button':
    
            break;
        case 'saveall-button':

            break;
        case 'pin-button':

            break;
        case 'closeall-button':

            break;
        case 'closeright-button':

            break;
        default:
            console.log('Button not handled:', buttonId);
    }
}

executeButton.addEventListener('click', function() {
    let currentEditor = editors[currentEditorId];
    pywebview.api.execute(currentEditor.getValue());
});

attachButton.addEventListener('click', function() {
    pywebview.api.attach();
});

clearButton.addEventListener('click', function() {
    let currentEditor = editors[currentEditorId];
    currentEditor.setValue('');
});

btn.onclick = function() {
    modal.style.display = "block";
    setTimeout(function() {
        modal.style.backdropFilter = 'blur(5px)';
        modal.style.backgroundColor = 'rgba(0,0,0,0.6)';
        document.querySelector('.modal-content').style.transform = 'translate(-50%, -50%) scale(1)';
        document.querySelector('.modal-content').style.opacity = '1';
    }, 50);
}

span.onclick = function() {
    modal.style.backdropFilter = 'blur(0px)';
    modal.style.backgroundColor = 'rgba(0,0,0,0)';
    document.querySelector('.modal-content').style.transform = 'translate(-50%, -50%) scale(0.9)';
    document.querySelector('.modal-content').style.opacity = '0';
    setTimeout(function() {
        modal.style.display = "none";
    }, 200);
}

form.onsubmit = function(event) {
    event.preventDefault();

    modal.style.display = "none";
}

menuButtons.forEach(button => button.addEventListener('click', handleButtonClick));
createOverlap(buttons[0], 0);
viewers[0].style.display = 'block';
buttons[0].style.backgroundColor = '#161518';

