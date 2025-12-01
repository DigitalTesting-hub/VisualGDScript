/**
 * Complete Nodes Generator - 38+ Node Types
 * Unified generator for all variable, loop, signal, group, data, label, and condition nodes
 */

import { COMPLETE_NODES_SCHEMA } from "./complete-nodes-schema";

export class CompleteNodesGenerator {
  generateNodeCode(node: any, context: any = {}): string {
    const nodeType = node.type;
    const indent = "\t";
    const config = (COMPLETE_NODES_SCHEMA as any)[nodeType];

    if (!config) return `# Unknown node type: ${nodeType}\n`;

    const category = config.category;
    let code = `\n${indent}# ${config.description}\n`;

    switch (category) {
      case "variable":
        code += this.generateVariableCode(node, indent);
        break;
      case "loop":
        code += this.generateLoopCode(node, indent);
        break;
      case "signal":
        code += this.generateSignalCode(node, indent);
        break;
      case "group":
        code += this.generateGroupCode(node, indent);
        break;
      case "data":
        code += this.generateDataCode(node, indent);
        break;
      case "label":
        code += this.generateLabelCode(node, indent);
        break;
      case "condition":
        code += this.generateConditionCode(node, indent);
        break;
      default:
        code += `${indent}# Unknown category: ${category}\n`;
    }

    return code;
  }

  private generateVariableCode(node: any, indent: string): string {
    const type = node.type;
    const data = node.data || {};
    let code = "";

    switch (type) {
      case "set_variable":
        const op = data.operation || "set";
        const varName = data.variable_name || "my_var";
        const value = data.value || "0";
        if (op === "set") code += `${indent}${varName} = ${value}\n`;
        else if (op === "add") code += `${indent}${varName} += ${value}\n`;
        else if (op === "subtract") code += `${indent}${varName} -= ${value}\n`;
        else if (op === "increment") code += `${indent}${varName} += 1\n`;
        else if (op === "decrement") code += `${indent}${varName} -= 1\n`;
        break;

      case "get_variable":
        const getVar = data.variable_name || "my_var";
        code += `${indent}var value = ${getVar}\n`;
        break;

      case "random_variable":
        const randomVar = data.variable_name || "random_value";
        const minVal = data.min_value || "0";
        const maxVal = data.max_value || "1";
        const isInt = data.integer_only || false;
        if (isInt) code += `${indent}${randomVar} = randi_range(${minVal}, ${maxVal})\n`;
        else code += `${indent}${randomVar} = randf_range(${minVal}, ${maxVal})\n`;
        break;

      case "lerp_variable":
        const lerpVar = data.variable_name || "lerped";
        const start = data.start_value || "0";
        const end = data.end_value || "1";
        const weight = data.weight || "0.5";
        code += `${indent}${lerpVar} = lerp(${start}, ${end}, ${weight})\n`;
        break;

      case "clamp_variable":
        const clampVar = data.variable_name || "clamped";
        const min = data.min_value || "0";
        const max = data.max_value || "100";
        code += `${indent}${clampVar} = clamp(${clampVar}, ${min}, ${max})\n`;
        break;

      case "array_variable":
        const arrayName = data.array_name || "my_array";
        const arrayOp = data.operation || "append";
        const arrayValue = data.value || "0";
        const arrayIndex = data.index || "0";
        if (arrayOp === "push" || arrayOp === "append") code += `${indent}${arrayName}.append(${arrayValue})\n`;
        else if (arrayOp === "pop") code += `${indent}${arrayName}.pop_back()\n`;
        else if (arrayOp === "get") code += `${indent}var item = ${arrayName}[${arrayIndex}]\n`;
        else if (arrayOp === "set") code += `${indent}${arrayName}[${arrayIndex}] = ${arrayValue}\n`;
        else if (arrayOp === "clear") code += `${indent}${arrayName}.clear()\n`;
        break;

      case "dictionary_variable":
        const dictName = data.dict_name || "my_dict";
        const dictOp = data.operation || "set";
        const dictKey = data.key || "key";
        const dictValue = data.value || "value";
        if (dictOp === "set") code += `${indent}${dictName}[${dictKey}] = ${dictValue}\n`;
        else if (dictOp === "get") code += `${indent}var val = ${dictName}.get(${dictKey})\n`;
        else if (dictOp === "has") code += `${indent}if ${dictName}.has(${dictKey}):\n${indent}\tpass\n`;
        else if (dictOp === "erase") code += `${indent}${dictName}.erase(${dictKey})\n`;
        else if (dictOp === "clear") code += `${indent}${dictName}.clear()\n`;
        break;
    }

    return code;
  }

