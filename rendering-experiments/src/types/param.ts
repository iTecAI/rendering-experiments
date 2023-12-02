interface BaseParameter {
    type: string;
    label: string;
    key: string;
    default: any;
}

export interface TextParameter extends BaseParameter {
    type: "text";
}

export interface NumberParameter extends BaseParameter {
    type: "number";
    decimals?: boolean;
    min?: number;
    max?: number;
}

export interface ChoiceParameter extends BaseParameter {
    type: "choice";
    choices: { label: string; value: any }[];
}

export interface SwitchParameter extends BaseParameter {
    type: "switch";
}

export type Parameter =
    | TextParameter
    | NumberParameter
    | ChoiceParameter
    | SwitchParameter;

export type Experiment = {
    name: string;
    renderer: (props: any) => JSX.Element;
    parameters: Parameter[];
};
