import { FaGithub } from "react-icons/fa";

export default function SourceCodeButton() {
  return (
    <div style={{ position: "absolute", top: 10, right: 10 }}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/ethansaxenian/benford_images"
      >
        <FaGithub color="black" size={30} title="view source code" />
      </a>
    </div>
  );
}
