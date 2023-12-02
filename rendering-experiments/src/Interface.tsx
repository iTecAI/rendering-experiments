import {
    Box,
    NumberInput,
    Paper,
    Select,
    Stack,
    Switch,
    TextInput,
    Title,
} from "@mantine/core";
import { Experiment } from "./types/param";
import "./styles/interface.scss";
import { useMemo, useReducer } from "react";
import { cloneDeep } from "lodash";

export function ExperimentInterface(props: Experiment) {
    const [parameters, setParameters] = useReducer(
        (state: { [key: string]: any }, updates: { [key: string]: any }) => {
            const newState = cloneDeep(state);
            Object.entries(updates).forEach(
                ([key, val]) => (newState[key] = val)
            );
            return newState;
        },
        {}
    );

    const experiment = useMemo(() => {
        for (const p of props.parameters) {
            setParameters({ [p.key]: p.default });
        }
        return props;
    }, []);

    const Renderer = experiment.renderer;

    return (
        <Box className="experiment">
            <Paper withBorder className="interface-menu" p="sm" radius="sm">
                <Stack gap="sm">
                    <Title order={4}>{experiment.name}</Title>
                    {experiment.parameters.map((param) => {
                        switch (param.type) {
                            case "text":
                                return (
                                    <TextInput
                                        value={parameters[param.key] ?? ""}
                                        onChange={(event) =>
                                            setParameters({
                                                [param.key]: event.target.value,
                                            })
                                        }
                                        label={param.label}
                                        key={param.key}
                                    />
                                );
                            case "choice":
                                return (
                                    <Select
                                        value={
                                            parameters[param.key] ??
                                            param.choices[0].value
                                        }
                                        onChange={(value) =>
                                            setParameters({
                                                [param.key]: value,
                                            })
                                        }
                                        label={param.label}
                                        key={param.key}
                                        data={param.choices}
                                    />
                                );
                            case "number":
                                return (
                                    <NumberInput
                                        value={
                                            parameters[param.key] ??
                                            param.min ??
                                            0
                                        }
                                        onChange={(value) =>
                                            setParameters({
                                                [param.key]: value,
                                            })
                                        }
                                        label={param.label}
                                        key={param.key}
                                        allowDecimal={param.decimals ?? true}
                                        min={param.min}
                                        max={param.max}
                                    />
                                );
                            case "switch":
                                return (
                                    <Switch
                                        checked={parameters[param.key] ?? false}
                                        onChange={(event) =>
                                            setParameters({
                                                [param.key]:
                                                    event.target.checked,
                                            })
                                        }
                                        label={param.label}
                                        key={param.key}
                                    />
                                );
                        }
                    })}
                </Stack>
            </Paper>
            <Box className="render-container">
                <Renderer {...parameters} />
            </Box>
        </Box>
    );
}
