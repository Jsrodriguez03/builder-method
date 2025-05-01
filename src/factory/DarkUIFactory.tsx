import { DarkButton } from "../ui/dark/DarkButton";
import { DarkContainer } from "../ui/dark/DarkContainer";
import { DarkInput } from "../ui/dark/DarkInput";
import { DarkKeyValueLine } from "../ui/dark/DarkKeyValueLine";
import { DarkLabel } from "../ui/dark/DarkLabel";
import { DarkSelect } from "../ui/dark/DarkSelect";
import { UIFactory } from "./UIFactory";

export class DarkUIFactory implements UIFactory {
  createButton(children, onClick, disabled?) {
    return new DarkButton({ children, onClick, disabled }).render();
  }

  createInput(placeholder, value, onChange) {
    return new DarkInput({ placeholder, value, onChange }).render();
  }

  createSelect(options, value, onChange) {
    return new DarkSelect({ options, value, onChange }).render();
  }

  createContainer(children) {
    return new DarkContainer({ children }).render();
  }

  createKeyValueLine(label, value, styles?) {
    return new DarkKeyValueLine({ label, value, styles }).render();
  }

  createLabel(text, options) {
    return <DarkLabel text={text} options={options} />;
  }
}
