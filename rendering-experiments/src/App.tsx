import {
    RouterProvider,
    createBrowserRouter,
    useNavigate,
} from "react-router-dom";
import { Experiment } from "./types/param";
import { ExampleExperiment } from "./experiments/example/ExampleExperiment";
import { Box, MantineProvider, Paper, SimpleGrid, Title } from "@mantine/core";
import { ExperimentInterface } from "./Interface";

const EXPERIMENTS: Experiment[] = [
    {
        name: "Example Renderer",
        renderer: ExampleExperiment,
        parameters: [
            {
                type: "number",
                key: "boxes",
                label: "Number of Boxes",
                min: 0,
                default: 5,
            },
            {
                type: "number",
                key: "scale",
                label: "Scaling",
                min: 0.1,
                max: 10,
                default: 1,
            },
        ],
    },
];

function Main() {
    const nav = useNavigate();
    return (
        <SimpleGrid cols={4} spacing="sm" verticalSpacing="sm" p="sm">
            {EXPERIMENTS.map((experiment) => (
                <Paper
                    className="experiment-card"
                    p="md"
                    radius="sm"
                    withBorder
                    style={{ cursor: "pointer" }}
                    onClick={() => nav("/exp/" + experiment.name)}
                >
                    <Title>{experiment.name}</Title>
                </Paper>
            ))}
        </SimpleGrid>
    );
}

const experimentRouter = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
    },
    ...EXPERIMENTS.map((exp) => ({
        path: "/exp/" + exp.name,
        element: <ExperimentInterface {...exp} key={exp.name} />,
    })),
]);

function App() {
    return (
        <MantineProvider defaultColorScheme="dark">
            <Box
                style={{ height: "100vh", width: "100vw", overflow: "hidden" }}
            >
                <RouterProvider router={experimentRouter} />
            </Box>
        </MantineProvider>
    );
}

export default App;