  private generateLoopCode(node: any, indent: string): string {
    const type = node.type;
    const data = node.data || {};
    let code = "";

    switch (type) {
      case "for_loop":
        const start = data.start || "0";
        const end = data.end || "10";
        const step = data.step || "1";
        const varName = data.variable_name || "i";
        code += `${indent}for ${varName} in range(${start}, ${end}, ${step}):\n${indent}\tpass\n`;
        break;

      case "while_loop":
        const condition = data.condition || "true";
        code += `${indent}while ${condition}:\n${indent}\tpass\n`;
        break;

      case "for_each_loop":
        const arrayName = data.array_name || "my_array";
        const itemVar = data.item_variable || "item";
        code += `${indent}for ${itemVar} in ${arrayName}:\n${indent}\tpass\n`;
        break;

      case "repeat_loop":
        const times = data.times || "5";
        const counterVar = data.counter_variable || "count";
        code += `${indent}for ${counterVar} in range(${times}):\n${indent}\tpass\n`;
        break;

      case "loop_control":
        const controlType = data.control_type || "break";
        if (controlType === "break") code += `${indent}break\n`;
        else if (controlType === "continue") code += `${indent}continue\n`;
        else if (controlType === "return") code += `${indent}return\n`;
        break;

      case "interval_loop":
        const interval = data.interval || "1.0";
        const loopTimes = data.times || "5";
        code += `${indent}for i in range(${loopTimes}):\n${indent}\tpass\n${indent}\tawait get_tree().create_timer(${interval}).timeout\n`;
        break;
    }

    return code;
  }

  private generateSignalCode(node: any, indent: string): string {
    const type = node.type;
    const data = node.data || {};
    let code = "";

    switch (type) {
      case "custom_signal":
        const signalName = data.signal_name || "my_signal";
        code += `${indent}signal ${signalName}\n`;
        break;

      case "signal_with_args":
        const emitName = data.signal_name || "signal_name";
        const arg1 = data.arg1 || "";
        const arg2 = data.arg2 || "";
        const arg3 = data.arg3 || "";
        const args = [arg1, arg2, arg3].filter(a => a).join(", ");
        code += `${indent}emit_signal("${emitName}"${args ? ", " + args : ""})\n`;
        break;

      case "signal_bus":
        const busName = data.bus_name || "GlobalSignalBus";
        const busAction = data.action || "emit";
        const busSignal = data.signal_name || "signal_name";
        if (busAction === "emit") code += `${indent}${busName}.emit_signal("${busSignal}")\n`;
        else if (busAction === "connect") code += `${indent}${busName}.${busSignal}.connect(callback)\n`;
        break;

      case "signal_debounce":
        const debounceSignal = data.signal_name || "debounced";
        const debounceDelay = data.delay || "0.5";
        code += `${indent}if not is_debouncing:\n${indent}\tis_debouncing = true\n${indent}\temit_signal("${debounceSignal}")\n${indent}\tawait get_tree().create_timer(${debounceDelay}).timeout\n${indent}\tis_debouncing = false\n`;
        break;

      case "signal_throttle":
        const throttleSignal = data.signal_name || "throttled";
        const cooldown = data.cooldown || "0.1";
        code += `${indent}var current_time = Time.get_ticks_msec() / 1000.0\n${indent}if current_time - last_emit_time > ${cooldown}:\n${indent}\tlast_emit_time = current_time\n${indent}\temit_signal("${throttleSignal}")\n`;
        break;
    }

    return code;
  }

  private generateGroupCode(node: any, indent: string): string {
    const type = node.type;
    const data = node.data || {};
    let code = "";

    switch (type) {
      case "add_to_group":
        const groupName = data.group_name || "enemies";
        const persistent = data.persistent || false;
        code += `${indent}add_to_group("${groupName}", ${persistent})\n`;
        break;

      case "remove_from_group":
        const removeName = data.group_name || "enemies";
        code += `${indent}remove_from_group("${removeName}")\n`;
        break;

      case "get_group_nodes":
        const getName = data.group_name || "enemies";
        code += `${indent}var nodes = get_tree().get_nodes_in_group("${getName}")\n`;
        break;

      case "is_in_group":
        const checkName = data.group_name || "enemies";
        code += `${indent}if is_in_group("${checkName}"):\n${indent}\tpass\n`;
        break;

      case "group_foreach":
        const foreachName = data.group_name || "enemies";
        const nodeVar = data.node_variable || "node";
        code += `${indent}for ${nodeVar} in get_tree().get_nodes_in_group("${foreachName}"):\n${indent}\tpass\n`;
        break;

      case "call_group":
        const callName = data.group_name || "enemies";
        const methodName = data.method_name || "method";
        code += `${indent}get_tree().call_group("${callName}", "${methodName}")\n`;
        break;
    }

    return code;
  }

