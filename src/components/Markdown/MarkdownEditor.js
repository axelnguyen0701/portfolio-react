import MDEditor from "@uiw/react-md-editor";

export default function MarkdownEditor({ value, setValue }) {
    return (
        <div className="container">
            <MDEditor value={value} onChange={setValue} />
        </div>
    );
}
