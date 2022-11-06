import {
    addProject,
    deleteProject,
    getProject,
    updateProject,
} from "../services/projects";

const project = {
    name: "new",
    description: "description",
    link: "#",
    stacks: "1",
    url: 123,
};

let docRef;

it("Create project successfully", async () => {
    docRef = await addProject(project);
    expect(docRef).toBeDefined();
});

it("Get a project", async () => {
    const project1 = await getProject({ params: { id: docRef.id } });
    expect(project1.name).toMatch("new");
    expect.assertions(1);
});

it("Update a project", async () => {
    const newProject = { ...project, name: "no no", id: docRef.id };
    await updateProject(newProject);
    const projectAfterUpdated = await getProject({ params: { id: docRef.id } });
    expect(projectAfterUpdated.name).toMatch("no no");
});

it("Delete project", async () => {
    await deleteProject({ params: { id: docRef.id } });
});
