import { useState } from "react";

interface Props {
  onEditing: (content: string) => void;
  element: string;
}

const EditableText = ({ onEditing, element }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(element);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    onEditing(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <textarea
          value={content}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ color: '#E8751A', wordBreak: 'break-all' }}
          autoFocus
        />
      ) : (
        <div>
          <p
            onClick={handleClick}
            className="tooltip-element"
            style={{ color: '#E8751A', wordBreak: 'break-all',  fontSize:'medium', fontWeight:"bold" }}>
              <span className="tooltip">{"Click to Edit"}</span>
              {content ? 
                (content.length > 80 ? content.slice(0, 80) + "..." : content) 
                : "Click to Edit"}
          </p>
        </div>
      )}
    </div>
  );
}

export default EditableText