  private generateDataCode(node: any, indent: string): string {
    const type = node.type;
    const data = node.data || {};
    let code = "";

    switch (type) {
      case "save_data":
        const savePath = data.file_path || "user://save.json";
        const saveVar = data.data_variable || "data";
        code += `${indent}var file = FileAccess.open("${savePath}", FileAccess.WRITE)\n${indent}file.store_string(JSON.stringify(${saveVar}))\n`;
        break;

      case "load_data":
        const loadPath = data.file_path || "user://save.json";
        code += `${indent}if FileAccess.file_exists("${loadPath}"):\n${indent}\tvar file = FileAccess.open("${loadPath}", FileAccess.READ)\n${indent}\tvar data = JSON.parse_string(file.get_as_text())\n`;
        break;

      case "save_config":
        const section = data.section || "settings";
        const key = data.key || "value";
        const value = data.value || "0";
        code += `${indent}var config = ConfigFile.new()\n${indent}config.set_value("${section}", "${key}", ${value})\n${indent}config.save("user://config.cfg")\n`;
        break;

      case "load_config":
        const loadSection = data.section || "settings";
        const loadKey = data.key || "value";
        code += `${indent}var config = ConfigFile.new()\n${indent}config.load("user://config.cfg")\n${indent}var value = config.get_value("${loadSection}", "${loadKey}")\n`;
        break;

      case "player_prefs":
        const prefName = data.pref_name || "pref";
        const prefAction = data.action || "get";
        if (prefAction === "set") code += `${indent}PlayerPrefs.set("${prefName}", {value})\n`;
        else code += `${indent}var value = PlayerPrefs.get("${prefName}")\n`;
        break;
    }

    return code;
  }

  private generateLabelCode(node: any, indent: string): string {
    const type = node.type;
    const data = node.data || {};
    let code = "";

    switch (type) {
      case "set_label_text":
        const labelPath = data.label_path || "$Label";
        const text = data.text || "Text";
        code += `${indent}${labelPath}.text = "${text}"\n`;
        break;

      case "update_label":
        const updatePath = data.label_path || "$Label";
        const template = data.template || "Value: {value}";
        code += `${indent}${updatePath}.text = "${template}"\n`;
        break;

      case "label_animation":
        const animPath = data.label_path || "$Label";
        const animType = data.animation_type || "typewriter";
        const speed = data.speed || "0.05";
        if (animType === "typewriter") {
          code += `${indent}var final_text = "${data.final_text || "Text"}"\n${indent}for i in range(final_text.length() + 1):\n${indent}\t${animPath}.text = final_text.substr(0, i)\n${indent}\tawait get_tree().create_timer(${speed}).timeout\n`;
        }
        break;

      case "rich_text_label":
        const richPath = data.label_path || "$RichTextLabel";
        const bbText = data.text || "[b]Bold[/b]";
        code += `${indent}${richPath}.append_text("${bbText}")\n`;
        break;

      case "label_visibility":
        const visPath = data.label_path || "$Label";
        const visAction = data.action || "show";
        if (visAction === "show") code += `${indent}${visPath}.show()\n`;
        else if (visAction === "hide") code += `${indent}${visPath}.hide()\n`;
        else if (visAction === "toggle") code += `${indent}${visPath}.visible = !${visPath}.visible\n`;
        break;
    }

    return code;
  }

  private generateConditionCode(node: any, indent: string): string {
    const type = node.type;
    const data = node.data || {};
    let code = "";

    switch (type) {
      case "switch_case":
        const switchVar = data.variable || "state";
        const cases = data.cases || ["case1", "case2"];
        code += `${indent}match ${switchVar}:\n`;
        cases.forEach((c: any, i: number) => {
          code += `${indent}\t${i}: pass\n`;
        });
        code += `${indent}\t_: pass\n`;
        break;

      case "ternary_operator":
        const condition = data.condition || "true";
        const trueVal = data.true_value || "true";
        const falseVal = data.false_value || "false";
        code += `${indent}var result = ${trueVal} if ${condition} else ${falseVal}\n`;
        break;

      case "null_check":
        const checkVar = data.variable || "value";
        const checkType = data.check_type || "is_null";
        if (checkType === "is_null") code += `${indent}if ${checkVar} == null:\n${indent}\tpass\n`;
        else code += `${indent}if ${checkVar} != null:\n${indent}\tpass\n`;
        break;

      case "type_check":
        const typeVar = data.variable || "node";
        const typeCheck = data.type || "Node";
        code += `${indent}if ${typeVar} is ${typeCheck}:\n${indent}\tpass\n`;
        break;
    }

    return code;
  }
}
