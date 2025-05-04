import { LightButton } from "../ui/ligth/LightButton";
import { LightContainer } from "../ui/ligth/LightContainer";
import { LightInput } from "../ui/ligth/LightInput";
import { LightKeyValueLine } from "../ui/ligth/LightKeyValueLine";
import { LightLabel } from "../ui/ligth/LightLabel";
import { LightSelect } from "../ui/ligth/LightSelect";
import { LigthBtnDownload } from "../ui/ligth/LigthBtnDownload";
import { UIFactory } from "./UIFactory";

export class LightUIFactory implements UIFactory {
  createButton(children, onClick, disabled?) {
    return new LightButton({ children, onClick, disabled }).render();
  }

  createInput(placeholder, value, onChange) {
    return new LightInput({ placeholder, value, onChange }).render();
  }

  createSelect(options, value, onChange) {
    return new LightSelect({ options, value, onChange }).render();
  }

  createContainer(children) {
    return new LightContainer({ children }).render();
  }

  createKeyValueLine(label, value, styles?) {
    return new LightKeyValueLine({ label, value, styles }).render();
  }

  createLabel(text, options) {
    return <LightLabel text={text} options={options} />;
  }

  createBtnDowload(onClick) {
    return new LigthBtnDownload({ onClick }).render();
  }
}
