import "./styles.css";
import { useEffect } from "react";
import * as ACDesigner from "adaptivecards-designer";
import loader from "@monaco-editor/loader";
// import * as monaco from "monaco-editor";
//import Editor, { EditorProps, Monaco, monaco } from "@monaco-editor/react";
//import * as markdownit from "markdown-it";
//import { Editor } from "@monaco-editor/react";
import "adaptivecards-designer/dist/adaptivecards-designer.css";

export default function App() {
  useEffect(() => {
    async function setup() {
      const monaco = await loader.init();

      // ACDesigner.CardDesigner.onProcessMarkdown = (text, result) => {
      //   result.outputHtml = new markdownit().render(text);
      //   result.didProcess = true;
      // };

      ACDesigner.GlobalSettings.showVersionPicker = true;
      ACDesigner.GlobalSettings.enableDataBindingSupport = true;
      ACDesigner.GlobalSettings.showDataStructureToolbox = false;
      ACDesigner.GlobalSettings.showSampleDataEditorToolbox = true;

      /* Configure toolbox titles */
      // ACDesigner.Strings.toolboxes.cardEditor.title = "Workgrid card";

      let designer = new ACDesigner.CardDesigner([
        new ACDesigner.WebChatContainer(
          "Bot Framework WebChat",
          "containers/webchat-container.css"
        ),
        new ACDesigner.DarkTeamsContainer(
          "Teams Dark Container",
          "containers/teams-container.css"
        ),
        new ACDesigner.LightTeamsContainer(
          "Teams Light Container",
          "containers/teams-container.css"
        ),
        new ACDesigner.DefaultContainer(
          "Default Container",
          "containers/teams-container.css"
        )
      ]);

      // Modify the UI with custom elements
      let wgButton = new ACDesigner.ToolbarButton(
        "wgButton",
        "Workgrid",
        null,
        (sender) => {
          alert("Workgrid says hi!");
        }
      );
      wgButton.separator = true;
      wgButton.style = "background-color: #2D7BB7";
      designer.toolbar.insertElementAfter(
        wgButton,
        ACDesigner.CardDesigner.ToolbarCommands.HostAppPicker
      );

      // Attach the designer into the DOM
      designer.bindingPreviewMode = ACDesigner.BindingPreviewMode.SampleData;
      designer.attachTo(document.getElementById("editor"));
      designer.monacoModuleLoaded(monaco); // :D
    }

    setup();
  }, []);
  return (
    <div className="App">
      <div id="editor"></div>
    </div>
  );
}
